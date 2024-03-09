# Site Codecon

Este é o repositório com o código da área do participante [Codecon](https://app.codecon.dev). O projeto foi desenvolvido usando Next.js e está hospedado na Vercel.

[![powered-by-vercel](https://user-images.githubusercontent.com/9409763/169923371-134b50cd-36f4-4b42-a391-17a1bccdc100.svg)](https://vercel.com/?utm_source=codecon&utm_campaign=oss)

## Pré-requisitos

- Yarn

## Primeiros passos

O primeiro passo é fazer um clone do repositório na sua máquina.

```
git clone git@github.com:codecon-dev/app-site.git
```

Para configurar as variáveis de ambiente, você precisará da Vercel CLI. O primeiro passo é instalar:

```
yarn global add vercel
```

Você precisa também ter acesso a conta da Vercel da Codecon, por isso fale com um admin para que te adicione.

Acesse a pasta do projeto e linke o projeto à Vercel. Rode o comando `vercel link` e preencha conforme o exemplo abaixo. O time se chama `Codecon` e o projeto `site`.

```
vercel link
? Set up and deploy "~/workspace/app-si"? [Y/n] y
? Which scope do you want to deploy to? Codecon
? Link to existing project? [y/N] y
? What’s the name of your existing project? site
🔗 Linked to codecon/site (created .vercel and added it to .gitignore)
```

> Caso você tenha problemas ao rodar o comando `vercel`, [pode seguir este tutorial](https://github.com/vercel/vercel/discussions/5019).

Tudo certo pra começar agora. Ainda na pasta do repositório rode os comandos:

```
vercel env pull && yarn
```

Dessa forma você irá baixar as variáveis de ambiente configuradas na Vercel e também instalar as dependências.

As variáveis de ambiente irão trazer os dados de banco de dados online Sandbox da Codecon, dessa forma você não precisa rodar um banco em localhost. Você pode acessar o PHPMyAdmin para editar o banco de dados MySQL usando as mesmas credenciais disponíveis no arquivo `.env.local`.

## Sincronização do banco de dados

Para sincronizar o banco de dados e rodar os migrations necessários, basta adicionar o novo model criado no arquivo `/api/sync-database.js`, depois acessar a página via navegador:

```
http://localhost:3000/api/sync-database
```
