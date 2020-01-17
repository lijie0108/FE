### 闭包问题的产生原因
函数执行完毕后，作用域中保留了最新的a变量的值
### 闭包的应用场景
- 模块化
- 防止变量被破坏

### 函数的4种调用方式
- 函数调用
```javascript
    var age = 18;
    var p = {
        age: 15,
        say: function () {
            console.log(this.age);
        }
    }

    var s1 = p.say;
    s1();
```
- 方法调用
```javascript
    var age = 18;
    var p = {
        age: 15,
        say: function () {
            console.log(this.age);
        }
    }

    p.say();
```
- new调用
```javascript
    var age = 18;
    var p = {
        age: 15,
        say: function () {
            console.log(this.age);
        }
    }

    new p.say();
```
- 上下文方式（call，apply，bind）
```javascript
    var length = 21;
    function f1() {
      console.log(this.length);
    }
    
    f1.call([1, 3, 5]);
    f1.apply(this);
    f1.call(5);
```
ES6的箭头函数之前的时代，想要判断一个函数内部的this指向谁，就是根据上面的四种方式来决定的

### 对象的属性查找规则
 // --> 1.首先查看本身有没有length属性
// --> 2.如果本身没有该属性，那么去它的原型对象中查找
// --> 3.如果原型对象中没有，那么就去原型对象的原型对象中查找，最终一直找到根对象，（Object.prototype)
// --> 4.最终都没有找到的话，我们认为该对象并没有该属性，如果获取该属性，undefined