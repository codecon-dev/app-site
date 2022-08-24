export type UserRank = {
  tag: string;
  score: number;
  claims: number;
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
  status: "success" | "error";
  message: string;
  data?: CodecodesSuccessClaimData;
};
