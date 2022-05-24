/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export type UserRank = {
  tag: string;
  score: number;
  claims: number;
};

export type Image = {
  url: string;
};

export type Speaker = {
  id: string;
  name: string;
  bio: string;
  title: string;
  slug: string;
  twitter: string;
  github: string;
  company: string;
  talk: Talk;
  image: Image;
  imageSquare: Image;
};

export type Stage = {
  name: string;
  slug: string;
  stream: string;
  discord: string;
  schedule: Talk[];
};

export type Talk = {
  id: string;
  title: string;
  slug: string;
  emBreve: boolean;
  description: string;
  start: string;
  end: string;
  speaker: Speaker[];
  place: string;
  talkType: string;
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
  id: string;
  title: string;
  slug: string;
  description: string;
  start: string;
  end: string;
  vagas: number;
  teacher: Speaker[];
  link?: string;
};

export type ConfUser = {
  id?: string;
  email: string;
  ticketNumber: number | undefined;
  name?: string;
  username?: string;
  createdAt: string;
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

export type GitHubOAuthData =
  | {
      type: 'token';
      token: string;
    }
  | {
      type: 'user';
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
