import {PagePropCommonDocument} from "types/client/app/pageProps";
import React, {Component} from "react";
import {GetServerSidePropsContext} from 'next'

import "styles/pages/home.module.scss";
import ComponentCarousel from "components/elements/carousel";
import SelectedComponents from "components/elements/selectedComponents";
import {GetServerSidePropsDocument} from "types/shared/next/getServerSideProps";
import postService from "shared/services/post.service";
import {PageTypeId, PostTypeId, StatusId} from "shared/constants";
import viewLib from "../lib/view.lib";
import themeLib from "../lib/theme.lib";
import PostDocument from "types/shared/services/post";
import Component404 from "components/elements/404/404";

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class Page404 extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <Component404 {...this.props} />
        );
    }
}