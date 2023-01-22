import * as tru from "https://raw.githubusercontent.com/tokio-js/trutrace/main/src/lib.ts";
import { formatWithOptions as _format } from "https://deno.land/std@0.171.0/node/util.ts";
export function format(...args: any[]): string {
    return _format({ compact: true },...args);
}
export function trace(msg: string){
    const [simple] = tru.format(msg, "TRC", tru.trace(), new Date());
    console.log(simple);
}
export function debug(msg: string){
    const [simple] = tru.format(msg, "DBG", tru.trace(), new Date());
    console.log(simple);
}
export function info(msg: string){
    const [simple] = tru.format(msg, "INF", tru.trace(), new Date());
    console.log(simple);
}
export function warn(msg: string){
    const [simple] = tru.format(msg, "WRN", tru.trace(), new Date());
    console.log(simple);
}
export function error(msg: string){
    const [simple] = tru.format(msg, "ERR", tru.trace(), new Date());
    console.log(simple);
}