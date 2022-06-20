import Image from 'next/image';

import { Column, Grid } from '@components/_ui/Grid';

export default function CodeCodes() {
  return (
    <section>
      <Grid align="center">
        <Column lg={5}>
          <h2>Code-codes</h2>
          <p>
            É um ranking global do nosso evento, onde você acumula códigos que valem pontos e ganha
            prêmios no final.
          </p>
        </Column>
        <Column lg={7}>
          <Image
            src="/images/como-funciona/prizes.png"
            alt="Imagens ilustrativas referentes a premiação da última edição da Codecon"
            width={662}
            height={335}
            layout="responsive"
          />
        </Column>
      </Grid>
      <Grid>
        <Column lg={4}>
          <h3>É época de caça de bugs</h3>
          <p>
            Ao caminhar pelo mapa você pode ser surpeendido por uma barata ou um besouro. Os bugs
            invadiram o nosso mapa e cada um te dá direito a um código.
          </p>
        </Column>
        <Column lg={4}>
          <h3>Participe das atividades extras</h3>
          <p>
            Cada atividade terá sua regra específica para que você acumule códigos secretos. Seja a
            pessoa mais rápida (ou mais esperta) para ficar na frente.
          </p>
        </Column>
        <Column lg={4}>
          <h3>Tudo é código?</h3>
          <p>
            Durante as palestras você pode ouvir palavras esquisitas... Aqui no nosso site pode ter
            alguns escondidos... E se esse easter egg fosse um código?
          </p>
        </Column>
      </Grid>
    </section>
  );
}
