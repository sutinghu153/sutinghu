# Go 

## Go 环境安装

>  [Go 语言环境安装 | (runoob.com)](https://m.runoob.com/go/go-environment.html) 

## 基础语法

### 标记

Go程序可以由多个标记组成，可以是关键字、标识符、常量、字符串、符号等

### 行分隔符

在 Go 程序中，一行代表一个语句结束。每个语句不需要像 C 家族中的其它语言一样以分号 ; 结尾，因为这些工作都将由 Go 编译器自动完成。如果你打算将多个语句写在同一行，它们则必须使用 ;

### 注释

```go
// 单行注释
/**/ 多行注释
```

### 标识符

标识符用来命名变量、类型等程序实体，只能由字母和下划线开头

### 关键字

![1654829793479](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\1654829793479.png)

### 变量

```go
var identifier type
```

var 标识符 数据类型

#### 值类型

- 所有像int float bool string 这些基础类型都属于值类型，使用这些类型的变量直接指向内存中的值。

-  当使用等号 `=` 将一个变量的值赋值给另一个变量时，如：`j = i`，实际上是在内存中将 i 的值进行了拷贝 。
-  可以通过 &i 来获取变量 i 的内存地址，例如：0xf840000040（每次的地址都可能不一样）。值类型的变量的值存储在栈中。 

#### 引用类型

 引用类型的变量 r1 存储的是 r1 的值所在的内存地址（数字），或内存地址中第一个值所在的位置 。

 这个内存地址为称之为指针，这个指针实际上也被存在另外的某一个值中 。

####  := 赋值操作符

-  a := 50 或 b := false 

- 系统会自动推断
-  只能被用在函数体内，不可以用于全局变量的声明与赋值 
-  不可以再次对于相同名称的变量使用初始化声明 

### 常量

- 常量是一个简单值的标识符，在程序运行时，不会被修改的量。

- 常量中的数据类型只可以是布尔型、数字型（整数型、浮点型和复数）和字符串型。

```go
const identifier [type] = value
```

- 显式类型定义： `const b string = "abc"`
- 隐式类型定义： `const b = "abc"`

### iota

-  iota，特殊常量，可以认为是一个可以被编译器修改的常量。 
-  在每一个const关键字出现时，被重置为0，然后再下一个const出现之前，每出现一次iota，其所代表的数字会自动增加1 .

```go
const (
    a = iota
    b = iota
    c = iota
)
```

### 运算符

#### 算术运算符

| +    | 相加 | A + B 输出结果 30  |
| ---- | ---- | ------------------ |
| -    | 相减 | A - B 输出结果 -10 |
| *    | 相乘 | A * B 输出结果 200 |
| /    | 相除 | B / A 输出结果 2   |
| %    | 求余 | B % A 输出结果 0   |
| ++   | 自增 | A++ 输出结果 11    |
| --   | 自减 | A-- 输出结果 9     |

#### 关系运算符

| ==   | 检查两个值是否相等，如果相等返回 True 否则返回 False。       | (A == B) 为 False |
| ---- | ------------------------------------------------------------ | ----------------- |
| !=   | 检查两个值是否不相等，如果不相等返回 True 否则返回 False。   | (A != B) 为 True  |
| >    | 检查左边值是否大于右边值，如果是返回 True 否则返回 False。   | (A > B) 为 False  |
| <    | 检查左边值是否小于右边值，如果是返回 True 否则返回 False。   | (A < B) 为 True   |
| >=   | 检查左边值是否大于等于右边值，如果是返回 True 否则返回 False。 | (A >= B) 为 False |
| <=   | 检查左边值是否小于等于右边值，如果是返回 True 否则返回 False。 | (A <= B) 为 True  |

#### 逻辑运算符

| &&   | 逻辑 AND 运算符。 如果两边的操作数都是 True，则条件 True，否则为 False。 | (A && B) 为 False  |
| ---- | ------------------------------------------------------------ | ------------------ |
| \|\| | 逻辑 OR 运算符。 如果两边的操作数有一个 True，则条件 True，否则为 False。 | (A \|\| B) 为 True |
| !    | 逻辑 NOT 运算符。 如果条件为 True，则逻辑 NOT 条件 False，否则为 True。 | !(A && B) 为 True  |

#### 位运算符

| 运算符 | 描述                                                         | 实例                                   |
| :----- | :----------------------------------------------------------- | :------------------------------------- |
| &      | 按位与运算符"&"是双目运算符。 其功能是参与运算的两数各对应的二进位相与。 | (A & B) 结果为 12, 二进制为 0000 1100  |
| \|     | 按位或运算符"\|"是双目运算符。 其功能是参与运算的两数各对应的二进位相或 | (A \| B) 结果为 61, 二进制为 0011 1101 |
| ^      | 按位异或运算符"^"是双目运算符。 其功能是参与运算的两数各对应的二进位相异或，当两对应的二进位相异时，结果为1。 | (A ^ B) 结果为 49, 二进制为 0011 0001  |
| <<     | 左移运算符"<<"是双目运算符。左移n位就是乘以2的n次方。 其功能把"<<"左边的运算数的各二进位全部左移若干位，由"<<"右边的数指定移动的位数，高位丢弃，低位补0。 | A << 2 结果为 240 ，二进制为 1111 0000 |
| >>     | 右移运算符">>"是双目运算符。右移n位就是除以2的n次方。 其功能是把">>"左边的运算数的各二进位全部右移若干位，">>"右边的数指定移动的位数。 | A >> 2 结果为 15 ，二进制为 0000 1111  |

> & ：与运算，全真为真； 
>
> | ：或运算，全假才假； 
>
> ^ :  异或运算，相同为假，不同为真 

| p    | q    | p & q | p \| q | p ^ q |
| :--- | :--- | :---- | :----- | :---- |
| 0    | 0    | 0     | 0      | 0     |
| 0    | 1    | 0     | 1      | 1     |
| 1    | 1    | 1     | 1      | 0     |
| 1    | 0    | 0     | 1      | 1     |

#### 赋值运算符

| =    | 简单的赋值运算符，将一个表达式的值赋给一个左值 | C = A + B 将 A + B 表达式结果赋值给 C |
| ---- | ---------------------------------------------- | ------------------------------------- |
| +=   | 相加后再赋值                                   | C += A 等于 C = C + A                 |
| -=   | 相减后再赋值                                   | C -= A 等于 C = C - A                 |
| *=   | 相乘后再赋值                                   | C *= A 等于 C = C * A                 |
| /=   | 相除后再赋值                                   | C /= A 等于 C = C / A                 |
| %=   | 求余后再赋值                                   | C %= A 等于 C = C % A                 |
| <<=  | 左移后赋值                                     | C <<= 2 等于 C = C << 2               |
| >>=  | 右移后赋值                                     | C >>= 2 等于 C = C >> 2               |
| &=   | 按位与后赋值                                   | C &= 2 等于 C = C & 2                 |
| ^=   | 按位异或后赋值                                 | C ^= 2 等于 C = C ^ 2                 |
| \|=  | 按位或后赋值                                   | C \|= 2 等于 C = C \| 2               |

#### 其它运算符

| 运算符 | 描述             | 实例                       |
| :----- | :--------------- | :------------------------- |
| &      | 返回变量存储地址 | &a; 将给出变量的实际地址。 |
| *      | 指针变量。       | *a; 是一个指针变量         |

### 条件语句

```go
if 布尔表达式 {
   /* 在布尔表达式为 true 时执行 */
} else {
  /* 在布尔表达式为 false 时执行 */
}
```

- 判断逻辑可不用 ```()``` 包起来
- 其它与其它语言一致

### 循环语句

 Go语言的For循环有3种形式，只有其中的一种使用分号。 

和 C 语言的 for 一样：

```go
for init; condition; post { }
```

和 C 的 while 一样：

```go
for condition { }
```

和 C 的 for(;;) 一样：

```go
for { }
```

- init： 一般为赋值表达式，给控制变量赋初值；
- condition： 关系表达式或逻辑表达式，循环控制条件；
- post： 一般为赋值表达式，给控制变量增量或减量。

```go
 var b int = 15
   var a int

   numbers := [6]int{1, 2, 3, 5} 

   /* for 循环 */
   for a := 0; a < 10; a++ {
      fmt.Printf("a 的值为: %d\n", a)
   }

   for a < b {
      a++
      fmt.Printf("a 的值为: %d\n", a)
      }

   for i,x:= range numbers {
      fmt.Printf("第 %d 位 x 的值 = %d\n", i,x)
   }   
```

### Go函数

```go
func function_name( [parameter list] ) [return_types]{
   函数体
}
```

- func：函数由 func 开始声明
- function_name：函数名称，函数名和参数列表一起构成了函数签名。
- parameter list]：参数列表，参数就像一个占位符，当函数被调用时，你可以将值传递给参数，这个值被称为实际参数。参数列表指定的是参数类型、顺序及参数个数。参数是可选的，也就是说函数也可以不包含参数。
- return_types：返回类型，函数返回一列值。return_types 是该列值的数据类型。有些功能不需要返回值，这种情况下 return_types 不是必须的。
  - 返回值可以有多个
  - 函数输入可以有多个
