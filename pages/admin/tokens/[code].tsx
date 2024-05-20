import { GetStaticProps, GetStaticPaths } from 'next';

import { getToken } from '@lib/codecodes-api';

import { CodecodesToken } from '@lib/types/codecodes';
import PrivateArea from '@components/_ui/PrivateArea';
import AdminArea from '@components/AdminArea';
import Tokens from '@components/AdminArea/Tokens';

type Props = {
    token: CodecodesToken;
};

export default function Token({ token }: Props) {
    console.log(token);

    return (
        <PrivateArea onlyAdmin>
            <AdminArea>
                <Tokens token={token} />
            </AdminArea>
        </PrivateArea>
    );
}

export const getStaticProps: GetStaticProps<any> = async ({ params }) => {
    const code = params?.code;
    const token = await getToken(code as string);

    if (token.status !== 'success') {
        return {
            notFound: true
        };
    }

    return {
        props: {
            token: token.data
        }
    };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = () => {
    return {
        paths: [],
        fallback: 'blocking'
    };
};
