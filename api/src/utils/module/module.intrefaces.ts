import { InjectionToken, ModuleMetadata, OptionalFactoryDependency } from '@nestjs/common';

export interface ModuleAsyncOptions<T> extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => Promise<T> | T;
    inject?: Array<InjectionToken | OptionalFactoryDependency>;
}
