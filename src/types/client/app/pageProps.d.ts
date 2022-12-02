import {NextRouter} from "next/dist/shared/lib/router/router";
import PostDocument from "types/shared/services/post";
import SettingDocument from "types/shared/services/setting";
import LanguageDocument from "types/shared/services/language";
import {ComponentDocument} from "types/shared/services/component";

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