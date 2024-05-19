import {
    CodecodesClaimPayload,
    CodecodesRankResponse,
    CodecodesClaimResponse,
    CodecodesStatsResponse
} from '@lib/types/codecodes';

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

export async function getRank(): Promise<CodecodesRankResponse> {
    try {
        const response = await fetch(`${process.env.CODECODES_API_URL}/user/rank`, {
            method: 'GET',
            headers: getHeaders()
        });
        return (await response.json()) as CodecodesRankResponse;
    } catch (error) {
        console.trace(error);
        return {
            status: 'error',
            message: 'Algo deu errado :('
        };
    }
}
