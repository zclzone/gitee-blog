
# 1 基本概念

## 1.1 语法

    ECMAScript 的语法大量借鉴了C 及其他类C 语言（如Java 和Perl）的语法。
    熟悉这些语言的开发人员在接受ECMAScript 更加宽松的语法时，一定会有一种轻松自在的感觉。
    即使没有其他编程语言基础，JavaScript仍然易上手。

### 1.1.1 区分大小写

    ECMAScript 中的一切（变量、函数名和操作符）都区分大小写。
    变量名test 和变量名Test 分别表示两个不同的变量。

### 1.1.2 标识符

    标识符，就是指变量、函数、属性的名字，或者函数的参数，规则：
    1. 第一个字符必须是一个字母、下划线（_）或一个美元符号（$）
    2. 其他字符可以是字母、下划线、美元符号或数字
    3. 不允许是关键字、保留字、true、false和null

ECMAScript 标识符采用驼峰大小写格式：

```javascript
var myBlog
var doSomethingImportant
```

### 1.1.3 注释

```javascript
//单行注释

/*
 * 这是一个多行
 * （块级）注释
 */
```

    虽然上面多行注释中的第二和第三行都以一个星号开头，但这不是必需的。之所以添加那两个星号，纯粹是为了提高注释的可读性

### 1.1.4 语句

ECMAScript 中的语句以一个分号结尾；如果省略分号，则由解析器确定语句的结尾，如下例所示：

```javascript
var sum = a + b // 即使没有分号也是有效的语句——不推荐
var diff = a - b // 有效的语句——推荐
```

    加上分号也会在某些情况下增进代码的性能，因为这样解析器就不必再花时间推测应该在哪里插入分号了

尽量始终在控制语句中使用代码块——即使代码块中只有一条语句

```javascript
// 有效但容易出错，不要使用
if (test) alert(test)

// 推荐使用
if (test) {
  alert(test)
}
```

    在控制语句中使用代码块可以让编码意图更加清晰，而且也能降低修改代码时出错的几率

## 1.2 关键字和保留字

ECMAScript 的全部关键字

> break do instanceof typeof case else new var
> catch finally return void continue for switch while
> debugger function this with default if throw delete in try

保留字：

> abstract enum int short boolean export interface static
> byte extends long super char final native synchronized
> class float package throws const goto private transient
> debugger implements protected volatile double import public

## 1.3 变量

ECMAScript 的变量是松散类型的，所谓松散类型就是可以用来保存任何类型的数据。

    可以使用一条语句定义多个变量，只要像下面这样把每个变量（初始化或不初始化均可）用逗号分隔开即可：

```javascript
var message = 'hi',
  found = false,
  age = 29
```

## 1.4 数据类型

5 种简单数据类型（也称为基本数据类型）：

- Undefined
- Null
- Boolean
- Number
- String

1 种复杂数据类型: Object

### 1.4.1 typeof 操作符

typeof——用来检测给定变量的数据类型的操作符

- "undefined"——如果这个值未定义
- "boolean"——如果这个值是布尔值
- "string"——如果这个值是字符串
- "number"——如果这个值是数值
- "object"——如果这个值是对象或 null
- "function"——如果这个值是函数

例：

```javascript
var message = 'some string'
console.log(typeof message) // "string"
console.log(typeof message) // "string"
console.log(typeof 95) // "number"
```

    注意：typeof 是一个操作符而不是函数，因此例子中的圆括号尽管可以使用，但不是必需的

### 1.4.2 Undefined 类型

Undefined 类型只有一个值，即特殊的 undefined。在使用 var 声明变量但未对其加以初始化时，
这个变量的值就是 undefined，例如：

```javascript
var message
console.log(message == undefined) //true
```

### 1.4.3 Null 类型

Null 类型是第二个只有一个值的数据类型，这个特殊的值是 null。从逻辑角度来看，null 值表示一个空对象指针，而这也正是使用 typeof 操作符检测 null 值时会返回"object"的原因，如下面的例子所示：

