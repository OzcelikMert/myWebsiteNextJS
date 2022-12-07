import {PagePropCommonDocument} from "types/client/app/pageProps";
import React, {Component} from "react";
import {GetServerSidePropsContext} from 'next'

import "styles/pages/home.module.scss";
import ComponentCarousel from "components/elements/carousel";
import SelectedComponents from "components/elements/selectedComponents";
import {GetServerSidePropsDocument} from "types/shared/next/getServerSideProps";
import postService from "services/post.service";
import {PageTypeId, PostTypeId, StatusId} from "constants/index";
import viewLib from "lib/view.lib";
import themeLib from "lib/theme.lib";
import PostDocument from "types/services/post";

type PageState = {};

type PageProps = {
    components: any[]
} & PagePropCommonDocument<{ sliders: PostDocument[] }>;

export default class PageHome extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <ComponentCarousel {...this.props}/>
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
        pageTypeId: PageTypeId.HomePage,
        statusId: StatusId.Active
    })).data;

    let page = pages.length > 0 ? pages[0] : null;

    if (page) {
        req.pageData.page = page;
        await viewLib.set(req);

        req.pageData.sliders = req.pageData.page.pageTypeId == PageTypeId.HomePage
            ? (await postService.get({
                langId: req.appData.languageId,
                typeId: PostTypeId.Slider,
                statusId: StatusId.Active
            })).data : []

        await themeLib.setComponents(req);
    }

    return {
        props: {
            pageData: req.pageData
        }
    };
}