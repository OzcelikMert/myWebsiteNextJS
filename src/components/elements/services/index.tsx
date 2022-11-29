import React, { Component } from "react";
import {ComponentDocument} from "types/shared/services/component";
import PostDocument from "types/shared/services/post";
import imageSourceUtil from "shared/utils/functions/imageSource.util";
import {PagePropCommonDocument} from "types/client/app/pageProps";
import Image from 'next/image'

type PageState = {
    component?: ComponentDocument
};

type PageProps = {} & PagePropCommonDocument<{ services?: PostDocument[] }>;

class ServicesComponent extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.serverData.page?.components?.findSingle("elementId", "services")
        }
    }

    itemCount = 0;
    itemRow = 1;

    Item = (props: PostDocument) => {
        this.itemCount++;
        if (this.itemRow === 1 && this.itemCount > 3) {
            this.itemRow = 2;
            this.itemCount = 1;
        } else if (this.itemRow === 2 && this.itemCount > 2) {
            this.itemRow = 1;
            this.itemCount = 1;
        }

        return (
            <div className={`col-lg-${this.itemRow % 2 === 0 ? "6" : "4"} mb-4`}>
                <div className="card wow bounceInUp">
                    <img
                        src={imageSourceUtil.getUploadedImageSrc(props.contents?.image)}
                        alt={props.contents?.title ?? ""}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{props.contents?.title}</h5>
                        <p className="card-text">{props.contents?.shortContent}</p>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        this.itemCount = 0;
        this.itemRow = 1;
        return (
            <section id="services">
                <div className="container">
                    <header className="section-header">
                        <h3>{this.state.component?.types.findSingle("elementId", "title")?.contents?.content}</h3>
                        <p>{this.state.component?.types?.findSingle("elementId", "desc")?.contents?.content}</p>
                    </header>

                    <div className="row row-eq-height justify-content-center">
                        {this.props.serverData.services?.map((service) => this.Item(service))}
                    </div>
                </div>
            </section>
        );
    }
}

export default ServicesComponent;
