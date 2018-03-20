/**
 * Created by chenhongdong on 2018/3/20.
 */
(function () {
    var _ = function (obj) {
        // 如果obj是_的实例就直接返回
        if (obj instanceof _) {
            return obj;
        }

        if (!(this instanceof _)) {
            return new _(obj);
        }
        // 将obj赋给_wrapped属性
        this._wrapped = obj;
    };
    // 当前版本
    _.VERSION = '1.0.0';

    // ES5支持的原生方法
    var nativeKeys = Object.keys;

    // 二次操作返回一些回调、迭代方法
    var optimizeCb = function (func, context, argCount) {
        // 如果没有指定this指向，则返回原函数
        if (context === void 0) {
            return func;
        }

        return function () {
            return func.apply(context, arguments)
        }
    };

    // 闭包
    var property = function (key) {
        return function (obj) {
            return obj === null ? void 0 : obj[key];
        }
    };

    // js数字精确到的最大值
    var MAX_ARRAY_LENGTH = Math.pow(2, 53) - 1;

    // 该函数传入一个参数，返回参数的length属性值
    // 用来获取array以及arrayLike元素的length
    var getLnegth = property('length');

    // 判断是否是类数组
    // 类数组即拥有length属性并且length属性为number类型的元素

    var isArrayLike = function (collection) {
        // 返回collection的length属性值
        var length = getLnegth(collection);
        return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_LENGTH;
    };

    // 判断是否是对象，包含function和object的都算对象
    _.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    }

    // hasOwnProperty
    _.has = function (obj, key) {
        return obj !== null && obj.hasOwnProperty(key);
    }

    // 返回对象的一个keys数组   像Object.keys()
    _.keys = function(obj) {
        // 容错
        // 如果不是对象则返回一个空数组
        if (!_.isObject(obj)) return [];
        // 如果支持ES5方法，那就直接使用
        if (nativeKeys) return nativeKeys(obj);

        // 不支持
        var keys = [];

        for (var i in obj) {
            if (_.has(obj, i)) keys.push(obj[i]);
        }
        
        return keys;
    };

    // 集合共25个扩展方法
    // 1.each
    _.each = _.forEach = function (obj, iteratee, context) {
        // 根据context确定不同的迭代函数
        iteratee = optimizeCb(iteratee, context);

        var i, length;

        // 如果是类数组
        if (isArrayLike(obj)) {
            // 遍历
            for (i = 0, length = obj.length; i < length; i++) {
                // 执行函数包含三个参数ele, index, list
                iteratee(obj[i], i, obj);
            }
        } else {
            // 如果是obj对象
            var keys = _.keys(obj);
           
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);  //(value, key, obj)
            }
        }
        // 供链式调用
        return obj;
    };

    window._ = _;
}.call(this));