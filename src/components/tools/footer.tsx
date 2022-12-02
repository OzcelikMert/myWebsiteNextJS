import React, {Component} from "react";
import {PagePropCommonDocument} from "types/client/app/pageProps";

import HandleForm from "shared/library/react/handles/form";
import subscriberService from "shared/services/subscriber.service";
import LinkUtil from "shared/utils/functions/link.util";

type PageState = {
    isSubmittingSubscribe: boolean
    isSuccessSubscribe: boolean
    formData: {
        subscribeForm: {
            email: string
        }
    }
};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class Footer extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isSubmittingSubscribe: false,
            isSuccessSubscribe: false,
            formData: {
                subscribeForm: {
                    email: ""
                }
            }
        }
    }

    onSubscribe(event: React.FormEvent) {
        event.preventDefault();

        this.setState({
            isSubmittingSubscribe: true
        }, () => {
            subscriberService.add({
                ...this.state.formData.subscribeForm
            }).then(resData => {
                this.setState({
                    isSubmittingSubscribe: false,
                    isSuccessSubscribe: true
                });
            })
        })
    }

    render() {
        return (
            <footer id="footer">
                <div className="footer-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6 footer-info">
                                <h3>{this.props.pageData.themeTools.footer?.types?.findSingle("elementId", "logo")?.contents?.content}</h3>
                                <p>{this.props.pageData.themeTools.footer?.types?.findSingle("elementId", "desc")?.contents?.content}</p>
                            </div>

                            <div className="col-lg-2 col-md-6 footer-links">
                                <h4>{this.props.pageData.themeTools.footer?.types?.findSingle("elementId", "policies")?.contents?.content}</h4>
                                <ul>
                                    {
                                        this.props.pageData.themeTools.footer?.types?.findMulti("elementId", ["cookie", "privacy", "termsOfUse"]).map(type => (
                                            <li>
                                                <a href={LinkUtil.target(this.props.appData, type?.contents?.url || "")}>
                                                    {type?.contents?.content}
                                                </a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-contact">
                                <h4>{this.props.pageData.themeTools.footer?.types?.findSingle("elementId", "contact")?.contents?.content}</h4>
                                <p>
                                    {this.props.pageData.themeTools.footer?.types?.findSingle("elementId", "emailHelp")?.contents?.content}
                                    <br/>
                                    {this.props.pageData.themeTools.footer?.types?.findSingle("elementId", "email")?.contents?.content}
                                    <br/>
                                    <strong>
                                        <a
                                            href="https://api.whatsapp.com/send?phone=05451031057"
                                            target="_blank"
                                            className="text-light"
                                        >
                                            <i className="fa fa-whatsapp" aria-hidden="true"></i>{" "}
                                            {this.props.pageData.themeTools.footer?.types?.findSingle("elementId", "whatsapp")?.contents?.content}
                                        </a>
                                    </strong>
                                </p>

                                <div className="social-links">
                                    <a href="" className="twitter">
                                        <i className="fa fa-twitter" aria-hidden="true"></i>
                                    </a>
                                    <a href="#" className="facebook">
                                        <i className="fa fa-facebook-official" aria-hidden="true"></i>
                                    </a>
                                    <a href="#" className="instagram">
                                        <i className="fa fa-instagram" aria-hidden="true"></i>
                                    </a>
                                    <a href="#" className="google-plus">
                                        <i className="fa fa-google" aria-hidden="true"></i>
                                    </a>
                                    <a href="#" className="linkedin">
                                        <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-newsletter">
                                <h4>{this.props.pageData.themeTools.footer?.types?.findSingle("elementId", "subscribe")?.contents?.content}</h4>
                                <p>{this.props.pageData.themeTools.footer?.types?.findSingle("elementId", "subscribeDesc")?.contents?.content}</p>
                                {
                                    !this.state.isSuccessSubscribe
                                        ? <form onSubmit={event => this.onSubscribe(event)}>
                                            <input
                                                type="email"
                                                name="subscribeForm.email"
                                                required
                                                value={this.state.formData.subscribeForm.email}
                                                onChange={event => HandleForm.onChangeInput(event, this)}
                                            />
                                            <button type="submit" disabled={this.state.isSubmittingSubscribe}>
                                                {
                                                    this.state.isSubmittingSubscribe
                                                        ? <i className="fa fa-spinner fa-spin me-1"></i>
                                                        : this.props.pageData.themeTools.footer?.types.findSingle("elementId", "subscribeBtn")?.contents?.content
                                                }
                                            </button>
                                        </form> : <div>
                                            {
                                                this.props.pageData.themeTools.footer?.types.findSingle("elementId", "subscribed")?.contents?.content
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong>WabbySoft</strong>. All Rights Reserved
                    </div>
                </div>
            </footer>
        );
    }
}
