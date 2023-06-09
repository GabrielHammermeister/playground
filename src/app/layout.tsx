// noinspection JSUnusedGlobalSymbols

import "./globals.css";
import {Inter} from "next/font/google";
import React from "react";
import styles from './page.module.css'
import NavigationBar from "@/app/components/NavigationBar";
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{display: 'flex'}}>
        <NavigationBar/>
        <main className={styles.main}>

            {children}
        </main>
      </body>
    </html>
  )
}
