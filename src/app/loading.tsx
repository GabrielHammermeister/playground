// noinspection JSUnusedGlobalSymbols

import React from "react";


export default function Loading ({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
            <h1>
                CARREGANDO CARALEO ...

                {children}
            </h1>
        </>
    );
}