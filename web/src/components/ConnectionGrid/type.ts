import { ConnectionArgs } from "../../graphql/type/type";

export type RefetchFunction<TOrderField extends string> = (args?: ConnectionArgs<TOrderField>) => void;