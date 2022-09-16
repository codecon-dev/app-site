import { GetStaticProps } from 'next';

import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import Header from '@components/_ui/Header';
import Rank from '@components/code-codes/Ranking';

export default function ComoFunciona() {
    const meta = {
        title: 'Como funciona Code-codes - Codecon Digital 2021',
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <Header title="Code-codes" description="Como funciona" />
                    <div className='container'>
                        <p> Texto </p>

                    </div>
            </Layout>
        </Page>
    );
}

