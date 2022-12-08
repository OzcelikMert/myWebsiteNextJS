import React, { Component } from "react";
import imageSourceUtil from "utils/functions/imageSource.util";
import {ComponentDocument} from "types/services/component";
import {PagePropCommonDocument} from "types/client/app/pageProps";
import Image from 'next/image'

type PageState = {
    component?: ComponentDocument
};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class ComponentAbout extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.page?.components?.findSingle("elementId", "about")
        }
    }

    render() {
        return (
            <section id="about">
                <div className="container">
                    <header className="section-header">
                        <h3>
                            {this.state.component?.types?.findSingle("elementId", "title")?.contents?.content}
                        </h3>
                        <p>
                            {this.state.component?.types?.findSingle("elementId", "desc")?.contents?.content}
                        </p>
                    </header>

                    <div className="row about-container">
                        <div className="col-lg-6 wow fadeInUp content order-lg-1 order-2">
                            <p>{this.state.component?.types?.findSingle("elementId", "otherDesc")?.contents?.content}</p>
                        </div>

                        <div className="col-lg-6 background order-lg-2 order-1 wow fadeInUp about_system_col">
                            <Image
                                src={imageSourceUtil.getUploadedImageSrc(this.state.component?.types?.findSingle("elementId", "img1")?.contents?.content)}
                                alt={this.state.component?.types?.findSingle("elementId", "title")?.contents?.content ?? ""}
                                className="img-fluid w-100"
                                height={250}
                                width={500}
                            />
                        </div>
                    </div>

                    <div className="row about-extra">
                        <div className="col-lg-6 wow fadeInUp">
                            <div style={{overflow: "hidden"}}>
                                <Image
                                    src={imageSourceUtil.getUploadedImageSrc(this.state.component?.types?.findSingle("elementId", "img2")?.contents?.content)}
                                    alt={this.state.component?.types?.findSingle("elementId", "rightTitle")?.contents?.content ?? ""}
                                    className="img-fluid w-100"
                                    style={{marginTop: "-125px"}}
                                    height={250}
                                    width={500}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeInUp pt-5 pt-lg-0">
                            <h4>
                                {this.state.component?.types?.findSingle("elementId", "rightTitle")?.contents?.content}
                            </h4>
                            <p>
                                {this.state.component?.types?.findSingle("elementId", "rightDesc")?.contents?.content}
                            </p>
                        </div>
                    </div>

                    <div className="row about-extra">
                        <div className="col-lg-6 wow fadeInUp order-1 order-lg-2">
                            <Image
                                src={imageSourceUtil.getUploadedImageSrc(this.state.component?.types?.findSingle("elementId", "img3")?.contents?.content)}
                                alt={this.state.component?.types?.findSingle("elementId", "endTitle")?.contents?.content ?? ""}
                                className="img-fluid w-100"
                                style={{marginTop: "-80px"}}
                                height={250}
                                width={500}
                            />
                        </div>

                        <div className="col-lg-6 wow fadeInUp pt-4 pt-lg-0 order-2 order-lg-1">
                            <h4>
                                {this.state.component?.types?.findSingle("elementId", "endTitle")?.contents?.content}
                            </h4>
                            <p>
                                {this.state.component?.types?.findSingle("elementId", "endDesc")?.contents?.content}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
