import { formatDate } from '@lib/dates';
import { query } from '@lib/db';
import { UserAlreadyAnswerData } from './types';

export async function getPuzzleRanking() {
  const ranking: any[] = await query(`
        SELECT 
            COUNT(puzzles_attendees.attendee_ticket) as points,
            MAX(puzzles_attendees.created_at) as last_sent,
            attendees.first_name as first_name,
            attendees.last_name as last_name
        FROM puzzles_attendees
        LEFT JOIN attendees ON attendees.ticket_number = puzzles_attendees.attendee_ticket
        GROUP BY puzzles_attendees.attendee_ticket
        ORDER BY points DESC, last_sent ASC`);

  return ranking.map(({ points, last_sent, first_name, last_name }, index) => {
    return {
      position: index + 1,
      name: `${first_name} ${last_name}`,
      lastSent: formatDate(last_sent.toISOString(), 'dd/MM HH:mm:ss'),
      points
    };
  });
}

export async function getUserAlreadyAnswered(id: number, userId?: number): Promise<UserAlreadyAnswerData> {
  const res = await fetch('/api/game/get-user-puzzle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, userId })
  });
  return await res.json() as UserAlreadyAnswerData
}
