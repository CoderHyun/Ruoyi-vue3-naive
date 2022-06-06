"use strict";
exports.__esModule = true;
exports.isNullOrUnDef = exports.isNullAndUnDef = exports.isNull = exports.isImageDom = exports.isServer = exports.isElement = exports.isWindow = exports.isClient = exports.isArray = exports.isBoolean = exports.isString = exports.isPromise = exports.isAsyncFunction = exports.isNumber = exports.isDate = exports.isObject = exports.isUnDef = exports.isDef = exports.isFunction = exports.is = void 0;
var toString = Object.prototype.toString;
/**
 * @description: 判断值是否未某个类型
 */
function is(val, type) {
    return toString.call(val) === "[object " + type + "]";
}
exports.is = is;
/**
 * @description:  是否为函数
 */
function isFunction(val) {
    return is(val, 'Function');
}
exports.isFunction = isFunction;
/**
 * @description: 是否已定义
 */
exports.isDef = function (val) {
    return typeof val !== 'undefined';
};
exports.isUnDef = function (val) {
    return !exports.isDef(val);
};
/**
 * @description: 是否为对象
 */
exports.isObject = function (val) {
    return val !== null && is(val, 'Object');
};
/**
 * @description:  是否为时间
 */
function isDate(val) {
    return is(val, 'Date');
}
exports.isDate = isDate;
/**
 * @description:  是否为数值
 */
function isNumber(val) {
    return is(val, 'Number');
}
exports.isNumber = isNumber;
/**
 * @description:  是否为AsyncFunction
 */
function isAsyncFunction(val) {
    return is(val, 'AsyncFunction');
}
exports.isAsyncFunction = isAsyncFunction;
/**
 * @description:  是否为promise
 */
function isPromise(val) {
    return is(val, 'Promise') && exports.isObject(val) && isFunction(val.then) && isFunction(val["catch"]);
}
exports.isPromise = isPromise;
/**
 * @description:  是否为字符串
 */
function isString(val) {
    return is(val, 'String');
}
exports.isString = isString;
/**
 * @description:  是否为boolean类型
 */
function isBoolean(val) {
    return is(val, 'Boolean');
}
exports.isBoolean = isBoolean;
/**
 * @description:  是否为数组
 */
function isArray(val) {
    return val && Array.isArray(val);
}
exports.isArray = isArray;
/**
 * @description: 是否客户端
 */
exports.isClient = function () {
    return typeof window !== 'undefined';
};
/**
 * @description: 是否为浏览器
 */
exports.isWindow = function (val) {
    return typeof window !== 'undefined' && is(val, 'Window');
};
exports.isElement = function (val) {
    return exports.isObject(val) && !!val.tagName;
};
exports.isServer = typeof window === 'undefined';
// 是否为图片节点
function isImageDom(o) {
    return o && ['IMAGE', 'IMG'].includes(o.tagName);
}
exports.isImageDom = isImageDom;
function isNull(val) {
    return val === null;
}
exports.isNull = isNull;
function isNullAndUnDef(val) {
    return exports.isUnDef(val) && isNull(val);
}
exports.isNullAndUnDef = isNullAndUnDef;
function isNullOrUnDef(val) {
    return exports.isUnDef(val) || isNull(val);
}
exports.isNullOrUnDef = isNullOrUnDef;
