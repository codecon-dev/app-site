import ConfContainer from './conf-container';
import styles from './index.module.css';
import Hero from './home/hero';
import Cta from './home/cta';
import Experience from './home/experience';
import Nobody from './home/nobody';
import DarkCity from './home/dark-city';

import { Speaker } from '@lib/types';
import ItsFor from './home/its-for';
import Events from './home/events';
import IconCard from './home/IconCard/IconCard';
import Alert from './_ui/Alert/Alert';

type Props = {
  speakers: Speaker[];
};

export default function Conf() {
  return (
    <ConfContainer>
      <Hero />
      <Alert
        title="Call4Papers"
        description="Quer compartilhar seu conhecimento com o mundo? Envie sua sugestão de palestra ou workshop."
        buttonText="Submeta seu conteúdo"
        buttonHref="https://tally.so/r/mOyDRw"
      />
      <Alert
        title="A pesquisa que vai mapear o mercado de tecnologia"
        description="Criamos uma pesquisa para entender o real estado da área tech no Brasil."
        buttonText="Responda"
        buttonHref="https://pesquisa.codecon.dev/"
      />
      <div className={styles.container}>
        <IconCard
          iconName="mail"
          title="Newsletter Codecon"
          description="Um e-mail quinzenal com links de tecnologia, código, ferramentas e notícias da área de programação."
          buttonHref="https://www.getrevue.co/profile/codecon"
          buttonText="Inscreva-se grátis"
        />
        <IconCard
          iconName="dev"
          title="Festival de tecnologia"
          description="A próxima edição online acontece em setembro de 2022 e contará com palestras, painéis, workshops, desafios e muita gamificação"
          buttonHref="https://docs.google.com/presentation/d/e/2PACX-1vSV13YbPvtC4XXKayWs8bNfmYu1sJ2ldzBf2bsfO6DTj38tTpECZQ1ovFtyXaFm_xSJXuSErCaSSkFz/pub?start=false&loop=false&delayms=3000"
          buttonText="Veja a apresentaçào"
        />
        <IconCard
          iconName="shirt"
          title="Camisetas para devs e devas"
          description="Criamos modelos de camisetas para você passear e mostrar pro mundo que adora programação e tecnologia."
          buttonHref="https://codecon.dev/lojinha"
          buttonText="Compre já"
        />
      </div>
    </ConfContainer>
  );
}
