/*(function () {
    var _ = function (obj) {
        // 如果obj是_的实例,直接返回
        if (obj instanceof _) {
            return obj;
        }

        if (!(this instanceof _)) {
            return new _(obj);
        }

        this._wrapped = obj;
        return obj;
    };

    var optizimeCb = function (func, context) {
        if (context === void 0) {
            return func;
        }

        return function () {
            return func.apply(context, arguments);
        }
    };

    var property = function (key) {
        return function (obj) {
            return obj !== null ? obj[key] : '';
        }
    }

    // 声明一些ES5的方法
    var nativeKeys = Object.keys;

    // 获取length
    var getLength = property('length');

    // js里length最大值
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

    _.isArrayLike = function (obj) {
        // 需要有length值,并且类型是number
        var length = getLength(obj);
        return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    }

    _.keys = function (obj) {
        if (!_.isObject(obj)) {
            return [];
        }
        // 如果支持ES5方法，直接调用该方法
        if (nativeKeys) return nativeKeys(obj);

        // 不支持的话改用数组存储
        var keys = [];

        for (var key in obj) {
            if (_.has(obj, i)) keys.push(key);  // 将key值传到数组中
        }

        return keys;
    }

    // 在_.keys里判断使用1次
    // 这里的对象包含function和{}
    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };

    // 在_.keys里判断使用1次
    // 判断私有属性
    _.has = function (obj, key) {
        return obj !== null && hasOwnProperty.call(obj, key);   // hasOwnProperty.call(obj, key)因为hasOwnProperty不是关键字，防止被当成属性被改掉
    }

    _.each = _.forEach = function (obj, iteratee, context) {
        // 通过context返回迭代函数
        iteratee = optizimeCb(iteratee, context);

        var i, length;

        // 判断类数组
        if (_.isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);               // item, index, array
            }
        } else {    // 对象{}
            var keys = _.keys(obj); // 遍历对象返回key值

            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);   // value, key, list
            }
        }

        return obj;
    }

    window._ = _;
}.call(this)); */






// todo
(function () {
    var _ = function (obj) {
        // 如果obj是_的实例直接返回obj
        if (obj instanceof _) {
            return obj;
        }
        // 如果不是_的实例，那就new一个
        if (!(this instanceof _)) {
            return new _(obj);
        }
        // 将obj赋值给this._wrapped属性
        this._wrapped = obj;

        return obj;
    }

    // 写一些ES5原生方法放在这
    var nativeKeys = Object.keys;

    // 在_.each里调用
    // optimizeCb函数来返回一个回调函数
    var optimizeCb = function (fn, context) {
        // 如果没有传context，就直接返回fn
        if (context === void 0) {
            return fn;
        }

        return function () {
            // 返回一个函数指向context
            return fn.apply(context, arguments);
        }
    };

    // 在getLength时调用
    // 传入key值
    // 偏函数
    var property = function (key) {
        return function (obj) {
            return obj !== null && obj[key];
        }
    }

    // 在_.isArrayLike调用
    // 通过一个闭包的形势去获取length属性
    var getLength = property('length');

    // 在_.isArrayLike调用
    // js里Length的最大值
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

    // 在_.each里调用
    // 数组或者类数组都有length属性
    // 类型是number
    // 并且不能大于js里的最大值
    _.isArrayLike = function (obj) {
        var length = getLength(obj);
        return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };

    // 在_.each调用
    // 遍历对象的key以数组的形势返回
    _.keys = function (obj) {
        // 如果传入的obj不是对象，就直接返回一个[]
        // 那么接下来继续写个_.isObject
        if (!_.isObject(obj)) return [];

        // 如果支持ES5原生方法直接用,别客气
        if (nativeKeys) return nativeKeys(obj);

        // 不支持的话，那就手动写吧
        var keys = [];
        for (var key in obj) {
            // 判断是不是私有属性，如果不是私有的会带上一堆原型上的，这可不行
            if (_.has(obj, key)) keys.push(key);
        }

        return keys;
    };

    // 在_.keys调用
    // hasOwnProperty.call会把指向放到obj上，防止hasOwnProperty被写在对象属性上修改掉
    _.has = function (obj, key) {
        return obj !== null && hasOwnProperty.call(obj, key);
    };

    // 在_.keys调用
    // 这里的对象还要算上function
    _.isObject = function (obj) {
        var type = typeof obj;
        return type === 'object' || type === 'function' && !!obj;   // !!obj 判断数组用的   !![] true
    };

    // 148行
    // each方法直接挂载在_的prototype上
    _.each = _.forEach = function (obj, iteratee, context) {
        // 通过context得到iteratee迭代函数
        iteratee = optimizeCb(iteratee, context);

        var i, len;

        //each其实就是循环两种类型，一种是数组(类数组)，另一种就是对象
        // 用_.isArrayLike去判断是不是数组或类数组
        if (_.isArrayLike(obj)) {
            // 遍历数组
            // 执行iteratee函数，分别传入item, index, arr
            for (i = 0, len = obj.length; i < len; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj); // 拿到obj的key值以数组的形势返回，等同Object.keys
            // 接下来遍历对象
            for (i = 0, len = keys.length; i < len; i++) {
                iteratee(obj[keys[i]], keys[i], obj);   // value, key, obj
            }
        }
        // 返回obj，供链式调用
        return obj;
    };

    // 挂载在window对象上，这样其实很不好，通过export导出更合理
    window._ = _;
}.call(this));