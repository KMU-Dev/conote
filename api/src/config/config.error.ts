import { ValidationError } from 'class-validator';

export class InvalidConfigError extends Error {
    constructor(errors: ValidationError[]) {
        super();

        let message = '';
        for (let i = 0; i < errors.length; i++) message += `${i + 1}. ${errors[i].toString()}\n`;

        this.message = message;
    }
}
