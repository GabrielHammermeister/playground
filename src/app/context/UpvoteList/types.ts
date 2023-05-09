import {UpvoteList, UpvoteListItemType} from "@/app/models/UpvoteList";
import {Dispatch} from "react";

export interface UpvoteListContextType {
    upvoteListState?: UpvoteList
    dispatch: Dispatch<Action>
}

export type Action =
    | { type: 'add-item', payload: { item: UpvoteListItemType } }
    | { type: 'delete-item', payload: { itemId: string } }
    | { type: 'upvote', payload: { itemId: string } }
    | { type: 'downvote', payload: { itemId: string } }
    | { type: 'hydrate', payload: UpvoteList }
    | { type: 'list-saved', payload: { listId: string } }
