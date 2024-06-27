import { GetStaticProps } from 'next';

import PrivateArea from '@components/_ui/PrivateArea';
import AdminArea from '@components/AdminArea';
import Tokens from '@components/AdminArea/Tokens';

import { CodecodesToken } from '@lib/types/codecodes';
import { getAllTokens } from '@lib/codecodes-api';

export default function AllTokens({ tokens }: { tokens: CodecodesToken[] }) {
    return (
        <PrivateArea onlyAdmin>
            <AdminArea>
                <Tokens allTokens={tokens} />
            </AdminArea>
        </PrivateArea>
    );
}

export const getStaticProps: GetStaticProps<any> = async () => {
    const tokens = await getAllTokens();

    if (tokens.status !== 'success') {
        return {
            notFound: true
        };
    }

    return {
        props: {
            tokens: tokens.data
        },
        revalidate: 1
    };
};
