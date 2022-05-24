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

import Link from 'next/link';
import Image from 'next/image';
import cn from 'classnames';
import { Sponsor } from '@lib/types';
import styles from './sponsors-grid.module.css';

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <Link key={sponsor.name} href={`/patrocinadores/${sponsor.slug}`}>
      <a
        role="button"
        tabIndex={0}
        className={cn(styles.card, {
          [styles.silver]: sponsor.tier === 'silver'
        })}
      >
        <div style={{backgroundColor: sponsor.color.hex}} className={styles.imageWrapper}>
          <img src={sponsor.whiteLogo.url} alt={sponsor.name} />
        </div>
        {sponsor.tier !== 'silver' && (
          <div className={styles.cardBody}>
            <div>
              <h2 className={styles.name}>{sponsor.name}</h2>
            </div>
          </div>
        )}
      </a>
    </Link>
  );
}

type Props = {
  sponsors: Sponsor[];
};

export default function SponsorsGrid({ sponsors }: Props) {
  const silverSponsors = sponsors.filter(s => s.tier === 'silver');
  const otherSponsors = sponsors.filter(s => s.tier !== 'silver');

  return (
    <div className={styles.section}>
      <div className={styles.grid}>
        {otherSponsors.map(sponsor => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
      <div className={styles.gridFour}>
        {silverSponsors.map(sponsor => (
          <SponsorCard key={sponsor.name} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}
