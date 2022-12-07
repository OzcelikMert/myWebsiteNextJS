import {PagePropCommonDocument} from "types/client/app/pageProps";
import React, {Component} from "react";

import "styles/pages/home.module.scss";

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class Component404 extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <div>
                No Found
            </div>
        );
    }
}