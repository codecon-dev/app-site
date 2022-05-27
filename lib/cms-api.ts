import { Workshop, Sponsor, Talk, Speaker } from '@lib/types';

import * as datoCmsApi from './cms-providers/dato';

export async function getPrincipalSpeakers(): Promise<Speaker[]> {
  const speakers = await datoCmsApi.getPrincipalSpeakers();
  return speakers || [];
}

export async function getAllSpeakers(): Promise<Speaker[]> {
  const speakers = await datoCmsApi.getAllSpeakers();
  return speakers || [];
}

export async function getAllTalks(): Promise<Talk[]> {
  const talks = await datoCmsApi.getAllTalks();
  return talks || [];
}

export async function getAllSponsors(): Promise<Sponsor[]> {
  const sponsors = await datoCmsApi.getAllSponsors();
  return sponsors || [];
}

export async function getAllWorkshops(): Promise<Workshop[]> {
  const workshops = await datoCmsApi.getAllWorkshops();
  return workshops || [];
}
