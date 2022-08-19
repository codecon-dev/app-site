import MethodNotAllowedError from "@lib/errors/MethodNotAllowedError"
import { StatusCodes } from "http-status-codes"
import { NextApiRequest, NextApiResponse } from "next"
import ApiResponse from "src/api/ApiResponse"
import PuzzleAnswerService, { PuzzleAnswerAttemptResponse } from "src/services/PuzzleAnswerService"

export type PuzzleAnswerRequest = {
    email: string
    guess: string
    puzzlePublicId: string
}

export default async function PuzzleAnswerController(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    await ApiResponse.withErrorHandler(res, async () => {
        if (req.method !== "POST") throw new MethodNotAllowedError()

        const params: PuzzleAnswerRequest = req.body
        const response: PuzzleAnswerAttemptResponse = await PuzzleAnswerService.attempt(params.email, params.guess, params.puzzlePublicId)
        ApiResponse.build(res, StatusCodes.OK, response.message, response)
    })
}