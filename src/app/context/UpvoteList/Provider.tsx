"use client";

import UpvoteListContext from "@/app/context/UpvoteList/Context";
import React, {Reducer, useReducer} from "react";
import {ListItemType} from "@/app/models/UpvoteList";
import {Action} from "@/app/context/UpvoteList/types";

export default function UpvoteListProvider({ children }: { children: React.ReactNode}) {
    const [listData, dispatch] = useReducer<Reducer<ListItemType[], Action>>(listReducer, []);

    function findListItemIndex(listData: ListItemType[], id: string) {
        return listData?.findIndex(value => value.id === id)
    }

    function sortUpvoteList(listData: ListItemType[]) {
        return listData.sort((a, b) => {
            if(a.votes > b.votes) return - 1
            else return 0
        })
    }

    function listReducer(listDataState: ListItemType[], action: Action) {
        switch (action.type) {
            case 'upvote': {
                const foundIndex = findListItemIndex(listDataState, action.payload.id)
                listDataState[foundIndex].votes += 1
                return [...sortUpvoteList(listDataState)]
            }
            case 'downvote': {
                const foundIndex = findListItemIndex(listDataState, action.payload.id)
                if(listDataState[foundIndex].votes > 0) {
                    listDataState[foundIndex].votes -= 1
                    return [...sortUpvoteList(listDataState)]
                }
                return [...listDataState]
            }
            case 'add-item': {
                return [...listDataState, action.payload]
            }
            default: {
                // @ts-ignore
                throw Error('Unknown action: ' + action.type);
            }
        }
    }

    return (
        <UpvoteListContext.Provider value={{
            listDataState: listData,
            dispatch
        }}>
            {children}
        </UpvoteListContext.Provider>
    );
}