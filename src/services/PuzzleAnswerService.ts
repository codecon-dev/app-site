import User from "src/database/model/User"

export type PuzzleAnswerAttemptResponse = { 
    success: boolean, 
    message: string 
}

export default class PuzzleAnswerService {

    public static async attempt(user: User, userGuess: string, puzzlePublicId: string): Promise<PuzzleAnswerAttemptResponse> {
        const puzzle: Puzzle | null = await Puzzle.findByPublicId(puzzlePublicId)
        if (!puzzle) throw new ResourceNotFoundError("Enigma não encontrado")

        const answeredAlready: boolean = !!(await PuzzleAnswer.findOne({ where: { userId: user.id, puzzleId: puzzle.id, status: PuzzleAnswerType.DONE } }))
        if (answeredAlready) return { success: true, message: "Enigma já respondido" }

        return { success: false, message: "Hmmm, não é isso" }
    }

}
