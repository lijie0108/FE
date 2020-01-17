## 第1章 Hello World
### 1.1 设置
### 1.2 Hello React World
### 1.3 刚刚发生了什么
### 1.4 React.DOM.*
### 1.5 特殊DOM属性
class和for不能直接在JavaScript中使用，因为它们都是JavaScript中的关键字。取而代之的属性名是className和htmlFor。

至于style属性，不能像以往在HTML中那样使用字符串对其赋值，而需要使用JavaScript对象取而代之。
### 1.6 React DevTools 浏览器扩展
### 1.7 下一步：自定义组件

## 第2章 组件的生命周期
### 2.1 基础
创建新组件的API：
```javascript
var myComponent = React.createClass({
    /* 组件详细说明 */
})
```
基本例子：
```javascript
var Component = React.createClass({
    render: function() {
      return React.DOM.span(null, "I'm so custom")
    }
})
```
使用自定义组件的方法：
```javascript
ReactDOM.render(
    React.createElement(Component),
    document.getElementById("#app")
)
```
React.createElement()是创建组件“实例”的方法之一。如果你想创建多个实例，还有另一种途径，就是使用工厂方法：
```javascript
var ComponentFactory = React.createFactory(Component);

ReactDOM.render(
    ComponentFactory(),
    document.getElementById("app")
)
```
我们之前介绍的React.DOM.*方法实际上只是在React.createElement()的基础上进行了一层封装。换句话说，以下代码同样可以渲染DOM组件：
```javascript
ReactDOM.render(
    React.createElement("span", null, "Hello"),
    document.getElementById("app")
)
```
### 2.2 属性
你的组件可以接收属性，并根据属性值进行相对应的渲染或表现。所有属性都可以通过this.props对象获取。
```javascript
var Component = React.createClass({
    render: function() {
      return React.DOM.span(null, "My name is " + this.props.name)
    }
})
```
在渲染组件时，传递属性的方法如下：
```javascript
ReactDOM.render(
    React.createElement(Component, {
        name: "Bob"    
}),document.getElementById("app")
)
```
### 2.3 propTypes
在你的组件中，可以添加一个名为propTypes的属性，以声明组件需要接收的属性列表及其对应类型。
```javascript
var Component = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired
    },
    render: function() {
      return React.DOM.span(null, "My name is " + this.props.name);
    }
})
```
使用propTypes的好处
- 通过预先声明组件期望接收的参数，让使用组件的用户不需要在render()方法的源代码中到处寻找该组件可配置的属性（这可能需要花费很长时间）
- React会在运行时验证属性值得有效性。这使得你可以放心编写render()函数，而不需要对组件接收的数据类型有所顾虑（甚至过分怀疑）
### 默认属性值
```javascript
var Component = React.createClass({
    propTypes: {
        firstName: React.PropTypes.string.isRequired,
        middleName: React.PropTypes.string,
        familyName: React.PropTypes.string.isRequired,
        address: React.PropTypes.string
    },
    getDefaultProps: function() {
      return {
            middleName: '',
            address: 'n\a'
        }   
    },
    render: function() {
      return React.DOM.span(null, "My name is " + this.props.name)
    }
})
```
getDefaultProps()方法返回一个对象，并为每个可选属性（不带 .isRequired的属性）提供了默认值。

### 2.4 state
React有一个state的概念，也就是组件渲染自身时用到的数据。当state发生改变时，React会自动重建用户界面。因此，当你（在render()方法中）
初始化构造界面后，只需要关心数据的变化即可。你完全不需要再关心界面变化了。毕竟，你的render()方法已经提供了组件的蓝图。

和this.props的取值方式类似，你可以通过this.state对象取得state。在更新state时，可以使用this.setState()方法。当this.setState()被调用时，
React会调用你的render()方法并更新界面。

也可以通过shouldComponentUpdate()方法返回false，从而避免界面更新

### 2.5 带状态的文本框组件

### 2.6 关于DOM事件的说明
出于性能、便捷性与合理性考虑，React使用了自身的合成事件系统。
```javascript
onChange: this._textChange
```
#### 2.6.1 传统的事件处理
使用事件委托的代码：

事件委托虽然方法奏效，性能也不错，但是它仍有一些缺点

1.监听器的声明代码远离视图组件，使得代码难以搜索与调试
2.使用委托总要经过switch结构，在你开始进行实际逻辑编写之前，需要创建不必要的样板代码
3.实际中为处理浏览器的不一致性，会让代码变得更加冗长。

不幸的是，在你打算把这段代码放到真实环境给用户使用之前，还需要做更多工作，以支持所有主流浏览器
1.除了addEventListener之外还需要attachEvent
2.要在监听器顶部使用 event || window.event
3.需要使用 var button = event.target || event.srcElement

#### 2.6.2 React的事件处理
为了包裹并规范浏览器事件，React使用了合成事件来消除浏览器之间的不一致情况。有了React的帮助，现在你可以依靠event.target在所有浏览器中取得想要的值了。

React在事件处理中使用驼峰法命名，因此你需要使用onClick代替onclick。

如果你出于某种原因需要原生的浏览器事件，可以使用event.nativeEvent,但估计不太用得上。

### 2.7 props与state
属性是一种给外部世界设置组件的机制，而状态则负责组件内部数据的维护。因此，如果与面向对象编程进行类比的话，this.props就像是传递给类构造函数的参数，
而this.state则包含了你的私有属性。

### 2.8 在初始化state时使用props：一种反模式
### 2.9 从外部访问组件
让你的React应用和外界进行通信的一种方法，是在使用ReactDOM.render()方法进行渲染时，把引用赋值给一个变量，然后在外部通过该变量访问组件

```javascript
var myTextAreaCounter = ReactDOM.render(
    React.createElement(TextAreaCounter, {
        defaultValue: "Bob",
}),
document.getElementById("app")
)
```
```javascript
var reactAppNode = ReactDOM.findDOMNode(myTextAreaCounter);
reactAppNode.parentNode === document.getElementById("app"); // true
```
### 2.10 中途改变属性
### 2.11 生命周期方法
- componentWillReceiveProps()

- componentWillUpdate()
当你的组件再次渲染时，在render()方法前调用（在组件的props或者state发生改变时会触发该方法）

- componentDidUpdate()
在render()函数执行完毕，且更新的组件已被同步到DOM后立即调用。该方法不会再初始化渲染时触发。
- componentWillMount()
在新节点插入DOM结构之前触发
- componentDidMount()
在新节点插入DOM结构之后触发
- componentWillUnmount()
在组件从DOM中移除时立刻触发
- shouldComponentUpdate(newProps, newState)
这个方法在componentWillUpdate()之前触发，给你一个机会返回false以取消更新组件，这意味着render()方法将不会被调用。
这在性能关键性的应用场景中非常有用。

### 2.12 生命周期示例：输出日志记录

### 2.13 生命周期示例：使用mixin





















