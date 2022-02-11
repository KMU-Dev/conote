import { OperationVariables, QueryHookOptions, useQuery } from "@apollo/client";
import { UI_STATUS } from "../queries/uiStatus";
import { GraphqlDto } from "../type/type";
import { UIStatus } from "../type/UIStatus";

export function useUIStatus(options?: QueryHookOptions<GraphqlDto<'uiStatus', UIStatus>, OperationVariables>) {
    const result = useQuery(UI_STATUS, options);
    const uiStatus = result.data?.uiStatus;
    const user = uiStatus?.user;
    return { ...result, uiStatus, user };
}
