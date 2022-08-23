export default class ValidationError extends Error {

    logData?: {}

    constructor(message: string, logData?: {}) {
        super(message)
        this.logData = logData
    }
}