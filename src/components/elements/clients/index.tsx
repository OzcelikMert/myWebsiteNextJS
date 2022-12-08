import React, { Component } from "react";
import {ComponentDocument} from "types/services/component";
import PostDocument from "types/services/post";
import imageSourceUtil from "utils/functions/imageSource.util";
import {PagePropCommonDocument} from "types/client/app/pageProps";
import Image from 'next/image'

type PageState = {
    component?: ComponentDocument
};

type PageProps = {} & PagePropCommonDocument<{ clients?: PostDocument[] }>;

export default class ComponentClients extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.page?.components?.findSingle("elementId", "clients")
        }
    }

    Item = (props: PostDocument) => {
        return (
            <div className="col-lg-3 col-md-4 col-xs-6">
                <div className="client-logo">
                    <a href={props.contents?.url} target="_blank">
                        <Image
                            src={imageSourceUtil.getUploadedImageSrc(props.contents?.image)}
                            className="img-fluid"
                            alt={props.contents?.title ?? ""}
                            height={250}
                            width={250}
                        />
                    </a>
                </div>
            </div>
        );
    };

    render() {
        return (
            <section id="clients">
                <div className="container">
                    <div className="section-header">
                        <h3>{this.state.component?.types?.findSingle("elementId", "title")?.contents?.content}</h3>
                        <p>{this.state.component?.types?.findSingle("elementId", "desc")?.contents?.content}</p>
                    </div>

                    <div className="row g-0 clients-wrap clearfix wow fadeInUp">
                        {this.props.pageData?.clients?.map((client) => <this.Item {...client}/>)}
                    </div>
                </div>
            </section>
        );
    }
}
