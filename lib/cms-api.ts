import { Workshop, Sponsor, Talk } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';

import * as datoCmsApi from './cms-providers/dato';

type Events = 'digital' | 'summit' | 'feature';

export async function getAllSpeakers(limit = 100, event: Events): Promise<Speaker[]> {
    const speakers = await datoCmsApi.getAllSpeakers(limit, event);
    return speakers || [];
}

export async function getAllTalks(event: Events): Promise<Talk[]> {
    const talks = await datoCmsApi.getAllTalks(event);
    return talks || [];
}

export async function getAllSponsors(event: Events): Promise<Sponsor[]> {
    const sponsors = await datoCmsApi.getAllSponsors(event);
    return sponsors || [];
}

export async function getAllWorkshops(): Promise<Workshop[]> {
    const workshops = await datoCmsApi.getAllWorkshops();
    return workshops || [];
}
