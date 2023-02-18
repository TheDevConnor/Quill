"use strict";
// deno-lint-ignore-file no-explicit-any
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.warn = exports.info = exports.debug = exports.trace = exports.format = void 0;
const tru = __importStar(require("https://raw.githubusercontent.com/tokio-js/trutrace/main/src/lib.ts"));
const util_ts_1 = require("https://deno.land/std@0.171.0/node/util.ts");
function format(compact, ...args) {
    return (0, util_ts_1.formatWithOptions)({ compact: compact }, ...args);
}
exports.format = format;
function trace(...msg) {
    const [simple] = tru.format(msg.join(" "), "TRC", tru.trace(), new Date());
    console.log(simple);
}
exports.trace = trace;
function debug(...msg) {
    const [simple] = tru.format(msg.join(" "), "DBG", tru.trace(), new Date());
    console.log(simple);
}
exports.debug = debug;
function info(...msg) {
    const [simple] = tru.format(msg.join(" "), "INF", tru.trace(), new Date());
    console.log(simple);
}
exports.info = info;
function warn(...msg) {
    const [simple] = tru.format(msg.join(" "), "WRN", tru.trace(), new Date());
    console.log(simple);
}
exports.warn = warn;
function error(...msg) {
    const [simple] = tru.format(msg.join(" "), "ERR", tru.trace(), new Date());
    console.log(simple);
}
exports.error = error;
//# sourceMappingURL=tracing.js.map