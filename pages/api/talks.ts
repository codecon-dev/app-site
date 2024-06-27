import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';

import ApiResponse from 'src/api/ApiResponse';
import { getAllTalks, getAllSpeakers } from '@lib/cms-api';

type Session = {
    speakers: string[];
    title: string;
    id: string;
    startTime?: string;
    endTime?: string;
    trackTitle?: string;
};

type Speaker = {
    name: string;
    photoUrl: string;
    id: string;
};

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
        const talkSpeakersAndHost = talk.speaker?.map(speaker => {
            return speaker.id;
        });

        if (talk.host && talkSpeakersAndHost) {
            talkSpeakersAndHost.push(talk.host.id);
        }

        return {
            speakers: talkSpeakersAndHost || [],
            title: talk.title || '',
            id: talk.id || '',
            startTime: talk.start,
            endTime: talk.end,
            trackTitle: talk.place
        };
    });

    const speakers = allSpeakers.map(speaker => {
        return {
            name: speaker.name,
            photoUrl: speaker.image.url,
            id: speaker.id
        };
    });

    res.status(200).json(mapData(sessions, speakers));
}

function mapData(sessions: Session[], speakers: Speaker[]) {
    const mappedSessions = sessions.reduce((acc, session) => {
        acc[session.id] = session;
        return acc;
    }, {} as Record<string, Session>);

    const mappedSpeakers = speakers.reduce((acc, speaker) => {
        acc[speaker.id] = speaker;
        return acc;
    }, {} as Record<string, Speaker>);

    return {
        sessions: mappedSessions,
        speakers: mappedSpeakers
    };
}
