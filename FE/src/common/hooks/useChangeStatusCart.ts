import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const useChangeStatusCart = () => {
    const [changeStatus, setChangeStatus] = useState<any>(1);
    const [url, setUrl] = useState<any>('/cart/checkout');
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/cart') {
            setUrl((prev: string) => {
                return prev !== '/cart/checkout' ? '/cart/checkout' : prev;
            });

            setChangeStatus((prev: number) => {
                return prev !== 1 ? 1 : prev;
            })
        }

        if (location.pathname === '/cart/checkout') {
            setUrl((prev: string) => {
                return prev !== '/cart/order' ? '/cart/order' : prev;
            });

            setChangeStatus((prev: number) => {
                return prev !== 2 ? 2 : prev;
            })
        }

        if (location.pathname === '/cart/order') {
            setChangeStatus((prev: number) => {
                return prev !== 3 ? 3 : prev;
            })
        }

    }, [location]);

    return { url, changeStatus }
}