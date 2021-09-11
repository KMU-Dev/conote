import { OptionsObject, useSnackbar } from "notistack";
import { useCallback } from "react";
import { NotificationProps, Notification } from "./Notification";

export default function useNotification() {
    const { enqueueSnackbar } = useSnackbar();

    const enqueueNotification = useCallback((option: NotificationOption, snackbarOptions?: OptionsObject) => (
        enqueueSnackbar('', {
            ...snackbarOptions,
            content: (key) => <Notification {...option} snackbarKey={key} />,
        })
    ), [enqueueSnackbar]);

    const enqueueUnknownErrorNotification = useCallback(() =>
        enqueueNotification({
            title: '未知錯誤',
            content: '如果錯誤持續發生，請聯絡系統管理員',
            variant: 'error',
        })
    , [enqueueNotification]);

    return { enqueueNotification, enqueueUnknownErrorNotification };
}

type NotificationOption = Omit<NotificationProps, 'snackbarKey'>;
