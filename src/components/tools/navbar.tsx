import React, {Component} from "react";
import imageSourceUtil from "utils/functions/imageSource.util";
import {PagePropCommonDocument} from "types/client/app/pageProps";

import PostDocument from "types/services/post";
import LinkUtil from "utils/functions/link.util";
import {PageTypeId} from "constants/index";

type PageState = {
    isNavbarSticky: boolean;
};

type PageProps = {} & PagePropCommonDocument<{}>;

export default class Navbar extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isNavbarSticky: false,
        };
    }

    componentDidMount() {
        this.setEvents();
    }

    componentWillUnmount() {
        this.clearEvents();
    }

    setEvents() {
        window.addEventListener("scroll", () => this.handleScroll());
    }

    clearEvents() {
        window.removeEventListener("scroll", () => this.handleScroll());
    }

    handleScroll() {
        if (window.scrollY > 100) {
            if (!this.state.isNavbarSticky) {
                this.setState({
                    isNavbarSticky: true,
                });
            }
        } else {
            if (this.state.isNavbarSticky) {
                this.setState({
                    isNavbarSticky: false,
                });
            }
        }
    }

    getNavElement = (nav: PostDocument, mainId?: any) => {
        if (nav.mainId?._id != mainId) return null;
        let subNav = this.props.pageData.themeTools.navigations.findMulti(
            "mainId._id",
            nav._id
        );

        return (
            <li
                className={
                    subNav.length == 0
                        ? "nav-item nav-link"
                        : "nav-item nav-link drop-down"
                }
            >
                <a href={subNav.length == 0 ? LinkUtil.target(this.props.appData, nav.contents?.url || "") : "javascript:void(0);"}>{nav.contents?.title}</a>
                <ul>
                    {subNav.map((_subNav) => this.getNavElement(_subNav, nav._id))}
                </ul>
            </li>
        );
    };

    GetLanguagesElement = () => {
        let current = this.props.appData.languages.findSingle("_id", this.props.appData.languageId);

        return (
            <li className="nav-item nav-link drop-down">
                <a href="javascript:void(0);">
                    <div className="row">
                        <div className="col">
                            <img className="flag-size" src={this.props.appData.apiPath.uploads.flags + current?.image} alt={current?.title}/>
                        </div>
                        <div className="col ms-1"><span>{current?.shortKey.toUpperCase()}</span></div>
                    </div>
                </a>
                <ul>
                    {
                        this.props.appData.languages.map((lang) => this.props.appData.languageId == lang._id ? null : (
                            <li className="nav-item nav-link">
                                <a href={LinkUtil.changeLanguage(this.props.appData, lang)}>
                                    <div className="row">
                                        <div className="col-3">
                                            <img className="flag-size" src={this.props.appData.apiPath.uploads.flags + lang.image} alt={lang.title}/>
                                        </div>
                                        <div className="col-9"><span>{lang.title}</span></div>
                                    </div>
                                </a>

                            </li>
                        ))
                    }
                </ul>
            </li>
        )
    };

    render() {
        return (
            <header
                id="header"
                className={`${typeof window !== "undefined" && window.scrollY > 100 ? "header-scrolled fixed-top" : ""} ${this.props.pageData?.page?.pageTypeId == PageTypeId.HomePage ? "fixed-top" : "bg-secondary"}`}
            >
                <div className="container">
                    <div className="logo float-start wabbysoft_logo">
                        <a href={LinkUtil.home(this.props.appData)} className={"img-fluid scrollto"}
                           style={typeof window !== "undefined" && window.scrollY > 100 ? {display: "none"} : {}}>
                            <img
                                style={{filter: "drop-shadow(1px 0.5px 0.5px #fff)"}}
                                src={imageSourceUtil.getUploadedImageSrc(this.props.appData.settings.logo)}
                                alt={this.props.appData.settings.seoContents?.title}
                                title={this.props.appData.settings.seoContents?.title}
                            />
                        </a>
                        <a href={LinkUtil.home(this.props.appData)} className={"img-fluid scrollto"}
                           style={typeof window !== "undefined" && window.scrollY > 100 ? {} : {display: "none"}}>
                            <img
                                style={{filter: "drop-shadow(1px 0.5px 0.5px #fff)"}}
                                src={imageSourceUtil.getUploadedImageSrc(this.props.appData.settings.logoTwo)}
                                alt={this.props.appData.settings.seoContents?.title}
                                title={this.props.appData.settings.seoContents?.title}
                            />
                        </a>
                    </div>

                    <nav className="main-nav float-end d-none d-lg-block">
                        <ul>
                            {this.props.pageData.themeTools.navigations.map((navigation) =>
                                this.getNavElement(navigation)
                            )}
                            {this.GetLanguagesElement()}
                        </ul>

                    </nav>
                </div>
            </header>
        );
    }
}
