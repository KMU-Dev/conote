import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsInt, IsOptional, ValidateNested } from 'class-validator';

export class GraphQLUploadConfig {
    @IsOptional()
    @IsInt()
    maxFieldSize?: number;

    @IsOptional()
    @IsInt()
    maxFileSize?: number;

    @IsOptional()
    @IsInt()
    maxFiles?: number;
}

export class GraphQLConfig {
    @ValidateNested()
    @IsOptional()
    @Type(() => GraphQLUploadConfig)
    upload?: GraphQLUploadConfig;

    @IsDefined()
    @IsBoolean()
    debug: boolean;

    @IsDefined()
    @IsBoolean()
    playground: boolean;
}
