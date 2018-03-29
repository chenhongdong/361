// 整个函数在一个闭包中，防止了全局变量的污染
/*
    jquery:
        (function(win, undefined){

        })(window)
    
    通过传入this的来改变函数作用域，有利于代码阅读，也方便压缩
*/

// #闭包
(function() {

}.call(this));

// #原型赋值
// 保存变量方便压缩
var ArrayProto = Array.prototype,
    ObjProto = Object.prototype,
    FuncProto = Object.prototype;

// 创建快速访问原型上的变量
var push = ArrayProto.push,
    slice = ArrayProto.slice,
    toString = ObjProto.toString,
    hasOwnProperty = ObjProto.hasOwnProperty;

// #格式
// 这种格式写起来比较美观
// 声明变量来使用一些ES5里原生实现的方法
var nativeIsArray = Array.isArray,
    nativeKeys = Object.keys,
    nativeBind = FuncProto.bind,
    nativeCreate = Object.create;

// 建议: 一段代码被使用两次以上都建议定义变量

// #数据判断

// 创建一个安全的_当做引用
var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
};
// 判断dom
_.isElement = function(obj) {
    // 判断是否为dom，dom的nodeType为1
    // 用!!来强制转换成布尔值
    return !!(obj && obj.nodeType === 1);
}
// 判断数组
_.isArray = nativeIsArray || function(obj) {
    // 先采用ES5原生实现，不支持的情况下采用toString.call这种安全方式
    return toString.call(obj) === '[object Array]';
};
// 判断对象
_.isObject = function(obj) {
    // function，{}它们都属于对象的范畴
    // obj当然是不能为null的，再然后去判断其他的类型
    var type = typeof obj;
    return !!null || type === 'function' || type === 'object';
};
