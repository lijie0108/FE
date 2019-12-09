## 第一部分 类型和语法
### 第1章 类型
### 1.1 类型
### 1.2 内置类型
javascript有七种内置类型：

- 空值（null）
- 未定义（undefined）
- 布尔值（boolean）
- 数字（number）
- 字符串（string）
- 对象（object）
- 符号(symbol)

typeof的返回值

```
typeof undefined === "undefined"; // true
typeof true === "boolean"; // true
typeof 42 === "number"; // true
typeof "42" === "string"; // true
typeof { life: 42 } === "object"; // true
typeof Symbol() === "symbol"; // true
typeof null === "object"; // true
typeof function a() {} === "function"; // true
typeof [1, 2, 3] === "object"; // true
```

使用复合条件来检测null值的类型：

```
var a = null;
(!a && typeof a === "object")
```
### 1.3 值和类型
JavaScript中的变量是没有类型的，只有值才有。变量可以随时持有任何类型的值。
#### 1.3.1 undefined和undeclared
已在作用域中声明但还没有赋值的变量，是undefined的。相反，还没有在作用域中声明过的变量是undeclared的。

```
var a;
a; // undefined
b; // ReferenceError: b is not defined
```
对于undeclared（或者not defined）变量，typeof照样返回“undefined”。typeof b并没有报错，是因为typeof有一个特殊的安全防范机制。

```
var a;
typeof a; // "undefined"
typeof b; // "undefined"
```
#### 1.3.2 typeof Undeclared
问题是如何在程序中检查全局变量DEBUG才不会出现Reference错误。这时typeof的安全防范机制就成了我们的好帮手：

```
// 这样会抛出错误
if(DEBUG) {
    console.log("Debugging is starting");
}
// 这样是安全的
if(typeof DEBUG !== "undefined") {
    console.log("Debugging is starting");
}
```
### 1.4 小结
JavaScript有七种内置类型：null、undefined、boolean、number、string、object和symbol，可以使用typeof运算符来查看。

变量没有类型，但它们持有的值有类型。类型定义了值得行为特征。

在JavaScript中，undefined是值得一种，undeclared则表示变量还没有被声明过。

typeof 对undefined和undeclared变量都返回“undefined”。

然而，通过typeof的安全防范机制（阻止报错）来检查undeclared变量，有时是个不错的办法。

### 第2章 值
### 2.1 数组
和其他强类型语音不同，在JavaScript中，数组可以容纳任何类型的值，可以是字符串、数字、对象（object），甚至是其他数组：

```
var a = [1, "2", [3] ];
a.length; // 3
a[0] === 1; // true
a[2][0] === 3; // true
```
数组声明后即可向其中加入值，不需要预先设定大小：

```
var a = [];
a.length; // 0
a[0] = 1;
a[1] = "2";
a[2] = [3];
a.length; // 3
```


```!
使用delete运算符删除数组中的元素后，数组的length属性并不会发生变化。
```
在数组中加入字符串键值/属性并不是一个好主意。建议使用对象来存放键值/属性值，用数组来存放数字索引值。如果字符串键值能够被强制类型转换为十进制数字的话，它就会被当做数字索引来处理。

#### 类数组
一些DOM查询操作会返回DOM元素列表，它们并非真正意义上的数组，但十分类似。另一个例子是通过arguments对象（类数组）将函数的参数当作列表来访问（从ES6开始已废止）。

工具函数slice(...)经常被用于这类转换：

```
function foo() {
    var arr = Array.prototype.slice.call(arguments);
    arr.push("bam");
    console.log(arr);
}
foo("bar", "baz"); // ["bar", "baz", "bam"]
```
ES6的内置工具函数Array.from(...)也能实现同样的功能：

```
var arr = Array.from(arguments);
```
### 2.2 字符串

```
var a = "foo";
var b = ["f", "o", "o"];
```
许多数组函数用来处理字符串很方便。虽然字符串没有这些函数，但可以通过“借用”数组的非变更方法来处理字符串：

```
a.join; // undefined
a.map; // undefined

var c = Array.prototype.join.call(a, "-");
var d = Array.prototype.map.call(a, function(v) {
    return v.toUpperCase() + "-";
}).join("");
c; // "f-o-o"
d; // "F-O-O"
```
我们无法“借用”数组的可变更成员函数，因为字符串是不可变的：

```
Array.prototype.reverse.call(a);
// 返回值仍然是字符串“foo”的一个封装对象
```
一个变通的办法是先讲字符串转换为数组，待处理完后再将结果转换回字符串：

