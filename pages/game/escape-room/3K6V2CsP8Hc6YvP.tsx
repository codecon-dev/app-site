import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import CodeEditor from '@components/escape-room/CodeEditor';

export default function EscapeRoomThree() {
    const meta = {
        title: 'Escape Room - Codecon Digital 2022'
    };

    const wrongCode = `function startAgent() {
  const agent = new Agent();
  if (!isAgentFree) return;

  saveMessageFrom(agent, 'Agent started');
  let cloneOne = createClone(agent);

  findOneTheOne();
  destroy();
}

function teleport(user, x, y) {
  if (!user.isTheOne) return;

  user.x = x;
  user.y = y;
}`;

    const rightCode = `function teleport(user, x, y) {
  if (!user.isTheOne) return;

  user.x = x;
  user.y = y;
}`;

    return (
        <Page theme='digital' meta={meta}>
            <Layout hideNav hideFooter>
                <CodeEditor rightCode={rightCode} wrongCode={wrongCode} answer="F" />
            </Layout>
        </Page>
    );
}
