import {GetServerSidePropsContext} from 'next'
import Parser from "xml2js";
import "styles/pages/home.module.scss";
import sitemapService from "services/sitemap.service";
import React, {Component} from "react";

export default function PageSitemapXML() { return null; }

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let res = context.res;

    let name = "sitemap";
    let resData = await sitemapService.get({name: name});
    let xml = (new Parser.Builder()).buildObject(resData.data);
    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
    return {
        props: {}
    };
}