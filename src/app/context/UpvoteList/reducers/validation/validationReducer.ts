import {UpvoteList} from "@/app/models/UpvoteList";
import {Action} from "@/app/context/UpvoteList/types";
import {Dispatch, SetStateAction} from "react";
import {Timestamp} from "@firebase/firestore";


type ValidationKind = 'changes' | 'initialization'
const VALIDATION_KINDS: Record<ValidationKind, string[]> = {
    changes: ['upvote', 'downvote', 'add-item', 'delete-item'],
    initialization: ['hydrate']
}

function persistContextState(upvoteListState: UpvoteList) {
    localStorage.setItem('upvote-list', JSON.stringify(upvoteListState))
    return upvoteListState
}

function getPersistedContextState() {
    const persistedUpvoteList = localStorage.getItem('upvote-list')
    return JSON.parse(String(persistedUpvoteList)) as UpvoteList
}

export default function validationReducer(upvoteListState: UpvoteList, action: Action): UpvoteList {

    for(const key in VALIDATION_KINDS) {
        if(VALIDATION_KINDS[key as ValidationKind].includes(action.type)) {
            switch (key as ValidationKind) {
                case 'changes': {
                    let listChanged = upvoteListState.listChanged
                    if(!upvoteListState.listChanged)  listChanged = true
                    return persistContextState({
                        ...upvoteListState,
                        updatedAt: Timestamp.now(),
                        listChanged
                    })

                }
                case 'initialization': {
                    const persistedUpvoteList = getPersistedContextState()
                    if(action.type === 'hydrate') {
                        // const firestoreUpvoteList = action.payload
                        // if(!persistedUpvoteList) return firestoreUpvoteList
                        //
                        // const { updatedAt: firestoreUpdatedAt } = firestoreUpvoteList
                        // const { updatedAt: persistedUpdatedAt } = persistedUpvoteList
                        //
                        // const savedDate = firestoreUpdatedAt && new Date(firestoreUpdatedAt.seconds * 1000)
                        // const persistedDate = persistedUpdatedAt && new Date(persistedUpdatedAt.seconds * 1000)
                        //
                        // let listChanged = upvoteListState.listChanged
                        // if( (persistedDate && savedDate) && (persistedDate > savedDate) ) {
                        //     if(!upvoteListState.listChanged) listChanged = true
                        //     return {
                        //         ...persistedUpvoteList,
                        //         listChanged
                        //     }
                        // } else {
                        //     return {
                        //         ...firestoreUpvoteList,
                        //         listChanged
                        //     }
                        // }
                        const firestoreList = action.payload
                        if(persistedUpvoteList?.listChanged) {
                            return persistedUpvoteList
                        } else  {
                            return firestoreList
                        }
                    }
                }
            }
        }
    }
    return upvoteListState
}
