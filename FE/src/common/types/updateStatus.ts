export type ICreator = {
    userId: string,
    name: string,
    email: string,
    role: string
}

export type IUpdateStatus = {
    status: string,
    title: string,
    desc: string,
    date: Date | string,
    orderCode: string,
    creator: ICreator,
}