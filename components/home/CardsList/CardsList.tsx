import IconCard from './IconCard/IconCard';
import styles from './CardsList.module.scss';

export default function CardsList() {
  return (
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
  );
}
