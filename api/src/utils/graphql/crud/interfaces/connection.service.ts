import { ConnectionArgs } from '../../connection/argument';
import { IConnectionType } from '../../connection/type';

export interface IConnectionService<Args extends ConnectionArgs, Model> {
    getConnection: (args: Args) => Promise<IConnectionType<Model>>;
}
