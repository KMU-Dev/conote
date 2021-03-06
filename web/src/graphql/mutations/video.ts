import { gql } from "@apollo/client";

export const UPLOAD_VIDEO = gql`
    mutation UploadVideo($vodcfsInput: UploadVodcfsVideoInput!) {
        uploadVideo(vodcfsInput: $vodcfsInput) {
            id
            title
            vodcfsVideo {
                id
                status
                errorReason
            }
        }
    }
`;
