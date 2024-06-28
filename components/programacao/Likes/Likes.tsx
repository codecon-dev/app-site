import cn from 'classnames';

import styles from './Likes.module.scss';

type Props = {
    talkId: string;
    attendeeUuid: string;
    likes: number;
    userLiked: boolean;
    setLikes: (likes: number) => void;
    setUserLiked: (userLiked: boolean) => void;
    absolute?: boolean;
};

export default function Likes({
    talkId,
    attendeeUuid,
    likes,
    userLiked,
    setLikes,
    setUserLiked,
    absolute
}: Props) {
    const addLike = async () => {
        const response = await fetch('/api/likes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                talkId,
                attendeeUuid
            })
        });

        const { data } = await response.json();

        setLikes(data.likes as number);
        setUserLiked(data.userLiked as boolean);
    };

    return (
        <div
            onClick={() => void addLike()}
            className={cn(styles.like, { [styles.liked]: userLiked, [styles.absolute]: absolute })}
        >
            <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="m12 5.72c-2.624-4.517-10-3.198-10 2.461 0 3.725 4.345 7.727 9.303 12.54.194.189.446.283.697.283s.503-.094.697-.283c4.977-4.831 9.303-8.814 9.303-12.54 0-5.678-7.396-6.944-10-2.461z"
                    fillRule="nonzero"
                />
            </svg>
            {likes}
        </div>
    );
}
