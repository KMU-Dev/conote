import useNotification from "./useNotification";

let notificationHook: ReturnType<typeof useNotification>;

export function NotificationConfigurator() {
    notificationHook = useNotification();
    return <></>;
}

export { notificationHook };
