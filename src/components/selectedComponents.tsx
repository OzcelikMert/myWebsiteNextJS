import React, { Component } from "react";

import {PagePropCommonDocument} from "types/client/app/pageProps";
import ServicesComponent from "components/services";
import WhyUsComponent from "components/whyUs";
import TestimonialsComponent from "components/testimonials";
import ClientsComponent from "components/clients";
import ContactComponent from "components/contact";
import AboutComponent from "components/about";

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
                element = (<AboutComponent {...this.props} />);
                break;
            case "services":
                element = (<ServicesComponent {...this.props} />);
                break;
            case "whyUs":
                element = (<WhyUsComponent {...this.props} />);
                break;
            case "testimonials":
                element = (<TestimonialsComponent {...this.props} />);
                break;
            case "clients":
                element = (<ClientsComponent {...this.props} />);
                break;
            case "contactForm":
                element = (<ContactComponent {...this.props} />);
                break;
        }

        return element;
    }

    render() {
        return this.props.serverData.page?.components?.map(component => this.getComponent(component.elementId))
    }
}

export default SelectedComponents;
