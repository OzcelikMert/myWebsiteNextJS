import {GetServerSidePropsContext} from 'next'
import Parser from "xml2js";
import "styles/pages/home.module.scss";
import sitemapService from "services/sitemap.service";
import {SitemapDocument} from "types/services/sitemap";

export default function PageSitemapsXML() { return null; }

export async function getServerSideProps(context: GetServerSidePropsContext) {
    let res = context.res;

    let page: string = context.params?.page as string ?? "";
    let name = page.replace(".xml", "");

    let resData = await sitemapService.get({name: name});
    let xml = (new Parser.Builder()).buildObject(({
        urlset: {
            ...(resData.data as SitemapDocument).urlset,
            url: (resData.data as SitemapDocument).urlset?.url?.map(url => {
                delete url._id;
                return url;
            })
        }
    } as SitemapDocument));

    res.setHeader('Content-Type', 'text/xml');
    res.write(xml);
    res.end();
    return {
        props: {}
    };
}