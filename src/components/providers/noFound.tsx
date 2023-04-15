import React, {Component} from "react";
import {PagePropCommonDocument} from "types/client/app/pageProps";
import Page404 from "pages/404";

type PageState = {};

type PageProps = {
    children: React.ReactNode
} & PagePropCommonDocument<{}>;

export default class ProviderNoFound extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        if(!this.props.pageData || !this.props.pageData.page){
            this.props.router.push("/404")
            return null;
        }

        return this.props.children;
    }
}