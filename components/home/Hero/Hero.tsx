import Image from 'next/image';

import Button from '@components/_ui/Button/Button';
import IconDiscord from '@components/icons/icon-discord';

import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles['col-1']}>
            <div className={styles.image}>
              <Image
                width={776}
                height={588}
                src="/hero.png"
                alt="Imagem de um livecoding em Next.js"
              />
            </div>
          </div>
          <div className={styles['col-2']}>
            <h1 className={styles.title}>
              A comunidade que te faz <span>crescer</span>
            </h1>

            <p className={styles.description}>
              Acompanhe os meetups semanais da nossa comunidade sobre desenvolvimento de software,
              ferramentas e tudo que há de bom.
            </p>

            <div className={styles.actions}>
              <Button type="primary" href="/programacao">
                Confira a programação
              </Button>
              <Button type="secondary" href="https://codecon.dev/discord">
                Acesse nosso Discord <IconDiscord color="#fff" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
