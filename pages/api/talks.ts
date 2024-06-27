import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import ApiResponse from 'src/api/ApiResponse';
import { getAllTalks, getAllSpeakers } from '@lib/cms-api';
import { Talk } from '@lib/types/all';

export default async function TalksController(req: NextApiRequest, res: NextApiResponse) {
    try {
        switch (req.method) {
            case 'GET':
                await get(req, res);
                break;
            default:
                ApiResponse.build(res, StatusCodes.BAD_REQUEST, 'Método não permitido');
        }
    } catch (exception) {
        console.error('LikesController >> Ocorreu um erro inesperado', exception);
        ApiResponse.build(res, StatusCodes.INTERNAL_SERVER_ERROR, 'Ocorreu um erro desconhecido');
    }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
    const talks = await getAllTalks('summit');
    const allSpeakers = await getAllSpeakers(100, 'summit');

    const sessions = talks.map(talk => {
        const talkId = talk.id as string;

        const talkSpeakersAndHost = talk.speaker?.map(speaker => {
            return speaker.id;
        });

        if (talk.host && talkSpeakersAndHost) {
            talkSpeakersAndHost.push(talk.host.id);
        }

        return {
            [talkId]: {
                speakers: talkSpeakersAndHost,
                title: talk.title,
                id: talk.id,
                startTime: talk.start,
                endTime: talk.end,
                trackTitle: talk.place
            }
        };
    });

    const speakers = allSpeakers.map(speaker => {
        const speakerId = speaker.id;

        return {
            [speakerId]: {
                name: speaker.name,
                photoUrl: speaker.image.url,
                id: speaker.id
            }
        };
    });

    res.status(200).json({ sessions, speakers });
}
