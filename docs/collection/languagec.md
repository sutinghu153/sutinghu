# C 

关于C语言的重点难点学习笔记！

## C 指针问题

### 什么是指针？

程序中数据被保存在内存中，每个内存都具有专属的地址，**这个地址就是指针**，为了保存一个数据在内存中的地址，就需要专门用来保存内存地址的变量，**这种变量被称为指针变量**。

### 为什么需要指针？

1. 指针是内存地址的抽象概念，内存地址本身计算机不可避免
2. 指针可以用来传递数据源，以节省空间和时间
3. 可以使得不同区域的代码能够轻易的共享内存数据
4. C语言中链表、二叉树等结构体需要用指针来构建
5. 某些必须使用到指针的操作，如申请的堆内存

### 指针类型有哪些？

c语言的指针类型跟普通类型一样，包括int、float、double、数组等

只是定义的时候需要加 * 号。

### 如何理解C语言中的* ？

>  [指针篇（一篇让你完全搞懂指针）](https://zhuanlan.zhihu.com/p/101934152) 



- int p 定义的普通的int类型的整型变量
  - p中存放的是某个具体的数值
- int *p定义的一个int * 类型的整型指针变量，p指向一个普通整型的地址
  - p中存放的是某个地址
  - 该地址指向的内存存放的是某个具体的数值
- int **p ，可以认为是指向一个指针变量的地址，该指针变量指向某个地址
  - p中存放的是指针变量的地址
  - 指针变量的地址映射的内存存放的是某个地址
  - 某个地址中存放的具体的数值
- int ***p 指向某个指针变量地址的变量的地址
  - p中存放的是存放指针变量的地址的指针的地址

## C中&符号的作用

1. 指针赋值

   1. 当使用&时，将a的地址赋给了指针变量b

   ```c
   #include<stdio.h>
   int main()
   {
       int a = 2;
       int*b;//定义一个整形指针
       b = &a;//给指针赋值，使指针指向a的地址
       printf("%d", b);//输出的是a的地址
       printf("\n");//换行符
       printf("%d", *b);//*的作用是解引用，取出指针指向地址的内容，达到简
       return 0;
   }
   ```

2. 二目运算符中的按位与

   1. 单目是只需要一个操作数的意思 比如  ```a++ a--   *a  &a```
   2. 双目是需要两个操作数的意思   比如   ```a+b  a-b a*b  a/b  a%b```
   3. 三目是需要三个操作数的意思   比如    ```a=c>b?c:b```

3. 当出现&&时用于逻辑与

## C 中函数传递的几种方式

-  值传递
  1. 变量的值传递给函数的形式参数，实际就是用变量的值来新生成一个形式参数
  2.   形参是实参的拷贝，改变形参的值并不会影响外部实参的值。从被调用函数的角度来说，值传递是单向的（实参->形参），参数的值只能传入，不能传出。
  3. 当函数内部需要修改参数，并且不希望这个改变影响调用者时，采用值传递。
  4. 函数里对形参的改变不会影响到函数外的变量的值
- 地址传递
  1. 把变量的地址赋给函数里形式参数的指针，使指针指向真实的变量的地址
  2. 对指针所指地址的内容的改变能反映到函数外，能改变函数外的变量的值
  3.  形参为指向实参地址的指针，当对形参的指向操作时，就相当于对实参本身进行的操作 
- 引用传递
  1. 通过指针来实现的，能达到使用的效果如传址，可是使用方式如传值。 
  2.   形参相当于是实参的“别名”，对形参的操作其实就是对实参的操作。
  3. 在引用传递过程中，被调函数的形式参数虽然也作为局部变量在栈中开辟了内存空间，但是这时存放的是由主调函数放进来的实参变量的地址。
  4. 被调函数对形参的任何操作都被处理成间接寻址，即通过栈中存放的地址访问主调函数中的实参变量。
  5. 被调函数对形参做的任何操作都影响了主调函数中的实参变量。 

> 如果传值的话，会生成新的对象，花费时间和空间，而在退出函数的时候，又会销毁该对象，花费时间和空间。
>
> 因而如果int，char等固有类型，而是你自己定义的类或结构等，都建议传指针或引用，因为他们不会创建新的对象。 

```c
#include<stdio.h>
void change(int*a, int&b, int c)
{
      c=*a;
      b=30;
      *a=20;
}
int main ( )
{
      int a=10, b=20, c=30;
      change(&a,b,c);
      printf(“%d,%d,%d,”,a,b,c)；
      return 0；
 }
```

```shell
结果：20  30  30
```

>  解析：
>
> 1，指针传参 -> 将变量的地址直接传入函数，函数中可以对其值进行修改。
>
> 2，引用传参 -> 将变量的引用传入函数，效果和指针相同，同样函数中可以对其值进行修改。
>
> 3，值传参  -> 在传参过程中，首先将c的值复制给函数c变量，然后在函数中修改的即是函数的c变量，然后函数返回时，系统自动释放变量c。而对main函数的c没有影响。 

## C语言中的sizeof操作符

>  [C/C++ | sizeof](https://blog.csdn.net/weixin_47187147/article/details/123470258) 

### sizeof的特征

- sizeof是C语言的一种单目操作符，如C语言的其他操作符++、--等
- sizeof不是函数
- 该操作符以字节形式给出了操作数的存储大小
- 操作数可以是一个表达式或括号内的类型
  - sizeof6
  - sizeof(int)
- 操作数的存储大小由操作数的类型决定

### sizeof 的使用方法

#### 用于数据类型

```c
sizeof使用形式: sizeof(type)

数据类型必须用括号括住: sizeof(int)
```

#### 用于变量

```c
sizeof使用形式: sizeof(var_name) 或 sizeof　var_name　
```

#### 用于数组

```c
char a[5];

sizeof(a) = 5;
```

 当操作数具有数组类型时，其结果是数组的总字节数。 

### sizeof的结果

-  sizeof操作符的结果类型是size_t
-  它在头文件中定义为: typedef unsigned int size_t; 
-   该类型保证能容纳实现所建立的最大对象的字节大小. 

```c
sizeof(char)           = 1;
sizeof(unsigned char)  = 1;
sizeof(signed char)    = 1;

sizeof(int)            = 4;
sizeof(unsigned int)   = 4;
sizeof(short int)      = 2;
sizeof(unsigned short) = 2;
sizeof(long int)       = 4;
sizeof(unsigned long)  = 4;
sizeof(float)          = 4;
sizeof(double)         = 8;
sizeof(long double)    = 12;
```

### sizeof的用途


　　**1、主要用途是与存储分配和I/O系统那样的例程进行通信。**

```c
void　*malloc(size_t　size);
size_t　fread(void　*ptr, size_t　size, size_t　nmemb, FILE　*　stream);
```


　　**2、另一个的主要用途是计算数组中元素的个数。**

```c
void　*memset(void　*s, int　c, sizeof(s));
```