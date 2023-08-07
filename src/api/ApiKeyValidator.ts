import { NextApiRequest } from 'next';

export default class ApiKeyValidator {
    public static validate(req: NextApiRequest, apiKey: string | undefined): boolean {
        const receivedApiKey = req.headers['x-api-key'];
        if (!receivedApiKey || !apiKey || receivedApiKey != apiKey) return false;

        return true;
    }
}
