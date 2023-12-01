import Page from '@components/_ui/Page';
import HeroIa from '@components/temp-site/HeroIA';
import Chat from '@components/temp-site/Chat';
import GitHubBot from '@components/temp-site/GitHubBot';
import Faq from '@components/home/Faq';

export default function Index() {
    const meta = {
        title: 'Senior-GPT • IA para pessoas desenvolvedoras • Codecon',
        description: 'A primeira ia brasileira focada em pessoas desenvolvedoras',
        image: 'https://codecon.dev/ia-share.png'
    };

    return (
        <Page meta={meta} theme="ia">
            <HeroIa />
            <Chat />
            <GitHubBot />
            <Faq />
        </Page>
    );
}
