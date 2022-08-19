export default class MethodNotAllowedError extends Error {
    constructor() {
        super("Método HTTP não permitido")
    }
}