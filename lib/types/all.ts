import { Speaker } from './speakers';

export type UserRank = {
    tag: string;
    score: number;
    claims: number;
};

export type Image = {
    url: string;
};

export type Stage = {
    name: string;
    slug: string;
    stream: string;
    discord: string;
    schedule: Talk[];
};

export type Talk = {
    id?: string;
    title: string;
    slug: string;
    emBreve?: boolean;
    featured?: boolean;
    description?: string;
    start: string;
    end: string;
    speaker?: Speaker[];
    host?: Speaker;
    place?: string;
    talkType: string;
    shareImage?: Image;
    sponsor?: {
        name: string;
        logo: Image;
    };
};

export type Link = {
    url: string;
};

export type Sponsor = {
    id: string;
    name: string;
    description: string;
    slug: string;
    color: {
        hex: string;
    };
    website: string;
    links: SponsorLink[];
    tier: string;
    cover: Image;
    logo: Image;
    whiteLogo: Image;
    youtubeSlug: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    linksGather: SponsorLink[];
};

export type SponsorLink = {
    text: string;
    url: string;
};

export type Workshop = {
    id?: string;
    title: string;
    slug: string;
    description?: string;
    start: string;
    end: string;
    vagas?: number;
    teacher?: Speaker[];
    link?: string;
    sponsor?: {
        name: string;
        logo: Image;
    };
};

export type ConfUser = {
    email: string;
    firstName: string;
    fullName: string;
};

export type OkPacket = {
    fieldCount?: number;
    affectedRows?: number;
    insertId?: number;
    serverStatus?: number;
    warningCount?: number;
    message?: string;
    protocol41?: boolean;
    changedRows?: number;
};

export type GitHubOAuthData = {
    id?: string;
    name: string;
    login: string;
};

export type Puzzle = {
    id: number;
    code: string;
    answer: string;
};

export type PuzzleUser = {
    position: number;
    name: string;
    lastSent: string;
    points: number;
};

export type CodecodesClaimPayload = {
    name: string;
    email: string;
    code: string;
};

export type CodecodesRankResponse = {
    status: string;
    message: string;
    data?: UserRank[];
};

type CodecodesSuccessClaimData = {
    scoreAcquired: number;
    totalScore: number;
};

export type CodecodesClaimResponse = {
    status: string;
    message: string;
    data?: CodecodesSuccessClaimData;
};

export type UserAlreadyAnswerData = {
    success: boolean;
    userAnswered: boolean;
};

export type MarathonUser = {
    gatherName: string;
    profileURI: string;
    userId: number | undefined;
};

export enum EVENT_DAYS {
    THURSDAY = 0,
    FRIDAY = 1
}

export type ImageKind = 'default' | 'square' | 'stories';

export type MenuItem = {
    name: string;
    route: string;
    type?: 'button' | 'link';
    target?: '_blank';
};

export enum EVENTS {
    DIGITAL = 'DIGITAL',
    SUMMIT = 'SUMMIT',
    FEATURE = 'FEATURE'
}
