"use client";

import UpvoteListContext from "@/app/context/UpvoteList/Context";
import React, {Reducer, useEffect, useReducer, useState} from "react";
import {UpvoteList} from "@/app/models/UpvoteList";
import {Action} from "@/app/context/UpvoteList/types";
import {getUpvoteList} from "@/app/services/UpvoteList";
import firebase from "firebase/compat";

import upvoteListReducer from "@/app/context/UpvoteList/reducers/upvoteList/upvoteListReducer";
import validationReducer from "@/app/context/UpvoteList/reducers/validation/validationReducer";

const initialState = [{ id: '4SHr4ICGATXlLackEAgz', title: '', listData: []}, { id: 'asdffasdf2134asdf', title: '', listData: []}]

export default function UpvoteListProvider({ children }: { children: React.ReactNode}) {
    const [listChanged, setListChanged] = useState(false);

    const mainReducer = (upvoteListsState: UpvoteList[], action: Action): UpvoteList[] => {
        return validationReducer(upvoteListReducer(upvoteListsState, action), action, { listChanged, setListChanged })
    }

    const [listData, dispatch] = useReducer<Reducer<UpvoteList[], Action>>(mainReducer, initialState);

    //
    // useEffect(() => {
    //     const fetchFirestoreData = async () => {
    //         const firestoreUpvoteList = await getUpvoteList()
    //         if(firestoreUpvoteList.listData.length > 0) {
    //             dispatch({type: 'hydrate', payload: firestoreUpvoteList})
    //         }
    //     }
    //     fetchFirestoreData()
    // }, []);


    return (
        <UpvoteListContext.Provider value={{
            upvoteListState: listData,
            dispatch,
            listChanged,
            setListChanged
        }}>
            {children}
        </UpvoteListContext.Provider>
    );
}