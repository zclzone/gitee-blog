
# Css3 Flex 布局

## 属性总览

| 作用在 flex 容器上 | 作用在 flex 子项上 |
| ------------------ | ------------------ |
| flex-direction     | order              |
| flex-wrap          | flex-grow          |
| flex-flow          | flex-shrink        |
| justify-content    | flex-basis         |
| align-items        | flex               |
| align-content      | align-self         |

> 无论作用在 flex 容器上，还是作用在 flex 子项，都是控制的 flex 子项的呈现，只是前者控制的是整体，后者控制的是个体。

## 属性详解

### 1. flex-direction

`flex-direction`用来控制子项整体布局方向，是从左往右还是从右往左，是从上往下还是从下往上。

属性如下:

`row`: 默认值，显示为行，从左到右

`row-reverse`: 显示为行，方向从右到左，与 row 相反

`column`: 显示为列，从上至下

`column-reverse`: 显示为列，从下往上

语法如下:

```css
flex-direction: row | row-reverse | column | column-reverse;
```

### 2. flex-wrap

`flex-wrap`用来控制子项是单行显示还是换行显示

属性如下:

`nowrap`: 默认值，不换行，所有的子项单行显示，如果宽度溢出会压缩宽度显示

`wrap`: 宽度溢出则换行显示

`wrap-reverse`: 宽度溢出换行显示，从下往上显示，即原本换行在下面的子项显示在上面

语法如下:

```css
flex-wrap: nowrap | wrap | wrap-reverse;
```

### 3. flex-flow

`flex-flow`是 **_flex-direction_** 和 **_flex-wrap_** 的缩写

语法如下:

```css
flex-flow: row wrap;
```

> 当多属性同时使用的时候，使用空格分隔

### 4. justify-conten

`justify-content`属性决定了水平方向子项的对齐和分布方式

属性如下:

`flex-start`: 默认值，左对齐

`flex-end`: 右对齐

`center`: 居中对齐

`space-between`: 两端对齐，多余的空白只在元素中间分配

`space-around`: 环绕，每个子项两侧都环绕互不干扰的等宽间距，最终表现为两端空白是中间空白的一半

`space-evenly`: 均匀分布，每个子项两侧空白完全相等

语法如下:

```css
justify-content: flex-start | flex-end | center | space-between | space-arount |
  space-evenly;
```

### 5. align-items

`align-items`中的 items 指的是 flex 中的子项，因此`align-items`指的就是 flex 子项们相对于 flex 容器在垂直方向上的对齐方式

属性如下:

`stretch`: 默认值，子项拉伸显示。如果子项设置了高度，则按设置的高度渲染，而不是拉伸

`flex-start`: 顶部对齐

`flex-end`: 底部对齐

`center`: 垂直居中对齐

`baseline`: 相对于 flex 容器的基线对齐

### 6. align-content

`align-content`可以看成是和 justify-content 是相似且对立的属性，`justify-content`指的是水平方向 flex 子项的对齐和分布方式，而 align-content 则是指垂直方向每一行 flex 子项的对齐和分布方式

> 如果所有 flex 子项只有一行，则 align-content 属性是没有任何效果的

属性如下:

`stretch`: 默认值。每一行 flex 子元素都等比例拉伸。例如，如果共两行 flex 子元素，则每一行拉伸高度是 50%。

`flex-start`: 逻辑 CSS 属性值，与文档流方向相关。默认表现为顶部堆砌。

`flex-end`: 逻辑 CSS 属性值，与文档流方向相关。默认表现为底部堆放。

`center`: 表现为整体垂直居中对齐。

`space-between`: 表现为上下两行两端对齐。剩下每一行元素等分剩余空间。

`space-around`: 每一行元素上下都享有独立不重叠的空白空间。

`space-evenly`: 每一行元素都完全上下等分。

### 7. order (==作用在 flex 子项==)

`order`可以改变一个 flex 子项的排序位置

> 所有 flex 子项默认 order 属性值为 0，如果想让某一子项在最前面显示，设置比 0 小的整数值就行了，如：-1

语法如下:

```css
order: -1;
```

### 8. flex-grow (==作用在 flex 子项==)

