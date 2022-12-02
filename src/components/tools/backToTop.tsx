import React, { Component } from 'react'
import {PagePropCommonDocument} from "types/client/app/pageProps";

type PageState = {
    isShow: boolean
};

type PageProps = {} & PagePropCommonDocument<any>;

export default class BackToTop extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    componentDidMount() {
        if(window) this.setEvents();
    }

    componentWillUnmount() {
        if(window) this.clearEvents();
    }

    setEvents() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    clearEvents() {
        window.removeEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if(window.scrollY > 100){
            if(!this.state.isShow){
                this.setState({
                    isShow: true
                })
            }
        }else {
            if(this.state.isShow){
                this.setState({
                    isShow: false
                })
            }
        }
    }

    goTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    render() {
        return (
            <div className={`back-to-top animated ${this.state.isShow ? "fadeIn show" : "fadeOut"}`}>
                <button type="button" className="btn btn-lg btn-primary btn-lg-square" onClick={() => this.goTop()}>
                    <i className="mdi mdi-arrow-up"></i>
                </button>
            </div>
        )
    }
}
