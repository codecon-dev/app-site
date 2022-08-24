import { claimCodecodesApiToken } from '@lib/codecodes-api';
import ValidationError from '@lib/errors/ValidationError';
import { CodecodesClaimResponse } from '@lib/types/codecodes';
import User from 'src/database/model/User';

export default class CodeCodesService {
    public static async claimCode(user: User, code: string): Promise<CodecodesClaimResponse> {
        const codecodesResponse: CodecodesClaimResponse = await claimCodecodesApiToken({
            email: user.email,
            name: user.name,
            code: code
        });

        if (codecodesResponse.status === 'error')
            throw new ValidationError(codecodesResponse.message, { user: user.email, code: code });

        return codecodesResponse;
    }
}
