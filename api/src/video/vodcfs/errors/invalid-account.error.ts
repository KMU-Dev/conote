export default class InvalidAccountError extends Error {
    constructor() {
        super('Invalid login information. Please recheck, or your account will be banned.');
    }
}
