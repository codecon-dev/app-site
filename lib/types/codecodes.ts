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

type UserClaim = {
    tag: string;
    id: string;
    claimedAt: string;
};

export type CodecodesToken = {
    code: string;
    description: string;
    value: number;
    decreaseValue?: number;
    minimumValue?: number;
    totalClaims?: number;
    remainingClaims?: number;
    claimedBy?: UserClaim[];
    createdBy?: string;
    createdAt?: string;
    expireAt?: string;
};

export type CodecodesTokenResponse = {
    status: 'success' | 'error';
    message: string;
    statusCode: number;
    data?: CodecodesToken;
};
