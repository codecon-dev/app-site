import Page from '@components/_ui/Page';
import PrivateArea from '@components/_ui/PrivateArea';
import Claim from '@components/code-codes/Claim';

export default function CodeCodesResgate() {
    const meta = {
        title: 'Resgate Code-codes - Codecon Summit'
    };

    return (
        <Page theme="summit" meta={meta} hideFooter hideWhatsApp>
            <PrivateArea>
                <>
                    <Claim />
                </>
            </PrivateArea>
        </Page>
    );
}
