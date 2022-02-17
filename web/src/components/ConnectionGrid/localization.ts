import { GridLocaleText } from "@mui/x-data-grid";

const zhTWLocalText: Partial<GridLocaleText> = {
    // Root
    noRowsLabel: '沒有資料可供顯示',  // temp
    noResultsOverlayLabel: '查無資料。',
    errorOverlayDefaultLabel: '發生錯誤。',

    // Density selector toolbar button text
    toolbarDensity: '密度',
    toolbarDensityLabel: '密度',
    toolbarDensityCompact: '緊湊',
    toolbarDensityStandard: '標準',
    toolbarDensityComfortable: '舒適',

    // Columns selector toolbar button text
    toolbarColumns: '欄位',
    toolbarColumnsLabel: '選擇欄位',

    // Filters toolbar button text
    toolbarFilters: '篩選條件',
    toolbarFiltersLabel: '顯示篩選條件',
    toolbarFiltersTooltipHide: '隱藏篩選條件',
    toolbarFiltersTooltipShow: '顯示篩選條件',
    toolbarFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} 個啟用的篩選條件` : `${count} 個啟用的篩選條件`,

    // Export selector toolbar button text
    toolbarExport: '匯出',
    toolbarExportLabel: '匯出',
    toolbarExportCSV: '下載 CSV',
    toolbarExportPrint: '列印',

    // Columns panel text
    columnsPanelTextFieldLabel: '尋找欄位',
    columnsPanelTextFieldPlaceholder: '欄位標題',
    columnsPanelDragIconLabel: '重新排列欄位',
    columnsPanelShowAllButton: '全部顯示',
    columnsPanelHideAllButton: '全部隱藏',

    // Filter panel text
    filterPanelAddFilter: '新增篩選條件',
    filterPanelDeleteIconLabel: '刪除',
    filterPanelOperators: '運算子',
    filterPanelOperatorAnd: '與',
    filterPanelOperatorOr: '或',
    filterPanelColumns: '欄位',
    filterPanelInputLabel: '值',
    filterPanelInputPlaceholder: '篩選值',

    // Filter operators text
    filterOperatorContains: '包含',
    filterOperatorEquals: '等於',
    filterOperatorStartsWith: '開始於',
    filterOperatorEndsWith: '結束於',
    filterOperatorIs: '是',
    filterOperatorNot: '不是',
    filterOperatorAfter: '在後面',
    filterOperatorOnOrAfter: '在後面 (含)',
    filterOperatorBefore: '在前面',
    filterOperatorOnOrBefore: '在前面 (含)',
    filterOperatorIsEmpty: '為空',
    filterOperatorIsNotEmpty: '不為空',
    filterOperatorIsAnyOf: '為…之一',

    // Filter values text
    filterValueAny: '任何',
    filterValueTrue: '真',
    filterValueFalse: '假',

    // Column menu text
    columnMenuLabel: '選單',
    columnMenuShowColumns: '顯示欄位',
    columnMenuFilter: '篩選條件',
    columnMenuHideColumn: '隱藏',
    columnMenuUnsort: '恢復排序',
    columnMenuSortAsc: '升冪排序',
    columnMenuSortDesc: '降冪排序',

    // Column header text
    columnHeaderFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} 個啟用的篩選條件` : `${count} 個啟用的篩選條件`,
    columnHeaderFiltersLabel: '顯示篩選條件',
    columnHeaderSortIconLabel: '排序',

    // Rows selected footer text
    footerRowSelected: (count) => `已選取 ${count.toLocaleString()} 行`,

    // Total rows footer text
    footerTotalRows: '總行數：',

    // Total visible rows footer text
    footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${totalCount.toLocaleString()} 行中的 ${visibleCount.toLocaleString()} 行`,

    // Checkbox selection text
    checkboxSelectionHeaderName: '和曲方塊',

    // Boolean cell text
    booleanCellTrueLabel: '真',
    booleanCellFalseLabel: '假',

    // Actions cell more text
    actionsCellMore: '更多',

    // Column pinning text
    pinToLeft: '釘選到左側',
    pinToRight: '釘選到右側',
    unpin: '取消釘選',

    // Tree Data
    treeDataGroupingHeaderName: '群組',
    treeDataExpand: '顯示成員',
    treeDataCollapse: '隱藏成員',

    // Grouping columns
    groupingColumnHeaderName: '群組',
    groupColumn: (name) => `以 ${name} 組成群組`,
    unGroupColumn: (name) => `以 ${name} 取消群組`,

    // Master/detail
    expandDetailPanel: '展開',
    collapseDetailPanel: '摺疊',

    // Used core components translation keys
    MuiTablePagination: {
        labelRowsPerPage: '每頁行數: ',
        labelDisplayedRows: ({ from, to , count }) => 
            `第 ${from} 筆到第 ${to} 筆，共 ${count} 筆`,
    },
};

export const zhTW = {
    components: {
        MuiDataGrid: {
            defaultProps: {
                localeText: zhTWLocalText,
            },
        },
    },
};
