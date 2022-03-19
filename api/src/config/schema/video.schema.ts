import { Type } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class VodcfsConfig {
    @IsNotEmpty()
    @IsString()
    account: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    folderId: string;
}

export class VideoConfig {
    @ValidateNested()
    @IsDefined()
    @Type(() => VodcfsConfig)
    vodcfs: VodcfsConfig;
}
