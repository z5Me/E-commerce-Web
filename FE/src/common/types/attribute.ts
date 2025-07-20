export type IAttribute = {
    _id?: string;
    name: string;
    slug?: string;
    type: string;
    terms?: [];
    value?: string[];
    isDelete?: boolean;
};