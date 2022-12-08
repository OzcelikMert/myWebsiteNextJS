import {PagePropCommonDocument} from "types/client/app/pageProps";
import React, {Component} from "react";

import "styles/pages/home.module.scss";
import Component404 from "components/elements/errorCodes/404";
import Head from 'next/head'

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class Page404 extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        let pageData = this.props.pageData;
        let appData = this.props.appData;

        let title = `${appData.settings.seoContents?.title} | 404`;

        return (
            <>
                <Head>
                    <title>{title}</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
                <Component404 {...this.props}/>
            </>
        );
    }
}