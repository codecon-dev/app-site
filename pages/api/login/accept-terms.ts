import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import ApiResponse, { HttpMethod } from 'src/api/ApiResponse';
import Attendee from 'src/database/model/Attendee';
import AttendeeService from 'src/services/AttendeeService';

export default async function AcceptTermsController(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    await ApiResponse.withCurrentAttendeeAndErrorHandler(
        req,
        res,
        HttpMethod.POST,
        async (attendee: Attendee) => {
            const response = await AttendeeService.acceptTerms(attendee);
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
