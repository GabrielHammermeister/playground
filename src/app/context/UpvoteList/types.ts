import {UpvoteList, UpvoteListItemType} from "@/app/models/UpvoteList";
import {Dispatch, SetStateAction} from "react";

export interface UpvoteListContextType {
    upvoteListState?: UpvoteList
    dispatch: Dispatch<Action>
}

export type Action =
    | { type: 'add-item', payload: { id: string, item: UpvoteListItemType } }
    | { type: 'delete-item', payload: { id: string } }
    | { type: 'upvote', payload: { id: string } }
    | { type: 'downvote', payload: { id: string } }
    | { type: 'hydrate', payload: UpvoteList }
    | { type: 'list-saved', payload: { id: string } }
