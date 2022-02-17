export default class InvalidCaptchaError extends Error {
    constructor() {
        super('Invalid captcha answer');
    }
}
