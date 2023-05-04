import {UpvoteList, UpvoteListItemType} from "@/app/models/UpvoteList";
import {Dispatch} from "react";

export interface UpvoteListContextType {
    upvoteListState?: UpvoteList
    dispatch: Dispatch<Action>
}

export type Action =
    | { type: 'add-item', payload: UpvoteListItemType }
    | { type: 'upvote', payload: { id: string } }
    | { type: 'downvote', payload: { id: string } }
    | { type: 'hydrate', payload: UpvoteList }
