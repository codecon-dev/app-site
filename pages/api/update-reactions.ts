import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import cookie from 'cookie';
import ms from 'ms';
import { query } from '@lib/db';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../../package.json'

type successResponse = {
    success: boolean
};

type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export default async function updateReaction(
  req: NextApiRequest,
  res: NextApiResponse<successResponse | ErrorResponse>
) {
    const uuid = req.cookies['codecon-uuid'] || uuidv4();

    if (req.method !== 'POST') {
        return res.status(501).json({
        error: {
            code: 'method_unknown',
            message: 'This endpoint only responds to POST'
        }
        });
    }

    const id: string = ((req.body.id as string) || '');
    if (!validator.isNumeric(id)) {
        return res.status(400).json({
        error: {
            code: 'bad_id',
            message: 'Invalid ID'
        }
        });
    }

    const name = ((req.body.name as string) || '');
    if (!name) {
        return res.status(400).json({
        error: {
            code: 'bad_name',
            message: 'Invalid name'
        }
        });
    }

    let statusCode;

    const userVoted = await query(
        `
        SELECT 
        *
        FROM users_reactions
        WHERE 
            reactions_id = ? 
            AND
            uuid = ? 
            AND
            reaction = ?
        `,
        [
            id,
            uuid,
            name
        ]
    );

    if (userVoted[0]) {
        return res.status(400).json({
            error: {
            code: 'already_voted',
            message: 'User already voted'
            }
        });
    }
    
    await query(
        `
        INSERT INTO users_reactions
        (
            reactions_id,
            uuid,
            reaction
        )
        VALUES (?, ?, ?)
        `,
        [
            id,
            uuid,
            name
        ]
    );
    
    const reactionData = await query(
        `
        SELECT 
        *
        FROM reactions
        WHERE id = ?
        `,
        [id]
    );

    if (reactionData[0]) {
        await query(
            `
            UPDATE reactions 
            SET 
            ${name} = ${name} + 1
            WHERE id = ${id}
            `
        );

        statusCode = 200;
    } else {
        await query(
        `
        INSERT INTO reactions 
        (
            id,
            ${name}
        )
        VALUES (?, ?)
        `,
        [
            id,
            1
        ]
        );

        statusCode = 200; 
    }
    if (config.useCookies) {
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('codecon-uuid', `${uuid}`, {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            path: '/api',
            expires: new Date(Date.now() + ms('7 days'))
            })
        );
    }

    return res.status(statusCode).json({
        success: true
    });
}
