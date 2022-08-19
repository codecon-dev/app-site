import MethodNotAllowedError from "@lib/errors/MethodNotAllowedError"
import ResourceNotFoundError from "@lib/errors/ResourceNotFoundError"
import { StatusCodes } from "http-status-codes"
import { NextApiResponse } from "next"
import { getURL } from "next/dist/shared/lib/utils"

export default class ApiResponse {

    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR
    success: boolean = false
    message: Array<string>
    data?: any

    private constructor(statusCode: number, message: string | Array<string>, data?: any) {
        const success: boolean = statusCode >= 200 && statusCode < 300
        this.statusCode = statusCode
        this.success = success
        this.message = message instanceof Array<string> ? message : [message]
        this.data = data
    }

    public static build(res: NextApiResponse, statusCode: number, message: string | Array<string>, data?: any): void {
        res.status(statusCode)
           .json(new ApiResponse(statusCode, message, data))
    }

    public static async withErrorHandler(res: NextApiResponse, action: Function): Promise<void> {
        try {
            await action()
        } catch (error) {
            if (error instanceof MethodNotAllowedError) {
                this.build(res, StatusCodes.METHOD_NOT_ALLOWED, error.message)
                return
            }

            if (error instanceof ResourceNotFoundError) {
                this.build(res, StatusCodes.NOT_FOUND, error.message)
                return
            }

            console.error(`${getURL()} >> Erro desconhecido`, error)
            this.build(res, StatusCodes.INTERNAL_SERVER_ERROR, "Ocorreu um erro desconhecido")
        }
    }
}