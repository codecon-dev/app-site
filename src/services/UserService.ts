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

    public static async completeRegistration(user: User, mobilePhone: string, displayName: string): Promise<UserResponse> {
        user.mobilePhone = mobilePhone;
        user.displayName = displayName;
        await user.save();

        return {
            success: true,
            message: `Seus dados foram salvos`
        };
    }
}
