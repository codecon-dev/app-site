import Button from '@components/_ui/LinkButton/LinkButton';
import Page from '@components/_ui/Page';
import PrivateArea from '@components/_ui/PrivateArea';
import Claim from '@components/code-codes/Claim';

export default function Twilio() {
    const meta = {
        title: 'Complete seu cadastro - Codecon Summit'
    };

    return (
        <Page theme="summit" meta={meta} hideNav hideFooter>
            <PrivateArea>
                <section>
                    <div className="container" style={{ textAlign: 'center' }}>
                        <h2>Tudo certo!</h2>
                        <Button href='https://wa.me/551150393737'>Voltar para o WhatsApp</Button>
                    </div>
                </section>
            </PrivateArea>
        </Page>
    );
}
