import Page from '@components/_ui/Page';
import PrivateArea from '@components/_ui/PrivateArea';
import Claim from '@components/code-codes/Claim';
import Header from '@components/_ui/Header';

export default function CodeCodesResgate() {
    const meta = {
        title: 'Resgate Code-codes - Codecon Digital'
    };

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <PrivateArea>
                <>
                    <Claim />
                </>
            </PrivateArea>
        </Page>
    );
}
