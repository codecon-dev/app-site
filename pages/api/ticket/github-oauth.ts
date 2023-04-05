import { NextApiRequest, NextApiResponse } from 'next';
import { URLSearchParams } from 'url';
import { renderSuccess, renderError } from '@lib/render-github-popup';

export default async function githubOAuth(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.code) {
        // This happens when user cancelled the authentication.
        // In this case, we send an empty message which indicates no data available.
        res.end(renderSuccess());
        return;
    }

    const q = new URLSearchParams({
        client_id: process.env.NEXT_PUBLIC_GITHUB_OAUTH_CLIENT_ID || '',
        client_secret: process.env.GITHUB_OAUTH_CLIENT_SECRET || '',
        code: req.query.code
    }).toString();

    const accessTokenRes = await fetch(`https://github.com/login/oauth/access_token?${q}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        }
    });

    if (!accessTokenRes.ok) {
        console.error(
            `Failed to get access token: ${accessTokenRes.status} ${await accessTokenRes.text()}`
        );
        res.statusCode = 500;
        res.end(renderError());
        return;
    }

    const { access_token: accessToken } = await accessTokenRes.json();

    const userRes = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `bearer ${accessToken as string}`
        }
    });

    if (!userRes.ok) {
        console.error(`Failed to get GitHub user: ${userRes.status} ${await userRes.text()}`);
        res.statusCode = 500;
        res.end(renderError());
        return;
    }

    const user = await userRes.json();

    res.end(renderSuccess({ id: user.id, login: user.login, name: user.name }));
}
