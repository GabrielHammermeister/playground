import React from "react";
import {Inter} from "next/font/google";
import UpvoteListProvider from "@/app/context/UpvoteList/Provider";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <UpvoteListProvider>
            {children}
        </UpvoteListProvider>
    )
}
