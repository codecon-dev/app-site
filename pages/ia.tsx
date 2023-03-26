import Page from '@components/_ui/Page';
import HeroIa from '@components/temp-site/HeroIa';
import Chat from '@components/temp-site/Chat';
import GitHubBot from '@components/temp-site/GitHubBot';
import Faq from '@components/home/Faq';

export default function Index() {
    const meta = {
        title: 'CodeSNR • IA para pessoas desenvolvedoras • Codecon',
        description: 'A primeira ia brasileira focada em pessoas desenvolvedoras'
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
