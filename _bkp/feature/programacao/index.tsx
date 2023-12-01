import { GetStaticProps } from 'next';

import { getAllTalks, getAllSponsors } from '@lib/cms-api';
import { Sponsor, Talk } from '@lib/types/all';

import Page from '@components/_ui/Page';
import Header from '@components/_ui/Header';
import Schedule from '@components/programacao/ScheduleFeature';

type Props = {
    talks: Talk[];
    sponsors: Sponsor[];
};

export default function Programacao({ talks, sponsors }: Props) {
    const meta = {
        title: 'Programação - Codecon Feature',
        description:
            'Aprenda as principais tendências. Explore casos de uso. Implemente as melhores práticas.'
    };

    return (
        <Page theme="feature" meta={meta} sponsors={sponsors}>
            <Header
                title="Agenda"
                description={
                    <>
                        Aprenda as principais <strong>tendências</strong>. Explore{' '}
                        <strong>casos de uso</strong>. Implemente as{' '}
                        <strong>melhores práticas</strong>.
                    </>
                }
            />
            <Schedule talks={talks} />
        </Page>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const talks = await getAllTalks('feature');
    const sponsors = await getAllSponsors('feature');

    return {
        props: {
            talks,
            sponsors
        }
    };
};
