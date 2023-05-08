export function clone(object: any): any {
    if (!object) return undefined
    return JSON.parse(JSON.stringify(object))
}