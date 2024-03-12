import ValidationError from '@lib/errors/ValidationError';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiResponse, { HttpMethod } from 'src/api/ApiResponse';
import Attendee from 'src/database/model/Attendee';
import AttendeeService from 'src/services/AttendeeService';

export default async function CompleteRegistrationController(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    await ApiResponse.withCurrentAttendeeAndErrorHandler(
        req,
        res,
        HttpMethod.POST,
        async (attendee: Attendee) => {
            const mobilePhone: string | null = req.body.mobilePhone || attendee.mobilePhone;
            if (!mobilePhone)
                throw new ValidationError('Obrigatório informar um número de telefone');

            const displayName: string | null = req.body.displayName || attendee.displayName;
            if (!displayName) throw new ValidationError('Obrigatório informar um apelido');

            const response = await AttendeeService.completeRegistration(
                attendee,
                mobilePhone,
                displayName
            );
            ApiResponse.build(res, StatusCodes.OK, response.message, {
                attendeeUuid: attendee.uuid,
                firstName: attendee.name,
                displayName: attendee.displayName,
                hasMobilePhone: attendee.mobilePhone ? true : false,
                hasAcceptedTerms: attendee.acceptedTerms
            });
        }
    );
}