- 函数体：函数定义的代码集合。

```go
/* 函数返回两个数的最大值 */
func max(num1, num2 int) int{
   /* 声明局部变量 */
   var result int

   if (num1 > num2) {
      result = num1
   } else {
      result = num2
   }
   return result 
}
```

#### 函数参数

| 传递类型 | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| 值传递   | 值传递是指在调用函数时将实际参数复制一份传递到函数中，这样在函数中如果对参数进行修改，将不会影响到实际参数。 |
| 引用传递 | 引用传递是指在调用函数时将实际参数的地址传递到函数中，那么在函数中对参数所进行的修改，将影响到实际参数。 |

```go
/* 定义交换值函数*/
func swap(x *int, y *int) {
   var temp int
   temp = *x    /* 保持 x 地址上的值 */
   *x = *y      /* 将 y 值赋给 x */
   *y = temp    /* 将 temp 值赋给 y */
}
```

### 变量作用域 

Go 语言中变量可以在三个地方声明：

- 函数内定义的变量称为局部变量
- 函数外定义的变量称为全局变量
- 函数定义中的变量称为形式参数

 不同类型的局部和全局变量默认值为 

| 数据类型 | 初始化默认值 |
| :------- | :----------- |
| int      | 0            |
| float32  | 0            |
| pointer  | nil          |

