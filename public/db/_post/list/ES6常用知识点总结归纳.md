
## 一、新的声明方式

1. let：声明的变量只在代码块内有效
2. const： 声明常量，声明时必须赋值且不可改变

```javascript
let a = 'aaa'
const b = 'bbb'
console.log(a, b)
```

## 二、变量的解构赋值

> 数组解构赋值

```javascript
let [aa, bb, cc] = [0, 1, 2]
```

> 对象解构赋值

```javascript
let { cnName, enName } = {
  id: '151521574',
  cnName: '张生',
  enName: 'Ronnie'
}
console.log(cnName, enName) //'张生'，'Ronnie'
```

## 三、扩展运算符和 rest 运算符

> 对象扩展运算符

```javascript
function test01(...arg) {
  console.log(arg[0]) //1
  console.log(arg[1]) //2
  console.log(arg[2]) //3
  console.log(arg[3]) //undefined
}
test01(1, 2, 3)

let arr1 = [1, 2, 3]
let arr2 = [...arr1]
arr2.push(4) //此时不改变arr1
console.log(arr1) //[1,2,3]
console.log(arr2) //[1,2,3,4]
```

> rest 运算符(表示剩余参数)

```javascript
function test02(first, ...arg) {
  for (let item of arg) {
    console.log(item) //依次输出1,2，3,4,5,6
  }
  console.log(first) //0
}
test02(0, 1, 2, 3, 4, 5, 6)
```

## 四、字符串模版

> 字符串模版

```javascript
let name = 'Ronnie'
let str = `大家好，我是<b>${name}</b><br/>很高兴认识大家`
console.log(str)
```

> 字符串查找

```javascript
let str = `大家好，我是<b>${name}</b><br/>很高兴认识大家`
console.log(str.includes('不高兴')) //false
console.log(str.startsWith('大家好')) //判断开头是否存在，true
console.log(str.endsWith('大家')) //判断结尾是否存在，true
```

## 五、数字操作

> 二进制声明 Binary

```javascript
let binary = 0b010101
console.log(binary) //21
```

> 八进制声明 Octal

```javascript
let octal = 0o666
console.log(octal) //438
```

> 判断是否为数字

```javascript
Number.isFinite(888) //true
Number.isFinite('888') //false，不会先将字符串尝试转换成数字再判断
Number.isFinite('asd') //false
Number.isFinite(undefined) //false
Number.isFinite(NaN) //false
```

> 判断是否是整数

```javascript
Number.isInteger(1.1) //false
Number.isInteger(1) //true
```

> 最大和最小安全整数

```javascript
Number.MAX_SAFE_INTEGER
Number.MIN_SAFE_INTEGER
```

> 判断是否为安全整数

```javascript
Number.isSafeInteger(Math.pow(2, 53) - 1) //true
Number.isSafeInteger(Math.pow(2, 53) + 1) //false
```

## 六、新增的数组知识

> 数组格式转换: Array.from、 Array.of

```javascript
let json = {
  '0': 'Ronnie',
  '1': 'Rose',
  '2': 'zhangsheng',
  '3': 'Json',
  length: 4
}

let jsonArr = Array.from(json)
console.log(jsonArr) //['Ronnie','Rose','zhangsheng','Json']

let strArr = Array.of('a', 'b', 'c', 'd')
console.log(strArr) //['a', 'b', 'c', 'd']
```

> find()方法:返回满足条件的第一个元素，三个参数

- value：当前查找的值
- index: 当前查找的值的索引
- strArr: 查找的原数组

```javascript
let findRst = strArr.find((value, index, strArr) => {
  return value === 'd' || value === 'a'
})
console.log(findRst) //a
```

> fill() 方法

```javascript
let fillArr = ['Ronnie', 'Rose', 'Zhangsheng']
fillArr.fill('es6', 1, 3) //将索引为[1,3),即索引为1和2的值替换为'es6'
console.log(fillArr) //["Ronnie", "es6", "es6"]
```

> for...of

```javascript
for (let item of fillArr) {
  console.log(item)
}
//带索引的方式
for (let [index, value] of fillArr.entries()) {
  console.log(index + ':' + value)
}
```

> entries() 生成的是 Iterator 形式的数组,这种形式的好处就是可以让我们在需要时用 next()手动跳转到下一个值

