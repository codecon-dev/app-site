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

export type GeneralStats = {
    tokensQuantity: number;
    totalClaims: number;
    usersQuantity: number;
    tokensByClaimQuantity: string[];
    tokensWithClaims: number;
    tokensWithNoClaims: number;
    latestClaimedTokens: any[];
};

export type CodecodesStatsResponse = {
    status: string;
    message: string;
    statusCode?: number;
    data?: GeneralStats;
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
