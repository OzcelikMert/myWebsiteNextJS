export interface BuildHtmlParamDocument {
    templateHtml: string,
    reactHtml: string,
    styleTags: string,
    dataTag: string,
    head: string,
    script: string
    seoTags: RenderMetaTagParamDocument
}

export interface RenderMetaTagParamDocument {
    alternates: string[]
    langKey: string
    locale: string
    title: string
    page?: string
    desc: string
    keywords: string[]
    copyright: string
    icon: string
    logo: string
    url: string
}