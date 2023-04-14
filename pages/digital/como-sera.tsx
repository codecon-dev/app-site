import { GetStaticProps } from 'next';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';
import { getEventData } from '@lib/constants';
import { useActiveEventPrice } from '@lib/hooks/useActiveEventPrice';

import Page from '@components/_ui/Page';
import Header from '@components/_ui/Header';
import LinkButton from '@components/_ui/LinkButton';
import Info from '@components/como-sera/Info';

type Props = {
    sponsors: Sponsor[];
};

export default function ComoFunciona({ sponsors }: Props) {
    const meta = {
        title: 'Como será - Codecon Digital'
    };

    const eventData = getEventData('digital');
    const { eventPrice, registerUrlWithCode } = useActiveEventPrice(eventData);

    return (
        <Page theme="digital" meta={meta}>
            <Header
                title={
                    <>
                        É um evento, <br />
                        <span>mas nem parece</span>!
                    </>
                }
                description="A Codecon é um festival de tecnologia online que reúne código, conteúdo, networking e muita diversão."
            />
            <Info>
                <Info.Text title="Uma experiência imersiva em pixel art">
                    <p>
                        Uma cidade inteira em 16bits repleta de easter eggs, referências a RPGs e
                        era medieval, estandes de patrocinadores, salas de conteúdo e muitas outras
                        surpresas.{' '}
                    </p>
                    <p>
                        Uma experiência incrível onde você nem vai perceber a hora passar e vai se
                        divertir de monte.
                    </p>
                </Info.Text>
                <Info.Image src="/images/digital/cidade-deployr.jpg" />
            </Info>
            <section className="text-center">
                {eventPrice && (
                    <LinkButton
                        href={registerUrlWithCode || eventData.registerUrl}
                        info={eventPrice}
                    >
                        Inscreva-se
                    </LinkButton>
                )}
            </section>
            <Info>
                <Info.Image src="/images/digital/code-codes.jpg" />

                <Info.Text title="Code-codes">
                    <p>
                        É um ranking global do nosso evento, onde você acumula códigos que valem
                        pontos e prêmios no final. Encontre bugs, participe de atividades, descubra
                        os easter eggs, assista os conteúdos e visite stands. Quanto mais você
                        aproveitar o evento, mais chances terá!
                    </p>
                </Info.Text>
            </Info>
            <Info>
                <Info.Text title="Palestras, painéis, fish bowls e muito mais">
                    <p>
                        Nossos conteúdos são pensados para que você aprenda sem que seja algo
                        maçante e sem graça. Além de sair por dentro do que há de melhor na
                        tecnologia, você vai sair com gostinho de quero mais.
                    </p>
                </Info.Text>

                <Info.Image src="/images/digital/muito-mais.jpg" />
            </Info>
            <Info>
                <Info.Image src="/images/summit/blob.jpg" />

                <Info.Text title="Hackathon de projetos desnecessários & ideias que ninguém precisa">
                    <p>
                        Sabe aquele site onde tem um grande botão vermelho escrito “não aperte”, mas
                        quando você aperta algo muito legal acontece? Começa a tocar uma música de
                        fundo e aparecem animações psicodélicas. São esses tipos de projetos que
                        queremos que você crie.
                    </p>
                </Info.Text>
            </Info>
            <Info>
                <Info.Text title="My sword is my code.">
                    <p className="headline">
                        Online <span className="bullet">&bull;</span> 22 e 23 de junho
                    </p>
                    <br />

                    {eventPrice && (
                        <LinkButton
                            href={registerUrlWithCode || eventData.registerUrl}
                            info={eventPrice}
                        >
                            Inscreva-se
                        </LinkButton>
                    )}
                </Info.Text>
                <Info.Testimonial>
                    <p>
                        “A Codecon é um dos melhores eventos (se não o melhor!) em atividade hoje.
                        Tirei um tempo pra passar pelo mapa, parei nos estandes, estou esperando um
                        painel. Melhor experiência em eventos remotos!”
                    </p>
                </Info.Testimonial>
            </Info>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const sponsors = await getAllSponsors('digital');

    return {
        props: {
            sponsors
        }
    };
};
