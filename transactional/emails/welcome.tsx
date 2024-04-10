import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import * as React from 'react';

interface WelcomeEmailProps {
    name?: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

export const WelcomeEmail = ({ name }: WelcomeEmailProps) => {
    const previewText = `Vem gerar seu ticket personalizável da Codecon Summit!`;
    const inviteLink = 'https://app.codecon.dev/';

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Tailwind>
                <Body className="bg-white my-auto mx-auto font-sans px-2">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
                        <Section className="mt-[32px]">
                            <Img
                                src={`${baseUrl}/logo-summit.png`}
                                width="200"
                                height="60"
                                alt="Logo Codecon Summit"
                            />
                        </Section>
                        <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                            Boas vindas a Codecon Summit!
                        </Heading>
                        <Text className="text-black text-[14px] leading-[24px]">Olá {name},</Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Estamos muito felizes pela sua confirmação de inscrição na Codecon
                            Summit. O evento acontece dias 6 e 7 de setembro mas você já pode ficar
                            por dentro de tudo que estamos planejando.
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Preparamos uma área exclusiva para as pessoas inscritas, onde você
                            poderá{' '}
                            <strong>
                                gerar um ticket personalizado para compartilhar nas redes sociais
                            </strong>{' '}
                            e ter acesso a nossa documentação.
                        </Text>
                        <Text className="text-black text-[14px] leading-[24px]">
                            Ué, se toda API precisa de uma documentação, porque um evento não? :P
                        </Text>
                        <Section className="text-center">
                            <Img
                                src={`${baseUrl}/images/seu-ticket.png`}
                                width="511"
                                height="290"
                                alt="Gere agora seu ticket compartilhável"
                            />
                        </Section>
                        <Section className="text-center mt-[32px] mb-[32px]">
                            <Button
                                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                                href={inviteLink}
                            >
                                Acessar área do inscrito
                            </Button>
                        </Section>
                        <Text className="text-black text-[14px] leading-[24px]">
                            ou copie e cole o link no seu navegador:{' '}
                            <Link href={inviteLink} className="text-blue-600 no-underline">
                                {inviteLink}
                            </Link>
                        </Text>
                        <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                        <Text className="text-[#666666] text-[12px] leading-[24px]">
                            Esta mensagem foi enviada para você pois você se inscreveu na Codecon
                            Summit 2024, caso este e-mail tenha sido enviado erroneamente, por
                            favor, ignore-o.
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

WelcomeEmail.PreviewProps = {
    name: 'Gabriel'
} as WelcomeEmailProps;

export default WelcomeEmail;
