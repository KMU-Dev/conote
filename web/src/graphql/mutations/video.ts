import { AxiosRequestConfig } from "axios";
import { accessToken } from "../links/authLink";
import { UploadVodcfsVideoInput } from "../type/video";

export function getUploadVideoDocument(input: UploadVodcfsVideoInput) {
    const formData = new FormData();
    formData.append('operations', `{ "query": "mutation UploadVideo($vodcfsInput: UploadVodcfsVideoInput!) { uploadVideo(vodcfsInput: $vodcfsInput) { id, vodcfsVideo { id, title} } }", "variables": { "vodcfsInput": { "title": "${input.title}", "file": null, "sessionId": "${input.sessionId}" } } }`);
    formData.append('map', '{"0": ["variables.vodcfsInput.file"]}');
    formData.append('0', input.file);

    return {
        url: `${window.location.origin}/graphql`,
        body: formData,
        config: {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        } as AxiosRequestConfig,
    };
}
