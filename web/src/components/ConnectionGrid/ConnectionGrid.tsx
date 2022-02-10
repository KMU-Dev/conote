import { TypedDocumentNode, useQuery } from "@apollo/client";
import { alpha, Button, Dialog, DialogActions } from "@mui/material";
import { DataGrid, DataGridProps, GridInputSelectionModel, GridRowId, GridSortModel } from "@mui/x-data-grid";
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Connection, ConnectionArgs, ConnectionOrder, GraphqlDto } from "../../graphql/type/type";
import { PartialBy } from '../../utils/types';
import ConnectionGridToolbar from "./ConnectionGridToolbar";
import { RefetchFunction } from "./type";

type ConnectionGridProps<TData, TOrderField extends string> = PartialBy<DataGridProps, 'rows'> & {
    connectionQuery: TypedDocumentNode<GraphqlDto<string, Connection<TData>>, ConnectionArgs<TOrderField>>;
    queryName: string;
    sortModelToOrder: (sortModel: GridSortModel) => ConnectionOrder<TOrderField>;
    searchText?: string;
    debounceInterval?: number;
    /**
     * Callback fired when delete button clicked
     * @returns a promise that resolves boolean indicating whether refetch is required
     */
    onDelete: (selectionModel: GridInputSelectionModel) => Promise<boolean>;
    deleteDialogContent: ReactNode;
    onRefetchReady?: (refetch: RefetchFunction<TOrderField>) => void;
};

export default function ConnectionGrid<TData, TOrderField extends string>(props: ConnectionGridProps<TData, TOrderField>) {
    const { connectionQuery, queryName, sortModelToOrder, searchText, debounceInterval, onDelete, deleteDialogContent, onRefetchReady, ...gridProps } = props;

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [sortModel, setSortModel] = useState<GridSortModel>([]);
    const [selectionModel, setSelectionModel] = useState<GridInputSelectionModel>([]);
    const [search, setSearch] = useState('');
    const [connectionArgs, setConnectionArgs] = useState<ConnectionArgs<TOrderField>>({ first: pageSize });
    const [dialogOpen, setDialogOpen] = useState(false);
    const prevSelectionModel = useRef<GridInputSelectionModel>(selectionModel);

    // apollo client hooks
    const { data, networkStatus, refetch } = useQuery(
        connectionQuery, 
        { variables: connectionArgs, fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true },
    );

    const baseVariable: ConnectionArgs<TOrderField> = useMemo(() => ({
        first: undefined,
        after: undefined,
        last: undefined,
        before: undefined,
        query: search ? search : undefined,
        order: sortModelToOrder(sortModel),
    }), [search, sortModel, sortModelToOrder]);

    // custom refetch function
    const customRefetch = useCallback(async (variables) => {
        const args: ConnectionArgs<TOrderField> = variables ?
            { ...baseVariable, ...variables } : { ...baseVariable, ...{ first: pageSize } };
        setPage(0);
        setConnectionArgs(args);
        if (!(connectionArgs.after && connectionArgs.before && connectionArgs.query && connectionArgs.order)) {
            await refetch(args);
        }
    }, [baseVariable, connectionArgs.after, connectionArgs.before, connectionArgs.order, connectionArgs.query, pageSize, refetch]);

    useEffect(() => {
        onRefetchReady(customRefetch);
    }, [customRefetch, onRefetchReady]);

    // restore selection model when changing page
    useEffect(() => {
        setTimeout(() => setSelectionModel(prevSelectionModel.current));
    }, [page, data]);

    // data map types
    const rows = useMemo(
        () => data && data[queryName] ? data[queryName].edges.map((edge) => ({ ...edge.node })) : [],
        [data, queryName],
    );
    const count = data && data[queryName] ? data[queryName].count : 0;

    const handlePageSizeChange = useCallback((pageSize: number) => {
        setPage(0);
        setPageSize(pageSize);
        setConnectionArgs({ ...baseVariable, ...{ first: pageSize }});
    }, [baseVariable]);

    const handlePageChange = useCallback(async (newPage: number) => {
        if (newPage - page === 1) {
            // next page
            const cursor = data[queryName].pageInfo.endCursor;
            setPage(newPage);
            setConnectionArgs({ ...baseVariable, ...{ first: pageSize, after: cursor }});
        } else if (newPage - page === -1) {
            // previous page
            const cursor = data[queryName].pageInfo.startCursor;
            setPage(newPage);
            setConnectionArgs({ ...baseVariable, ...{ last: pageSize, before: cursor }});
        }
        prevSelectionModel.current = selectionModel;
    }, [page, selectionModel, data, queryName, baseVariable, pageSize]);

    const handleSortModelChange = useCallback((newModel: GridSortModel) => {
        setSortModel(newModel);
        setPage(0);
        setConnectionArgs({ ...baseVariable, ...{ first: pageSize, order: sortModelToOrder(newModel) }});
    }, [baseVariable, pageSize, sortModelToOrder]);

    const handleSelectionModelChange = useCallback((newSelectionModel: GridInputSelectionModel) => {
        setSelectionModel(newSelectionModel);
    }, []);

    const handleSearchChange = useCallback((search: string) => {
        if (search) setConnectionArgs({...baseVariable, ...{ first: pageSize, query: search }});
        else setConnectionArgs({...baseVariable, ...{ first: pageSize, query: undefined }});

        setSearch(search);
        setPage(0);
    }, [baseVariable, pageSize]);

    const handleDeleteClick = useCallback(async () => {
        setDialogOpen(true);
    }, []);

    const handleDeleteConfirm = useCallback(async () => {
        setDialogOpen(false);
        const shouldRefetch = await onDelete(selectionModel);

        // clean all selections
        setSelectionModel([]);
        prevSelectionModel.current = [];

        if (shouldRefetch) {
            setConnectionArgs({...baseVariable, ...{ first: pageSize}});
            setPage(0);
        }
    }, [baseVariable, onDelete, pageSize, selectionModel])

    const handleDialogClose = useCallback(() => {
        setDialogOpen(false);
    }, []);

    return (
        <>
            <DataGrid
                rows={rows}
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
                // miscellaneous
                loading={networkStatus < 7}
                components={{ Toolbar: ConnectionGridToolbar }}
                componentsProps={{
                    toolbar: {
                        numSelected: (selectionModel as GridRowId[]).length,
                        onDeleteClick: handleDeleteClick,
                        search: searchText,
                        onSearchChange: handleSearchChange,
                        debounceInterval: debounceInterval ?? 250,
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
                {...gridProps}
            />
            <Dialog open={dialogOpen} onClose={handleDialogClose}>
                {deleteDialogContent}
                <DialogActions>
                    <Button color="inherit" sx={{ color: 'text.secondary' }} onClick={handleDialogClose}>取消</Button>
                    <Button color="error" onClick={handleDeleteConfirm}>刪除</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}