import type {AppInitialProps, AppProps} from 'next/app'
import React, {Component} from "react";

import "styles/global.scss";

import "shared/library/variable/array"
import "shared/library/variable/string"
import "shared/library/variable/number"
import "shared/library/variable/date"
import "shared/library/variable/math"

import ComponentProviders from "components/providers";
import ComponentHead from "components/head";
import {AppContextType} from "next/dist/shared/lib/utils";


function App(props: AppProps) {
    return (
        <ComponentProviders {...{router: props.router, ...props.pageProps}}>
            <ComponentHead {...{router: props.router, ...props.pageProps}} />
            <props.Component {...{router: props.router, ...props.pageProps}} />
        </ComponentProviders>
    )
}

App.getInitialProps = async (props: AppContextType) => {
    return {
        pageProps: {
            blabla: props.ctx.req?.headers.cookie
        }
    };
}

export default App;