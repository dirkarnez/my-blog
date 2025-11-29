export function isDataUri(str: string): boolean {
   return !!str && new RegExp(/^(data:)([\w\/\+]+);(charset=[\w-]+|base64).*,(.*)/gi).test(str);
}