import { StatusCodes } from "http-status-codes"
import { NextApiResponse } from "next"

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
}