import React from "react";
import UpvoteListProvider from "@/app/context/UpvoteList/Provider";
import {Inter} from "next/font/google";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({children,}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}