### 数组

#### 声明数组

Go 语言数组声明需要指定元素类型及元素个数，语法格式如下：

```go
var variable_name [SIZE] variable_type
```

以上为一维数组的定义方式。数组长度必须是整数且大于 0。例如以下定义了数组 balance 长度为 10，类型为 float32：

```go
var balance [10] float32
```

#### 初始化数组

以下演示了数组初始化：

```go
var balance = [5]float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```

初始化数组中 {} 中的元素个数不能大于 [] 中的数字。

如果忽略 [] 中的数字不设置数组大小，Go 语言会根据元素的个数来设置数组的大小：

```go
 var balance = []float32{1000.0, 2.0, 3.4, 7.0, 50.0}
```

该实例与上面的实例是一样的，虽然没有设置数组的大小。

```go
 balance[4] = 50.0
```

#### 访问数组元素

数组元素可以通过索引（位置）来读取。格式为数组名后加中括号，中括号中为索引的值。例如：

```go
float32 salary = balance[9]
```

### 指针

变量是一种使用方便的占位符，用于引用计算机内存地址。

Go 语言的取地址符是 &，放到一个变量前使用就会返回相应变量的内存地址。

#### 什么是指针

一个指针变量可以指向任何一个值的内存地址。

```go
 var var_name *var-type 
```

指针使用流程：

- 定义指针变量。
- 为指针变量赋值。
- 访问指针变量中指向地址的值。

#### Go 空指针

当一个指针被定义后没有分配到任何变量时，它的值为 nil。

nil 指针也称为空指针。

nil在概念上和其它语言的null、None、nil、NULL一样，都指代零值或空值。

一个指针变量通常缩写为 ptr。

### 结构体

 结构体是由一系列具有相同类型或不同类型的数据构成的数据集合。 

#### 定义结构体

结构体定义需要使用 type 和 struct 语句。struct 语句定义一个新的数据类型，结构体中有一个或多个成员。type 语句设定了结构体的名称。结构体的格式如下：

```go
type struct_variable_type struct {
   member definition
   member definition
   ...
   member definition
}
```

一旦定义了结构体类型，它就能用于变量的声明，语法格式如下：

```go
variable_name := structure_variable_type {value1, value2...valuen}
```

#### 结构体指针

以上定义的指针变量可以存储结构体变量的地址。查看结构体变量地址，可以将 & 符号放置于结构体变量前：

```
struct_pointer = &Book1
```

使用结构体指针访问结构体成员，使用 "." 操作符：

```
struct_pointer.title
```

### 切片

 Go 数组的长度不可改变，在特定场景中这样的集合就不太适用，Go中提供了一种灵活，功能强悍的内置类型切片("动态数组"),与数组相比切片的长度是不固定的，可以追加元素，在追加时可能使切片的容量增大。 

#### 定义切片

你可以声明一个未指定大小的数组来定义切片：

```
var identifier []type
```

切片不需要说明长度。

或使用make()函数来创建切片:

```
var slice1 []type = make([]type, len)
```

也可以简写为

```
slice1 := make([]type, len)
```

