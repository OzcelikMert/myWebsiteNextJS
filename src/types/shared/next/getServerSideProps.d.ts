import {PageDataDocument} from "types/client/app/pageProps";

export interface GetServerSidePropsDocument<T> {
    props: {
        pageData?: PageDataDocument & T
    }
}