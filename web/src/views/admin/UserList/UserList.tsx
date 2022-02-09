import { useMutation, useQuery } from "@apollo/client";
import { alpha, Avatar, Box, Button, Card, Chip, Typography } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridCellEditCommitParams, GridColDef, GridInputSelectionModel, GridPreProcessEditCellProps, GridRenderCellParams, GridRowId, GridSortModel, GridValueFormatterParams } from "@mui/x-data-grid";
import Papa from 'papaparse';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import AppLayout from "../../../components/AppLayout/AppLayout";
import ConnectionGridToolbar from "../../../components/ConnectionGrid/ConnectionGridToolbar";
import { useNotification } from "../../../components/Notification";
import PageHeading from "../../../components/PageHeading/PageHeading";
import { CREATE_MULTIPLE_USERS, DELETE_MULTIPLE_USERS, UPDATE_USER_LIST } from "../../../graphql/mutations/user";
import { USER_CONNECTION } from "../../../graphql/queries/user";
import { BatchPayload } from "../../../graphql/type/BatchPayload";
import { Connection, GraphqlDto, OrderDirection } from "../../../graphql/type/type";
import { User, UserConnectionArgs, UserOrder, UserOrderField, UserRole, UserStatus } from "../../../graphql/type/user";
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
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [selectionModel, setSelectionModel] = useState<GridInputSelectionModel>([]);
    const [search, setSearch] = useState('');
    const [importLoading, setImportLoading] = useState(false);
    const [connectionArgs, setConnectionArgs] = useState<UserConnectionArgs>({ first: pageSize });
    const input = useRef<HTMLInputElement>(null);
    const prevSelectionModel = useRef<GridInputSelectionModel>(selectionModel);

    const { data, networkStatus, refetch } = useQuery<GraphqlDto<'user', Connection<User>>>(
        USER_CONNECTION,
        { variables: connectionArgs, fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true },
    );
    const [createMultipleUsers] = useMutation<GraphqlDto<'createMultipleUsers', BatchPayload>>(CREATE_MULTIPLE_USERS);
    const [updateUser] = useMutation<GraphqlDto<'updateUser', User>>(UPDATE_USER_LIST);
    const [deleteMultipleUsers] = useMutation<GraphqlDto<'deleteMultipleUsers', BatchPayload>>(DELETE_MULTIPLE_USERS);
    const { enqueueNotification, enqueueCommonErrorNotification } = useNotification();

    // restore selection model when changing page
    useEffect(() => {
        setTimeout(() => setSelectionModel(prevSelectionModel.current));
    }, [page]);

    // data map types
    const users = useMemo(
        () => data && data.user ? data.user.edges.map((edge) => ({ ...edge.node })) : [],
        [data],
    );
    const count = data && data.user ? data.user.count : 0;
    const baseVariable: UserConnectionArgs = useMemo(() => ({
        first: undefined,
        after: undefined,
        last: undefined,
        before: undefined,
        query: search ? search : undefined,
        order: sortModelToOrder(sortModel),
    }), [search, sortModel]);

    // table definitions
    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: '名字',
            flex: 1,
            minWidth: 140,
            editable: true,
            renderCell: (params: GridRenderCellParams<string, User>) => (
                <Box display="flex" alignItems="center">
                    <Avatar src={params.row.picture}>{!params.row.picture && params.row.name.charAt(0)}</Avatar>
                    <Typography variant="subtitle1" ml={2}>{params.row.name}</Typography>
                </Box>
            ),
            preProcessEditCellProps: (params: GridPreProcessEditCellProps) => validate(params, 'name'),
        },
        { field: 'studentId', headerName: '學號', flex: 1, minWidth: 110 },
        { field: 'email', headerName: 'Email', flex: 2, minWidth: 225 },
        {
            field: 'role',
            headerName: '角色',
            type: 'singleSelect',
            flex: 1,
            minWidth: 100,
            editable: true,
            valueOptions: Object.values(UserRole),
            valueFormatter: (params: GridValueFormatterParams) => {
                switch (params.value) {
                    case UserRole.ADMIN:
                        return '系統管理員';
                    case UserRole.USER:
                        return '使用者';
                }
            },
        },
        {
            field: 'status',
            headerName: '狀態',
            type: 'singleSelect',
            flex: 1,
            minWidth: 100,
            editable: true,
            valueOptions: Object.values(UserStatus),
            renderCell: (params: GridRenderCellParams<string, User>) => {
                switch (params.row.status) {
                    case UserStatus.ACTIVE:
                        return <Chip label="活躍" color="success" />;
                    case UserStatus.BANNED:
                        return <Chip label="封鎖" color="error" />;
                    case UserStatus.UNVERIFIED:
                        return <Chip label="未驗證" />
                }
            },
        },
    ];

    const handlePageSizeChange = useCallback((pageSize: number) => {
        setPage(0);
        setPageSize(pageSize);
        setConnectionArgs({ ...baseVariable, ...{ first: pageSize }});
    }, [baseVariable]);

    const handlePageChange = useCallback(async (newPage: number) => {
        if (newPage - page === 1) {
            // next page
            const cursor = data?.user.pageInfo.endCursor;
            setPage(newPage);
            setConnectionArgs({ ...baseVariable, ...{ first: pageSize, after: cursor }});
        } else if (newPage - page === -1) {
            // previous page
            const cursor = data?.user.pageInfo.startCursor;
            setPage(newPage);
            setConnectionArgs({ ...baseVariable, ...{ last: pageSize, before: cursor }});
        }
        prevSelectionModel.current = selectionModel;
    }, [page, data, baseVariable, pageSize, prevSelectionModel, selectionModel]);

    const handleSearchChange = useCallback((search: string) => {
        if (search) setConnectionArgs({...baseVariable, ...{ first: pageSize, query: search }});
        else setConnectionArgs({...baseVariable, ...{ first: pageSize, query: undefined }});

        setSearch(search);
        setPage(0);
    }, [baseVariable, pageSize]);

    const handleSortModelChange = useCallback((newModel: GridSortModel) => {
        setSortModel(newModel);
        setPage(0);
        setConnectionArgs({ ...baseVariable, ...{ first: pageSize, order: sortModelToOrder(newModel)}});
    }, [baseVariable, pageSize]);

    const handleSelectionModelChange = useCallback((newSelectionModel: GridInputSelectionModel) => {
        setSelectionModel(newSelectionModel);
    }, []);

    const handleDeleteClick = useCallback(async () => {
        const ids = (selectionModel as GridRowId[]).map((id) => +id);
        const response = await deleteMultipleUsers({
            variables: { input: { ids } },
        });
        const updatedCount = response.data?.deleteMultipleUsers.count;
        if (updatedCount === ids.length) {
            enqueueNotification({
                variant: 'success',
                title: '成功刪除使用者',
                content: `已刪除 ${updatedCount} 筆資料。`,
            });
        } else if (updatedCount > 0 && updatedCount < ids.length) {
            enqueueNotification({
                variant: 'info',
                title: '已刪除部分使用者',
                content: `已刪除 ${updatedCount} 筆資料，其餘 ${ids.length - updatedCount} 筆使用者不存在。`,
            });
        } else {
            enqueueNotification({
                variant: 'warning',
                title: '未刪除任何使用者',
                content: '所選使用者皆不存在',
            });
        }

        // clean all selections
        setSelectionModel([]);
        prevSelectionModel.current = [];

        await refetch({...baseVariable, ...{ first: pageSize }});
        setConnectionArgs({...baseVariable, ...{ first: pageSize}});
        setPage(0);
    }, [baseVariable, deleteMultipleUsers, enqueueNotification, pageSize, refetch, selectionModel]);

    const handleCellEditCommit = useCallback(async (params: GridCellEditCommitParams, _event, details: GridCallbackDetails) => {
        try {
            const response = await updateUser({
                variables: { input: { id: params.id, [params.field]: params.value } },
            });

            const name = response.data.updateUser.name;
            const updatedValue = response.data.updateUser[params.field as keyof User];

            enqueueNotification({
                variant: 'success',
                title: '使用者資料已更新',
                content: `已將${name}的 ${params.field} 更新成 ${updatedValue}。`,
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
                    title: '檔案格式錯誤',
                    content: `你只能匯入格式為 ${accept} 的檔案。`,
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
                    title: '檔案格式錯誤',
                    content: '請提供格式正確的 csv 檔。',
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
                        title: '成功匯入使用者',
                        content: `已匯入 ${updatedCount} 筆資料。`,
                    });
                } else {
                    enqueueNotification({
                        variant: 'info',
                        title: '未更新使用者資料',
                        content: '匯入的使用者皆已存在。',
                    });
                }
                
                await refetch({...baseVariable, ...{ first: pageSize }});
                setPage(0);
                setConnectionArgs({...baseVariable, ...{ first: pageSize}});
            } else {
                enqueueNotification({
                    variant: 'error',
                    title: '缺少必填欄位',
                    content: 'csv 檔必須包含 name, studentId, role 欄位。',
                });
            }

            setImportLoading(false);
        }
    }, [enqueueNotification, createMultipleUsers, refetch, pageSize, baseVariable]);

    return (
        <AppLayout>
            <PageHeading title="使用者" breadcrumb="admin.users">
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
                    匯入使用者
                </Button>
                <Button variant="contained" color="primary" sx={{ ml: 3 }}>
                    新增使用者
                </Button>
            </PageHeading>
            <Card sx={{ my: 6 }}>
                <DataGrid
                    columns={columns}
                    rows={users}
                    autoHeight
                    density="comfortable"
                    disableColumnMenu
                    // pagination
                    rowsPerPageOptions={[10, 50]}
                    pageSize={pageSize}
                    onPageSizeChange={handlePageSizeChange}
                    paginationMode="server"
                    rowCount={count}
                    page={page}
                    onPageChange={handlePageChange}
                    // sorting
                    sortingMode="server"
                    sortModel={sortModel}
                    onSortModelChange={handleSortModelChange}
                    // selecting
                    checkboxSelection
                    disableSelectionOnClick
                    selectionModel={selectionModel}
                    onSelectionModelChange={handleSelectionModelChange}
                    // editing
                    onCellEditCommit={handleCellEditCommit}
                    loading={networkStatus < 7}
                    components={{ Toolbar: ConnectionGridToolbar }}
                    componentsProps={{
                        toolbar: {
                            numSelected: (selectionModel as GridRowId[]).length,
                            onDeleteClick: handleDeleteClick,
                            onSearchChange: handleSearchChange,
                            debounceInterval: 250,
                        }
                    }}
                    sx={{
                        '& .MuiDataGrid-cell--editing .MuiInputBase-root': {
                            height: 1,
                        },
                        '& .Mui-error': {
                            bgcolor: (theme) => alpha(theme.palette.error.main, 0.1),
                            color: 'error.main',
                        },
                    }}
                />
            </Card>
        </AppLayout>
    );
}
