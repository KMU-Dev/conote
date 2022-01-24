export class GoogleUserEmailNotVarifiedError extends Error {
    constructor(email: string) {
        super(`User with email (${email}) isn't verified`);
    }
}
