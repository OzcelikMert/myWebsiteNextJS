import React, {Component} from "react";
import Head from 'next/head'
import {PagePropCommonDocument} from "types/client/app/pageProps";
import Variable from "library/variable";
import imageSourceUtil from "utils/functions/imageSource.util";
import linkUtil from "utils/functions/link.util";

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class ComponentHead extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    get getKeywords() {
        let terms: string[] = [];

        if(this.props.pageData.page && this.props.pageData.page.terms.length > 0){
            terms = this.props.pageData.page.terms.map(term => term?.contents.title).filter(term => term) as string[];
        }else if(this.props.appData.settings.seoContents?.tags && this.props.appData.settings.seoContents.tags.length > 0) {
            terms = this.props.appData.settings.seoContents.tags;
        }

        return terms.join(",")
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
        let desc = pageData.page?.contents?.seoContent || appData.settings.seoContents?.content || "";
        let logo = imageSourceUtil.getUploadedImageSrc(appData.settings.logo, appData.apiPath.uploads)
        let language = this.props.appData.languages.findSingle("_id", this.props.appData.languageId);

        return (
            <Head>
                <title>{title}</title>

                <meta name="description" content={desc} />
                <meta name="copyright" content={appData.settings.seoContents?.title} />
                <meta name="author" content="Özçelik Software" />
                <meta name="keywords" content={this.getKeywords} />
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