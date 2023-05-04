"use client";

import UpvoteListContext from "@/app/context/UpvoteList/Context";
import React, {Reducer, useEffect, useReducer} from "react";
import {UpvoteList, UpvoteListItemType} from "@/app/models/UpvoteList";
import {Action} from "@/app/context/UpvoteList/types";
import {getUpvoteList} from "@/app/services/UpvoteList";

const initialState = { id: '4SHr4ICGATXlLackEAgz', listData: [], updatedAt: ''}

export default function UpvoteListProvider({ children }: { children: React.ReactNode}) {
    const [listData, dispatch] = useReducer<Reducer<UpvoteList, Action>>(listReducer, initialState);

    useEffect(() => {
        const fetchFirestoreData = async () => {
            const firestoreUpvoteList = await getUpvoteList()
            if(firestoreUpvoteList.listData.length > 0) {
                dispatch({type: 'hydrate', payload: firestoreUpvoteList})
            }
        }
        fetchFirestoreData()
    }, []);

    function findListItemIndex(listData: UpvoteListItemType[], id: string) {
        return listData?.findIndex(value => value.id === id)
    }

    function sortUpvoteList(listData: UpvoteListItemType[]) {
        return listData.sort((a, b) => {
            if(a.votes > b.votes) return - 1
            else return 0
        })
    }

    function listReducer(upvoteListState: UpvoteList, action: Action): UpvoteList {
        switch (action.type) {
            case "hydrate": {
                return action.payload
            }
            case 'upvote': {
                const { listData } = upvoteListState

                const foundIndex = findListItemIndex(listData, action.payload.id)
                listData[foundIndex].votes += 1
                return {
                    ...upvoteListState,
                    listData: sortUpvoteList(listData),
                    updatedAt: Date.now().toString()
                }
            }
            case 'downvote': {
                const {listData} = upvoteListState

                const foundIndex = findListItemIndex(listData, action.payload.id)
                if(listData[foundIndex].votes > 0) {
                    listData[foundIndex].votes -= 1
                    return {
                        ...upvoteListState,
                        listData: sortUpvoteList(listData),
                        updatedAt: Date.now().toString()
                    }
                }
                return upvoteListState
            }
            case 'add-item': {
                return {
                    ...upvoteListState,
                    listData: [...upvoteListState.listData, action.payload],
                    updatedAt: Date.now().toString()
                }
            }
            default: {
                // @ts-ignore
                throw Error('Unknown action: ' + action.type);
            }
        }
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