也可以指定容量，其中capacity为可选参数。

```
make([]T, length, capacity)
```

#### len() 和 cap() 函数

切片是可索引的，并且可以由 len() 方法获取长度。

切片提供了计算容量的方法 cap() 可以测量切片最长可以达到多少。

#### 空(nil)切片

一个切片在未初始化之前默认为 nil，长度为 0

#### append() 和 copy() 函数

增加切片的容量，创建一个新的更大的切片并把原分片的内容都拷贝过来。

下面的代码描述了从拷贝切片的 copy 方法和向切片追加新元素的 append 方法。

```go
func main() {
   var numbers []int
   printSlice(numbers)

   /* 允许追加空切片 */
   numbers = append(numbers, 0)
   printSlice(numbers)

   /* 向切片添加一个元素 */
   numbers = append(numbers, 1)
   printSlice(numbers)

   /* 同时添加多个元素 */
   numbers = append(numbers, 2,3,4)
   printSlice(numbers)

   /* 创建切片 numbers1 是之前切片的两倍容量*/
   numbers1 := make([]int, len(numbers), (cap(numbers))*2)

   /* 拷贝 numbers 的内容到 numbers1 */
   copy(numbers1,numbers)
   printSlice(numbers1)   
}
```

#### 切片截取

可以通过设置下限及上限来设置截取切片

```go
  /* 打印原始切片 */
   fmt.Println("numbers ==", numbers)

   /* 打印子切片从索引1(包含) 到索引4(不包含)*/
   fmt.Println("numbers[1:4] ==", numbers[1:4])

   /* 默认下限为 0*/
   fmt.Println("numbers[:3] ==", numbers[:3])

   /* 默认上限为 len(s)*/
   fmt.Println("numbers[4:] ==", numbers[4:])

   numbers1 := make([]int,0,5)
   printSlice(numbers1)

   /* 打印子切片从索引  0(包含) 到索引 2(不包含) */
   number2 := numbers[:2]
   printSlice(number2)

   /* 打印子切片从索引 2(包含) 到索引 5(不包含) */
   number3 := numbers[2:5]
   printSlice(number3)
```

### 语言范围

 range 关键字用于for循环中迭代数组(array)、切片(slice)、通道(channel)或集合(map)的元素。在数组和切片中它返回元素的索引值，在集合中返回 key-value 对的 key 值。 

| Range表达式             | 第一个值   | 第二个值[可选的] |
| ----------------------- | ---------- | ---------------- |
| Array 或者 slice a [n]E | 索引 i int | a[i] E           |
| String s string type    | 索引 i int | rune int         |
| map m map[K]V           | 键 k K     | 值 m[k] V        |
| channel c chan E        | 元素 e E   | none             |

```go
//这是我们使用range去求一个slice的和。使用数组跟这个很类似
    nums := []int{2, 3, 4}
    sum := 0
    for _, num := range nums {
        sum += num
    }
    fmt.Println("sum:", sum)
    //在数组上使用range将传入index和值两个变量。上面那个例子我们不需要使用该元素的序号，所以我们使用空白符"_"省略了。有时侯我们确实需要知道它的索引。
    for i, num := range nums {
        if num == 3 {
            fmt.Println("index:", i)
        }
    }
    //range也可以用在map的键值对上。
    kvs := map[string]string{"a": "apple", "b": "banana"}
    for k, v := range kvs {
        fmt.Printf("%s -> %s\n", k, v)
    }
    //range也可以用来枚举Unicode字符串。第一个参数是字符的索引，第二个是字符（Unicode的值）本身。
    for i, c := range "go" {
        fmt.Println(i, c)
    }
```

### Map(集合)

#### 定义 Map

可以使用内建函数 make 也可以使用 map 关键字来定义 Map:

```
/* 声明变量，默认 map 是 nil */
var map_variable map[key_data_type]value_data_type

/* 使用 make 函数 */
map_variable = make(map[key_data_type]value_data_type)
```

```go
 /* 创建集合 */
   countryCapitalMap = make(map[string]string)
   
   /* map 插入 key-value 对，各个国家对应的首都 */
   countryCapitalMap["France"] = "Paris"
   countryCapitalMap["Italy"] = "Rome"
   countryCapitalMap["Japan"] = "Tokyo"
   countryCapitalMap["India"] = "New Delhi"
   
   /* 使用 key 输出 map 值 */
   for country := range countryCapitalMap {
      fmt.Println("Capital of",country,"is",countryCapitalMap[country])
   }
   
   /* 查看元素在集合中是否存在 */
   captial, ok := countryCapitalMap["United States"]
```

