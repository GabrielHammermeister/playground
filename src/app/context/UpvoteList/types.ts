import {ListItemType} from "@/app/models/UpvoteList";
import {Dispatch} from "react";

export interface UpvoteListContextType {
    listDataState?: ListItemType[]
    dispatch: Dispatch<Action>
}

export type Action =
    | { type: 'add-item', payload: ListItemType }
    | { type: 'upvote', payload: { id: string } }
    | { type: 'downvote', payload: { id: string } }
