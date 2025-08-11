import type { IAttributeValue } from "./attributeValue";

export type IAttribute = {
    _id?: string;
    name: string;
    slug?: string;
    type: string;
    terms?: IAttributeValue[];
    value: IAttributeValue[];
    isDelete?: boolean;
};