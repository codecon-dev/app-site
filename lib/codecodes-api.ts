import {
    AttendeeCodeCodes,
    CodecodesClaimPayload,
    CodecodesRankResponse,
    CodecodesClaimResponse,
    CodecodesStatsResponse,
    CodecodesToken,
    CodecodesTokenResponse,
    CodecodesTokensResponse,
    User,
    CodecodesUserResponse
} from '@lib/types/codecodes';
import Attendee from '@models/Attendee';

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'x-apikey': process.env.CODECODES_API_APIKEY || ''
    };
}

export async function claimCodecodesApiToken({
    attendeeUuid,
    name,
    code
}: CodecodesClaimPayload): Promise<CodecodesClaimResponse> {
    try {
        const response = await fetch(`${process.env.CODECODES_API_URL}/token/claim`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ attendeeUuid, name, code: code.toUpperCase() })
        });
        return (await response.json()) as CodecodesClaimResponse;
    } catch (error) {
        console.trace(error);
        return {
            statusCode: 500,
            status: 'error',
            message: 'Algo deu errado :('
        };
    }
}

export async function newToken(token: CodecodesToken): Promise<CodecodesTokenResponse> {
    try {
        const response = await fetch(`${process.env.CODECODES_API_URL}/token`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(token)
        });

        return (await response.json()) as CodecodesTokenResponse;
    } catch (error) {
        console.trace(error);
        return {
            status: 'error',
            statusCode: 500,
            message: 'Algo deu errado :('
        };
    }
}

export async function importTokens(tokens: CodecodesToken[]): Promise<CodecodesTokenResponse> {
    try {
        const response = await fetch(`${process.env.CODECODES_API_URL}/token/batch`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(tokens)
        });

        return (await response.json()) as CodecodesTokenResponse;
    } catch (error) {
        console.trace(error);
        return {
            status: 'error',
            statusCode: 500,
            message: 'Algo deu errado :('
        };
    }
}

export async function getToken(code: string): Promise<CodecodesTokenResponse> {
    try {
        const response = await fetch(`${process.env.CODECODES_API_URL}/token/${code}`, {
            method: 'GET',
            headers: getHeaders()
        });
        const token = (await response.json()) as CodecodesToken;

        if (!token) {
            return {
                status: 'error',
                message: 'Token não encontrado',
                statusCode: 404
            };
        }

        return {
            status: 'success',
            message: 'Token encontrado',
            statusCode: 200,
            data: token
        };
    } catch (error) {
        console.trace(error);
        return {
            status: 'error',
            statusCode: 500,
            message: 'Algo deu errado :('
        };
    }
}

export async function getAllTokens(): Promise<CodecodesTokensResponse> {
    try {
        const response = await fetch(`${process.env.CODECODES_API_URL}/token`, {
            method: 'GET',
            headers: getHeaders()
        });
        const tokens = (await response.json()) as CodecodesToken[];

        return {
            status: 'success',
            message: 'Token encontrados',
            statusCode: 200,
            data: tokens
        };
    } catch (error) {
        console.trace(error);
        return {
            status: 'error',
            statusCode: 500,
            message: 'Algo deu errado :('
        };
    }
}

export async function getUser(userId: string): Promise<CodecodesUserResponse> {
    try {
        const attendee = await Attendee.findByEmail(userId);

        if (!attendee) {
            return {
                status: 'error',
                message: 'Usuário não encontrado',
                statusCode: 404
            };
        }

        const response = await fetch(`${process.env.CODECODES_API_URL}/user/${userId}`, {
            method: 'GET',
            headers: getHeaders()
        });
        const codecodesUser = (await response.json()) as User;

        if (!codecodesUser) {
            return {
                status: 'error',
                message: 'Usuário não encontrado',
                statusCode: 404
            };
        }

        const attendeeCodecodes: AttendeeCodeCodes = {
            name: attendee.name,
            lastName: attendee.lastName,
            displayName: attendee.displayName,
            email: attendee.email,
            github: attendee.githubUsername,
            user: codecodesUser
        };

        return {
            status: 'success',
            message: 'Usuário encontrado',
            statusCode: 200,
            data: attendeeCodecodes
        };
    } catch (error) {
        console.trace(error);
        return {
            status: 'error',
            statusCode: 500,
            message: 'Algo deu errado :('
        };
    }
}

export async function getStats(): Promise<CodecodesStatsResponse> {
    try {
        const response = await fetch(`${process.env.CODECODES_API_URL}/stats`, {
            method: 'GET',
            headers: getHeaders()
        });
        return (await response.json()) as CodecodesStatsResponse;
    } catch (error) {
        console.trace(error);
        return {
            status: 'error',
            message: 'Algo deu errado :('
        };
    }
}

export async function getRank(returnId?: boolean): Promise<CodecodesRankResponse> {
    try {
        const response = await fetch(`${process.env.CODECODES_API_URL}/user/rank`, {
            method: 'GET',
            headers: getHeaders()
        });
        const rankResponse = (await response.json()) as CodecodesRankResponse;
        const rankMap = rankResponse.data?.map(rank => {
            return {
                ...rank,
                userId: returnId ? rank.userId : null
            };
        });

        return {
            ...rankResponse,
            data: rankMap
        };
    } catch (error) {
        console.trace(error);
        return {
            status: 'error',
            message: 'Algo deu errado :('
        };
    }
}
