import {AppDataDocument} from "types/client/app/pageProps";

declare global {
    interface Request {
        appData: AppDataDocument
    }
}