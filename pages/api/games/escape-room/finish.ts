import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiResponse, { HttpMethod, WithLoggedUserRequest } from 'src/api/ApiResponse';
import User from 'src/database/model/User';
import EscapeRoomService, { EscapeRoomResponse } from 'src/services/EscapeRoomService';

export interface EscapeRoomFinishRequest extends WithLoggedUserRequest {
    message: string;
}

export default async function EscapeRoomFinishController(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    await ApiResponse.withCurrentUserAndErrorHandler(
        req,
        res,
        HttpMethod.POST,
        async (user: User) => {
            const params: EscapeRoomFinishRequest = req.body;
            const response: EscapeRoomResponse = await EscapeRoomService.finish(
                user,
                params.message
            );
            ApiResponse.build(res, StatusCodes.OK, response.message, response);
        }
    );
}
