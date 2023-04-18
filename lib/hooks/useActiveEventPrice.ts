import { EventData, EventPrice } from '@lib/constants';
import { EVENTS } from '@lib/types/all';
import { useEffect, useState } from 'react';

type Discount = {
    name: string;
    code: string;
    percentage: number;
    discount: number;
    event: EVENTS;
    image: string;
};

const DISCOUNT_CODES: Discount[] = [
    {
        name: 'Newsletter do Filipe Deschamps',
        code: 'NEWS25',
        percentage: 25,
        discount: 10,
        event: EVENTS.DIGITAL,
        image: 'https://github.com/filipedeschamps.png'
    },
    {
        name: 'Letícia Coelho',
        code: 'COELHO25',
        percentage: 25,
        discount: 10,
        event: EVENTS.DIGITAL,
        image: 'https://pbs.twimg.com/profile_images/1644096132635656192/PnnVitMq_400x400.jpg'
    }
];

export function useActiveEventPrice(eventData: EventData) {
    const [eventPrice, setEventPrice] = useState<number>();
    const [registerUrlWithCode, setRegisterUrlWithCode] = useState<string>();
    const [discountInfo, setDiscountInfo] = useState<Discount>();
    const [priceInfo, setPriceInfo] = useState<EventPrice>();
    const [nextPrice, setNextPrice] = useState<number>();

    useEffect(() => {
        if (!eventData.eventPrice) return;

        if (!Array.isArray(eventData.eventPrice)) {
            setEventPrice(eventData.eventPrice.price);
            return;
        }

        const todayTime = new Date().getTime();

        const activePrice = eventData.eventPrice.find(price => price.endDate.getTime() > todayTime);
        const activePriceIndex = eventData.eventPrice.findIndex(
            price => price.endDate.getTime() > todayTime
        );

        if (!activePrice) return;

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        const discountCode = urlParams.get('d');

        setEventPrice(activePrice.price);
        setPriceInfo(activePrice);
        if (eventData.eventPrice[activePriceIndex + 1]) {
            setNextPrice(eventData.eventPrice[activePriceIndex + 1].price);
        }

        if (discountCode) {
            const discountData = DISCOUNT_CODES.find(
                discount => discount.event === eventData.type && discount.code === discountCode
            );

            if (discountData) {
                const priceWithDiscount = activePrice.price - discountData.discount;

                setEventPrice(priceWithDiscount);
                setRegisterUrlWithCode(`${eventData.registerUrl}?d=${discountCode}`);
                setDiscountInfo(discountData);
            }
        }
    }, []);

    return { eventPrice, registerUrlWithCode, discountInfo, priceInfo, nextPrice };
}