```javascript
let list = fillArr.entries()
console.log(list.next().value) //[0, "Ronnie"]
console.log(list.next().value) //[1, "es6"]
console.log(list.next().value) //[2, "es6"]
console.log(list.next().value) //undefined
```

> some 方法: 返回一个 Boolean，判断是否有元素符合 func 条件

```javascript
let someArr = [1, 2, 3, 4]
someArr.some((item) => item > 1) //true
```

> every 方法: 返回一个 Boolean，判断每一个元素是否符合 func 条件

```javascript
let everyArr = [1, 2, 3, 4]
everyArr.every((item) => item > 3) //false
everyArr.every((item) => item >= 1) //true
```

> filter 方法: 返回一个符合 func 条件的元素数组,不改变原来数组

```javascript
let ages = [23, 28, 25, 32]
ages.filter((item) => item > 25) //[28,32]
console.log(ages) //[23, 28, 25, 32]
```

> map 方法: 返回一个新的 array，数组元素由每一次调用函数产生结果组成

```javascript
let mapArr = [1, 2, 3, 4, 5, 6]
mapArr.map((item) => item + 1) //[2,3,4,5,6,7]
```

> in 方法:用来判断对象或者数组中是否存在某个 key 或索引

```javascript
let inObj = {
  cnName: '张生',
  enName: 'Ronnie'
}
console.log('enName' in inObj) //true
console.log(4 in ages) //false
```

## 七、ES6 中的函数

> 函数解构 json 对象

```javascript
let jsonObj = {
  cnName: '张生',
  enName: 'Rose'
}

function fun({ cnName, enName = 'Ronnie' }) {
  console.log(cnName, enName)
}
fun(jsonObj) //张生 Rose
```

## 八、ES6 中的对象

> 对象赋值：ES6 允许把声明的变量直接赋值给对象

```javascript
let nameObj = { cnName, enName }
console.log(nameObj) //{cnName: "张生",enName: "Ronnie"}

//对象Key值构建
let key = 'skill'
let keyObj = {
  [key]: 'web'
}
console.log(keyObj) //skill: "web"
```

> Object.is( ) 对象比较,===为同值相等，is()为严格相等

```javascript
console.log(+0 === -0) //true
console.log(NaN === NaN) //false
console.log(Object.is(+0, -0)) //false
console.log(Object.is(NaN, NaN)) //true
```

> Object.assign()对象合并

```javascript
let obj1 = { cnName: '张生' }
let obj2 = { enName: 'Ronnie', age: 26 }
let obj3 = Object.assign(obj1, obj2)
console.log(obj3) //{cnName: "张生", enName: "Ronnie", age: 26}
```

## 九、Set、WeakSet 以及 map 数据结构

Set:Set 和 Array 的区别是 Set 不允许内部有重复的值，如果有只显示一个，相当于去重

> Set 的声明

```javascript
let setArr = new Set(['ronnie', 'zhangsheng', 'web'])
console.log(setArr) //Set(3) {'ronnie', 'zhangsheng', 'web'}
```

> Set 值的增删查

```javascript
setArr.add('前端') //增
setArr.delete('web') //删
setArr.has('前端') //查: true
setArr.clear() //清空
```

> Set 的遍历

```javascript
for (let item of setArr) {
  console.log(item)
}
```

> size 属性

```javascript
console.log(setArr.size) //3
```

WeakSet：用于存储对象的 set

> WeakSet 声明，声明是不允许赋值，否则报错,同时 WeakSet 里边的值也是不允许重复的

```javascript
let weakObj = new WeakSet()
weakObj.add({ cnName: '张生', age: 26 })
console.log(weakObj)
```

map：map 是一种灵活，简单的适合一对一查找的数据结构，它跟 json 对象很像，但反应速度更高，而且 Map 的灵活性要更好，你可以把它看成一种特殊的键值对，但 key 可以设置成数组，值也可以设置成字符串

> map 的声明

```javascript
let map = new Map()
```

> map 的增删查

```javascript
let obj4 = { cnName: '张生', age: 26 }
map.set('ronnie', obj4) //增
map.set('ronnie', '永远十八岁') //改：相同key则修改
map.set(obj4, 'Ronnie') //增：key也可以为对象
console.log(map)
console.log(map.get(obj4)) //取值： Ronnie
map.delete('ronnie') //删除:根据key值删除
console.log(map.size) //size属性
console.log(map.has(obj4)) //has：查找是否存在
map.clear() //clear清除所有元素
console.log(map)
```

