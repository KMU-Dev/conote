export class MalformedAuthCodeError extends Error {
    constructor(code: string) {
        super(`Malformed auth code: ${code}`);
    }
}
