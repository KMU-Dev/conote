import { Box, InputLabel, SxProps, Theme, Typography } from "@mui/material";
import { DragEvent, useState, MouseEvent, useRef } from "react";
import { useNotification } from "../Notification";
import { matchAccept } from "../../utils/file";


export default function FileInput(props: FileInputProps) {
    const { id, image, label, required, accept, multiple, sx } = props;

    const [drag, setDrag] = useState(0);
    const input = useRef<HTMLInputElement>(null);
    const { enqueueNotification } = useNotification();

    const handleClick = (_e: MouseEvent<HTMLElement>) => {
        if (input.current) input.current.click();
    }

    const handleDragOver = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
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
        e.preventDefault();
        setDrag(0);
        if (input.current) {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                const firstDropedFile = files[0];
                const accept = input.current.accept;

                if (matchAccept(accept, firstDropedFile)) {
                    input.current.files = files;
                } else {
                    enqueueNotification({
                        variant: 'error',
                        title: '檔案格式錯誤',
                        content: `你只能拖曳符合 ${accept} 的檔案。`,
                    })
                }
            }
        }
    }

    return (
        <Box sx={sx}>
            {label ?
                <InputLabel
                    htmlFor={id}
                    color="primary"
                    required={required}
                    sx={{
                        color: 'text.primary',
                        fontSize: 'body2.fontSize',
                        mb: 2,
                    }}
                >
                    {label}
                </InputLabel> : ''
            }
            <Box
                tabIndex={0}
                sx={[
                    {
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        p: 12,
                        outline: 'none',
                        border: 1,
                        borderColor: 'action.disabled',
                        borderRadius: 4,
                        '&:hover': {
                            cursor: 'pointer',
                            bgcolor: 'action.hover',
                            opacity: 0.5,
                        },
                    },
                    drag > 0 && {
                        bgcolor: 'action.hover',
                        opacity: 0.5,
                    },
                ]}
                onClick={handleClick}
                onDragOver={handleDragOver}
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
                <Box display="flex" flexDirection="column" justifyContent="center" p={6}>
                    <Typography variant="h6" fontWeight="bold">拖曳或選擇檔案</Typography>
                    <Typography variant="subtitle2" color="textSecondary" mt={2}>
                        拖曳檔案或點擊這裡從電腦
                        <Box component="span" color="primary.main" style={{ textDecoration: 'underline' }}>瀏覽</Box>
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
    sx?: SxProps<Theme>;
}
