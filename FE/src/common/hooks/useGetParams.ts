import { useSearchParams } from "react-router";

export const useGetParams = (keys: string[]) => {
    const [searchParams] = useSearchParams();

    const result: Record<string, string | null> = {};

    keys.forEach((key) => {
        result[key] = searchParams.get(key);
    });

    return result;
};
