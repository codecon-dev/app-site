/* eslint-disable @typescript-eslint/require-await */
import { GetStaticProps } from 'next';

import PrivateArea from '@components/_ui/PrivateArea';
import RoomSchedule from '@components/programacao/RoomSchedule';

import { getAllTalks } from '@lib/cms-api';
import { Talk } from '@lib/types/all';

type Props = {
    talks: Talk[];
};

export default function TalkPage({ talks }: Props) {
    return (
        <PrivateArea>
            <RoomSchedule talks={talks} onlyLiked />
        </PrivateArea>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const talks = await getAllTalks('summit');

    if (!talks) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            talks
        }
    };
};
