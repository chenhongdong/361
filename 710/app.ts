/**
 * Created by chenhongdong on 2017/10/16.
 */
class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor (element: HTMLElement) {
        this.element = element;
        this.element.innerText = 'The time is: ';
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toLocaleTimeString();
    }

    start() {
        this.timerToken = setInterval(() =>
            this.span.innerText = new Date().toLocaleTimeString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }
}

window.addEventListener('load', () => {
    let el = document.getElementById('content');
    let greet = new Greeter(el);
    greet.start();
    setTimeout(() => {
        greet.stop();
    }, 5000);
}, false);



// 类

class Person {
    // 有三种访问控制符  public默认；private外部不能访问，内部可以；protected受保护的，内部和子类里可以访问

    protected sex;
    private age;
    // 类的构造函数
    // 在构造函数上要明确写访问控制符
    constructor (public name: string) {
        console.log('xixi');
    }


    eat() {
        console.log(this.name+' 正在吃');
    }
}

/*
let p1 = new Person('batman');
p1.eat();

let p2 = new Person('superman');
console.log(p2.name);
p2.eat();*/


// 继承
// extends 继承父类的属性和方法
class Employee extends Person {

    constructor (name: string, code: string) {
        super(name);
        console.log('kaka');
        this.code = code;
    }

    code: string;

    work() {
        super.eat();
        this.doWork();
    }
    // 设置为私有方法，不能让外部直接调，先吃饭再工作
    private doWork() { console.log('工作'); }
}

let e1 = new Employee('haha', '052250');
e1.work();