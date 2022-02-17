import { User } from "./user";
import { VodcfsVideo } from "./vodcfs-video";

export interface UploadVodcfsVideoInput {
    title: string;
    file: File;
    sessionId: string;
}

export interface Video {
    id: number;
    title: string;
    thumbnail?: string;
    duration?: string;
    indexes: VideoIndex[];
    uploadService: VideoUploadService;
    vodcfsVideo?: VodcfsVideo;
    user: User;
    createdAt: number;
    updatedAt: number;
}

export interface VideoIndex {
    id: number;
    title: string;
    time: number;
}

export enum VideoUploadService {
    VODCFS = 'VODCFS',
}
