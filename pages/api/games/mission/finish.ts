import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiResponse, { HttpMethod, WithLoggedAttendeeRequest } from 'src/api/ApiResponse';
import Attendee from 'src/database/model/Attendee';
import MissionBoardService, { MissionBoardResponse } from 'src/services/MissionBoardService';
import { Guess } from 'src/services/MissionBoardService';

export interface MissionBoardFinishRequest extends WithLoggedAttendeeRequest {
    message: string;
    guess: Guess;
}

export default async function MissionBoardFinishController(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    await ApiResponse.withCurrentAttendeeAndErrorHandler(
        req,
        res,
        HttpMethod.POST,
        async (attendee: Attendee) => {
            const params: MissionBoardFinishRequest = req.body;
            const guess: Guess = params.guess;

            const response: MissionBoardResponse = await MissionBoardService.finish(
                attendee,
                guess
            );
            ApiResponse.build(res, StatusCodes.OK, response.message, response);
        }
    );
}
