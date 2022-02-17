import { Type } from "class-transformer";
import { IsNotEmpty, MaxLength } from "class-validator";

export class UploadVideoForm {
    @IsNotEmpty({ message: '標題為必填欄位' })
    @MaxLength(128, { message: '標題不可超過 $constraint1 個字元' })
    title?: string;

    @Type(() => String)
    video?: FileList;

    @IsNotEmpty({ message: '驗證碼為必填欄位' })
    captchaAnswer?: string;
}
