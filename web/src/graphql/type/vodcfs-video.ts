import { VideoIndex } from "./video";

export interface VodcfsVideo {
    id: number;
    title: string;
    duration?: string;
    size: number;
    streamingId?: string;
    resolutions: VodcfsVideoResolution[];
    indexes: VideoIndex[];
    status: VodcfsVideoStatus;
    createdAt: number;
}

enum VodcfsVideoResolution {
    SD = 'SD',
    HD = 'HD',
    FHD = 'FHD',
    SRC = 'SRC',
}

enum VodcfsVideoStatus {
    CONVERTING = 'CONVERTING',
    CONVERTED = 'CONVERTED',
}
