export interface SitemapGetParamDocument {
    name: string
}

export interface SitemapIndexAttrDocument {
    "xmlns:xsi"?: string
    "xmlns:xsd"?: string
    "xmlns"?: string
}

export interface SitemapIndexChildrenDocument {
    loc: string
}

export interface SitemapIndexDocument {
    sitemapindex: {
        $?: SitemapIndexAttrDocument
        sitemap?: SitemapIndexChildrenDocument[]
    }
}

export interface SitemapAttrDocument {
    "xmlns:xsi"?: string
    "xmlns:xsd"?: string
    "xmlns"?: string
    "xmlns:xhtml"?: string
}

export interface SitemapChildrenDocument {
    _id?: string
    loc?: string,
    lastmod?: string,
    changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never",
    priority?: string
    "xhtml:link"?: {
        $: {
            rel: "alternate",
            hreflang: string,
            href: string
        }
    }[]
}

export interface SitemapDocument {
    urlset: {
        $?: SitemapAttrDocument
        url?: SitemapChildrenDocument[]
    }
}
