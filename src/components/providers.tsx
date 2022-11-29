import React, {Component} from "react";
import {PagePropCommonDocument} from "types/client/app/pageProps";

type PageState = {};

type PageProps = {
    children: React.ReactNode
};

export default class ComponentProviders extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}