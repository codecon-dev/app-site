import Image from 'next/image';
import cn from 'classnames';
import { Sponsor } from '@lib/types';
import styles from './sponsor-links.module.css';
import { contrast } from '@lib/contrast-ratio';

type Props = {
  sponsor: Sponsor;
};

export default function SponsorLinks({ sponsor }: Props) {
  const contrastRatio = contrast(sponsor.color.hex);

  let linksList;

  if (sponsor.linksGather.length) {
    linksList = sponsor.linksGather;
  } else {
    linksList = sponsor.links;
  }

  return (
    <div className={styles.section} style={{ backgroundColor: sponsor.color.hex }}>
      <div className={styles.container}>
        <div className={styles['img-wrapper']}>
          <Image
            alt={sponsor.name}
            src={sponsor.whiteLogo.url}
            className={styles.image}
            loading="lazy"
            title={sponsor.name}
            height={300}
            width={300}
          />
        </div>

        <div className={styles.content}>
          <div className={styles['links-wrapper']}>
            {linksList.map(link => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(styles.button, { [styles['button-black']]: contrastRatio <= 4 })}
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
        </div>
      </div>
    </div>
  );
}
