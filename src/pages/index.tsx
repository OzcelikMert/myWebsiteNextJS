import {PagePropCommonDocument} from "types/client/app/pageProps";
import PostDocument from "types/shared/services/post";
import React, {Component} from "react";
import {GetServerSideProps, InferGetServerSidePropsType} from 'next'

import postService from "shared/services/post.service";
import {PageTypeId, PostTypeId, StatusId} from "shared/constants";

import CarouselComponent from "components/elements/carousel";
import SelectedComponents from "components/elements/selectedComponents";

import "styles/pages/home.module.scss";
import {NextPage, NextPageContext} from "next";
import {PreRenderedDataDocument} from "types/shared/utils/preRenderedData";
import componentService from "shared/services/component.service";

type PageState = {};

type PageProps = {
    components: any[]
} & PagePropCommonDocument<{}>;

export default class PageHome extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        console.log(props)
    }

    render() {
        return (
            <div>
                Hello
                {
                    this.props.components.map(component => <div className="w-100">{component.contents?.title}</div>)
                }
            </div>
        );
    }
}

export async function getServerSideProps(context: any) {
    let components = await postService.get({getContents: 1});
    return {
        props: {
            components: components.data // will be passed to the page component as props
        },
    };
}