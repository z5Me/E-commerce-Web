export type IAttribute = {
    _id: string;
    name: string;
    slug?: string;
    type: string;
    terms?: string[];
    value?: string[];
    isDelete?: boolean;
};