export class IdTokenNotFoundError extends Error {
    constructor() {
        super('Cannot find id_token in the given Credentials object.');
    }
}

export class MissingClaimError extends Error {
    constructor(claim: string) {
        super(`Cannot find "${claim}" in id token.`);
    }
}

export class InvalidClaimError extends Error {
    constructor(claim: string, value: any) {
        super(`${claim} should be ${value}.`);
    }
}
