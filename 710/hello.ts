/*
 function person(name: string) {
 return 'Hello' + name;
 }

 document.body.innerHTML = person('World');*/
// 接口
/*interface Name {
    firstName: string;
    lastName: string;
}

function greeter(person: Name) {
    return '你好,' + person.lastName + person.firstName;
}

document.body.innerHTML += greeter({firstName: '网易', lastName: '云笔记'});*/


// 类和接口配合

// 类
class Student {
    fullName: string;
    sex: string = '女';
    constructor (public firstName, public midName, public lastName) {
        this.fullName = firstName + ' ' + midName + ' ' + lastName + ' ' + this.sex;
    }
}
// 接口   规定firstName和lastName必须为string
// 顺序没有要求
interface Name {
    firstName: string;
    lastName: string;
}

function greeter(person: Name) {
    return '你好， ' + person.lastName + ' ' + person.firstName;
}

let user = new Student('陈', '左', '夕');
user.sex = '男';
console.log(user);
console.log(greeter(user));


// 接口的可选属性   属性后面加个?  不用每一个都必填

interface SqConfig {
    color?: string;
    width?: number;
}

function createSq(config: SqConfig): {color: string; area: number} {
    console.log(config);
    let newSq = {color: 'black', area: 99};

    if (config.color) {
        newSq.color = config.color;
    }

    if (config.width) {
        newSq.area = config.width * config.width;
    }

    return newSq;
}

let sq = createSq({color: 'red', option: 0.5} as SqConfig);
let sq2 = createSq({width: 12});
console.log(sq);    // {color: 'red', area: 64}
console.log(sq2);   // {color: 'black', area: 144}




// 只读属性
interface ReadOnly {
    readonly x: number;
    y: number;
}

let ro: ReadOnly = {x: 110, y: 911};
// ro.x = 010;    // Error