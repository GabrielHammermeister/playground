import {Timestamp} from "@firebase/firestore-types";

export type UpvoteListItemType = {
    id: string
    title: string
    votes: number
}

export interface List {
    id: string
    title: string
    updatedAt?: Timestamp
    listChanged: boolean
}

export interface UpvoteList extends List {
    listData: UpvoteListItemType[]
}