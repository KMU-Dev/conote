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

    return { enqueueNotification };
}

type NotificationOption = Omit<NotificationProps, 'snackbarKey'>;
