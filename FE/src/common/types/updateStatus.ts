export type ICreator = {
    userId: string,
    name: string,
    email: string
}

export type IUpdateStatus = {
    title: string,
    desc: string,
    date: Date | string,
    creator: ICreator
}