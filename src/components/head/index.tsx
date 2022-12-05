import React, {Component} from "react";
import Head from 'next/head'
import {PagePropCommonDocument} from "types/client/app/pageProps";
import Variable from "shared/library/variable";
import imageSourceUtil from "shared/utils/functions/imageSource.util";
import linkUtil from "shared/utils/functions/link.util";

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class ComponentHead extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    get getTags() {
        return (this.props.pageData.page?.terms.map(term => term?.contents.title) ?? this.props.appData.settings.seoContents?.tags ?? []).join(",")
    }

    get getAlternates() {
        return this.props.pageData.page?.alternates?.map(alternate => {
            let language = this.props.appData.languages.findSingle("_id", alternate.langId);
            if(language){
                return (
                    <link rel="alternate" hrefLang={linkUtil.language(language)} href={linkUtil.changeLanguage(this.props.appData, language)} />
                )
            }
        })
    }

    get getFacebookAlternates() {
        return this.props.pageData.page?.alternates?.map(alternate => {
            let language = this.props.appData.languages.findSingle("_id", alternate.langId);
            if(language){
                return (
                    <meta property="og:locale:alternate" content={linkUtil.languageUpperLocale(language)} />
                )
            }
        })
    }

    render() {
        let pageData = this.props.pageData;
        let appData = this.props.appData;

        let title = `${appData.settings.seoContents?.title}${!Variable.isEmpty(pageData.page?.contents?.title) ? ` | ${pageData.page?.contents?.title}` : ""}`;
        let desc = pageData.page?.contents?.seoContent ?? appData.settings.seoContents?.content ?? "";
        let logo = imageSourceUtil.getUploadedImageSrc(appData.settings.logo, appData.apiPath.uploads)
        let language = this.props.appData.languages.findSingle("_id", this.props.appData.languageId);

        return (
            <Head>
                <link rel="shortcut icon" href={imageSourceUtil.getUploadedImageSrc(appData.settings.icon, appData.apiPath.uploads)} />
                <title>{title}</title>
                <link rel="canonical" href={appData.apiPath.website.full}/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />

                <meta name="description" content={desc} />
                <meta name="copyright" content={appData.settings.seoContents?.title} />
                <meta name="author" content="Özçelik Software" />
                <meta name="keywords" content={this.getTags} />
                {this.getAlternates}

                <meta itemProp="name" content={title} />
                <meta itemProp="description" content={desc} />
                <meta itemProp="image" content={logo} />

                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:url" content={appData.apiPath.website.full} />
                <meta property="og:description" content={desc} />
                <meta property="og:site_name" content={title} />
                <meta property="og:image" content={logo} />
                <meta property="og:locale" content={language ? linkUtil.languageUpperLocale(language) : ""} />
                {this.getFacebookAlternates}

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:url" content={appData.apiPath.website.full} />
                <meta name="twitter:description" content={desc} />
                <meta name="twitter:image" content={logo} />
            </Head>
        );
    }
}