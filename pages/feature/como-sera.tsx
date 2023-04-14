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
        title: 'Como será - Codecon Feature'
    };

    const eventData = getEventData('feature');
    const { eventPrice, registerUrlWithCode } = useActiveEventPrice(eventData);

    return (
        <Page theme="feature" meta={meta}>
            <Header
                title={
                    <>
                        Your <span>next step</span>
                    </>
                }
                description="A Codecon Feature é o lugar para você alcançar os próximos níveis em sua carreira."
            />
            <Info>
                <Info.Text title="Encontro para discussões de alto nível">
                    <p>
                        Um evento direcionado a pessoas desenvolvedoras em cargos sênior ou
                        superiores que desejam crescimento profissional e sair da inércia, trazendo
                        discussões para aprendizagem e inspiração em temas relacionados a equipe,
                        processo, tecnologia e desenvolvimento pessoal.
                    </p>
                </Info.Text>
                <Info.Image src="/images/feature/discussoes.jpg" />
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
                <Info.Image src="/images/feature/mentorias.jpg" />

                <Info.Text title="Mentorias em grupo">
                    <p>
                        Espaços onde será possível conversar e tirar dúvidas com pessoas que
                        avançaram alguns níveis e saber como é estar lá. Você quer lançar um curso?
                        Pensa que ser Principal Engineer é a melhor solução? Ou então quer ser CTO?
                        Que tal empreender?
                    </p>
                </Info.Text>
            </Info>
            <Info>
                <Info.Text title="Todo mundo participa">
                    <p>
                        Seja trazendo um tema para discussão em uma das salas de desconferência ou
                        participando ativamente da conversa. A Codecon Feature é um evento onde você
                        vai sair com gosto de quero mais.
                    </p>
                </Info.Text>

                <Info.Image src="/images/feature/todo-mundo.jpg" />
            </Info>
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const sponsors = await getAllSponsors('feature');

    return {
        props: {
            sponsors
        }
    };
};
