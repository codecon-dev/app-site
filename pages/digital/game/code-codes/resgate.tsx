import Page from '@components/_ui/Page';
import PrivateArea from '@components/_ui/PrivateArea';
import Claim from '@components/code-codes/Claim';
import Header from '@components/_ui/Header';

export default function CodeCodesResgate() {
    const meta = {
        title: 'Resgate Code-codes - Codecon Digital 2022',
        image: '/images/share-image.png'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <Header title="Code-codes" description="Resgate aqui os seus códigos!" smaller />

            <PrivateArea>
                <Claim />
            </PrivateArea>
        </Page>
    );
}
