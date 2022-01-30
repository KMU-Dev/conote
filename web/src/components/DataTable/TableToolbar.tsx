import { Box } from "@mui/material";
import { MTableToolbar } from "material-table";

export default function TableToolbar(props: any) {
    const variant: SearchFieldVariant = props.searchFieldVariant;

    if (variant === 'outlined') return (
        <Box py={2}>
            <MTableToolbar {...props} />
        </Box>
    )

    return <MTableToolbar {...props} />;
}

type SearchFieldVariant = "standard" | "filled" | "outlined";
