import { ReactNode } from 'react';
import { Talk, Image } from './all';

export type Speaker = {
  id: string;
  name: string;
  bio: string;
  title: string;
  slug: string;
  twitter: string;
  github: string;
  linkedin: string;
  company: string;
  talk: Talk;
  image: Image;
};

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
  data?: SocialData[];
  character?: Character;
};

export type PropsSpeakerCard = {
  children: ReactNode;
};
