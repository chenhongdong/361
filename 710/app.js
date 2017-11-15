var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Created by chenhongdong on 2017/10/16.
 */
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerText = 'The time is: ';
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toLocaleTimeString();
    }
    Greeter.prototype.start = function () {
        var _this = this;
        this.timerToken = setInterval(function () {
            return _this.span.innerText = new Date().toLocaleTimeString();
        }, 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
}());
window.addEventListener('load', function () {
    var el = document.getElementById('content');
    var greet = new Greeter(el);
    greet.start();
    setTimeout(function () {
        greet.stop();
    }, 5000);
}, false);
// 类
var Person = (function () {
    // 类的构造函数
    // 在构造函数上要明确写访问控制符
    function Person(name) {
        this.name = name;
        console.log('xixi');
    }
    Person.prototype.eat = function () {
        console.log(this.name + ' 正在吃');
    };
    return Person;
}());
/*
let p1 = new Person('batman');
p1.eat();

let p2 = new Person('superman');
console.log(p2.name);
p2.eat();*/
// 继承
// extends 继承父类的属性和方法
var Employee = (function (_super) {
    __extends(Employee, _super);
    function Employee(name, code) {
        var _this = _super.call(this, name) || this;
        console.log('kaka');
        _this.code = code;
        return _this;
    }
    Employee.prototype.work = function () {
        _super.prototype.eat.call(this);
        this.doWork();
    };
    // 设置为私有方法，不能让外部直接调，先吃饭再工作
    Employee.prototype.doWork = function () { console.log('工作'); };
    return Employee;
}(Person));
var e1 = new Employee('haha', '052250');
e1.work();
