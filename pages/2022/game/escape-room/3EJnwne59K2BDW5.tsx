import Page from '@components/2022/_ui/Page';
import Layout from '@components/2022/_ui/Layout';
import CodeEditor from '@components/2022/escape-room/CodeEditor';

export default function EscapeRoomThree() {
    const meta = {
        title: 'Escape Room - Codecon Digital 2022'
    };

    const wrongCode = `function populateCity(quantity) {
  for (let i = 0; i < quantity; i++) {
    if (canBeAgent(i)) createAgent();

    createUser();
  }

  createTheOne();
}

function isBulletTime(user) {
  if (!user.isTheOne) return;

  pauseTime(2, ease, 10);
  escapeFromBullets(user);
}

function isValidClone(agent) {
  if (!agent.hasParent()) return false;

  return true;
}

function createBirdsAndTrees(city) {
  const numberOfBirds = city.size / 3;

  for (let x = 1; x < numberOfBirds; x++) {
    createBird(x);

    if (x % 8) creatTree();
  }
}`;

    const rightCode = `function populateCity(quantity) {
    for (let i = 0; i < quantity; i++) {  
      createUser();
    }
  
    createTheOne();
  }
  
  function isBulletTime(user) {
    if (!user.isTheOne) return;
  
    pauseTime(2, ease, 10);
    escapeFromBullets(user);
  }
  
  function createBirdsAndTrees(city) {
    const numberOfBirds = city.size / 3;
  
    for (let x = 1; x < numberOfBirds; x++) {
      createBird(x);
  
      if (x % 8) creatTree();
    }
  }`;

    return (
        <Page meta={meta}>
            <Layout hideNav hideFooter>
                <CodeEditor rightCode={rightCode} wrongCode={wrongCode} answer="R" />
            </Layout>
        </Page>
    );
}
