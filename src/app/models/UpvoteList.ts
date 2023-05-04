export type UpvoteListItemType = {
    id: string
    title: string
    votes: number
}

export interface List {
    id: string
    updatedAt: string
}

export interface UpvoteList extends List {
    listData: UpvoteListItemType[]
}