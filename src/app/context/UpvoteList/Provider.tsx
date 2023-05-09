"use client";

import UpvoteListContext from "@/app/context/UpvoteList/Context";
import React, {Reducer, useReducer} from "react";
import {UpvoteList} from "@/app/models/UpvoteList";
import {Action} from "@/app/context/UpvoteList/types";

import upvoteListReducer from "@/app/context/UpvoteList/reducers/upvoteList/upvoteListReducer";
import persistanceReducer from "@/app/context/UpvoteList/reducers/validation/persistanceReducer";

const initialState: UpvoteList = { id: '4SHr4ICGATXlLackEAgz', title: '', listData: [], listChanged: false}

export default function UpvoteListProvider({ children }: { children: React.ReactNode}) {
    const [listData, dispatch] = useReducer<Reducer<UpvoteList, Action>>(mainReducer, initialState);

    function mainReducer (upvoteListsState: UpvoteList, action: Action): UpvoteList  {

        return persistanceReducer(upvoteListReducer(upvoteListsState, action), action)
    }


    return (
        <UpvoteListContext.Provider value={{
            upvoteListState: listData,
            dispatch
        }}>
            {children}
        </UpvoteListContext.Provider>
    );
}