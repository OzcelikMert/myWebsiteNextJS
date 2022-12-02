import React, {Component} from "react";
import {PagePropCommonDocument} from "types/client/app/pageProps";
import Component404 from "components/elements/404/404";

type PageState = {};

type PageProps = {
    children: React.ReactNode
} & PagePropCommonDocument<{}>;

export default class ProviderNoFound extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return this.props.pageData && this.props.pageData.page ? this.props.children : <Component404 {...this.props}/>
    }
}