## 十、Proxy 预处理

Proxy: 类似于钩子函数，当我们在操作一个对象或者方法时会有几种前置动作

- get 属性：get 属性是在你得到某对象属性值时预处理的方法，它接收三个参数
  1. target：得到的目标值
  2. key：目标的 key 值，相当于对象的属性
  3. property：可选参数，这个不常用
- set 属性：set 属性是指你要改变 Proxy 属性值时，进行的预先处理。它接收四个参数。
  1. target:目标值
  2. key：目标的 Key 值
  3. value：要改变的值
  4. receiver：改变前的原始值

```javascript
let pro = new Proxy(
  {
    add: function (val) {
      return val + 10
    },
    name: 'I am Ronnie'
  },
  {
    get: function (target, key) {
      console.log('come in Get')
      return target[key]
    },
    set: function (target, key, value, receiver) {
      console.log(`setting ${key} = ${value}`)
      return (target[key] = value)
    }
  }
)
console.log(pro.name) //先输出 come in Get  再输出 I am Ronnie
pro.name = '张生' //setting name = 张生
```

## 十一、promise 对象的使用

promise 的出现是为了解决回调地狱的问题

> promise 的基本用法(举例说明)，比如把大象放入冰箱有三个步骤

1. 打开冰箱门
2. 把大象放进去
3. 关上冰箱门

```javascript
let isSuccess = true
function step1(resolve, reject) {
  console.log('First step')
  if (isSuccess) {
    resolve('成功打开冰箱门')
  } else {
    reject('打开冰箱门出错')
  }
}
function step2(resolve, reject) {
  console.log('Second step')
  isSuccess = false
  if (isSuccess) {
    resolve('成功把大象放进去')
  } else {
    reject('把大象放进去出错')
  }
}
function step3(resolve, reject) {
  console.log('Third step')
  if (isSuccess) {
    resolve('成功关上冰箱门')
  } else {
    reject('关上冰箱门出错')
  }
}

new Promise(step1)
  .then(function (rst) {
    console.log(rst)
    return new Promise(step2)
  })
  .then(function (rst) {
    console.log(rst)
    return new Promise(step3)
  })
  .then(function (rst) {
    // console.log(rst);
    return rst
  })
  .catch((e) => {
    console.log(e) //捕获Promise reject返回的错误信息
  })
```

## 十二、class 类的使用

> 类的声明与使用

```javascript
class Coder {
  name(val) {
    console.log(val)
    return val
  }
  skill(val) {
    console.log(this.name('Ronnie') + ':' + 'Skill-' + val)
  }
  constructor(cnName, age) {
    this.cnName = cnName
    this.age = age
  }
  introduce() {
    return this.cnName + ':' + this.age
  }
}

let Ronnie = new Coder('张生', 26)
Ronnie.name('Ronnie') //Ronnie
Ronnie.skill('web') //Ronnie: Skill-web
console.log(Ronnie.introduce()) //Ronnie:26
```

> class 的继承

```javascript
class htmler extends Coder {}

let zhangsheng = new htmler()
zhangsheng.name('zhangsheng') //zhangsheng
```

## 十三、模块化操作

> 模块化操作主要包括两个方面

1. export :负责进行模块化，也是模块的输出
2. import : 负责把模块引，也是模块的引入操作

> export 的用法:export 可以让我们把变量，函数，对象进行模块化，提供外部调用接口，让外部进行引用

```javascript
export let name = 'Ronnie' //export   temp.js

import { a } from './temp.js' //在index.js中以import的形式引入  此时的a对应的是temp.js中输出的name
```

> 多变量的输出以及函数的输出

```javascript
let var1 = 'Ronnie'
var var2 = '张生'
var var3 = 'zhangsheng'
function add(a, b) {
  return a + b
}
export { var1, var2, var3, add }
import { var1, add } from './temp' //对应的引入方式
```

> export defalut: 只能输出一个

```javascript
let str = 'ronnie is so handsome'
export default str
import aaa from './temp.js' //对应的引入方式，引入的名称可以任意
```

OK，以上就是关于 ES6 的常用知识点了，关于 Proxy 预处理的介绍可能不是很详细，具体讲解的话将会是长篇大论，所以这里就不深入介绍了，感兴趣的朋友可以自行搜索别人的文章，相信很多朋友都解释得比我好。