```javascript
var car = null
console.log(typeof car) // "object"
```

实际上，undefined 值是派生自 null 值的，因此 ECMA-262 规定对它们的相等性测试要返回 true：

```javascript
console.log(null == undefined) //true
```

### 1.4.4 Boolean 类型

该类型只有两个字面值：true 和 false。
虽然 Boolean 类型的字面值只有两个，但 ECMAScript 中所有类型的值都有与这两个 Boolean 值 等价的值。要将一个值转换为其对应的 Boolean 值，可以调用转型函数 Boolean()，如下例所示：

```javascript
var message = 'Hello world!'
var messageAsBoolean = Boolean(message)
console.log(messageAsBoolean) //true
```

| 数据类型  |       转换为 true 的值       | 转换为 false 的值 |
| :-------: | :--------------------------: | :---------------: |
|  Boolean  |             true             |       false       |
|  String   |        任何非空字符串        |   ''(空字符串)    |
|  Number   | 任何非零数字值（包括无穷大） |     0 和 NaN      |
| Undefined |        不适合这种规则        |     undefined     |

### 1.4.5 Number 类型

Number 类型使用 IEEE754 格式来表示 整数和浮点数值（浮点数值在某些语言中也被称为双精度数值）。

#### 1. 浮点数值

所谓浮点数值，就是该数值中必须包含一个小数点，并且小数点后面必须至少有一位数字
由于保存浮点数值需要的内存空间是保存整数值的两倍，因此 ECMAScript 会不失时机地将浮点数值 转换为整数值。显然，如果小数点后面没有跟任何数字，那么这个数值就可以作为整数值来保存。同样 地，如果浮点数值本身表示的就是一个整数（如 1.0），那么该值也会被转换为整数，如下面的例子所示：

```javascript
var floatNum1 = 1 // 小数点后面没有数字——解析为 1
var floatNum2 = 10.0 // 整数——解析为 10
```

浮点数值的高精度是 17 位小数，但在进行算术计算时其精确度远远不如整数。例如，0.1 加 0.2 的结果不是 0.3，而是 0.30000000000000004。这个小小的舍入误差会导致无法测试特定的浮点数值。 例如:

```javascript
if (a + b == 0.3) {
  console.log('You got 0.3.') // 不要做这样的测试！
}
```

    在这个例子中，我们测试的是两个数的和是不是等于 0.3。如果这两个数
    是 0.05和 0.25，或者是 0.15 和 0.15都不会有问题。而如前所述，如
    果这两个数是 0.1和 0.2，那么测试将无法通过。因此，永远不 要测试某
    个特定的浮点数值。

#### 2. 数值范围

由于内存的限制，ECMAScript 并不能保存世界上所有的数值。ECMAScript 能够表示的小数值保 存在 Number.MIN_VALUE 中——在大多数浏览器中，这个值是 5e-324；能够表示的大数值保存在 Number.MAX_VALUE 中——在大多数浏览器中，这个值是 1.7976931348623157e+308。如果某次计算的 结果得到了一个超出 JavaScript 数值范围的值，那么这个数值将被自动转换成特殊的 Infinity 值。具 体来说，如果这个数值是负数，则会被转换成-Infinity（负无穷），如果这个数值是正数，则会被转 换成 Infinity（正无穷）。

    如果某次计算返回了正或负的 Infinity 值，那么该值将无法继续参与下一次的计算，
    因为 Infinity 不是能够参与计算的数值

#### 3. NaN

NaN，即非数值（Not a Number）是一个特殊的数值，这个数值用于表示一个本来要返回数值的操作数 未返回数值的情况（这样就不会抛出错误了）,例如,任何数值除以 0 都会导致错误，从而停止代码执行。但在 ECMAScript 中，任何数值除以 0 会返回 NaN，因此不会影响其他代码的执行。

#### 4. 数值转换

有 3 个函数可以把非数值转换为数值：Number()、parseInt()和 parseFloat()

