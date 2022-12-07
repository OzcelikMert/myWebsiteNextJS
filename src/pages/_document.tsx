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
    }

    render() {
        let appData = this.props.__NEXT_DATA__.props.pageProps.appData;
        let language = appData.languages.findSingle("_id", appData.languageId);
        return (
            <Html lang={language ? linkUtil.languageUpperLocale(language) : ""}>
                <Head>
                    <link rel="shortcut icon" href={imageSourceUtil.getUploadedImageSrc(appData.settings.icon, appData.apiPath.uploads)} />
                    <link rel="canonical" href={appData.apiPath.website.full}/>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}