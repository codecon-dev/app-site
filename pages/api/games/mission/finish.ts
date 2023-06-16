import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiResponse, { HttpMethod, WithLoggedUserRequest } from 'src/api/ApiResponse';
import User from 'src/database/model/User';
import MissionBoardService, { MissionBoardResponse } from 'src/services/MissionBoardService';
import { Guess } from 'src/services/MissionBoardService';

export interface MissionBoardFinishRequest extends WithLoggedUserRequest {
    message: string;
    guess: Guess;
}

export default async function MissionBoardFinishController(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    await ApiResponse.withCurrentUserAndErrorHandler(
        req,
        res,
        HttpMethod.POST,
        async (user: User) => {
            const params: MissionBoardFinishRequest = req.body;
            const guess: Guess = params.guess;

            const response: MissionBoardResponse = await MissionBoardService.finish(user, guess);
            ApiResponse.build(res, StatusCodes.OK, response.message, response);
        }
    );
}
