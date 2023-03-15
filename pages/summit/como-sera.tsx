import { GetStaticProps } from 'next';

import { getAllSponsors } from '@lib/cms-api';
import { Sponsor } from '@lib/types/all';

import Page from '@components/_ui/Page';
import Header from '@components/_ui/Header';
import LinkButton from '@components/_ui/LinkButton';
import Info from '@components/como-sera/Info';
import { getEventData } from '@lib/constants';

type Props = {
    sponsors: Sponsor[];
};

export default function ComoFunciona({ sponsors }: Props) {
    const meta = {
        title: 'Como será - Codecon Summit'
    };

    const eventData = getEventData('summit');

    return (
        <Page theme="summit" meta={meta}>
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
                        São dois dias de evento que reúne inovação, tecnologia, código e diversão. A
                        Codecon busca trazer assuntos do momento que impactam a vida de pessoas
                        desenvolvedoras e de várias linguagens de programação diferentes.
                    </p>
                </Info.Text>
                <Info.Image src="/images/summit/todas-linguagens.jpg" />
            </Info>
            <section className="text-center">
                <LinkButton href={eventData.registerUrl} info={eventData.eventPrice}>
                    Inscreva-se
                </LinkButton>
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
                <Info.Text title="Hackathon de projetos desnecessários & ideias que ninguém precisa">
                    <p>
                        Sabe aquele site onde tem um grande botão vermelho escrito “não aperte”, mas
                        quando você aperta algo muito legal acontece? Começa a tocar uma música de
                        fundo e aparecem animações psicodélicas. São esses tipos de projetos que
                        queremos que você crie.
                    </p>
                </Info.Text>

                <Info.Image src="/images/summit/blob.jpg" />
            </Info>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const sponsors = await getAllSponsors();

    return {
        props: {
            sponsors
        }
    };
};
