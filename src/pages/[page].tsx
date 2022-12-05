import {PagePropCommonDocument} from "types/client/app/pageProps";
import PostDocument from "types/shared/services/post";
import React, {Component} from "react";

import "styles/pages/home.module.scss";
import {GetServerSidePropsContext, NextPage, NextPageContext} from "next";
import HTMLReactParser from "html-react-parser";
import SelectedComponents from "components/elements/selectedComponents";
import postService from "shared/services/post.service";
import {PageTypeId, PostTypeId, StatusId} from "shared/constants";
import viewLib from "../lib/view.lib";
import themeLib from "../lib/theme.lib";
import {GetServerSidePropsDocument} from "types/shared/next/getServerSideProps";

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
                <section id="pageContent">
                    <div className="container">
                        {HTMLReactParser(this.props.pageData?.page?.contents?.content || "")}
                    </div>
                </section>
                <SelectedComponents {...this.props} />
            </div>
        );
    }
}

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<GetServerSidePropsDocument<{}>> {
    let req = context.req;

    let pages = (await postService.get({
        langId: req.appData.languageId,
        typeId: PostTypeId.Page,
        getContents: 1,
        url: (context.params?.page ?? "") as string,
        statusId: StatusId.Active
    })).data;

    let page = pages.length > 0 ? pages[0] : null;

    if (page) {
        req.pageData.page = page;
        await viewLib.set(req);
        await themeLib.setComponents(req);
    }

    return {
        props: {
            pageData: req.pageData
        }
    };
}