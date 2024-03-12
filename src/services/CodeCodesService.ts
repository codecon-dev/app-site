import { claimCodecodesApiToken } from '@lib/codecodes-api';
import { CodecodesClaimResponse } from '@lib/types/codecodes';
import Attendee from 'src/database/model/Attendee';

export default class CodeCodesService {
    public static async claimCode(
        attendee: Attendee,
        code: string
    ): Promise<CodecodesClaimResponse> {
        const codecodesResponse: CodecodesClaimResponse = await claimCodecodesApiToken({
            attendeeUuid: attendee.uuid,
            name: attendee.name,
            code: code
        });

        return codecodesResponse;
    }
}
