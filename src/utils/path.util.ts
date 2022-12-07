let api = `http://localhost:5001/`;

export default {
    set api(newApi: string) { api = newApi},
    get api() { return `${api}api/`;},
    uploads: {
        get images() { return `${api}uploads/images/`},
        get flags() { return `${api}uploads/flags/`},
        get static() { return `${api}uploads/static/`}
    }
}