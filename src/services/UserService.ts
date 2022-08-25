import User from 'src/database/model/User';

export type UserResponse = {
    success: boolean;
    message: string;
};

export default class UserService {
    public static async acceptTerms(user: User): Promise<UserResponse> {
        const [userData, created] = await User.findOrCreate({
            where: { id: user.id }
        });

        userData.acceptedTerms = true;
        await userData.save();

        return {
            success: true,
            message: `Obrigado e bom evento!`
        };
    }
}
