import { claimCodecodesApiToken } from "@lib/codecodes-api"
import ValidationError from "@lib/errors/ValidationError"
import { CodecodesClaimPayload, CodecodesClaimResponse } from "@lib/types/codecodes"
import { StatusCodes } from "http-status-codes"
import { NextApiRequest, NextApiResponse } from "next"
import ApiResponse, { HttpMethod } from "src/api/ApiResponse"

export default async function CodeCodesClaimController(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method != HttpMethod.POST) {
            ApiResponse.build(res, StatusCodes.METHOD_NOT_ALLOWED, "Método não permitido")
            return
        }

        const params: CodecodesClaimPayload = req.body
        const codecodesResponse: CodecodesClaimResponse = await claimCodecodesApiToken(params)
        
        const statusCode: number = codecodesResponse.status == "success" ? StatusCodes.OK : StatusCodes.UNPROCESSABLE_ENTITY
        ApiResponse.build(res, statusCode, codecodesResponse.message, codecodesResponse.data)
    } catch (error) {
        if (error instanceof ValidationError) {
            ApiResponse.buildForValidationError(res, error, req.url)
            return
        }

        console.error(req.url, "Erro desconhecido", error)
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, "Ocorreu um erro inesperado")
    }
}