import { StatusCodes } from "http-status-codes"
import { NextApiRequest, NextApiResponse } from "next"
import ApiResponse, { HttpMethod, WithLoggedUserRequest } from "src/api/ApiResponse"
import User from "src/database/model/User"
import PuzzleAnswerService, { PuzzleAnswerAttemptResponse } from "src/services/PuzzleAnswerService"

export interface PuzzleAnswerRequest extends WithLoggedUserRequest {
    guess: string
    puzzlePublicId: string
}

export default async function PuzzleAnswerController(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    await ApiResponse.withCurrentUserAndErrorHandler(req, res, HttpMethod.POST, async (user: User) => {
        const params: PuzzleAnswerRequest = req.body
        const response: PuzzleAnswerAttemptResponse = await PuzzleAnswerService.attempt(user, params.guess, params.puzzlePublicId)
        ApiResponse.build(res, StatusCodes.OK, response.message, response)
    })
}