import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import PrivateArea from '@components/2022/_ui/PrivateArea';
import Claim from '@components/2022/code-codes/Claim';
import Header from '@components/2022/_ui/Header';

export default function CodeCodesResgate() {
    const meta = {
        title: 'Resgate Code-codes - Codecon Digital 2022'
    };

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <Header title="Code-codes" description="Resgate aqui os seus códigos!" smaller />

                <PrivateArea>
                    <Claim />
                </PrivateArea>
            </Layout>
        </Page>
    );
}
