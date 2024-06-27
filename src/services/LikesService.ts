import Likes from 'src/database/model/Likes';

type LikesResponse = {
    likes: number;
    userLiked: boolean;
};

export default class LikesService {
    public static async likeOrDislike(
        talkId: string,
        attendeeUuid: string
    ): Promise<LikesResponse> {
        const like = await Likes.findByTalkAndAttendee(talkId, attendeeUuid);

        if (like) {
            await like.destroy();
        } else {
            await Likes.create({ talkId, attendeeUuid });
        }

        return this.getLikes(talkId, attendeeUuid);
    }

    public static async getLikes(talkId: string, attendeeUuid: string): Promise<LikesResponse> {
        const likes = await Likes.count({ where: { talkId } });
        const userLike = await Likes.findByTalkAndAttendee(talkId, attendeeUuid);
        const userLiked = !!userLike;

        return { likes, userLiked };
    }
}
