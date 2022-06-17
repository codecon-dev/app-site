import { ReactNode } from 'react';
import cn from 'classnames';
import NextImage from 'next/image';

import { Column, Grid } from '@components/_ui/Grid';
import OfferedBy from '@components/_ui/OfferedBy';
import { Image } from '@lib/types/all';

import styles from './Games.module.scss';

type Props = {
  title: string;
  content: ReactNode;
  image: string;
  sponsor?: { name: string; logo: Image };
  alternate?: boolean;
};

function GameSection({ title, content, image, sponsor, alternate }: Props) {
  const fullContent = (
    <>
      <h2>{title}</h2>
      {sponsor?.logo && (
        <OfferedBy logo={sponsor.logo.url} name={sponsor.name} offerType="Experiência" isBlackBg />
      )}
      {content}
    </>
  );

  const fullImage = (
    <NextImage src={image} alt={title} width={522} height={432} layout="responsive" />
  );

  return (
    <div className={cn(styles.game, { [styles.alternate]: alternate })}>
      <Grid align="center">
        <Column lg={alternate ? 5 : 4} sm={6}>
          {alternate ? fullImage : fullContent}
        </Column>
        <Column lg={alternate ? 2 : 3} sm={0} xsm={0} />
        <Column lg={alternate ? 4 : 5} sm={6}>
          {alternate ? fullContent : fullImage}
        </Column>
      </Grid>
    </div>
  );
}

export default function Games() {
  return (
    <section className={styles.testimonial}>
      <GameSection
        title="Enigmas da Olist"
        sponsor={{ name: 'Olist', logo: { url: '/images/como-funciona/olist.svg' } }}
        content={
          <>
            <p>
              Cada sala esconde um enigma que deve ser decifrado. Só você é capaz de descobrir a
              resposta (porquê nem eu sei).
            </p>
            <p>Quem terminar mais rápido em todos os dias também leva prêmios.</p>
          </>
        }
        image="/images/como-funciona/enigmas.jpg"
      />

      <GameSection
        alternate
        title="Maratona da Alura"
        sponsor={{ name: 'Alura', logo: { url: '/images/como-funciona/alura.svg' } }}
        content={
          <>
            <p>
              Uma competição onde você deve criar a melhor inteligência artificial para eliminar seu
              oponentes em diversos jogos. O mais rápido possível.
            </p>
            <p>Os melhores de cada dia de competição ganham prêmios.</p>
          </>
        }
        image="/images/como-funciona/maratona.jpg"
      />

      <GameSection
        title="Escape Room"
        content={
          <>
            <p>
              O seu objetivo (e do grupo) é conseguir finalizar todos os desafios em 20 minutos.
              Está na sua mão salvar o nosso mundo!
            </p>
            <p>
              Todos que conseguirem terminar a escape room participam de um sorteio valendo prêmios.
            </p>
          </>
        }
        image="/images/como-funciona/escape-room.jpg"
      />
    </section>
  );
}
