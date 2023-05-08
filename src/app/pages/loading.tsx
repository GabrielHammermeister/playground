// noinspection JSUnusedGlobalSymbols

import React from "react";


export default function Loading ({ children }: {
    children: React.ReactNode
}) {
    return (
        <main>
            <h1>
                CARREGANDO PROJETINHOS ...

                {children}
            </h1>
        </main>
    );
}