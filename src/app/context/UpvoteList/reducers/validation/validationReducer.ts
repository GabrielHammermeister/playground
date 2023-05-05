import {UpvoteList} from "@/app/models/UpvoteList";
import {Action} from "@/app/context/UpvoteList/types";
import {Dispatch, SetStateAction} from "react";
import {Timestamp} from "@firebase/firestore";


type ValidationKind = 'changes' | 'initialization'
const VALIDATION_KINDS: Record<ValidationKind, string[]> = {
    changes: ['upvote', 'downvote', 'add-item'],
    initialization: ['hydrate']
}

function persistContextState(upvoteListState: UpvoteList) {
    console.log("upvoteListState", upvoteListState);
    localStorage.setItem('upvote-list', JSON.stringify(upvoteListState))
    return upvoteListState
}

function getPersistedContextState() {
    const persistedUpvoteList = localStorage.getItem('upvote-list')
    return JSON.parse(String(persistedUpvoteList)) as UpvoteList
}

export default function validationReducer(upvoteListState: UpvoteList, action: Action, { listChanged = false, setListChanged }: {listChanged: boolean, setListChanged: Dispatch<SetStateAction<boolean>>}): UpvoteList {

    for(const key in VALIDATION_KINDS) {
        if(VALIDATION_KINDS[key as ValidationKind].includes(action.type)) {
            switch (key as ValidationKind) {
                case 'changes': {
                    if(!listChanged) setListChanged(true)
                    return persistContextState({
                        ...upvoteListState,
                        updatedAt: Timestamp.now()
                    })

                }
                case 'initialization': {
                    const persistedUpvoteList = getPersistedContextState()
                    if(action.type === 'hydrate') {
                        const firestoreUpvoteList = action.payload
                        if(!persistedUpvoteList) return firestoreUpvoteList

                        const savedDate = firestoreUpvoteList.updatedAt?.toDate()
                        const persistedDate = new Date(persistedUpvoteList.updatedAt?.seconds * 1000)

                        if(persistedDate > savedDate) {
                            if(!listChanged) setListChanged(true)
                            return persistedUpvoteList
                        } else {
                            return firestoreUpvoteList
                        }
                    }
                }
            }
        }
    }
    return upvoteListState
}
