import { StatusCodes } from "http-status-codes"
import { NextApiRequest, NextApiResponse } from "next"
import ApiResponse from "src/api/ApiResponse"
import User from "src/database/model/User"

export type UserLoginRequest = {
    email: string
}

export default async function LoginCheckController(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        if (req.method != "POST") {
            ApiResponse.build(res, StatusCodes.BAD_REQUEST, "Método não permitido")
            return
        }

        const params: UserLoginRequest = req.body
        const user: User | null = await User.findOne({ where: { email: params.email } })
        if (!user) {
            ApiResponse.build(res, StatusCodes.NOT_FOUND, `Usuário com e-mail ${params.email} não encontrado`)
            return
        }

        ApiResponse.build(res, StatusCodes.OK, "Login realizado com sucesso", { user: user })
    } catch (exception) {
        console.error("LoginController >> Ocorreu um erro inesperado", exception)
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, "Ocorreu um erro desconhecido")
    }
}