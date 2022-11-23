import {PagePropCommonDocument} from "types/client/app/pageProps";
import PostDocument from "types/shared/services/post";
import React, {Component} from "react";
import postService from "shared/services/post.service";
import {PageTypeId, PostTypeId, StatusId} from "shared/constants";

import CarouselComponent from "components/carousel";
import SelectedComponents from "components/selectedComponents";

import "styles/pages/home.module.scss";

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{
    sliders: PostDocument[];
    services: PostDocument[];
    testimonials: PostDocument[];
    whyUs: PostDocument[];
    clients: PostDocument[];
}>;

export default class PageHome extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <CarouselComponent {...this.props} />
                <SelectedComponents {...this.props} />
            </div>
        );
    }
}

export async function getServerSideProps() {
    let page = (await postService.get({
        langId: "6331b8ba490f2f6cbc41a570",
        typeId: PostTypeId.Page,
        getContents: 1,
        pageTypeId: PageTypeId.HomePage,
        statusId: StatusId.Active
    })).data;

    let data = {
        page: page.length > 0 ? page[0] : undefined,
    };

    if (data.page) {
        data = {
            ...data,
            ...(
                data.page.pageTypeId == PageTypeId.HomePage
                    ? {
                        sliders: (await postService.get({
                            langId: "6331b8ba490f2f6cbc41a570",
                            typeId: PostTypeId.Slider,
                            statusId: StatusId.Active
                        })).data
                    } : {}
            )
        };
    }

    return {
        props: {
            serverData: data, // will be passed to the page component as props
        },
    };
}