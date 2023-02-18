"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MK_STRING = exports.MK_NATIVE_FUNCTION = exports.MK_ARRAY = exports.MK_NUMBER = exports.MK_BOOL = exports.MK_NULL = void 0;
function MK_NULL() {
    return { value: null, type: "null" };
}
exports.MK_NULL = MK_NULL;
function MK_BOOL(b = false) {
    return { value: b, type: "boolean" };
}
exports.MK_BOOL = MK_BOOL;
function MK_NUMBER(n = 0) {
    return { value: n, type: "number" };
}
exports.MK_NUMBER = MK_NUMBER;
function MK_ARRAY(a = []) {
    return { value: a, type: "array" };
}
exports.MK_ARRAY = MK_ARRAY;
function MK_NATIVE_FUNCTION(call) {
    return { type: "native-function", call };
}
exports.MK_NATIVE_FUNCTION = MK_NATIVE_FUNCTION;
function MK_STRING(s = String) {
    return { value: s, type: "string" };
}
exports.MK_STRING = MK_STRING;
//# sourceMappingURL=values.js.map