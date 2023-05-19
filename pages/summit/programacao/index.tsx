import { GetStaticProps } from 'next';

import { getAllTalks, getAllSponsors } from '@lib/cms-api';
import { Sponsor, Talk } from '@lib/types/all';

import Page from '@components/_ui/Page';
import Header from '@components/_ui/Header';
import Schedule from '@components/programacao/ScheduleSummit';

type Props = {
    talks: Talk[];
    sponsors: Sponsor[];
};

export default function Programacao({ talks, sponsors }: Props) {
    const meta = {
        title: 'Programação - Codecon Summit',
        description:
            'Programe-se! São 3 salas simultâneas, workshops e muitas atividades extras rolando nos três dias de evento.'
    };

    return (
        <Page theme="summit" meta={meta} sponsors={sponsors}>
            <Header
                title="Programação"
                description="Anote na agenda e programe-se! São vários conteúdos simultâneos e muitas atividades extras rolando durante o evento."
            />
            <Schedule talks={talks} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const talks = await getAllTalks('summit');
    const sponsors = await getAllSponsors('summit');

    return {
        props: {
            talks,
            sponsors
        }
    };
};
