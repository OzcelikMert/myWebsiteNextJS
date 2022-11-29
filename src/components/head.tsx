import React, {Component} from "react";
import Head from 'next/head'

type PageState = {};

type PageProps = {};

export default class ComponentHead extends Component<PageProps, PageState> {
    constructor(props: PageProps) {
        super(props);
        console.log(this.props)
    }

    render() {
        return (
            <Head>
                <title>HeLLo</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
        );
    }
}

export async function getServerSideProps(context: any) {
    return {
        props: {
            serverData: {surname: "test"}
        },
    };
}