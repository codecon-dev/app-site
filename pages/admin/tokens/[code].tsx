import { GetStaticProps, GetStaticPaths } from 'next';

import Page from '@components/_ui/Page';
import { getToken } from '@lib/codecodes-api';

import { CodecodesToken } from '@lib/types/codecodes';

type Props = {
    token: CodecodesToken;
};

export default function Token({ token }: Props) {
    console.log(token);

    return (
        <Page theme="summit" hideNav noPadding>
            oioi
        </Page>
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
            attendee: token.data
        }
    };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = () => {
    return {
        paths: [],
        fallback: 'blocking'
    };
};
