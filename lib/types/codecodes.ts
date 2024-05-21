export type AttendeeRank = {
    userId?: string | null;
    tag: string;
    score: number;
    claims: number;
};

export type CodecodesClaimPayload = {
    name: string;
    attendeeUuid: string;
    code: string;
    email?: string;
};

export type User = {
    userId: string;
    tag: string;
    score: number;
    tokens: UserClaimedToken[];
};

export type UserClaimedToken = {
    code: string;
    value: number;
    claimedAt: string;
};

export type CodecodesUserResponse = {
    status: 'success' | 'error';
    message: string;
    statusCode: number;
    data?: AttendeeCodeCodes;
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
    tokensByClaimQuantity: { code: string; claims: number }[];
    tokensWithClaims: number;
    tokensWithNoClaims: number;
    latestClaimedTokens: any[];
    claimsPerDate: { date: string; count: number }[];
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

export type CodecodesTokensResponse = {
    status: 'success' | 'error';
    message: string;
    statusCode: number;
    data?: CodecodesToken[];
};

export type AttendeeCodecodesResponse = {
    status: 'success' | 'error';
    message: string;
    statusCode: number;
    data?: AttendeeCodeCodes;
};

export type AttendeeCodeCodes = {
    name: string;
    lastName: string;
    displayName?: string;
    email: string;
    github?: string;
    user?: User;
};
