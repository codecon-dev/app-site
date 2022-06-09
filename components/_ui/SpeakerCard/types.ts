import { ReactNode } from 'react';

export type PropsTitle = {
  children: string;
};

export type PropsImage = {
  src: string;
  alt: string;
};

export type PropsAbout = {
  children: ReactNode;
};

type SocialData = {
  label: 'GitHub' | 'Twitter' | 'Instagram';
  url: string;
};

type Character = {
  alt: string;
  src: string;
};

export type PropsSocial = {
  data: SocialData[];
  character: Character;
};

export type PropsSpeakerCard = {
  children: ReactNode;
};
