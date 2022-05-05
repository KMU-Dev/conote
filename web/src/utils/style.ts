import { SxProps, Theme } from '@mui/material/styles';

export function csx<T extends Theme>(...sxes: SxProps<T>[]): SxProps<T> {
    let sx: any[] = [];
    for (const sxItem of sxes) {
        if (sxItem) sx.push(sxItem);
    }
    return sx;
}
