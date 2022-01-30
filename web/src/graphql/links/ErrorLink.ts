import { onError } from "@apollo/client/link/error";
import { GraphQLError } from "graphql";
import { notificationHook } from "../../components/Notification";

export const errorLink = onError(({ networkError, response }) => {
    const { enqueueNotification } = notificationHook;

    if (networkError) {
        enqueueNotification({
            title: '無法連線到伺服器',
            content: '請再試一次。如果問題持續發生，請聯絡系統管理員。',
            variant: 'error',
        });
        return;
    }
    
    const remainedErrors: GraphQLError[] = [];
    for (const error of response.errors) {
        switch (error.extensions.code) {
            case 'FORBIDDEN':
                enqueueNotification({
                    title: '權限不足',
                    content: '如果這是項錯誤，請聯絡系統管理員。',
                    variant: 'error',
                });
                break;
            default:
                remainedErrors.push(error);
        }
    }
    response.errors = remainedErrors.length > 0 ? remainedErrors : null;
});
