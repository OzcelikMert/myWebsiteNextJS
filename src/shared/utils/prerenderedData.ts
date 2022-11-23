/**
 * Prerendered data utility function.
 */
import {PreRenderedDataDocument} from "types/shared/utils/preRenderedData";

namespace PrerenderData {
    /**
     * In the server side, saves an abitrary object into the dom. This data can be retrieved in the client.
     * @param data An object or any data you want to pass down to the client.
     * @param domString The html string that will be rendered in the client.
     * @returns A new html tag string containing the injected data.
     */
    export function saveToDom(data: PreRenderedDataDocument): string {
        data = JSON.parse(JSON.stringify(data));
        delete data.pageSettings.head;
        delete data.pageSettings.script;
        return `<script>if(window) window.prerenderData = ${JSON.stringify(data)};</script>`;
    }
}

export { PrerenderData };