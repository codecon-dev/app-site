export type AttendeeRank = {
    tag: string;
    score: number;
    claims: number;
};

export type CodecodesClaimPayload = {
    name: string;
    attendeeUuid: string;
    code: string;
};

export type CodecodesRankResponse = {
    status: string;
    message: string;
    data?: AttendeeRank[];
};

type CodecodesSuccessClaimData = {
    scoreAcquired: number;
    totalScore: number;
};

export type CodecodesClaimResponse = {
    status: 'success' | 'error';
    message: string;
    statusCode: number;
    data?: CodecodesSuccessClaimData;
};
