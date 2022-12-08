import React, { Component } from "react";
import {ComponentDocument} from "types/services/component";
import PostDocument from "types/services/post";
import {Carousel} from "react-responsive-carousel";
import imageSourceUtil from "utils/functions/imageSource.util";
import HTMLReactParser from "html-react-parser";
import {PagePropCommonDocument} from "types/client/app/pageProps";
import Image from 'next/image'

type PageState = {
    component?: ComponentDocument
};

type PageProps = {} & PagePropCommonDocument<{ testimonials?: PostDocument[] }>;

export default class ComponentTestimonials extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.page?.components?.findSingle("elementId", "testimonials")
        }
    }

    Item = (props: PostDocument) => {
        return (
            <div className="testimonial-item">
                <Image
                    src={imageSourceUtil.getUploadedImageSrc(props.contents?.image)}
                    className="img-fluid testimonial-img"
                    alt={props.contents?.title ?? ""}
                    height={250}
                    width={250}
                />
                <h3 className="text-start">{props.contents?.title}</h3>
                <h4 className="text-start">{props.contents?.shortContent}</h4>
                <p className="text-start">{HTMLReactParser(props.contents?.content || "")}</p>
            </div>
        );
    };

    render() {
        return (
            <section id="testimonials">
                <div className="container">
                    <header className="section-header">
                        <h3>{this.state.component?.types?.findSingle("elementId", "title")?.contents?.content}</h3>
                        <p>{this.state.component?.types?.findSingle("elementId", "desc")?.contents?.content}</p>
                    </header>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="owl-carousel testimonials-carousel wow">
                                <Carousel
                                    infiniteLoop={true}
                                    autoPlay={true}
                                    showArrows={false}
                                    emulateTouch
                                    showThumbs={false}
                                    showStatus={false}
                                >
                                    {this.props.pageData?.testimonials?.map((testimonial) => <this.Item {...testimonial}/>)}
                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
