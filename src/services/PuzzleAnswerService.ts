import { claimCodecodesApiToken } from "@lib/codecodes-api"
import ResourceNotFoundError from "@lib/errors/ResourceNotFoundError"
import { CodecodesClaimResponse } from "@lib/types/codecodes"
import Puzzle from "src/database/model/puzzle/Puzzle"
import PuzzleAnswer, { PuzzleAnswerType } from "src/database/model/puzzle/PuzzleAnswer"
import User from "src/database/model/User"

export type PuzzleAnswerAttemptResponse = { 
    success: boolean
    message: string
}

export default class PuzzleAnswerService {

    public static async attempt(user: User, userGuess: string, puzzlePublicId: string): Promise<PuzzleAnswerAttemptResponse> {
        const puzzle: Puzzle | null = await Puzzle.findByPublicId(puzzlePublicId)
        if (!puzzle) throw new ResourceNotFoundError("Enigma não encontrado")

        const answeredAlready: boolean = !!(await PuzzleAnswer.findOne({ where: { userId: user.id, puzzleId: puzzle.id, status: PuzzleAnswerType.DONE } }))
        if (answeredAlready) return { success: true, message: "O enigma já foi respondido e os pontos já foram creditados :)" }

        const normalizedUserGuess: string = this.normalize(userGuess)
        const guessedCorrectly: boolean = normalizedUserGuess == this.normalize(puzzle.answer)
        if (guessedCorrectly) {
            const { data } = await this.claimCode(user, puzzle.rewardCode)
            if (!data) throw new Error("Dados do Code-Codes vieram vazios")

            await this.save(user, puzzle, PuzzleAnswerType.DONE)
            return { 
                success: true, 
                message: `Acertou, mizerávi! Você ganhou ${data.scoreAcquired} pts e agora tem ${data.totalScore} pts.` 
            }
        }

        const almostGotItRight: boolean = puzzle.almostList.some((almost: string) => normalizedUserGuess == this.normalize(almost))
        if (almostGotItRight) {
            await this.save(user, puzzle, PuzzleAnswerType.PENDING)
            return { success: false, message: `"${userGuess}" foi quase` }
        }

        return { success: false, message: "Hmmm, não é isso" }
    }

    private static async save(user: User, puzzle: Puzzle, status: PuzzleAnswerType = PuzzleAnswerType.PENDING): Promise<void> {
        const [puzzleAnswer, created] = await PuzzleAnswer.findOrCreate({ where: { userId: user.id, puzzleId: puzzle.id } })

        puzzleAnswer.status = status
        puzzleAnswer.attempts++
        await puzzleAnswer.save()
    }

    private static normalize(value: string): string {
        return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim()
    }

    private static async claimCode(user: User, code: string): Promise<CodecodesClaimResponse> {
        const codecodesResponse: CodecodesClaimResponse = await claimCodecodesApiToken({
            email: user.email,
            name: user.name,
            code: code
        })

        return codecodesResponse
    }
}
