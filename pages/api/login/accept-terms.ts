import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiResponse, { HttpMethod } from 'src/api/ApiResponse';
import User from 'src/database/model/User';
import UserService from 'src/services/UserService';

export default async function AcceptTermsController(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    await ApiResponse.withCurrentUserAndErrorHandler(
        req,
        res,
        HttpMethod.POST,
        async (user: User) => {
            const response = await UserService.acceptTerms(user);
            ApiResponse.build(res, StatusCodes.OK, response.message, response);
        }
    );
}
