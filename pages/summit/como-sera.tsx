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
        title: 'Como será - Codecon Summit'
    };

    const eventData = getEventData('summit');
    const { eventPrice, registerUrlWithCode } = useActiveEventPrice(eventData);

    return (
        <Page theme="summit" meta={meta} sponsors={sponsors}>
            <Header
                title={
                    <>
                        A sua melhor experiência em um <span>evento dev</span>
                    </>
                }
                description="A Codecon Summit é um festival que traz discussões do mundo real sobre código, atividades interativas e muito mais."
            />
            <Info>
                <Info.Text title="O festival de programação para todas as linguagens">
                    <p>
                        O evento reúne inovação, tecnologia, código e diversão. A
                        Codecon busca trazer assuntos do momento que impactam a vida de pessoas
                        desenvolvedoras e de várias linguagens de programação diferentes.
                    </p>
                </Info.Text>
                <Info.Image src="/images/summit/todas-linguagens.jpg" />
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
                <Info.Image src="/images/summit/cookies.jpg" />

                <Info.Text title="Meet & cookies, fish bowls e mais formas de conteúdo">
                    <p>
                        Já pensou ficar até o final nas apresentações e ganhar um cookie? Quem é que
                        não gosta? Ou então uma apresentação em que você pode participar da
                        discussão no palco? São formas diferentes de participar de um evento onde a
                        experiência está em primeiro lugar.
                    </p>
                </Info.Text>
            </Info>
            <Info>
                <Info.Text title="Espaços para troca de conhecimento">
                    <p>
                        Além do conteúdo tradicional, outros espaços para rodas de discussão e "open
                        space", onde pessoas podem trazer temas e dicustir sobre software e código e
                        uma forma totalmente diferente.
                    </p>
                </Info.Text>
                <Info.Image src="/images/summit/espacos.jpg" />
            </Info>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const sponsors = await getAllSponsors('summit');

    return {
        props: {
            sponsors
        }
    };
};
