import MaterialTable, { MaterialTableProps } from "material-table";
import { tableIcons } from "./icons";
import { localization } from "./localization";

export default function DataTable<T extends object>(props: DataTableProps<T>) {
    const { options, ...restProps } = props;
    
    return (
        <MaterialTable
            icons={tableIcons}
            localization={localization}
            options={options}
            {...restProps}
        />
    );
}

interface DataTableProps<T extends object> extends MaterialTableProps<T> {}
