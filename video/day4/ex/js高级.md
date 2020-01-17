JS的用途
## 数据类型
基本数据类型：数字、字符串、布尔值、null、undefined、symbol

复杂数据类型：（对象）
 - 数组
 - 函数
 - 正则表达式
 - Date
 ## 对象的基本使用
 ### 创建一个对象
```javascript
var student = {
    name: "李白",
    grade: "初一",
    say: function() {
      console.log("你好")
    },
    run: function(speed) {
      console.log("正在以" + speed + "米/秒速度奔跑");
    }
}
```
### 对象是键值对的集合：对象是由属性和方法构成的（也有说法认为，对象里面皆属性，方法也是属性
）
### 对象属性操作
#### 获取属性
```javascript
// .语法
student.name;
student.grade;
// []语法
student["name"];
student["grade"];
```

```!
.语法更方便，但是坑比较多，后面不能使用js中的关键字、保留字，也不能使用数字
[]使用更广泛
```
#### 设置属性
```javascript
student.gender = "男";
student["gender"] = "男";
```

#### 删除属性
delete student.gender;
delete student["gender"];

## 自定义一个构造函数来创建对象
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
var p1 = new Person("赵云", 18);
```
## 构造函数的概念
任何函数都可以当成构造函数
```javascript
function CreateFunc() {}
```
只要把一个函数通过new的方式来调用，我们就把这一次函数的调用方式称之为：构造函数调用
```javascript
new CreateFunc();  // 构造函数
CreateFunc(); // 普通函数
```
### 构造函数的执行过程
```javascript
var p1 = new Person();
```
1.创建一个对象（我们把这个对象称之为Person构造函数的实例）（_p1)
2.创建一个内部对象，this， 将this指向该实例（_p1)
3.执行函数内部的代码，其中，操作this的部分就是操作了该实例（_p1)
4.返回值：
    - 如果函数没有返回值，那么就会返回构造函数的实例p1
    - 如果函数返回了一个基本数据类型的值，那么本次函数的返回值是该实例（_p1)
    - 如果函数返回了一个复杂数据类型的值，那么本次函数的返回值就是该值
```javascript
function fn() {

}
var f1 = new fn(); // f1就是fn的实例

function fn2() {
    return "abc";
}
var f2 = new fn2(); // f2是fn2构造函数的实例

function fn3() {
    return [1, 3, 5];
}

var f3 = new fn3(); // f3还是fn3的实例？不是  是[1,3,5]
```
### 关于new Object()
new Object() 等同于对象字面量
### 为什么要理解构造函数的返回值？
String是一个内置函数
    - 1.直接调用   String(100); // "100"
    - 2.new 调用   new String(100); // String {"100"}
结论：一个函数通过new调用，或者不通过new调用，很多时候会有截然不同的返回值

### 如何分辨出一个对象是不是某个构造函数的实例？
var isTrue = xxx instanceof Person;
````javascript
function Person() {}
var p1 = new Person();
console.log(p1 instanceof Person);
````

## 继承
### JS中继承的概念
通过某种方式让一个对象可以访问到另一个对象中的属性和方法，我们把这种方式称之为继承。

### 为什么要使用继承
有些对象会有方法（动作、行为）