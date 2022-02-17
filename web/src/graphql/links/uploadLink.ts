import { createUploadLink } from "apollo-upload-client";

export const uploadLink = createUploadLink({
    uri: `${window.location.origin}/graphql`,
});
