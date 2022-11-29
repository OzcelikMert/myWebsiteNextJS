import {PagePropCommonDocument} from "types/client/app/pageProps";
import PostDocument from "types/shared/services/post";
import React, {Component} from "react";
import postService from "shared/services/post.service";
import {PageTypeId, PostTypeId, StatusId} from "shared/constants";

import CarouselComponent from "components/elements/carousel";
import SelectedComponents from "components/elements/selectedComponents";

import "styles/pages/home.module.scss";
import {NextPage, NextPageContext} from "next";
import {PreRenderedDataDocument} from "types/shared/utils/preRenderedData";

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{
    sliders: PostDocument[];
    services: PostDocument[];
    testimonials: PostDocument[];
    whyUs: PostDocument[];
    clients: PostDocument[];
}>;

export default class PageDynamic extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <div>
                Hello
            </div>
        );
    }
}

export async function getServerSideProps(context: NextPageContext) {
    console.log(context.query)
    return {
        props: {
            serverData: {name: "test"} // will be passed to the page component as props
        },
    };
}