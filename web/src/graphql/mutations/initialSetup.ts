import { gql } from "@apollo/client";
import { OAuth2User } from "../type/OAuth2User";
import { GraqhqlDto } from "./type";

export const INITIAL_GOOGLE_LINK = gql`
    mutation InitialGoogleLink($input: InitialGoogleLinkInput!) {
        initialGoogleLink(googleLinkInput: $input) {
            name
            email
            studentId
            picture
        }
    }
`;

export interface InitialGoogleLinkDto extends GraqhqlDto {
    initialGoogleLink: OAuth2User;
}
