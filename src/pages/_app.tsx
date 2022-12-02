import type {AppContext, AppProps} from 'next/app'
import React from "react";

import "styles/global.scss";

import "shared/library/variable/array"
import "shared/library/variable/string"
import "shared/library/variable/number"
import "shared/library/variable/date"
import "shared/library/variable/math"

import ComponentHead from "components/head";
import ProviderNoFound from "components/providers/noFound";
import cookieLib from "../lib/cookie.lib";
import pathLib from "../lib/path.lib";
import languageLib from "../lib/language.lib";
import settingLib from "../lib/setting.lib";
import themeLib from "../lib/theme.lib";
import Navbar from "components/tools/navbar";
import BackToTop from "components/tools/backToTop";
import Footer from "components/tools/footer";

function App(props: AppProps) {
    let data = {...{router: props.router, ...props.pageProps}};
    return (
        <ProviderNoFound {...data}>
            <ComponentHead {...data} />
            <Navbar {...data} />
            <BackToTop {...data} />
            <props.Component {...data} />
            <Footer {...data} />
        </ProviderNoFound>
    )
}

App.getInitialProps = async (props: AppContext) => {
    if(typeof window === "undefined" && props.ctx.req) {
        let req = props.ctx.req;
        console.log(props.ctx.req.cookies);
        req.pageData = {
            ...req.pageData
        }
        req.appData = {
            ...req.appData
        };

        pathLib.set(req);
        cookieLib.set(req);
        await languageLib.set(req);

        languageLib.check(req);
        await settingLib.set(req);

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