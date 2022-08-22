/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useEffect, useRef } from 'react';

import 'xterm/css/xterm.css';
import styles from './Terminal.module.scss';

let command = '';
let isPass = false;
let level = 0;

const commands = {
  help: term => {
    term.writeln(
      [
        'Seja bem-vindo(a) a nossa Escape Room!',
        '',
        'help - mostra essa ajuda',
        'sudo - entra no sistema',
        ''
      ].join('\n\r')
    );
    prompt(term);
  },
  sudo: term => {
    sudo(term);
  },
  su: term => {
    sudo(term);
  },
  access: term => {
    if (level === 0) {
      term.writeln('access: Você precisa ser root para usar este comando.');
      prompt(term);
      return;
    }

    level = 2;
    term.writeln(['Quem você quer acessar?'].join('\r\n'));
    promptMatrix(term);
  },
  operator: term => {
    if (level < 2) {
      term.writeln('operator: Você não tem permissão para fazer isso.');
      prompt(term);
      return;
    }

    level = 3;
    term.writeln(['Operador aqui, o que eu posso fazer pra você?'].join('\r\n'));
    promptMatrix(term);
  },
  getpassword: term => {
    if (level < 3) {
      term.writeln('getpassword: Você não tem permissão para fazer isso.');
      prompt(term);
      return;
    }

    level = 4;
    term.writeln(['Tá aqui: redpill'].join('\r\n'));
    prompt(term);
  },
  matrix: term => {
    const testData = [];
    for (let i = 0; i < 50; i++) {
      const count = 1 + Math.floor(Math.random() * 79);
      const data = new Uint8Array(count + 2);
      data[0] = 0x0a; // \n
      for (let i = 1; i < count + 1; i++) {
        data[i] = 0x61 + Math.floor(Math.random() * (0x7a - 0x61));
      }
      data[data.length - 1] = 0x0d; // \r
      testData.push(data);
    }
    for (let i = 0; i < 1024; i++) {
      for (const d of testData) {
        term.write('\x1b[32;1m');
        term.write(d);
        term.write('\x1b[0m');
        term.write(`\x1b[32;1m${d}\x1b[0m`);
      }
    }
    term.write('', () => {
      term.write(`\n\r\n`);
      term.prompt();
    });
  }
};

function prompt(term) {
  command = '';

  if (level > 1) level = 1;

  term.write('\r\n$ ');
}

function promptMatrix(term) {
  command = '';
  term.write('\r\n\x1b[32;1mM >\x1b[0m ');
}

function sudo(term) {
  command = '';
  isPass = true;
  term.write('Password: ');
}

function runPassword(term, text) {
  const command = text.trim().split(' ')[0];
  isPass = false;

  if (command.length > 0) {
    term.writeln('');
    if (text == '1234') {
      level = 1;
      prompt(term);
      return;
    }

    term.writeln(`su: Senha incorreta`);
    prompt(term);
  }
}

function runCommand(term, text) {
  const command = text.trim().split(' ')[0];
  if (command.length > 0) {
    term.writeln('');
    if (command in commands) {
      commands[command](term);
      return;
    }
    term.writeln(`${command}: comando não encontrado.`);
  }
  prompt(term);
}

export default function Terminal() {
  const xtermRef = useRef(null);

  useEffect(() => {
    const initTerminal = async () => {
      const { Terminal } = await import('xterm');
      const { FitAddon } = await import('xterm-addon-fit');
      const fitAddon = new FitAddon();
      xtermRef.current = new Terminal({
        cursorBlink: true
      });
      xtermRef.current.loadAddon(fitAddon);
      xtermRef.current.open(document.getElementById('terminal'));
      fitAddon.fit();

      xtermRef.current.prompt = () => {
        xtermRef.current.write('\r\n$ ');
      };

      xtermRef.current.writeln(
        [
          'Precisamos deletar um vírus que se infiltrou nos mainframes de Zion,',
          'sua ajuda será fundamental para conter essa ameaça.',
          'Avance pelas camadas de segurança do sistema para conseguir encontrar o vírus',
          'Estamos emulando uma \x1b[32;1mmatrix\x1b[0m para conseguir a ajuda de mais pessoas.',
          'O desafio desse quarto é montar um código para conseguir a senha de acesso ao sistema.',
          'Para iniciar, \x1b[32;1mdigite o código\x1b[0m correto para ter acesso \x1b[32;1mroot\x1b[0m ao terminal principal.',
          '',
          ''
        ].join('\n\r')
      );
      prompt(xtermRef.current);

      xtermRef.current.onData(e => {
        switch (e) {
          case '\u0003': // Ctrl+C
            xtermRef.current.write('^C');
            prompt(xtermRef.current);
            break;
          case '\r': // Enter
            if (isPass) {
              runPassword(xtermRef.current, command);
            } else {
              runCommand(xtermRef.current, command);
            }

            command = '';
            break;
          case '\u007F': // Backspace (DEL)
            let bufferSize = 2;

            if (isPass) {
              bufferSize = 10;
            }

            if (xtermRef.current._core.buffer.x > bufferSize) {
              xtermRef.current.write('\b \b');
              command = command.substr(0, command.length - 1);
            }
            break;
          default: // Print all other characters for demo
            if (
              (e >= String.fromCharCode(0x20) && e <= String.fromCharCode(0x7e)) ||
              e >= '\u00a0'
            ) {
              command += e;
              if (!isPass) xtermRef.current.write(e);
            }
        }
      });
    };

    void initTerminal();
  }, []);

  return (
    <section>
      <div className="container">
        <div id="terminal" className={styles.terminal} />
      </div>
    </section>
  );
}
