"use client";

import UpvoteListContext from "@/app/context/UpvoteList/Context";
import React, {Reducer, useCallback, useEffect, useReducer, useState} from "react";
import {UpvoteList, UpvoteListItemType} from "@/app/models/UpvoteList";
import {Action} from "@/app/context/UpvoteList/types";
import {getUpvoteList} from "@/app/services/UpvoteList";
import {serverTimestamp} from "@firebase/firestore";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import upvoteListReducer from "@/app/context/UpvoteList/reducers/upvoteList/upvoteListReducer";
import validationReducer from "@/app/context/UpvoteList/reducers/validation/validationReducer";

const initialState = { id: '4SHr4ICGATXlLackEAgz', listData: []}

export default function UpvoteListProvider({ children }: { children: React.ReactNode}) {
    const [listChanged, setListChanged] = useState(false);

    const mainReducer = (upvoteListState: UpvoteList, action: Action): UpvoteList => {
        return validationReducer(upvoteListReducer(upvoteListState, action), action, { listChanged, setListChanged })
    }

    const [listData, dispatch] = useReducer<Reducer<UpvoteList, Action>>(mainReducer, initialState);

    useEffect(() => {
        const fetchFirestoreData = async () => {
            const firestoreUpvoteList = await getUpvoteList()
            if(firestoreUpvoteList.listData.length > 0) {
                dispatch({type: 'hydrate', payload: firestoreUpvoteList})
            }
        }
        fetchFirestoreData()
    }, []);


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