import { User } from './user';

export interface VodcfsSession {
    id: string;
    user: User
    status: VodcfsSessionStatus;
    captcha: string;
    captchaAnswer?: string
    errorReason?: VodcfsSessionErrorReason;
    createdAt: number;
}

export enum VodcfsSessionStatus {
    CREATING = 'CREATING',
    AUTHENTICATED = 'AUTHENTICATED',
    ERROR = 'ERROR',
}

export enum VodcfsSessionErrorReason {
    INVALID_CAPTCHA = 'INVALID_CAPTCHA',
    INVALID_ACCOUNT = 'INVALID_ACCOUNT',
    UNKNOWN = 'UNKNOWN',
}
