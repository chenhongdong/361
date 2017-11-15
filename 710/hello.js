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
var Student = (function () {
    function Student(firstName, midName, lastName) {
        this.firstName = firstName;
        this.midName = midName;
        this.lastName = lastName;
        this.sex = '女';
        this.fullName = firstName + ' ' + midName + ' ' + lastName + ' ' + this.sex;
    }
    return Student;
}());
function greeter(person) {
    return '你好， ' + person.lastName + ' ' + person.firstName;
}
var user = new Student('陈', '左', '夕');
user.sex = '男';
console.log(user);
console.log(greeter(user));
function createSq(config) {
    console.log(config);
    var newSq = { color: 'black', area: 99 };
    if (config.color) {
        newSq.color = config.color;
    }
    if (config.width) {
        newSq.area = config.width * config.width;
    }
    return newSq;
}
var sq = createSq({ color: 'red', option: 0.5 });
var sq2 = createSq({ width: 12 });
console.log(sq); // {color: 'red', area: 64}
console.log(sq2); // {color: 'black', area: 144}
var ro = { x: 110, y: 911 };
// ro.x = 010;    // Error 
