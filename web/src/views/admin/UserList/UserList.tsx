import { useMutation } from "@apollo/client";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { GridCallbackDetails, GridCellEditCommitParams, GridColDef, GridInputSelectionModel, GridPreProcessEditCellProps, GridRenderCellParams, GridRowId, GridSortModel, GridValueFormatterParams } from "@mui/x-data-grid";
import Papa from 'papaparse';
import { ChangeEvent, useCallback, useRef, useState } from "react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import { ConnectionGrid, RefetchFunction } from "../../../components/ConnectionGrid";
import { useNotification } from "../../../components/Notification";
import PageHeading from "../../../components/PageHeading/PageHeading";
import { CREATE_MULTIPLE_USERS, DELETE_MULTIPLE_USERS, UPDATE_USER_LIST } from "../../../graphql/mutations/user";
import { USER_CONNECTION } from "../../../graphql/queries/user";
import { BatchPayload } from "../../../graphql/type/BatchPayload";
import { GraphqlDto, OrderDirection } from "../../../graphql/type/type";
import { User, UserOrder, UserOrderField, UserRole, UserStatus } from "../../../graphql/type/user";
import { getDisplayedRole } from "../../../utils/display/user";
import { matchAccept } from "../../../utils/file";
import { validate } from "./validation";


function sortModelToOrder(sortModel: GridSortModel): UserOrder | undefined {
    if (sortModel.length === 0) return undefined;
    const sortItem = sortModel[0];
    const direction = sortItem.sort.toUpperCase() as OrderDirection;
    switch (sortItem.field) {
        case 'name': return { field: UserOrderField.NAME, direction };
        case 'studentId': return { field: UserOrderField.STUDENT_ID, direction };
        case 'email': return { field: UserOrderField.EMAIL, direction };
        case 'role': return { field: UserOrderField.ROLE, direction };
        case 'status': return { field: UserOrderField.STATUS, direction };
    }
}

