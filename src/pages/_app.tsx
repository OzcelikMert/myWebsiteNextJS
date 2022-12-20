import type {AppContext, AppProps} from 'next/app'
import React from "react";
import Head from 'next/head'

import "styles/global.scss";

import "library/variable/array"
import "library/variable/string"
import "library/variable/number"
import "library/variable/date"
import "library/variable/math"

import ComponentHead from "components/head";
import ProviderNoFound from "components/providers/noFound";
import cookieLib from "lib/cookie.lib";
import pathLib from "lib/path.lib";
import languageLib from "lib/language.lib";
import settingLib from "lib/setting.lib";
import themeLib from "lib/theme.lib";
import Navbar from "components/tools/navbar";
import BackToTop from "components/tools/backToTop";
import Footer from "components/tools/footer";
import imageSourceUtil from "utils/functions/imageSource.util";

function App(props: AppProps) {
    let data = {...{router: props.router, ...props.pageProps}};
    return (
        <>
            <Head>
                <link rel="shortcut icon" href={imageSourceUtil.getUploadedImageSrc(props.pageProps.appData.settings.icon, props.pageProps.appData.apiPath.uploads)} />
                <link rel="canonical" href={props.pageProps.appData.apiPath.website.full}/>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <ProviderNoFound {...data}>
                <ComponentHead {...data} />
                <Navbar {...data} />
                <BackToTop {...data} />
                <props.Component {...data} />
                <Footer {...data} />
            </ProviderNoFound>
        </>
    )
}

App.getInitialProps = async (props: AppContext) => {
    if(typeof window === "undefined" && props.ctx.req && props.ctx.res) {
        let req = props.ctx.req;
        let res = props.ctx.res;

        res.setHeader(
            'Cache-Control',
            'public, s-maxage=10, stale-while-revalidate=59'
        );

        req.pageData = {
            ...req.pageData
        }
        req.appData = {
            ...req.appData
        };

        cookieLib.set(req);
        pathLib.set(req);
        await languageLib.set(req);
        await settingLib.setDefaultLanguageId(req);

        let langMatches = req.appData.apiPath.website.originalUrl.match(/\/([a-z]{2}\-[a-z]{2})/gm);
        if(langMatches && langMatches.length > 0) {
            let langKey = langMatches[0].slice(1);
            if(languageLib.check(req, res, langKey)) return {};
            cookieLib.setLanguageId(req, res)
            await settingLib.set(req);
            if(languageLib.isDefault(req, res)) return {};
        }else {
            if(languageLib.checkCookie(req, res)) return {};
            await settingLib.set(req);
        }

        await themeLib.setTools(req);
    }

    return {
        pageProps: {
            appData: props.ctx.req?.appData ?? {},
            pageData: props.ctx.req?.pageData ?? {}
        }
    };
}

export default App;