import ValidationError from '@lib/errors/ValidationError';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiResponse, { HttpMethod } from 'src/api/ApiResponse';
import User from 'src/database/model/User';
import UserService from 'src/services/UserService';

export default async function CompleteRegistrationController(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    await ApiResponse.withCurrentUserAndErrorHandler(
        req,
        res,
        HttpMethod.POST,
        async (user: User) => {
            const mobilePhone: string | null = req.body.mobilePhone || user.mobilePhone;
            if (!mobilePhone) throw new ValidationError("Obrigatório informar um número de telefone")

            const displayName: string | null = req.body.displayName || user.displayName;
            if (!displayName) throw new ValidationError("Obrigatório informar um apelido")

            const response = await UserService.completeRegistration(user, mobilePhone, displayName);
            ApiResponse.build(res, StatusCodes.OK, response.message, response);
        }
    );
}
