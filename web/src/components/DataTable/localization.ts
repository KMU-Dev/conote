import { Localization } from "material-table";

export const localization: Localization = {
    body: {
        emptyDataSourceMessage: '沒有資料可供顯示',
        addTooltip: '新增',
        deleteTooltip: '刪除',
        editTooltip: '編輯',
        filterRow: {
            // ignore filterPlaceHolder
            filterTooltip: '篩選',
        },
        editRow: {
            deleteText: '你確定要刪除這行嗎？',
            cancelTooltip: '取消',
            saveTooltip: '儲存',
        },
    },
    grouping: {
        placeholder: '拖曳欄位',
        groupedBy: '群組：'
    },
    header: {
        actions: '',
    },
    pagination: {
        labelDisplayedRows: '{count} 筆中的第 {from} - {to} 筆',
        labelRowsSelect: '筆',
        labelRowsPerPage: '每頁列數：',
        firstAriaLabel: '第一頁',
        firstTooltip: '第一頁',
        previousAriaLabel: '上一頁',
        previousTooltip: '上一頁',
        nextAriaLabel: '下一頁',
        nextTooltip: '下一頁',
        lastAriaLabel: '最後頁',
        lastTooltip: '最後頁',
    },
    toolbar: {
        addRemoveColumns: '新增或刪除行',
        nRowsSelected: '已選擇 {0} 筆',
        showColumnsTitle: '顯示列',
        showColumnsAriaLabel: '顯示列',
        exportTitle: '匯出',
        exportAriaLabel: '匯出',
        exportCSVName: '以 CSV 檔匯出',
        exportPDFName: '以 PDF 檔匯出',
        searchTooltip: '搜尋',
        searchPlaceholder: '搜尋',
        clearSearchAriaLabel: '清除搜尋',
    },
}
