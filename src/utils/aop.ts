export type VoidFun = {
    (...args: any[]): void
}

export type AnyFun = { (...args: any[]): any }

export function replaceAop(
    source: { [key: string]: any },
    name: string,
    replacement: AnyFun,
    isForced = false
) {
    if (source === undefined) return
    if (name in source || isForced) {
        const original = source[name]
        const wrapped = replacement(original)
        if (typeof wrapped === 'function') {
            source[name] = wrapped
        }
    }
}