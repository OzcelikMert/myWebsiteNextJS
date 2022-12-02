import {AppDataDocument, PageDataDocument} from "types/client/app/pageProps";

declare module "http" {
    interface IncomingMessage {
        appData: AppDataDocument
        pageData: PageDataDocument
        get cookies(): Partial<{
            [key: string]: string;
        }>;
    }
}