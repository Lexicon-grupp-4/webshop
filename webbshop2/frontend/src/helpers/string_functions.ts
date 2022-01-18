export function prepairForUrl(str: string) {
    // return encodeURI(str.toLowerCase()); // TODO: this is not enogh for åäö
    return str.toLowerCase();
}