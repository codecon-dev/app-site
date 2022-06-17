import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import Testimonial from '@components/como-funciona/Testimonial';
import OfferedBy from '@components/_ui/OfferedBy';

export default function ComoFunciona() {
  const meta = {
    title: 'Como funciona - Codecon'
  };

  return (
    <Page meta={meta}>
      <Layout>
        <Testimonial
          text={`Foi o melhor evento que participei na pandemia, muito mais interativo e "humanizado", deu para ter aquela experiência de "andar à toa" e conhecer gente, e parar e entrar em salas e assistir as palestras.`}
        />
        <OfferedBy
          logo="https://www.datocms-assets.com/43312/1631813961-americanas.svg"
          name="Codecon"
          type="black"
        />
      </Layout>
    </Page>
  );
}
