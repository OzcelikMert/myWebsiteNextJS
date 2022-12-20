import React, {Component} from "react";
import {Html, Head, Main, NextScript} from 'next/document'
import {NEXT_DATA} from "next/dist/shared/lib/utils";
import {PagePropCommonDocument} from "types/client/app/pageProps";
import linkUtil from "utils/functions/link.util";
import imageSourceUtil from "utils/functions/imageSource.util";

type PageState = {};

type PageProps = {
    __NEXT_DATA__: (Omit<NEXT_DATA, "props"> & {props: {pageProps: PagePropCommonDocument<{}>}})
};

export default class HTMLDocument extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.cleanProcess();
    }

    cleanProcess(){
        if (process.env.NEXT_MANUAL_SIG_HANDLE) {
            // this should be added in your custom _document
            process.on('SIGTERM', () => {
                console.log('Received SIGTERM: ', 'cleaning up')
                process.exit(0)
            })

            process.on('SIGINT', () => {
                console.log('Received SIGINT: ', 'cleaning up')
                process.exit(0)
            })
        }
    }

    render() {
        let appData = this.props.__NEXT_DATA__.props.pageProps.appData;
        let language = appData.languages.findSingle("_id", appData.languageId);
        return (
            <Html lang={language ? linkUtil.languageUpperLocale(language) : ""}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}