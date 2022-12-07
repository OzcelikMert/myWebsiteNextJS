import {NextRouter} from "next/dist/shared/lib/router/router";
import PostDocument from "types/services/post";
import SettingDocument from "types/services/setting";
import LanguageDocument from "types/services/language";
import {ComponentDocument} from "types/services/component";

export interface PagePropCommonDocument<T> {
    appData: AppDataDocument
    pageData: PageDataDocument & T
    router: NextRouter,
}

export interface PageDataDocument {
    page?: PostDocument,
    themeTools: {
        navigations: PostDocument[],
        footer?: ComponentDocument,
    }
    [key: string]: any
}

export interface AppDataDocument {
    settings: SettingDocument,
    languages: LanguageDocument[],
    languageId: string
    languageKeyWithLocale?: string
    cookies: {
        languageId: string
    }
    apiPath: {
        website: {
            full: string,
            base: string,
            originalUrl: string
        }
        api: string
        uploads: {
            images: string,
            flags: string,
            static: string
        }
    }
}