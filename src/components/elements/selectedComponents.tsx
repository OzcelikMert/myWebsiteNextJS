import React, { Component } from "react";

import {PagePropCommonDocument} from "types/client/app/pageProps";
import ComponentServices from "components/elements/services";
import ComponentWhyUs from "components/elements/whyUs";
import ComponentTestimonials from "components/elements/testimonials";
import ComponentClients from "components/elements/clients";
import ComponentContact from "components/elements/contact";
import ComponentAbout from "components/elements/about";

type PageState = {};

type PageProps = {} & PagePropCommonDocument<{}>;

class SelectedComponents extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
    }

    getComponent = (elementId: string) => {
        let element = (<div></div>);

        switch (elementId) {
            case "about":
                element = (<ComponentAbout {...this.props} />);
                break;
            case "services":
                element = (<ComponentServices {...this.props} />);
                break;
            case "whyUs":
                element = (<ComponentWhyUs {...this.props} />);
                break;
            case "testimonials":
                element = (<ComponentTestimonials {...this.props} />);
                break;
            case "clients":
                element = (<ComponentClients {...this.props} />);
                break;
            case "contactForm":
                element = (<ComponentContact {...this.props} />);
                break;
        }

        return element;
    }

    render() {
        return this.props.pageData?.page?.components?.map(component => this.getComponent(component.elementId))
    }
}

export default SelectedComponents;
