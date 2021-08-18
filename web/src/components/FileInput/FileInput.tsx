import clsx from "clsx";
import { Box, createStyles, InputLabel, makeStyles, Typography } from "@material-ui/core";
import { DragEvent, useState } from "react";
import { MouseEvent } from "react";
import { useRef } from "react";

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            padding: theme.spacing(12),
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            outline: 'none',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: theme.spacing(4),
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: theme.palette.action.hover,
                opacity: 0.5,
            },
        },
        rootDrag: {
            backgroundColor: theme.palette.action.hover,
            opacity: 0.5,
        },
        label: {
            color: theme.palette.text.primary,
            fontSize: theme.typography.body2.fontSize,
            marginBottom: theme.spacing(2),
        },
        input: {
            display: 'none',
        },
        innerBox: {
            padding: theme.spacing(6),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        title: {
            fontWeight: 'bold',
        },
        subtitle: {
            marginTop: theme.spacing(2),
        },
        subtitleSpan: {
            color: theme.palette.primary.main,
            textDecoration: 'underline',
        },
    }),
)

export default function FileInput(props: FileInputProps) {
    const { id, image, label, required, accept, multiple, className } = props;
    const classes = useStyles();

    const [drag, setDrag] = useState(0);
    const input = useRef<HTMLInputElement>(null);

    const handleClick = (_e: MouseEvent<HTMLElement>) => {
        if (input.current) input.current.click();
    }
    
    const handleDragEnter = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        setDrag(drag + 1);
    }

    const handleDragLeave = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        setDrag(drag - 1);
    }

    const handleDrop = (e: DragEvent<HTMLElement>) => {
        setDrag(0);
        if (input.current) input.current.files = e.dataTransfer.files;
    }

    return (
        <Box className={className}>
            {label ?
                <InputLabel
                    htmlFor={id}
                    color="primary"
                    required={required}
                    className={classes.label}
                >
                    {label}
                </InputLabel> : ''
            }
            <Box
                className={clsx(classes.root, drag > 0 && classes.rootDrag)}
                tabIndex={0}
                onClick={handleClick}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <input
                    id={id}
                    ref={input}
                    type="file"
                    accept={accept}
                    multiple={multiple} 
                    autoComplete="off"
                    tabIndex={-1}
                    style={{ display: 'none' }}
                />
                <img src={image} alt="Select file" width="220px" />
                <Box className={classes.innerBox}>
                    <Typography variant="h6" className={classes.title}>拖曳或選擇檔案</Typography>
                    <Typography variant="subtitle2" color="textSecondary" className={classes.subtitle}>
                        拖曳檔案或點擊這裡從電腦
                        <span className={classes.subtitleSpan}>瀏覽</span>
                        檔案
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}

interface FileInputProps {
    id: string;
    image: string;
    label?: string;
    required?: boolean;
    accept?: string;
    multiple?: boolean;
    className?: string;
}
