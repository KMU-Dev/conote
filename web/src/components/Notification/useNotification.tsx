import { OptionsObject, useSnackbar } from "notistack";
import { useCallback } from "react";
import { NotificationProps, Notification } from "./Notification";

export default function useNotification() {
    const { enqueueSnackbar } = useSnackbar();

    const enqueueNotification = useCallback((option: NotificationOption) => (
        // TODO: update option passing logic to prevent excess props passing to Notification
        enqueueSnackbar('', {
            ...option,
            title: undefined,
            variant: undefined,
            content: (key) => <Notification {...option} ref={undefined} snackbarKey={key} />,
        })
    ), [enqueueSnackbar]);

    return { enqueueNotification };
}

interface NotificationOption extends
    Omit<NotificationProps, 'snackbarKey'>,
    Omit<OptionsObject, 'title' |'content' | 'variant'> {}
