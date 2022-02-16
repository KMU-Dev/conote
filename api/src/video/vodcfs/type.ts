export interface VodcfsUploadVideoResponse {
    files: VodcfsUploadVideoFile[];
}

export interface VodcfsUploadVideoFile {
    oriFileName: string;
    size: number;
    type: string;
    url: string;
    thumbnail_url: string;
}