```
var c = a.split("").reverse().join("");
c; // "oof"
```
如果需要经常以字符数组的方式来处理字符串的话，倒不如直接使用数组。
### 2.3 数字
javascript中的数字类型是基于IEEE 754标准来实现的，该标准通常也被称为“浮点数”。javascript使用的是“双精度”格式（即64位二进制）。

#### 2.3.1 数字的语法

```
var a = 42;
var b = 42.3;

var a = 42.59;
a.toFixed(0); // "43"
a.toFixed(1); // "42.6"

// 无效语法
42.toFixed(3); // SyntaxError
// 下面的语法都有效
(42).toFixed(3); // "42.000"
0.42.toFixed(3); // "0.420"
42..toFixed(3); // "42.000"
```
442.toFixed(3)是无效语法，因为.被视为42.的一部分，所以没有.属性访问运算符来调用toFixed方法。
#### 2.3.2 较小的数值
二进制浮点数最大的问题（不仅javascript，所有遵循IEEE 754规范的语言都是如此），是会出现如下情况：

> 0.1 + 0.2 === 0.3; // false

从数学角度来说，上面的条件判断应该为true，可结果为什么是false呢？

简单来说，二进制浮点数中的0.1和0.2并不是十分精确，它们相加的结果并非刚好等于0.3，而是一个比较接近的数字0.30000000000000004，所以条件判断结果为false。
#### 如何来判断0.1 + 0.2 等于0.3呢？
ES6的Number.EPSILON定义了一个数字常量，作为一个误差范围值，这个值为：2.220446049250313e-16

所以可以直接使用ES6的方法：

```
function Equal(a, b) {
    return Math.abs(a - b) < Number.EPSILON
}

console.log(Equal(.1 + .2, .3));    // true
```
不支持ES6的浏览器：

```
if(!Number.EPSILON) {
    Number.EPSILON = Math.pow(2, -52)
}

function Equal(a, b) {
    return Math.abs(a - b) < Number.EPSILON
}

console.log(Equal(.1 + .2, .3));
```
#### 2.3.3 整数的安全范围
能够被“安全”呈现的最大整数是2^53 -1，即9007199254740991，在ES6中被定义为Number.MAX_SAFE_INTEGER。最小整数是-9007199254740991，在ES6中被定义为Number.MIN_SAFE_INTEGER。

有时javascript程序需要处理一些比较大的数字，如数据库中的64位ID等。由于javascript数字类型无法精确呈现64位数值，所以必须将它们保存（转换）为字符串。

#### 2.3.4 整数检测
要检测一个值是否是整数，可以使用ES6中的Number.isInteger(...)方法：

```
Number.isInteger(42); // true
Number.isInteger(42.000); // true
Number.isInteger(42.3); // false
```
也可以为ES6之前的版本polyfill Number.isInteger(...)方法：

```
if(!Number.isInteger) {
    Number.isInteger = function(num) {
        return typeof num === "number" && num % 1 == 0;
    }
}
```
要检测一个值是否是安全的整数，可以使用ES6中的Number.isSafeInteger(...)方法：

```
Number.isSafeInteger(Number.MAX_SAFE_INTEGER); // true
Number.isSafeInteger(Math.pow(2, 53)); // false
Number.isSafeInteger(Math.pow(2, 53) -1); // true
```
可以为ES6之前的版本polufill Number.isSafeInteger(...)方法：

```
if(!Number.isSafeInteger) {
    Number.isSafeInteger = function(num) {
        return Number.isInteger(num) && Math.abs(num) <= Number.MAX_SAFE_INTEGER;
    }
}
```
#### 2.3.5 32位有符号整数

### 2.4 特殊数值
#### 2.4.1 不是值的值
undefined类型只有一个值，即undefined。null类型也只有一个值，即null。它们的名称既是类型也是值。

- null 指空值（empty value）
- undefined 指没有值（missing value）

或者
- undefined指从未赋值
- null指赋过值，但是目前没有值

#### 2.4.2 undefined
永远不要重新定义undefined。

#### void运算符
undefined是一个内置标识符（除非被重新定义），它的值为undefined，通过void运算符即可得到该值。

表达式void __没有返回值，因此返回结果是undefined。void并不改变表达式的结果，只是让表达式不返回值：

```
var a = 42;
console.log(void a, a); // undefined 42

console.log(void 0); // undefined
console.log(void 1); // undefined
```
总之，如果要将代码中的值（如表达式的返回值）设为undefined，就可以使用void。
#### 2.4.3 特殊的数字
#### 1.不是数字的数字
如果数学运算的操作数不是数字类型（或者无法解析为常规的十进制或十六进制数字），就无法返回一个有效的数字，这种情况下返回值为NaN。

