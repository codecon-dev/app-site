import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiResponse, { HttpMethod, WithLoggedAttendeeRequest } from 'src/api/ApiResponse';
import Attendee from 'src/database/model/Attendee';
import PuzzleAnswerService, { PuzzleAnswerAttemptResponse } from 'src/services/PuzzleAnswerService';

export interface PuzzleAnswerRequest extends WithLoggedAttendeeRequest {
    guess: string;
    puzzlePublicId: string;
}

export default async function PuzzleAnswerController(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    await ApiResponse.withCurrentAttendeeAndErrorHandler(
        req,
        res,
        HttpMethod.POST,
        async (attendee: Attendee) => {
            const params: PuzzleAnswerRequest = req.body;
            const response: PuzzleAnswerAttemptResponse = await PuzzleAnswerService.attempt(
                attendee,
                params.guess,
                params.puzzlePublicId
            );
            ApiResponse.build(res, StatusCodes.OK, response.message, response);
        }
    );
}
