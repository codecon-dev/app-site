import Page from '@components/_ui/Page';
import Layout from '@components/_ui/Layout';
import CodeEditor from '@components/escape-room/CodeEditor';

export default function EscapeRoomThree() {
  const meta = {
    title: 'Escape Room - Codecon Digital 2022'
  };

  const wrongCode = `function findOneTheOne() {
  const possibleTheOne = [];

  for (let i = 0; i < 50; i++) {
    const count = 1 + Math.floor(Math.random() * 79);
    const data = new Uint8Array(count + 2);
    data[0] = 0x0a;
    for (let i = 1; i < count + 1; i++) {
      data[i] = 0x61 + Math.floor(Math.random() * (0x7a - 0x61));
    }
    data[data.length - 1] = 0x0d;
    if (data.name == 'MR. ANDERSON') possibleTheOne.push(data);
  }

  return possibleTheOne;
}

function handleTransit(user) {
  if (!user.hasPermissionToMatrix) return;

  sendUserToMatrix(user);
  teleport(user, 0, 0);
}

function createClone(agent) {
  const clone = [...agent];
  clone.name = UUID(agent.name) + "UHasDn";

  return clone;
}`;

  const rightCode = `function findOneTheOne() {
  const possibleTheOne = [];

  for (let i = 0; i < 50; i++) {
    const count = 1 + Math.floor(Math.random() * 79);
    const data = new Uint8Array(count + 2);
    data[0] = 0x0a;
    for (let i = 1; i < count + 1; i++) {
      data[i] = 0x61 + Math.floor(Math.random() * (0x7a - 0x61));
    }
    data[data.length - 1] = 0x0d;
    if (data.name == 'MR. ANDERSON') possibleTheOne.push(data);
  }

  return possibleTheOne;
}

function handleTransit(user) {
  if (!user.hasPermissionToMatrix) return;

  sendUserToMatrix(user);
  teleport(user, 0, 0);
}`;

  return (
    <Page meta={meta}>
      <Layout hideNav hideFooter>
        <CodeEditor rightCode={rightCode} wrongCode={wrongCode} answer="M" />
      </Layout>
    </Page>
  );
}
