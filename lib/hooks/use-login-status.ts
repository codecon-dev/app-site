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

import useSWR, { ConfigInterface } from 'swr';

export default function useLoginStatus(opts?: ConfigInterface) {
  const { data, error, mutate } = useSWR(
    `/api/auth`,
    async url => {
      let queryParams = ''
      const loginId = window.localStorage.getItem('symplaLogin') || ''
      if (loginId) {
        queryParams = `?id=${loginId}`
      }
      const res = await fetch(`${url}${queryParams}`);
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    },
    {
      ...opts,
      revalidateOnFocus: false
    }
  );

  return {
    data,
    loginStatus: error
      ? ('loggedOut' as const)
      : !data
      ? ('loading' as const)
      : ('loggedIn' as const),
    mutate
  };
}
