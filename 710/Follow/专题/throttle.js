/**
 * Created by chenhongdong on 2017/10/27.
 */
// 节流的原理很简单：    如果持续触发时间，每隔一段时间，只执行一次事件
/*
 *   根据首次是否执行和结束后是否执行，效果不同，实现方式也不同
 *   一般有两种主流实现方式，一种是时间戳，一种是设置定时器
 * */



// 第一版
// 时间戳
function throttle(fn, time) {
    let context, args;
    let prev = 0;

    return function () {
        let now = +new Date;
        context = this;
        args = arguments;
        if (now - prev > time) {
            fn.apply(context, args);
            prev = now;
        }
    }
}

// 缺点是如果停止触发后，以后就不再触发了


// 第二版
// 定时器
function throttle(fn, time) {
    let context, args, timeout;
    let prev = 0;

    return function () {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function () {
                timeout = null;
                fn.apply(context, args);
            }, time);
        }
    }
}



// 第三版
function throttle(fn, wait, opt) {
    let context, args, timeout;
    let old = 0;

    let later = function() {
        timeout = null;
        old = +new Date();
        fn.apply(context, args);
    };

    let throttled = function() {
        let now = +new Date();
        let remaining = wait - (now - old);
        context = this;
        args = arguments;

        if (remaining <= 0 && remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            old = now;
            fn.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
    };

    return throttled;
}