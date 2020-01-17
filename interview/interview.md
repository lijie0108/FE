## 第1天 2019.12.9
### [html] 页面导入样式时，使用link和@import有什么区别？
#### 1.用法
```html
<link href="index.css" rel="stylesheet">
```
```html
<style type="text/css">
@import url(index.css)
</style>
```
#### 2.区别
 - 1.引入的内容不同：link除了引用样式文件，还可以引用图片等资源文件，而@import只引用样式文件
 - 2.加载顺序不同：link引用CSS时，在页面载入时同时加载，@import需要页面完全载入以后加载
 - 3.兼容性不同：link是XHTML标签，无兼容问题 @import是在CSS2.1提供的，低版本的浏览器不支持
 - 4.对JS的支持不同：link支持使用JavaScript控制DOM去改变样式，而@import不支持
### [css] 圣杯布局和双飞翼布局的理解和区别，并用代码实现
https://www.cnblogs.com/pink-chen/p/10582741.html

### [js] 用递归算法实现，数组长度为5且元素的随机数在2-32间不重复的值
这是一道大题目，把考点拆成了4个小项；需要侯选人用递归算法实现（限制15行代码以内实现；限制时间10分钟内完成）：

a) 生成一个长度为5的空数组arr。

b) 生成一个（2－32）之间的随机整数rand。

c) 把随机数rand插入到数组arr内，如果数组arr内已存在与rand相同的数字，则重新生成随机数rand并插入到arr内[需要使用递归实现，不能使用for/while等循环]

d) 最终输出一个长度为5，且内容不重复的数组arr。
```javascript
var arr = new Array(5);
var num = randomNumber();
var i = 0;
randomArr(arr,num);
function randomArr(arr, num) {
    if(arr.indexOf(num) < 0) {
        arr[i] = num;
        i++;
    }else {
        num = randomNumber();    
    }
    if(i >= arr.length) {
        console.log(arr);
        return arr;
    }else {
        randomArr(arr,num);    
    }   
}

function randomNumber() {
    return Math.floor(Math.random()* 31 + 2);
}
```

## 第2天 2019.12.9
[html] html的元素有哪些（包含H5）？
HTML5的核心：这一部分主要由W3C官方的规范组成，涉及新的语义元素、新的增强的web表单控件、音频和视频支持以及通过JavaScript绘图的Canvas。
[css] CSS3有哪些新增的特性？
边框、背景、渐变、文本效果、2D转换、3D转换、过渡、动画、弹性盒子、多媒体查询
[js] 写一个方法去掉字符串中的空格
```javascript
var trim = function(str) {
    return str.replace(/\s*/g,"");
}
str.replace(/\s*/g,""); //去除字符串内所有的空格
str.replace(/^\s*|\s*$/g,""); //去除字符串内两头的空格
str.replace(/^\s*/,""); //去除字符串内左侧的空格
str.replace(/(\s*$)/g,""); //去除字符串内右侧的空格
```

## 第3天 2019.12.9
[html] HTML全局属性（global attribute）有哪些（包含H5）？
class、id、type、href、style、width、height、target、checked、disabled、require、ref、alt、title、name、src
[css] 在页面上隐藏元素的方法有哪些？
opacity只是从视觉上隐藏元素，元素本质依然占据位置，可以响应用户交互
```css
.hide {
    opacity: 0;
}
```
visibility只是从视觉上隐藏元素，元素本质依然占据位置，不可以响应用户交互
```css
.hide {
    visibility: hidden;
}
```
元素不占据空间，不可以响应用户交互
```css
.hide {
    display: none;
}
```
position将元素移出可视区域
```css
.hide {
    position:absolute;
    top: -9999px;
    left: -9999px;
}
```
```css
.hide {
    margin-left: -100%;
}
```
[js] 去除字符串中最后一个指定的字符
```javascript
function delLast(str, del) {
    if(typeof str !== 'string') {
        return false;
    }else {
        let index = str.lastIndexOf(del);
        return str.substring(0, index) + str.substring(index+1, str.length)
    }
}
```
## 第4天 2019.12.10
[html] HTML5的文件离线存储怎么使用，工作原理是什么？
[css] CSS选择器有哪些？哪些属性可以继承？
[js] 写一个方法把下划线命名转成大驼峰命名