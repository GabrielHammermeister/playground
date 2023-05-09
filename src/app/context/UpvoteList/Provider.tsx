"use client";

import UpvoteListContext from "@/app/context/UpvoteList/Context";
import React, {Reducer, useEffect, useReducer, useState} from "react";
import {UpvoteList} from "@/app/models/UpvoteList";
import {Action} from "@/app/context/UpvoteList/types";
import {getUpvoteList} from "@/app/services/UpvoteList";
import firebase from "firebase/compat";

import upvoteListReducer from "@/app/context/UpvoteList/reducers/upvoteList/upvoteListReducer";
import validationReducer from "@/app/context/UpvoteList/reducers/validation/validationReducer";

const initialState: UpvoteList = { id: '4SHr4ICGATXlLackEAgz', title: '', listData: [], listChanged: false}

export default function UpvoteListProvider({ children }: { children: React.ReactNode}) {
    const [listData, dispatch] = useReducer<Reducer<UpvoteList, Action>>(mainReducer, initialState);

    function mainReducer (upvoteListsState: UpvoteList, action: Action): UpvoteList  {

        return validationReducer(upvoteListReducer(upvoteListsState, action), action)
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