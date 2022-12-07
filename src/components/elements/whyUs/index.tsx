import React, { Component } from "react";
import {ComponentDocument} from "types/services/component";
import WhyUsBG from "images/why_us.jpg";
import Particles from "react-tsparticles";
import {loadFull} from "tsparticles";
import {PagePropCommonDocument} from "types/client/app/pageProps";

const particleJson = require("json/particle.json")

type PageState = {
    component?: ComponentDocument
};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class ComponentWhyUs extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            component: this.props.pageData?.page?.components?.findSingle("elementId", "whyUs")
        }
    }

    async particleInit(engine: any): Promise<void> {
        await loadFull(engine);
    }

    render() {
        return (
            <div id="why-us" className="why-us wow fadeIn" style={{backgroundImage: `url(${WhyUsBG})`}}>
                <div className="why-us-bg"/>
                <Particles id="particle_why_us" options={{"style": {"position": "absolute"}, ...particleJson}}
                           init={(engine) => this.particleInit(engine)}/>
                <div className="container">
                    <header className="section-header">
                        <h3>{this.state.component?.types?.findSingle("elementId", "title")?.contents?.content}</h3>
                        <p>{this.state.component?.types?.findSingle("elementId", "desc")?.contents?.content}</p>
                    </header>
                    <div className="row row-eq-height justify-content-center">
                        <div className="col-lg-4 mb-4">
                            <div className="card wow bounceInUp">
                                <i className="fa fa-diamond" aria-hidden="true"></i>
                                <div className="card-body">
                                    <h5 className="card-title text-light">{this.state.component?.types?.findSingle("elementId", "title1")?.contents?.content}</h5>
                                    <p className="card-text">{this.state.component?.types?.findSingle("elementId", "desc1")?.contents?.content}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-4">
                            <div className="card wow bounceInUp">
                                <i className="fa fa-cloud" aria-hidden="true"></i>
                                <div className="card-body">
                                    <h5 className="card-title text-light">{this.state.component?.types?.findSingle("elementId", "title2")?.contents?.content}</h5>
                                    <p className="card-text">{this.state.component?.types?.findSingle("elementId", "desc2")?.contents?.content}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 mb-4">
                            <div className="card wow bounceInUp">
                                <i className="fa fa-shield" aria-hidden="true"></i>
                                <div className="card-body">
                                    <h5 className="card-title text-light">{this.state.component?.types?.findSingle("elementId", "title3")?.contents?.content}</h5>
                                    <p className="card-text">{this.state.component?.types?.findSingle("elementId", "desc3")?.contents?.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
