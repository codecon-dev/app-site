import { query, todayMysqlFormat } from '@lib/db';
import { NextApiRequest, NextApiResponse } from 'next';
import { COOKIE } from '@lib/constants';
import { OkPacket } from '@lib/types';
import { claimCodecodesApiToken } from '@lib/codecodes-api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != 'POST')
    return res
      .status(404)
      .json({ error: { code: 'method_unknown', message: 'This endpoint only responds to POST' } });

  const cookie = req.cookies[COOKIE] || '';
  const userId = cookie.split(':')[1] || req.body.userId;
  const puzzleId = req.body.id;

  const userAnswer = await query(
    `
		SELECT 
			puzzle_id
		FROM puzzles_attendees
		WHERE 
			puzzle_id = ? 
			AND attendee_ticket = ?`,
    [puzzleId, userId]
  );

  const userAnswered: boolean = typeof userAnswer[0]?.puzzle_id !== 'undefined';

  if (userAnswered) {
    res.status(200).json({
      success: true,
      result: 'right',
      message:
        'Parece que você já respondeu esse enigma e cada enigma só pode ser respondido uma vez. Você não pode enviar novamente, foi mal aí 👀'
    });
  }

  const answer = req.body.answer as string;
  const answerWithoutEspecialChars = answer.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const answerSanitized = answerWithoutEspecialChars.toLowerCase().trim();

  const puzzle = await query(
    `
		SELECT id, codeCodes
		FROM puzzles
		WHERE id = ?
			AND LOWER(answer) = ? 
		LIMIT 1`,
    [puzzleId, answerSanitized]
  );

  const success: boolean = typeof puzzle[0]?.id !== 'undefined';

  if (!success) {
    const almostQuery = await query(
      `
			SELECT id
			FROM puzzles_almost
			WHERE puzzles_id = ?
				AND LOWER(answer) = ? 
			LIMIT 1`,
      [puzzleId, answerSanitized]
    );

    const almost: boolean = typeof almostQuery[0]?.id !== 'undefined';

    res.status(200).json({
      success: false,
      result: almost ? 'almost' : 'wrong'
    });

    return;
  }

  const createdAt = todayMysqlFormat();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rightAnswer: OkPacket = await query(
    `
		INSERT INTO puzzles_attendees (
			attendee_ticket,
			puzzle_id,
			created_at
		) VALUES (?, ?, ?)`,
    [userId, puzzleId, createdAt]
  );

  const user = await query(
    `
      SELECT * FROM attendees
      WHERE ticket_number = ?
      LIMIT 1
    `,
    [userId]
  );

  const { first_name, last_name, email } = user[0];
  const { codeCodes } = puzzle[0];

  const result = await claimCodecodesApiToken({
    name: `${first_name} ${last_name}`,
    email,
    code: codeCodes
  });
  let message = result.message;
  if (result.data) {
    const score = result.data.scoreAcquired;
    message = `Boa! Além de atualizarmos a sua posição no ranking dos enigmas, resgatamos um código valendo ${score} pontos no Code-codes!`;
  }

  res.status(200).json({
    success: true,
    result: 'right',
    message
  });
};
