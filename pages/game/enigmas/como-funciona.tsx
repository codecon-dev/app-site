import { GetStaticProps } from 'next';

import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import Header from '@components/_ui/Header';

export default function ComoFunciona() {
    const meta = {
        title: 'Como funciona Enigmas - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <Header title="Enigmas" description="Como funciona" smaller />
                <div className="container">
                    <p> Texto </p>
                </div>
            </Layout>
        </Page>
    );
}
