// deno-lint-ignore-file no-explicit-any

import * as tru from "https://raw.githubusercontent.com/tokio-js/trutrace/main/src/lib.ts";
import { formatWithOptions as _format } from "https://deno.land/std@0.171.0/node/util.ts";
export function format(compact: boolean, ...args: any[]): string {
    return _format({ compact: compact },...args);
}
export function trace(...msg: any[]){
    const [simple] = tru.format(msg.join(" "), "TRC", tru.trace(), new Date());
    console.log(simple);
}
export function debug(...msg: any[]){
    const [simple] = tru.format(msg.join(" "), "DBG", tru.trace(), new Date());
    console.log(simple);
}
export function info(...msg: any[]){
    const [simple] = tru.format(msg.join(" "), "INF", tru.trace(), new Date());
    console.log(simple);
}
export function warn(...msg: any[]){
    const [simple] = tru.format(msg.join(" "), "WRN", tru.trace(), new Date());
    console.log(simple);
}
export function error(...msg: any[]){
    const [simple] = tru.format(msg.join(" "), "ERR", tru.trace(), new Date());
    console.log(simple);
}