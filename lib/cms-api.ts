import { Workshop, Sponsor, Talk } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

import * as datoCmsApi from './cms-providers/dato';

export async function getAllSpeakers(limit = 100): Promise<Speaker[]> {
  const speakers = await datoCmsApi.getAllSpeakers(limit);
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
