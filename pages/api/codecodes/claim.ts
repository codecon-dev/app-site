import { claimCodecodesApiToken } from '@lib/codecodes-api';
import ValidationError from '@lib/errors/ValidationError';
import { CodecodesClaimPayload, CodecodesClaimResponse } from '@lib/types/codecodes';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiResponse, { HttpMethod, WithLoggedAttendeeRequest } from 'src/api/ApiResponse';
import Attendee from 'src/database/model/Attendee';

export interface CodecodesClaimRequest extends WithLoggedAttendeeRequest {
    code: string;
}

export default async function CodeCodesClaimController(req: NextApiRequest, res: NextApiResponse) {
    await ApiResponse.withCurrentAttendeeAndErrorHandler(
        req,
        res,
        HttpMethod.POST,
        async (attendee: Attendee) => {
            const params: CodecodesClaimRequest = req.body;
            if (!params.attendeeUuid || !params.code)
                throw new ValidationError('Tão faltando alguns dados nessa requisição');

            const codecodesClaimPayload: CodecodesClaimPayload = {
                ...params,
                name: attendee.displayName || attendee.name
            };
            const codecodesResponse: CodecodesClaimResponse = await claimCodecodesApiToken(
                codecodesClaimPayload
            );

            const statusCode: number =
                codecodesResponse.status == 'success'
                    ? StatusCodes.OK
                    : StatusCodes.UNPROCESSABLE_ENTITY;
            ApiResponse.build(res, statusCode, codecodesResponse.message, codecodesResponse.data);
        }
    );
}
