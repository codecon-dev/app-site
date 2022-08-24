import { claimCodecodesApiToken } from "@lib/codecodes-api"
import ValidationError from "@lib/errors/ValidationError"
import { CodecodesClaimPayload, CodecodesClaimResponse } from "@lib/types/codecodes"
import { StatusCodes } from "http-status-codes"
import { NextApiRequest, NextApiResponse } from "next"
import ApiResponse, { HttpMethod, WithLoggedUserRequest } from "src/api/ApiResponse"
import User from "src/database/model/User"

export interface CodecodesClaimRequest extends WithLoggedUserRequest {
    code: string
}

export default async function CodeCodesClaimController(req: NextApiRequest, res: NextApiResponse) {
    await ApiResponse.withCurrentUserAndErrorHandler(req, res, HttpMethod.POST, async (user: User) => {
        const params: CodecodesClaimRequest = req.body
        if (!params.email || !params.code) throw new ValidationError("Tão faltando alguns dados nessa requisição")

        const codecodesClaimPayload: CodecodesClaimPayload = { ...params, name: user.name }
        const codecodesResponse: CodecodesClaimResponse = await claimCodecodesApiToken(codecodesClaimPayload)
        
        const statusCode: number = codecodesResponse.status == "success" ? StatusCodes.OK : StatusCodes.UNPROCESSABLE_ENTITY
        ApiResponse.build(res, statusCode, codecodesResponse.message, codecodesResponse.data)
    })
}