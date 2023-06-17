import Page from '@components/_ui/Page/Page';
import PrivateArea from '@components/_ui/PrivateArea/PrivateArea';

import OpenChest from '@components/bau/OpenChest/OpenChest';
import ChestModel from '@models/chest/Chest';
import { GetServerSideProps } from 'next';

type BauProps = {
    chestPublicId: string;
};

export default function Bau({ chestPublicId }: BauProps) {
    const meta = { title: 'Baú de Prêmios - Codecon Digital' };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <PrivateArea>
                <OpenChest chestPublicId={chestPublicId} />
            </PrivateArea>
        </Page>
    );
}

export const getServerSideProps: GetServerSideProps<BauProps> = async context => {
    const publicId = context.params?.publicId;
    if (!publicId) return { notFound: true };

    const chest = await ChestModel.findOne({ where: { publicId: publicId } });
    if (!chest) return { notFound: true };

    return {
        props: {
            chestPublicId: chest.publicId
        }
    };
};