export default function UserList() {
    const [importLoading, setImportLoading] = useState(false);
    const input = useRef<HTMLInputElement>(null);
    const refetch = useRef<RefetchFunction<UserOrderField>>(null);

    const [createMultipleUsers] = useMutation<GraphqlDto<'createMultipleUsers', BatchPayload>>(CREATE_MULTIPLE_USERS);
    const [updateUser] = useMutation<GraphqlDto<'updateUser', User>>(UPDATE_USER_LIST);
    const [deleteMultipleUsers] = useMutation<GraphqlDto<'deleteMultipleUsers', BatchPayload>>(DELETE_MULTIPLE_USERS);
    const { enqueueNotification, enqueueCommonErrorNotification } = useNotification();

    // table definitions
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: '??????',
            flex: 1,
            minWidth: 140,
            editable: true,
            renderCell: (params: GridRenderCellParams<string, User>) => (
                <Box display="flex" alignItems="center">
                    <Avatar src={params.row.picture} imgProps={{ crossOrigin: 'anonymous' }}>{!params.row.picture && params.row.name.charAt(0)}</Avatar>
                    <Typography variant="subtitle1" ml={2}>{params.row.name}</Typography>
                </Box>
            ),
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => validate(params, 'name'),
        },
        { field: 'studentId', headerName: '??????', flex: 1, minWidth: 110 },
        { field: 'email', headerName: 'Email', flex: 2, minWidth: 225 },
        {
            field: 'role',
            headerName: '??????',
            type: 'singleSelect',
            flex: 1,
            minWidth: 100,
            editable: true,
            valueOptions: Object.values(UserRole),
            valueFormatter: (params: GridValueFormatterParams) => getDisplayedRole(params.value),
        },
        {
            field: 'status',
            headerName: '??????',
            type: 'singleSelect',
            flex: 1,
            minWidth: 100,
            editable: true,
            valueOptions: Object.values(UserStatus),
            renderCell: (params: GridRenderCellParams<string, User>) => {
                switch (params.row.status) {
                    case UserStatus.ACTIVE:
                        return <Chip label="??????" color="success" />;
                    case UserStatus.BANNED:
                        return <Chip label="??????" color="error" />;
                    case UserStatus.UNVERIFIED:
                        return <Chip label="?????????" />
                }
            },
        },
    ];

    const dialogContent = (
        <>
            <DialogTitle>??????????????????????????????</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    ??????????????????????????????????????????????????????????????????
                </DialogContentText>
            </DialogContent>
        </>
    );

    const handleRefetchReady = useCallback((newRefetch: RefetchFunction<UserOrderField>) => {
        refetch.current = newRefetch;
    }, []);

    const handleDelete = useCallback(async (selectionModel: GridInputSelectionModel) => {
        const ids = (selectionModel as GridRowId[]).map((id) => +id);
        const response = await deleteMultipleUsers({
            variables: { input: { ids } },
        });
        const updatedCount = response.data?.deleteMultipleUsers.count;
        if (updatedCount === ids.length) {
            enqueueNotification({
                variant: 'success',
                title: '?????????????????????',
                content: `????????? ${updatedCount} ????????????`,
            });
        } else if (updatedCount > 0 && updatedCount < ids.length) {
            enqueueNotification({
                variant: 'info',
                title: '????????????????????????',
                content: `????????? ${updatedCount} ?????????????????? ${ids.length - updatedCount} ????????????????????????`,
            });
        } else {
            enqueueNotification({
                variant: 'warning',
                title: '????????????????????????',
                content: '???????????????????????????',
            });
        }

        return true;
    }, [deleteMultipleUsers, enqueueNotification]);

    const handleCellEditCommit = useCallback(async (params: GridCellEditCommitParams, _event: any, details: GridCallbackDetails) => {
        try {
            const response = await updateUser({
                variables: { input: { id: params.id, [params.field]: params.value } },
            });

            const name = response.data.updateUser.name;
            const updatedValue = response.data.updateUser[params.field as keyof User];

            enqueueNotification({
                variant: 'success',
                title: '????????????????????????',
                content: `?????? ${name} ??? ${params.field} ????????? ${updatedValue}???`,
            });
        } catch (e) {
            enqueueCommonErrorNotification(e);
        }
    }, [enqueueCommonErrorNotification, enqueueNotification, updateUser]);

    // Simulate input click when import button clicked. 
    const handleImportClick = useCallback(() => {
        if (input.current) input.current.click();
    }, [input]);

    // Handle import input change and resolve csv to create users
    const handleInputChange = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        const accept = '.csv';
        if (files.length > 0) {
            const file = files[0];
            if (!matchAccept(accept, file)) {
                enqueueNotification({
                    variant: 'error',
                    title: '??????????????????',
                    content: `???????????????????????? ${accept} ????????????`,
                });
                return;
            }

            setImportLoading(true);

            const content = await file.text();
            const result = Papa.parse(content, { header: true, skipEmptyLines: 'greedy' });

            // check validity of data
            if (result.errors.length > 0) {
                enqueueNotification({
                    variant: 'error',
                    title: '??????????????????',
                    content: '???????????????????????? csv ??????',
                });
                setImportLoading(false);
                return;
            }

            const expectedFields = ['name', 'studentId', 'role'];
            const fields = result.meta.fields;
            if (fields &&
                fields.length === expectedFields.length &&
                fields.every((v, i) => v === expectedFields[i])
            ) {
                const response = await createMultipleUsers({
                    variables: {
                        input: { items: result.data },
                    },
                });
                const updatedCount = response.data?.createMultipleUsers.count;
                if (updatedCount > 0) {
                    enqueueNotification({
                        variant: 'success',
                        title: '?????????????????????',
                        content: `????????? ${updatedCount} ????????????`,
                    });
                } else {
                    enqueueNotification({
                        variant: 'info',
                        title: '????????????????????????',
                        content: '?????????????????????????????????',
                    });
                }
                
                refetch.current();
            } else {
                enqueueNotification({
                    variant: 'error',
                    title: '??????????????????',
                    content: 'csv ??????????????? name, studentId, role ?????????',
                });
            }

            setImportLoading(false);
        }
    }, [enqueueNotification, createMultipleUsers, refetch]);

    return (
        <AppLayout>
            <PageHeading title="?????????" breadcrumb="admin.users">
                <input
                    ref={input}
                    type="file"
                    accept=".csv"
                    autoComplete="off"
                    tabIndex={-1}
                    style={{ display: 'none' }}
                    onChange={handleInputChange}
                />
                <Button variant="outlined" color="primary" disabled={importLoading} onClick={handleImportClick}>
                    ???????????????
                </Button>
                <Button variant="contained" color="primary" sx={{ ml: 3 }}>
                    ???????????????
                </Button>
            </PageHeading>
            <Card sx={{ my: 6 }}>
                <ConnectionGrid
                    columns={columns}
                    connectionQuery={USER_CONNECTION}
                    queryName="user"
                    sortModelToOrder={sortModelToOrder}
                    onDelete={handleDelete}
                    deleteDialogContent={dialogContent}
                    onRefetchReady={handleRefetchReady}
                    // editing
                    onCellEditCommit={handleCellEditCommit}
                />
            </Card>
        </AppLayout>
    );
}
