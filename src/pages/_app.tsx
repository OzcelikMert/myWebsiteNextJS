import type { AppProps } from 'next/app'
import "styles/global.scss";

import "shared/library/variable/array"
import "shared/library/variable/string"
import "shared/library/variable/number"
import "shared/library/variable/date"
import "shared/library/variable/math"

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />
}