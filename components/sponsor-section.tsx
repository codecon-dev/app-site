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
import TwitterIcon from '@components/icons/icon-twitter';
import LinkedinIcon from '@components/icons/icon-linkedin';
import InstagramIcon from '@components/icons/icon-instagram';
import { Sponsor } from '@lib/types';
import Reactions from './reactions';
import styles from './sponsor-section.module.css';
import styleUtils from './utils.module.css';

type Props = {
  sponsor: Sponsor;
};

const createMarkup = (text: string) => {
  return {__html: text.replace(/(?:\r\n|\r|\n)/g, '<br>')};
}

export default function SponsorSection({ sponsor }: Props) {
  return (
    <div className={styles.section}>
        <div className={styles.container}>
              <div className={styles.photo}>
                <div className={styles['img-wrapper']}>
                  <div className={styles['img-bg']} style={{backgroundColor: sponsor.color.hex}}>
                    <Image
                      alt={sponsor.name}
                      src={sponsor.whiteLogo.url}
                      className={styles.image}
                      loading="lazy"
                      title={sponsor.name}
                      height={200}
                      width={200}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.cover}
                  style={{backgroundColor: sponsor.color.hex, backgroundImage: sponsor.cover && `url('${sponsor.cover.url}')`}}
              />
          </div>
          <div className={styles.container}>
            <div className={styles.social}>
                {sponsor.linkedin && (
                    <a href={sponsor.linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedinIcon color="#fff" size={24} /> Linkedin
                    </a>
                )}

                {sponsor.instagram && (
                    <a href={sponsor.instagram} target="_blank" rel="noopener noreferrer">
                        <InstagramIcon color="#fff" size={24} /> Instagram
                    </a>
                )}

                {sponsor.twitter && (
                    <a href={sponsor.twitter} target="_blank" rel="noopener noreferrer">
                        <TwitterIcon color="#fff" size={24} /> Twitter
                    </a>
                )}
            </div>
            <div className={styles.content}>
                

                <h1>{sponsor.name}</h1>
               
                <p className={styles.description} dangerouslySetInnerHTML={createMarkup(sponsor.description)} />

                <div className={styles['links-wrapper']}>

                <a
                    key={sponsor.website}
                    href={sponsor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(styles.button, styles['button-resource'])}
                  >
                    <span className={styles.truncate}>Acesse o site</span>
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      shapeRendering="geometricPrecision"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <path d="M15 3h6v6" />
                      <path d="M10 14L21 3" />
                    </svg>
                  </a>

                {sponsor.links.map(link => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(styles.button, styles['button-resource'])}
                  >
                    <span className={styles.truncate}>{link.text}</span>
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      shapeRendering="geometricPrecision"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <path d="M15 3h6v6" />
                      <path d="M10 14L21 3" />
                    </svg>
                  </a>
                ))}

                </div>

                {sponsor.youtubeSlug && (
                  <div className={cn(styles.video)}>
                    <iframe
                      allow="picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                      height="100%"
                      src={`https://youtube.com/embed/${sponsor.youtubeSlug}`}
                      title={sponsor.name}
                      width="100%"
                    />
                  </div>
                )}
            </div>
        </div>
    </div>
  );
}
