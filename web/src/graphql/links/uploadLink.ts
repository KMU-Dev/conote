import { buildAxiosFetch } from "@lifeomic/axios-fetch";
import { createUploadLink } from "apollo-upload-client";
import axios from "axios";

export const uploadLink = createUploadLink({
    uri: `${window.location.origin}/graphql`,
    fetch: buildAxiosFetch(axios, (config, _input, init: any) => ({
        ...config,
        onUploadProgress: init.onUploadProgress,
    })),
});
