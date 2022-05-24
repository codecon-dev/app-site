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

