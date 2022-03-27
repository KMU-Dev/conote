import { VideoIndex } from "./video";

export interface VodcfsVideo {
    id: number;
    title: string;
    duration?: string;
    size: number;
    streamingId?: string;
    resolutions: VodcfsVideoResolution[];
    indexes: VideoIndex[];
    errorReason?: VodcfsVideoErrorReason;
    status: VodcfsVideoStatus;
    createdAt: number;
}

export enum VodcfsVideoResolution {
    SD = 'SD',
    HD = 'HD',
    FHD = 'FHD',
    SRC = 'SRC',
}

export enum VodcfsVideoErrorReason {
    MALFORMED_EVERCAM = 'MALFORMED_EVERCAM',
}

export enum VodcfsVideoStatus {
    CONVERTING = 'CONVERTING',
    CONVERTED = 'CONVERTED',
    ERROR = 'ERROR',
}