#### delete() 函数

delete() 函数用于删除集合的元素, 参数为 map 和其对应的 key。

```go
 /* 删除元素 */
   delete(countryCapitalMap,"France");
```

### 类型转换

类型转换用于将一种数据类型的变量转换为另外一种类型的变量。Go 语言类型转换基本格式如下：

```
type_name(expression)
```

```go
 var sum int = 17
 var count int = 5
 var mean float32
 mean = float32(sum)/float32(count)
```

### 接口

 把所有的具有共性的方法定义在一起，任何其他类型只要实现了这些方法就是实现了这个接口 

```go
/* 定义接口 */
type interface_name interface {
   method_name1 [return_type]
   method_name2 [return_type]
   method_name3 [return_type]
   ...
   method_namen [return_type]
}

/* 定义结构体 */
type struct_name struct {
   /* variables */
}

/* 实现接口方法 */
func (struct_name_variable struct_name) method_name1() [return_type] {
   /* 方法实现 */
}
...
func (struct_name_variable struct_name) method_namen() [return_type] {
   /* 方法实现*/
}
```

### 错误处理

error类型是一个接口类型，这是它的定义：

```
type error interface {
    Error() string
}
```

### 语言反射

1、大量使用反射的代码通常会变得难以理解

2、反射的性能低下，基于反射的代码会比正常的代码运行速度慢一到两个数量级

#### ValueOf

ValueOf返回一个初始化为interface接口保管的具体值得Value，ValueOf(nil)返回Value零值

#### Typeof

Typeof返回接口中保存的值得类型，Typeof(nil)会返回nil

### 并发

 Go语言中的并发程序主要是通过基于CSP（communicating sequential processes）的goroutine和channel来实现，当然也支持使用传统的多线程共享内存的并发方式 

#### goroutine

Go语言中使用goroutine非常简单，只需要在函数或者方法前面加上go关键字就可以创建一个goroutine，从而让该函数或者方法在新的goroutine中执行

匿名函数同样也支持使用go关键字来创建goroutine去执行

一个goroutine必定对应一个函数或者方法，可以创建多个goroutine去执行相同的函数或者方法

#### 动态栈

操作系统的线程一般都有固定的栈内存（通常为2MB），而 Go 语言中的 goroutine 非常轻量级，一个 goroutine 的初始栈空间很小（一般为2KB），所以在 Go 语言中一次创建数万个 goroutine 也是可能的。并且 goroutine 的栈不是固定的，可以根据需要动态地增大或缩小， Go 的 runtime 会自动为 goroutine 分配合适的栈空间。

#### goroutine调度

在经过数个版本迭代之后，目前Go语言的调度器采用的是GPM调度模型

- G: 表示goroutine，存储了goroutine的执行stack信息、goroutine状态以及goroutine的任务函数等；另外G对象是可以重用的。
- P: 表示逻辑processor，P的数量决定了系统内最大可并行的G的数量（前提：系统的物理cpu核数>=P的数量）；P的最大作用还是其拥有的各种G对象队列、链表、一些cache和状态。
- M: M代表着真正的执行计算资源。在绑定有效的p后，进入schedule循环；而schedule循环的机制大致是从各种队列、p的本地队列中获取G，切换到G的执行栈上并执行G的函数，调用goexit做清理工作并回到m，如此反复。M并不保留G状态，这是G可以跨M调度的基础。

#### GOMAXPROCS

Go运行时，调度器使用GOMAXPROCS的参数来决定需要使用多少个OS线程来同时执行Go代码。默认值是当前计算机的CPU核心数。例如在一个8核处理器的电脑上，GOMAXPROCS默认值为8。Go语言中可以使用runtime.GOMAXPROCS()函数设置当前程序并发时占用的CPU核心数

#### channel

单纯地将函数并发执行是没有意义的，函数与函数间需要交换数据才能体现并发执行函数的意义

虽然可以使用共享内存进行数据交换，但是共享内存在不同的 goroutine 中容易发生竞态问题。为了保证数据交换的正确性，很多并发模型中必须使用互斥锁对内存进行加锁，这种做法势必造成性能问题

Go语言采用的并发模型是CSP（Communicating Sequential Processes），提倡通过通信共享内存，而不是通过共享内存而实现通信

Go 语言中的通道（channel）是一种特殊的类型。通道像一个传送带或者队列，总是遵循先入先出的规则，保证收发数据的顺序。每一个通道都是一个具体类型的导管，也就是声明channel的时候需要为其指定元素类型。

