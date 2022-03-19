import { Inject, Injectable } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { SENTRY_OPTIONS } from './constant';

@Injectable()
export class SentryService {
    constructor(@Inject(SENTRY_OPTIONS) readonly options: Sentry.NodeOptions) {
        Sentry.init(options);
    }
}
