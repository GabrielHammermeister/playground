import {createContext} from "react";
import {UpvoteListContextType} from "@/app/context/UpvoteList/types";


const UpvoteListContext = createContext<UpvoteListContextType>({
    upvoteListState: [{
        id: '',
        title: '',
        listData: [],
    }],
    dispatch: () => null,
    listChanged: false,
    setListChanged: () => null
})

export default UpvoteListContext