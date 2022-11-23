import React, { Component } from "react";
import {ComponentDocument} from "types/shared/services/component";
import PostDocument from "types/shared/services/post";
import imageSourceUtil from "shared/utils/functions/imageSource.util";
import {PagePropCommonDocument} from "types/client/app/pageProps";
import Image from 'next/image'

type PageState = {
    component?: ComponentDocument
};

type PageProps = {} & PagePropCommonDocument<{ clients?: PostDocument[] }>;

class ClientsComponent extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.serverData.page?.components?.findSingle("elementId", "clients")
        }
    }

    Item = (props: PostDocument) => {
        return (
            <div className="col-lg-3 col-md-4 col-xs-6">
                <div className="client-logo">
                    <a href={props.contents?.url} target="_blank">
                        <img
                            loading="lazy"
                            src={imageSourceUtil.getUploadedImageSrc(props.contents?.image)}
                            className="img-fluid"
                            alt={props.contents?.title ?? ""}
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
                        {this.props.serverData.clients?.map((client) => <this.Item {...client}/>)}
                    </div>
                </div>
            </section>
        );
    }
}

export default ClientsComponent;
