import Grid from "@mui/material/Grid";
import { ReactNode } from "react";

interface PoliciesCardTermsProps {
    children?: ReactNode;
}

export default function PoliciesCardTerms(props: PoliciesCardTermsProps) {
    const { children } = props;

    return (
        <Grid
            item
            xs={12}
            md={9}
            sx={{
                '& > h6': {
                    mx: 0,
                    mt: 0,
                    mb: { xs: 2, sm: 3, md: 4 },
                    fontSize: 'h6.fontSize',
                    fontFamily: 'h6.fontFamily',
                    lineHeight: 1.6,
                    fontWeight: 'h6.fontWeight',
                },
                '& > p': {
                    mt: 0,
                    mb: 8,
                    color: 'text.secondary',
                    fontSize: 'body1.fontSize',
                    fontFamily: 'body1.fontFamily',
                    lineHeight: 1.5,
                    fontWeight: 'body1.fontWeight',
                },
                '& > p:last-child': {
                    mb: 0,
                },
                '& > ul': {
                    mt: 0,
                    mb: 8,
                },
                '& > ul:last-child': {
                    mb: 0,
                },
                '& li': {
                    mb: 1,
                    color: 'text.secondary',
                    fontSize: 'body1.fontSize',
                    fontFamily: 'body1.fontFamily',
                    lineHeight: 1.5,
                    fontWeight: 'body1.fontWeight',
                },
            }}
        >
            {children}
        </Grid>
    )
}