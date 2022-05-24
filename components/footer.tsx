import axios from 'axios';
import cn from 'classnames';
import styles from './footer.module.css';
import styleUtils from './utils.module.css';

import { Sponsor } from '@lib/types';
import IconDiscord from './icons/icon-discord';
import IconTwitter from './icons/icon-twitter';
import InstagramIcon from './icons/icon-instagram';

type Props = {
  sponsors?: Sponsor[];
  hideFooter: boolean;
};

export default function Footer({ sponsors, hideFooter }: Props) {
  if (hideFooter) return null;

  const onlySponsors = sponsors?.filter(s => s.tier !== 'silver');

  return (
    <div className={styles.wrapper}>
      {onlySponsors && (
        <div className={styles.container}>
          <h2 className={styles.title}>Patrocínio</h2>
          <div className={styles.sponsors}>
            {onlySponsors.map(s => (
              <a key={s.slug} href={s.website} target="_blank" rel="noopener noreferrer">
                <img src={s.logo.url} alt={s.name} />
              </a>
            ))}
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <div className={styles.container}>
          <div className={styles['footer-container']}>
            <div>
              A Codecon preza pela inclusão e diversidade.{' '}
              <br className={styleUtils['hide-on-mobile']} />
              Seguimos o{' '}
              <a
                href="https://www.codamos.club/codigo-de-conduta"
                target="_blank"
                rel="noopener noreferrer"
              >
                código de conduta da Codamos
              </a>
              .
            </div>
            <div className={styles.social}>
              <a
                className={styles.icon}
                href="https://twitter.com/codecondev"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconTwitter size={16} color="#fff" />
              </a>

              <a
                className={styles.icon}
                href="https://www.instagram.com/codecon.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon size={16} color="#fff" />
              </a>

              <a
                className={styles.icon}
                href="https://codecon.dev/discord"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconDiscord size={16} color="#fff" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
