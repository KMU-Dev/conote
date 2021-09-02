import { onError } from "@apollo/client/link/error";
import { notificationHook } from "../../components/Notification";

export const errorLink = onError(({ networkError, response }) => {
    const { enqueueNotification } = notificationHook;

    if (networkError) {
        enqueueNotification({
            title: '無法連線到伺服器',
            content: '請再試一次。如果問題持續發生，請聯絡系統管理員。',
            variant: 'error',
        });
        console.log(response);
    }
});
