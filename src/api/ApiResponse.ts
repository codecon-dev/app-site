import ResourceNotFoundError from "@lib/errors/ResourceNotFoundError"
import { StatusCodes } from "http-status-codes"
import { NextApiResponse } from "next"
import { NextApiRequest } from "next/dist/shared/lib/utils"
import User from "src/database/model/User"

export enum HttpMethod {
    POST = "POST"
}

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

    public static async withCurrentUserAndErrorHandler(req: NextApiRequest, res: NextApiResponse, method: HttpMethod, action: Function): Promise<void> {
        try {
            if (req.method != method) {
                this.build(res, StatusCodes.METHOD_NOT_ALLOWED, "Método HTTP não permitido")
                return
            }

            const userEmail: string | null = req.body.email
            if (!userEmail) {
                this.build(res, StatusCodes.UNPROCESSABLE_ENTITY, "Informe o e-mail do usuário")
                return
            }

            const user: User | null = await User.findByEmail(userEmail)
            if (!user) throw new ResourceNotFoundError(`Usuário com e-mail ${userEmail} não encontrado`)

            await action(user)
        } catch (error) {
            if (error instanceof ResourceNotFoundError) {
                this.build(res, StatusCodes.NOT_FOUND, error.message)
                return
            }

            console.error(`${req.url} >> Erro desconhecido`, error)
            this.build(res, StatusCodes.INTERNAL_SERVER_ERROR, "Ocorreu um erro desconhecido")
        }
    }
}