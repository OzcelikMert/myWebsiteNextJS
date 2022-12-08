import React, { Component } from "react";
import imageSourceUtil from "utils/functions/imageSource.util";
import {Carousel} from "react-responsive-carousel";
import PostDocument from "types/services/post";
import {PagePropCommonDocument} from "types/client/app/pageProps";
import Image from "next/image";

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{ sliders: PostDocument[] }>;

export default class ComponentCarousel extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    Item = (props: PostDocument) => {
        return (
            <div
                className="masthead"
            >
                <Image
                    src={imageSourceUtil.getUploadedImageSrc(props.contents?.image)}
                    alt={props.contents?.title ?? ""}
                    width={1250}
                    height={1024}
                />
                <div className="masthead-filter"></div>
                <div className="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center masthead-content-container">
                    <div className="masthead-content d-flex justify-content-center">
                        <div className="text-center">
                            <h1 className="mx-auto my-0 text-uppercase mb-5 fw-bold">{props.contents?.title}</h1>
                            <h2 className="text-white mx-auto mt-2 mb-5">{props.contents?.shortContent}</h2>
                            <div className="buttons">
                                {props.contents?.buttons?.map((button) =>
                                    <a href={button.url} className="btn-get-started scrollto">{button.title}</a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div id="intro">
                <Carousel
                    showArrows={false}
                    emulateTouch
                    showThumbs={false}
                    showStatus={false}
                    renderIndicator={() => null}
                >
                    {this.props.pageData?.sliders.map((slider) => <this.Item {...slider} />)}
                </Carousel>
            </div>
        );
    }
}
