import {createContext} from "react";
import {UpvoteListContextType} from "@/app/context/UpvoteList/types";


const UpvoteListContext = createContext<UpvoteListContextType>({
    upvoteListState: {
        id: '',
        title: '',
        listData: [],
        listChanged: false,
    },
    dispatch: () => null
})

export default UpvoteListContext