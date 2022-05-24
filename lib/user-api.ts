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


export async function register(
  { email, name, lastName, city, estate, segment, role, experience, acceptNewsletter, acceptSponsors }:
  { email: string, name?: string, lastName?: string, city?: string, estate?: string, segment?: string, role?: string, experience?: string, acceptNewsletter?: boolean, acceptSponsors?: boolean}
) {
  return await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, name, lastName, city, estate, segment, role, experience, acceptNewsletter, acceptSponsors })
  });
}

export async function saveGithubToken({ ticketNumber, token }: { ticketNumber?: number; token: string }) {
  return await fetch('/api/save-github-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ticketNumber,
      token
    })
  });
}

export async function getReactions({ id }: { id: string }) {
  return await fetch('/api/get-reactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(id)
  });
}

export async function voteReaction({ id, name }: { id: string, name: string }) {
  return await fetch('/api/update-reactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      name
    })
  });
}