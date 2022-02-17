import { User } from './user';

export interface VodcfsSession {
    id: string;
    user: User
    status: VodcfsSessionStatus;
    captcha: string;
    captchaAnswer?: string
    errorReason?: string
    createdAt: number;
}

export enum VodcfsSessionStatus {
    CREATING = 'CREATING',
    AUTHENTICATED = 'AUTHENTICATED',
    ERROR = 'ERROR',
}
