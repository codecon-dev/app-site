export default class ValidationError extends Error {

    logData?: any

    constructor(message: string, logData?: any) {
        super(message)
        this.logData = logData
    }
}