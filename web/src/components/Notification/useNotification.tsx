import { ApolloError } from "@apollo/client";
import { GraphQLError } from "graphql";
import { OptionsObject, useSnackbar } from "notistack";
import { useCallback } from "react";
import { BadUserInputExtensions } from "../../graphql/type/error";
import { Notification, NotificationProps } from "./Notification";

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

    const enqueueBadUserInputNotification = useCallback((e: GraphQLError) => {
        const response = (e.extensions as BadUserInputExtensions).response;
        let content = '';
        if (response.message.length === 1) content = response.message[0];
        else {
            for (let i = 0; i < response.message.length; i++) content += `${i + 1}. ${response.message[i]}\n`;
        }

        return enqueueNotification({
            title: '輸入資料錯誤',
            content,
            variant: 'error',
        });
    }, [enqueueNotification]);

    const enqueueCommonErrorNotification = useCallback((e: unknown) => {
        if (e instanceof ApolloError && e.graphQLErrors && e.graphQLErrors.length > 0) {
           for (const error of e.graphQLErrors) {
               switch (error.extensions.code) {
                    case 'BAD_USER_INPUT':
                       return enqueueBadUserInputNotification(error);
                    case 'INTERNAL_SERVER_ERROR':
                        return enqueueUnknownErrorNotification();
               }
           }
        }
    }, [enqueueBadUserInputNotification, enqueueUnknownErrorNotification]);

    return { enqueueNotification, enqueueUnknownErrorNotification, enqueueBadUserInputNotification, enqueueCommonErrorNotification };
}

type NotificationOption = Omit<NotificationProps, 'snackbarKey'>;
