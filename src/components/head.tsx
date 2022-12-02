import React, {Component} from "react";
import Head from 'next/head'
import {PagePropCommonDocument} from "types/client/app/pageProps";

type PageState = {};

type PageProps = {} & PagePropCommonDocument<any>;

export default class ComponentHead extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <Head>
                <title>HeLLo</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
        );
    }
}