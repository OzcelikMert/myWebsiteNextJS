import viewService from "shared/services/view.service";

export default {
    async set(params: {url: string, langId: string}) {
        return await viewService.add({
            url: params.url,
            lang: params.langId
        });
    },
};