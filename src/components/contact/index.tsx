import React, { Component } from "react";
import {ComponentDocument} from "types/shared/services/component";
import HandleForm from "shared/library/react/handles/form";
import ReactSlider from "react-slider";
import mailerService from "shared/services/mailer.service";
import {PagePropCommonDocument} from "types/client/app/pageProps";

type PageState = {
    component?: ComponentDocument
    isSubmittingContactForm: boolean
    isSuccessContactForm: boolean
    budgetValues: {
        step: number,
        min: number,
        max: number
    }
    formData: {
        contactForm: {
            name: string,
            email: string,
            phone: string,
            company: string,
            budget: number,
            projectDetails: string
        }
    }
};

type PageProps = {} & PagePropCommonDocument<{}>;

class ContactComponent extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        const component = this.props.serverData.page?.components?.findSingle("elementId", "contactForm");
        this.state = {
            component: component,
            isSubmittingContactForm: false,
            isSuccessContactForm: false,
            budgetValues: {
                step: Number(component?.types?.findSingle("elementId", "budgetStep")?.contents?.content || 100),
                min: Number(component?.types?.findSingle("elementId", "budgetMin")?.contents?.content || 0),
                max: Number(component?.types?.findSingle("elementId", "budgetMax")?.contents?.content || 15000)
            },
            formData: {
                contactForm: {
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    budget: 1000,
                    projectDetails: ""
                }
            }
        }
    }

    onChangeBudget(value: number) {
        this.setState((state: PageState) => {
            state.formData.contactForm.budget = value;
            return state;
        })
    }

    async onSubmitContactForm(event: React.FormEvent) {
        event.preventDefault();
        let contactForm = this.props.serverData.pageSettings.contactForms?.findSingle("key", "contact");
        if (contactForm) {
            this.setState({
                isSubmittingContactForm: true
            }, async () => {
                let message = `
                    <div>
                        <p>Name: <b>${this.state.formData.contactForm.name}</b>></p>
                        <p>Email: <b>${this.state.formData.contactForm.email}</b></p>
                        <p>Phone: <b>${this.state.formData.contactForm.phone}</b></p>
                        <p>Company: <b>${this.state.formData.contactForm.company}</b></p>
                        <p>Budget: <b>${this.state.formData.contactForm.budget}</b></p>
                        <hr>
                        <p>Message: <i>${this.state.formData.contactForm.projectDetails}</i></p>
                    </div>
                `;

                let resData = await mailerService.post({
                    email: this.state.formData.contactForm.email,
                    contactFormId: contactForm?._id || "",
                    message: message
                })


                this.setState((state: PageState) => {
                    if(resData.status){
                        state.isSuccessContactForm = true;
                    }
                    state.isSubmittingContactForm = false;
                    return;
                })
            })
        }
    }

    render() {
        return (
            <section id="contact">
                <div className="container">
                    <div className="section-header">
                        <h3>{this.state.component?.types.findSingle("elementId", "title")?.contents?.content}</h3>
                        <p>{this.state.component?.types?.findSingle("elementId", "desc")?.contents?.content}</p>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <form onSubmit={event => this.onSubmitContactForm(event)}>
                                <ul className="contact-form">

                                    <li className="row">
                                        <div className="col-md-6">
                                            <input
                                                name="contactForm.name"
                                                placeholder={this.state.component?.types.findSingle("elementId", "name")?.contents?.content}
                                                size={8}
                                                type="text"
                                                onChange={event => HandleForm.onChangeInput(event, this)}

                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                name="contactForm.email"
                                                placeholder={this.state.component?.types.findSingle("elementId", "email")?.contents?.content}
                                                size={8}
                                                type="email"
                                                onChange={event => HandleForm.onChangeInput(event, this)}

                                            />
                                        </div>
                                    </li>

                                    <li className="row">
                                        <div className="col-md-6">
                                            <input
                                                name="contactForm.phone"
                                                placeholder={this.state.component?.types.findSingle("elementId", "phone")?.contents?.content}
                                                size={8}
                                                type="text"
                                                onChange={event => HandleForm.onChangeInput(event, this)}

                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                name="contactForm.company"
                                                placeholder={this.state.component?.types.findSingle("elementId", "company")?.contents?.content}
                                                size={8}
                                                type="text"
                                                onChange={event => HandleForm.onChangeInput(event, this)}
                                            />
                                        </div>
                                    </li>

                                    <li className="row">
                                        <div className="col-md-6">
                                            <label>{this.state.component?.types.findSingle("elementId", "budget")?.contents?.content}</label>
                                            <ReactSlider
                                                className="slider-range-min"
                                                trackClassName="ui-slider-range ui-slider-range-min"
                                                thumbActiveClassName="gg"
                                                step={this.state.budgetValues.step}
                                                min={this.state.budgetValues.min}
                                                max={this.state.budgetValues.max}
                                                value={this.state.formData.contactForm.budget}
                                                onChange={value => this.onChangeBudget(value)}
                                                renderTrack={(props, state) => state.index == 0 ?
                                                    <div {...props} className="ui-slider-range ui-slider-range-min"
                                                         style={{"width": `${state.value.getPercent(this.state.budgetValues.min, this.state.budgetValues.max)}%`}}></div> : null}
                                                renderThumb={(props, state) => <span {...props}
                                                                                     className="ui-slider-handle ui-state-default ui-corner-all"
                                                                                     style={{"left": `${state.value.getPercent(this.state.budgetValues.min, this.state.budgetValues.max)}%`}}></span>}
                                            />
                                        </div>
                                        <div className="col-md-6 amount">
                                            {
                                                this.state.formData.contactForm.budget === this.state.budgetValues.min
                                                    ? this.state.component?.types.findSingle("elementId", "unspecified")?.contents?.content
                                                    : this.state.formData.contactForm.budget === this.state.budgetValues.max
                                                        ? `€${this.state.budgetValues.max} ${this.state.component?.types.findSingle("elementId", "orMore")?.contents?.content}`
                                                        : `€${this.state.formData.contactForm.budget}`
                                            }
                                        </div>
                                    </li>

                                    <li className="row">

                                        <div className="col-md-12">
                                            <textarea
                                                name="contactForm.projectDetails"
                                                className="span12"
                                                placeholder={this.state.component?.types.findSingle("elementId", "message")?.contents?.content}
                                                onChange={event => HandleForm.onChangeInput(event, this)}
                                            >
                                            </textarea>
                                        </div>
                                    </li>

                                    <li className="row">
                                        <div className="col-md-12">
                                            <button type="submit" disabled={this.state.isSubmittingContactForm}>
                                                {this.state.component?.types.findSingle("elementId", "submit")?.contents?.content}
                                                {
                                                    !this.state.isSubmittingContactForm
                                                        ?
                                                        <span className="mdi mdi-arrow-right" aria-hidden="true"></span>
                                                        : <i className="fa fa-spinner fa-spin me-1"></i>
                                                }
                                            </button>
                                        </div>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ContactComponent;
