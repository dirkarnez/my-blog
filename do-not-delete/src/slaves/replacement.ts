export interface IReplaceFrom {
   fromRegex: string
}

export interface StringReplacement extends IReplaceFrom {
   to: string
}