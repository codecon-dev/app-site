import User from "src/database/model/User"

export type PuzzleAnswerAttemptResponse = { 
    success: boolean, 
    message: string 
}

export default class PuzzleAnswerService {

    public static async attempt(user: User, userGuess: string, puzzlePublicId: string): Promise<PuzzleAnswerAttemptResponse> {
        return { success: false, message: "Hmmm, não é isso" }
    }

}