Number()函数的转换规则：

    1. 如果是Boolean 值，true 和false 将分别被转换为1 和0。
    2. 如果是数字值，只是简单的传入和返回。
    3. 如果是null 值，返回0。
    4. 如果是undefined，返回NaN。
    5. 如果是字符串，遵循下列规则：
      -  如果字符串中只包含数字（包括前面带正号或负号的情况），则将其转换为十进制数值，即"1"会变成1，"123"会变成123，而"011"会变成11（注意：前导的零被忽略了）；
      -  如果字符串中包含有效的浮点格式，如"1.1"，则将其转换为对应的浮点数值（同样，也会忽略前导零）；
      -  如果字符串中包含有效的十六进制格式，例如"0xf"，则将其转换为相同大小的十进制整数值；
      -  如果字符串是空的（不包含任何字符），则将其转换为0；
      -  如果字符串中包含除上述格式之外的字符，则将其转换为NaN。
    6. 如果是对象，则调用对象的valueOf()方法，然后依照前面的规则转换返回的值。如果转换的结果是NaN，则调用对象的toString()方法，然后再次依照前面的规则转换返回的字符串值。

```javascript
var num1 = Number('Hello world!') //NaN
var num2 = Number('') //0
var num3 = Number('000011') //11
var num4 = Number(true) //1
```

parseInt()函数的转换规则

```javascript
var num1 = parseInt('1234blue') // 1234
var num2 = parseInt('') // NaN
var num3 = parseInt('0xA') // 10（十六进制数）
var num4 = parseInt(22.5) // 22
var num5 = parseInt('070') // 56（八进制数）
var num6 = parseInt('70') // 70（十进制数）
var num7 = parseInt('0xf') // 15（十六进制数）
```

parseFloat()转换数值的规则

```javascript
var num1 = parseFloat('1234blue') //1234 （整数）
var num2 = parseFloat('0xA') //0
var num3 = parseFloat('22.5') //22.5
var num4 = parseFloat('22.34.5') //22.34
var num5 = parseFloat('0908.5') //908.5
var num6 = parseFloat('3.125e7') //31250000
```

### 1.4.6 String 类型

1.  字符字面量
    String 数据类型包含一些特殊的字符字面量，也叫转义序列，用于表示非打印字符，或者具有其他用途的字符

| 字面量 |                                             含义                                             |
| :----: | :------------------------------------------------------------------------------------------: |
|   \n   |                                             换行                                             |
|   \t   |                                             制表                                             |
|   \b   |                                             空格                                             |
|   \r   |                                             回车                                             |
|   \f   |                                             进纸                                             |
|  \\\\  |                                             斜杠                                             |
|  \\\'  |             单引号（'），在用单引号表示的字符串中使用。例如：'He said, \'hey.\''             |
|  \\\"  |             双引号（"），在用双引号表示的字符串中使用。例如："He said, \"hey.\""             |
|  \xnn  |           以十六进制代码 nn 表示的一个字符（其中 n 为 0 ～ F）。例如，\x41 表示"A"           |
| \unnnn | 以十六进制代码 nnnn 表示的一个 Unicode 字符（其中 n 为 0 ～ F）。例如，\u03a3 表示希腊字符 Σ |

2.  字符串的特点
    ECMAScript 中的字符串是不可变的，也就是说，字符串一旦创建，它们的值就不能改变。要改变某个变量保存的字符串，首先要销毁原来的字符串，然后再用另一个包含新值的字符串填充该变量

3.  转换为字符串
    要把一个值转换为一个字符串有两种方式:

- toString()方法

```javascript
var age = 11
var ageAsString = age.toString() // 字符串"11"
var found = true
var foundAsString = found.toString() // 字符串"true"
```

- String()方法

```javascript
var value1 = 10
var value2 = true
var value3 = null
var value4
alert(String(value1)) // "10"
alert(String(value2)) // "true"
alert(String(value3)) // "null"
alert(String(value4)) // "undefined"
```