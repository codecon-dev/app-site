import Layout from '@components/_ui/Layout';
import Page from '@components/_ui/Page';
import Alert from '@components/_ui/Alert/Alert';
import Hero from '@components/home/Hero';
import CardsList from '@components/home/CardsList';

export default function Conf() {
  return (
    <Page>
      <Layout>
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
        <CardsList />
      </Layout>
    </Page>
  );
}
