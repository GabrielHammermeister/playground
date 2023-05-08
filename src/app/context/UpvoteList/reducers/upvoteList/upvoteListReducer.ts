import {UpvoteList, UpvoteListItemType} from "@/app/models/UpvoteList";
import {Action} from "@/app/context/UpvoteList/types";
import {getUpvoteList} from "@/app/services/UpvoteList";
import {throws} from "assert";

function findListItemIndex(listData: UpvoteListItemType[], id: string) {
    return listData?.findIndex(value => value.id === id)
}

function sortUpvoteList(listData: UpvoteListItemType[]) {
    return listData.sort((a, b) => {
        if(a.votes > b.votes) return - 1
        else return 0
    })
}
export default function upvoteListReducer(upvoteListsState: UpvoteList[], action: Action): UpvoteList[] {
    switch (action.type) {
        case "hydrate": {
            const { id } = action.payload
            getUpvoteList(id).then(res => {
                return [...upvoteListsState, res]
            }).catch(err => {
                throw new Error('Erro ao buscar a lista')
                return upvoteListsState
            })
        }
        case 'upvote': {
            const { listData } = upvoteListsState

            const foundIndex = findListItemIndex(listData, action.payload.id)
            listData[foundIndex].votes += 1
            return {
                ...upvoteListsState,
                listData: sortUpvoteList(listData),
            }
        }
        case 'downvote': {
            const {listData} = upvoteListsState

            const foundIndex = findListItemIndex(listData, action.payload.id)
            if(listData[foundIndex].votes > 0) {
                listData[foundIndex].votes -= 1
                return {
                    ...upvoteListsState,
                    listData: sortUpvoteList(listData),
                }
            }
            return upvoteListsState
        }
        case 'add-item': {
            return {
                ...upvoteListsState,
                listData: [...upvoteListsState.listData, action.payload],
            }
        }
        case 'delete-item': {
            const {listData} = upvoteListsState
            const foundIndex = findListItemIndex(listData, action.payload.id)
            listData.splice(foundIndex, 1)

            return {
                ...upvoteListsState,
                listData
            }
        }
        default: {
            // @ts-ignore
            throw Error('Unknown action: ' + action.type);
        }
    }
}