```
var a = 2 / "foo"; // NaN
typeof a === "number"; // true
```
NaN是一个特殊值，它和自身不相等，是唯一一个非自反（即 x=== x不成立）的值。

内建的全局工具函数isNaN(...)来判断一个值是否是NaN，操作起来有一个严重的缺陷，因为它的检查方式是“检查参数是否不是NaN，也不是数字”，所以结果并不准确。

```
var a = 2 / "foo";
var b = "foo";
a; // NaN
b; // "foo"
window.isNaN(a); // true
window.isNaN(b); // true - 晕！
```

从ES6开始我们可以使用工具函数Number.isNaN(...)。

ES6之前的浏览器的polyfill如下：

```
if(!Number.isNaN) {
    Number.isNaN = function(n) {
        return (
        typeof n === 'number' &&
        window.isNaN(n)
        )
    }
}
var a = 2 / "foo";
var b = "foo";
Number.isNaN(a); // true
Number.isNaN(b); // false
```
实际上还有一个更简单的方法，即利用NaN不等于自身这个特点。NaN是JavaScript中唯一一个不等于自身的值。

```
if(!Number.isNaN) {
    Number.isNaN = function(n) {
        return n !== n;
    }
}
```
#### 2.无穷数

```
var a = Number.MAX_VALUE;
a + a; // Infinity
```
你可以从有穷走向无穷，但无法从无穷回到有穷。
#### 3.零值
#### 2.4.4 特殊等式
ES6中新加入了一个工具方法Object.is(...)来判断两个值是否绝对相等，可以用来处理上述所有的特殊情况：

```
var a = 2 / "foo";
var b = -3 * 0;
Object.is(a, NaN); // true
Object.is(b, -0); // true
Object.is(b, 0); // false
```
### 2.5 值和引用

JavaScript对值和引用的赋值/传递在语法上没有区别，完全根据值得类型来决定。

```
var a = 2;
var b = a; // b是a的值的一个副本
b++;
a; // 2;
b; // 3

var c = [1, 2, 3];
var d = c; // d是[1, 2, 3]的一个引用
d.push(4);
c; // [1, 2, 3, 4]
d; // [1, 2, 3, 4]
```
简单值（即标量基本类型值）总是通过值复制的方式来赋值/传递，包括null、undefined、字符串、数字、布尔和ES6中的symbol。

复合值--对象（包括数组和封装对象）和函数，则总是通过引用复制的方式来赋值/传递。

```
function foo(x) {
    x.push(4);
    x; // [1, 2, 3, 4]
    // 然后
    x = [4, 5, 6];
    x.push(7);
    x; // [4, 5, 6, 7]
}
var a = [1, 2, 3];
foo(a);
a; // [1, 2, 3, 4]
```

```
function foo(x) {
    x.push(4);
    x; // [1, 2, 3, 4]
    // 然后
    x.length = 0; // 清空数组
    x.push(4, 5, 6, 7);
    x; // [4, 5, 6, 7]
}
var a = [1, 2, 3];
foo(a);
a; // 是[4, 5, 6, 7] 不是 [1, 2, 3, 4]
```

- 我们无法自行决定使用值复制还是引用复制，一切由值得类型来决定。

如果通过值复制的方式来传递复合值（如数组），就需要为其创建一个副本，这样传递的就不再是原始值。例如：

```
foo(a.slice());
```
slice(...)不带参数会返回当前数组的一个浅副本。由于传递给函数的是指向该复本的引用，所以foo(...)中的操作不会影响a指向的数组。

相反，如果要将标量基本类型值传递到函数内并进行更改，就需要将该值封装到一个复合值（对象、数组等）中，然后通过引用复制的方式传递。

```
function foo(wrapper) {
    wrapper.a = 42;
}
var obj = {
    a: 2
}
foo(obj);
obj.a; // 42
```
### 2.6 小结
JavaScript中的数组是通过数字索引的一组任意类型的值。字符串和数组类似，但是它们的行为特征不同，在将字符作为数组来处理时需要特别小心。JavaScript中的数字包括“整数”和“浮点型”。

基本类型中定义了几个特殊的值。

null类型只有一个值null，undefined类型也只有一个值undefined。所有变量在赋值之前默认值都是undefined。void运算符返回undefined。

数字类型有几个特殊值，包括NaN、+Infinity、-Infinity和0。

简单标量基本类型值（字符串和数字等）通过值复制来赋值/传递，而复合值（对象等）通过引用复制来赋值/传递。JavaScript中的引用和其他语言中的引用/指针不同，它们不能指向别的变量/引用，只能指向值。
### 第3章 原生函数
常用的原生函数有：
- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol() -- ES6中新加入的！

实际上，它们就是内建函数。

