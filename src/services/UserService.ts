import User from 'src/database/model/User';

export type UserResponse = {
    success: boolean;
    message: string;
};

export default class UserService {
    public static async acceptTerms(user: User): Promise<UserResponse> {
        user.acceptedTerms = true;
        await user.save();

        return {
            success: true,
            message: `Obrigado e bom evento!`
        };
    }
}
