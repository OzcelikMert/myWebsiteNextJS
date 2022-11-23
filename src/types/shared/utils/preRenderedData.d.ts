import SettingDocument from "../services/setting";
import LanguageDocument from "../services/language";
import PostDocument from "../services/post";
import {ComponentDocument} from "types/shared/services/component";

declare global {
    interface Window {
        prerenderData: PreRenderedDataDocument;
    }
}

interface PreRenderedDataDocument {
    page?: PostDocument,
    pageSettings: SettingDocument,
    languages: LanguageDocument[],
    languageId: string
    languageKeyWithLocale?: string
    themeTools: {
        navigations: PostDocument[],
        footer?: ComponentDocument,
    }
    cookies: {
        languageId?: string
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