### 3.1 内部属性[[Class]]
所有typeof返回值为“object”的对象（如数组）都包含一个内部属性[[Class]](我们可以把它当做一个内部的分类，而非传统的面向对象意义上的类)。这个属性无法直接访问，一般通过Object.prototype.toString(...)来查看。

```
Object.prototype.toString.call([1, 2, 3]); // "[object Array]"
Object.prototype.toString.call(/regex-literal/i); // "[object RegExp]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call("abc"); // "[object String]"
Object.prototype.toString.call(42); // "[object Number]"
Object.prototype.toString.call(true); // "[object Boolean]"
```
基本类型值被各自的封装对象自动包装，所以它们的内部[[Class]]属性值分别为“String”，“Number”和“Boolean”。
### 3.2 封装对象包装
一般情况下，我们不需要直接使用封装对象。最好的办法是让JavaScript引擎自己决定什么时候应该使用封装对象。换句话说，就是应该优先考虑使用“abc”和42这样的基本类型值，而非new String("abc")和new Number(42)。
#### 封装对象释疑

```
var a = new Boolean(false);
if(!a) {
    console.log("Oops"); // 执行不到这里
}
```
如果想要自行封装基本类型值，可以使用Object(...)函数（不带new关键字）：

```
var a = "abc";
var b = new String(a);
var c = Object(a);

typeof a; // "string"
typeof b; // "object"
typeof c; // "object"

b instanceof String; // true
c instanceof String; // true

Object.prototype.toString.call(b); // "[object String]"
Object.prototype.toString.call(c); // "[object String]"
```
### 3.3 拆封
如果想要得到封装对象中的基本类型值，可以使用valueOf()函数：

```
var a = new String("abc");
var b = new Number(42);
var c = new Boolean(true);

a.valueof(); // "abc"
b.valueof(); // 42
c.valueof(); // true
```
### 3.4 原生函数作为构造函数
#### 3.4.1 Array(...)

```
var a = new Array(1,2,3);
a; // [1, 2, 3]

var b = [1, 2, 3];
b; // [1, 2, 3]
```
Array构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度（length），而非只充当数组中的一个元素。

- 永远不要创建和使用空单元数组。

#### 3.4.2 Object(...)、Function(...)和RegExp(...)
除非万不得已，否则尽量不要使用Object(...)/Function(...)/RegExp(...):

```
var c = new Object();
c.foo = "bar";
c; // { foo: "bar" }

var d = { foo: "bar" }
d; // { foo: "bar" }

var e = new Function("a", "return a * 2;");
var f = function(a) { return a * 2 };
function g(a) { return a * 2 }

var h = new RegExp("^a*b+", "g");
var i = /^a*b+/g;
```
RegExp(...)有时还是很有用的，比如动态定义正则表达式时：

```
var name = "Kyle";
var namePattern = new RegExp("\\b(?:" + name + ")+\\b", "ig");
var matches = someText.match(namePattern);
```
#### 3.4.3 Date(...)和Error(...)
Date(...)主要用来获得当前的Unix时间戳（从1970年1月1日开始计算，以秒为单位）。
该值可以通过日期对象中的getTime()来获得。

从ES5开始引入了一个更简单的方法，即静态函数Date.now()。对ES5之前的版本我们可以使用下面的polyfill：

```
if(!Date.now {
    Date.now = function() {
        return (new Date()).getTime();
    }
}
```
创建错误对象（error object）主要是为了获得当前运行栈的上下文（大部分JavaScript引擎通过只读属性.stack来访问）。栈上下文信息包括函数调用栈信息和产生错误的代码行号，以便于调试（debug）。

错误对象通常与throw一起使用：

```
function foo(x) {
    if(!x) {
        throw new Error("x wasn't provided");
    }
}
```
#### 3.4.4 Symbol(...)
ES6中新加入了一个基本数据类型--符号（Symbol）。符号是具有唯一性的特殊值（并非绝对），用它来命名对象属性不容易导致重名。

我们可以使用Symbol(...)原生构造函数来自定义符号。但它比较特殊，不能带new关键字，否则会出错：


```
var mysym = Symbol("my own symbol");
mysym; // Symbol(my own symbol);

mysym.toStirng(); // "Symbol(my own symbol)"
typeof mysym; // "symbol"

var a = {};
a[mysym] = "foobar";
Object.getOwnPropertySymbols(a); // [Symbol(my own symbol)]
```
#### 3.4.5 原生原型
原生函数都有自己的prototype对象，如Array.prototype、String.prototype等。

这些对象包含其对应子类型所特有的行为特征。

例如，将字符串值封装为字符串对象之后，就能访问String.prototype中定义的方法。

> 根据文档约定，我们将String.prototyoe
