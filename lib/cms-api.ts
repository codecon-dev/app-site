import { Workshop, Sponsor, Talk } from '@lib/types/all';
import { Speaker } from '@lib/types/speakers';
import prisma from './cms-providers/prisma'

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

export async function createTicketIfNotExists(sympla_order: string, symplaData: any) {
  if (!sympla_order) return;

  const ticket = await prisma.ticket.findMany({
    where: {
      sympla_order: sympla_order
    }
  })

  if (ticket[0]) return ticket;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  symplaData.map(async (t: { order_id: any; first_name: any; last_name: any; email: any; }) => {
    await prisma.ticket.create({
      data: {
        sympla_order: t.order_id,
        first_name: t.first_name,
        last_name: t.last_name,
        email: t.email
      }
    })
  })
}