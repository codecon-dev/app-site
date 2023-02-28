import Page from '@components/_ui/Page';
import CodeEditor from '@components/escape-room/CodeEditor';

export default function EscapeRoomThree() {
    const meta = {
        title: 'Escape Room - Codecon Digital 2022'
    };

    const wrongCode = `let isAgentFree = true;
const theOne = 'Neo';

async function saveMessageFrom(sender, message) {
  try {
    await fetch(MESSAGE_URL, { sender, message }).then(result => {
      console.log(result);
    });
  } catch (error) {
    console.error(error);
  }
}

function purposeOfLife(life) {
  if (life.purpose) return life.purpose;
  
  return 'end';
}

function makeAgentFree(agent) {
  isAgentFree = true;
}

function makeFly(user) {
  if (!user.canFly) {
    return;
  }
  
  user.y++;
}`;

    const rightCode = `const theOne = 'Neo';
  
async function saveMessageFrom(sender, message) {
  try {
    await fetch(MESSAGE_URL, { sender, message }).then(result => {
      console.log(result);
    });
  } catch (error) {
    console.error(error);
  }
}

function purposeOfLife(life) {
  if (life.purpose) return life.purpose;
  
  return 'end';
}

function makeFly(user) {
  if (!user.canFly) {
    return;
  }
  
  user.y++;
}`;

    return (
        <Page theme="digital" meta={meta} hideNav hideFooter>
            <CodeEditor rightCode={rightCode} wrongCode={wrongCode} answer="R" />
        </Page>
    );
}