`flex-grow`指扩展 flex 子项所占据的宽度，扩展的空间就是除去元素外剩余的空白间隙

> flex-grow 不支持负值，默认值是 0，表示不占用剩余的空白间隙扩展自己的宽度。如果 flex-grow 大于 0，则 flex 容器剩余空间的分配就会发生，具体规则如下：

- 所有剩余空间总量是 1。
- 如果只有一个 flex 子项设置了 flex-grow 属性值：

  - 如果 flex-grow 值小于 1，则扩展的空间就总剩余空间和这个比例的计算值。
  - 如果 flex-grow 值大于 1，则独享所有剩余空间。

- 如果有多个 flex 设置了 flex-grow 属性值：
  - 如果 flex-grow 值总和小于 1，则每个子项扩展的空间就总剩余空间和当前元素设置的 flex-grow 比例的计算值。
  - 如果 flex-grow 值总和大于 1，则所有剩余空间被利用，分配比例就是 flex-grow 属性值的比例。例如所有的 flex 子项都设置 flex-grow:1，则表示剩余空白间隙大家等分，如果设置的 flex-grow 比例是 1:2:1，则中间的 flex 子项占据一半的空白间隙，剩下的前后两个元素等分。

语法如下:

```css
flex-grow: 0.5; /* 数值，可以是小数，默认值是 0 */
```

### 9. flex-shrink(==作用在 flex 子项==)

shrink: 收缩，`flex-shrink`指的是当 flex 容器空间不足时候，单个元素的收缩比例。

> flex-shrink 不支持负值，默认值是 1，也就是默认所有的 flex 子项都会收缩。如果设置为 0，则表示不收缩，保持原始的宽度。

已知 flex 子项不换行，且容器空间不足，不足的空间就是“完全收缩的尺寸”：

- 如果只有一个 flex 子项设置了 flex-shrink：
  - flex-shrink 值小于 1，则收缩的尺寸不完全，会有一部分内容溢出 flex 容器。
  - flex-shrink 值大于等于 1，则收缩完全，正好填满 flex 容器。
- 如果多个 flex 子项设置了 flex-shrink：
  - flex-shrink 值的总和小于 1，则收缩的尺寸不完全，每个元素收缩尺寸占“完全收缩的尺寸”的比例就是设置的 flex-shrink 的值。
  - flex-shrink 值的总和大于 1，则收缩完全，每个元素收缩尺寸的比例和 flex-shrink 值的比例一样。下面案例演示的就是此场景。

语法如下:

```css
flex-shrink: 0; /* 数值，可以是小数，默认值是 1 */
```

### 10. flex-basis(==作用在 flex 子项==)

`flex-basis`定义了在分配剩余空间之前元素的默认大小。

默认值是 auto，就是自动。有设置 width 则占据空间就是 width，没有设置就按内容宽度来。如果同时设置 width 和 flex-basis，就渲染表现来看，会忽略 width。flex 顾名思义就是弹性的意思，因此，实际上不建议对 flex 子项使用 width 属性，因为不够弹性。

> 当剩余空间不足的时候，flex 子项的实际宽度通常并不是设置的 flex-basis 尺寸，因为 flex 布局剩余空间不足的时候默认会收缩。

语法如下:

```css
flex-basis: <length> | auto; /* 默认值是 auto */
```

### 11. flex(==flex 子项中==)

`flex`属性是 flex-grow，flex-shrink 和 flex-basis 的缩写。

语法如下:

```css
flex: none | auto | [ < 'flex-grow' > < 'flex-shrink' >? || < 'flex-basis' > ];
```

> 第 2 和第 3 个参数（flex-shrink 和 flex-basis）是可选的。默认值为 0 1 auto。

### 12. align-self(==作用在 flex 子项==)

`align-self`指控制单独某一个 flex 子项的垂直对齐方式，写在 flex 容器上的这个 align-items 属性，后面是 items，有个 s，表示子项们，是全体；这里是 self，单独一个个体。语法几乎一样：

```css
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

唯一区别就是 align-self 多了个 auto（默认值），表示继承自 flex 容器的 align-items 属性值。
