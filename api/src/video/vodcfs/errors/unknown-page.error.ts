import { AxiosResponse } from 'axios';

export default class UnknownPageError extends Error {
    constructor(private readonly response: AxiosResponse) {
        super(`[${response.config.method}] ${response.config.url} doesn't respond known value.`);
    }
}
