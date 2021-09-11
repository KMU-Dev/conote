import { Injectable, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

const defaultOptions: ValidationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
};

@Injectable()
export class DefaultValidationPipe extends ValidationPipe {
    constructor(options?: ValidationPipeOptions) {
        super({ ...defaultOptions, ...options });
    }
}
