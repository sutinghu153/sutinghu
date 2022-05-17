# Makefile

## 程序执行的一般过程

**编译**：C 、C++ 源文件编译成中间代码文件——**.c .cpp**文件

**链接**：将中间文件合成执行文件——**.o**文件

**打包**：链接器只会查询方法、函数对应的目标文件，并不受源文件的影响。当源文件过多时，编译生成的中间目标文件太多，为了方便管理，需要给中间文件打包——**.a**文件

## about Makefile

**make** 命令执行时，需要一个 **Makefile** 文件，以告诉 **make** 命令需要怎么样的去编译和链接程序。Makefile可以解决以下问题：

- 如果这个工程没有编译过，那么我们的所有 C 文件都要编译并被链接。
- 如果这个工程的某几个 C 文件被修改，那么我们只编译被修改的 C 文件，并链接目标程。
- 如果这个工程的头文件被改变了，那么我们需要编译引用了这几个头文件的 C 文件，并链接目标程序。

## Makefile的规则

```makefile
target ... : prerequisites ...
command
```

- target，目标文件，可以是objectfile 也可以是执行文件
- prerequisites，依赖文件，即生成目标文件所需要的所有的文件或目标
- command，make需要执行的命令，任意的shell命令

**target** 这一个或多个的目标文件依赖于**prerequisites** 中的文件，其生成规则定义在 **command** 中

```makefile
run: main.o hello.o test.o
    gcc -o run main.o hello.o test.o
.PHONY: clean
clean:
    -rm run *.o  
```



## Makefile的工作机制

- make 会在**当前目录下**找名字叫“Makefile”或“makefile”的文件。
- 如果找到，它会找文件中的**第一个目标文件**（target），并把这个文件作为最终的目标文件。
- 如果 目标文件不存在，或是 目标文件 所依赖的后面的 .o 文件的文件修改时间要比 目标文件新，那么，他就会执行后面所定义的命令来生成目标文件。
- 如果 目标文件所依赖的.o 文件也存在，那么 make 会在当前文件中找目标为.o 文件的依赖性，如果找到则再根据那一个规则生成.o 文件。（这有点像一个堆栈的过程）
- 当然，你的 C 文件和 H 文件是存在的啦，于是 make 会生成 .o 文件，然后再用 .o 文件生成执行文件。

>   以上过程层层依赖，直到最终编译出第一个目标文件
>
> 规则的执行代码行要以   Tab   键作为开头
>
> 整个系统文件的Makefile的工作方式如下
>
> 1、读入所有的 Makefile。
>
> 2、读入被 include 的其它 Makefile。
>
> 3、初始化文件中的变量。
>
> 4、推导隐晦规则，并分析所有规则。
>
> 5、为所有的目标文件创建依赖关系链。
>
> 6、根据依赖关系，决定哪些目标要重新生成。
>
> 7、执行生成命令。

## Makefile中的变量

```$(变量名)``` 采用该方式来表示Makefile文件中的所有字符串变量。

## 引用其它的Makefile文件

```include <filename>``` 用来包含其它Makefile文件

- 优先在当前目录搜索
- 其次如果使用**make -I** 路径 或者 **make --include-dir** 路径，会在参数指定的位置搜索
- 最后默认路径**（/usr/local/bin或者/usr/include）**中搜索

```makefile
include Makefile.hello
run: main.o hello.o test.o
    gcc -o run main.o hello.o test.o
.PHONY: clean
clean:
    -rm run *.o  
```

 如果打算无法找到Makefile.hello文件也要进行执行下去，只需在include前加个减号 

```makefile
-include Makefile.hello
```

## 环境变量 MAKEFILES

为了方便管理环境变量及当前的目录，即方便```include```命令的使用，可以使用环境变量。类似于全局变量、宏。

- 需要在当前环境中进行定义

- 所有的Makefile都将受影响

  

## Makefile中的运算符

通配符用来处理一系列类似或相似的文件。

| 符号 |      含义      |                     例子                      | 释义                                                         |
| :--: | :------------: | :-------------------------------------------: | ------------------------------------------------------------ |
|  *   | 代表类似的文件 |                      *.c                      | 代表以.c结尾的文件                                           |
|  ~   |  指向某个用户  |                    ~/test                     | 表示当前用户的$HOME 目录下的 test 目录                       |
|  ~   |  指向某个用户  |                ~sutinghu/test                 | 表示sutinghu用户空间下的test目录                             |
| $()  |     占位符     |              name = $(sutinghu)               | 实际使用过程中，将i替换为sutinghu                            |
|  :=  |   限定赋值符   |              name := $(sutinghu)              | 实际过程中，name所取变量为sutinghu，无论后面是否有其它赋值操作 |
|  =   |     赋值符     |                name = sutinghu                | 将name的值赋值为sutinghu                                     |
|  ?=  |   判断赋值符   |                name?=sutinghu                 | 如果name前面没有被赋值，那么该变量就是sutinghu，如果前面已经被赋值过，就使用前面的值 |
|  +=  |    变量追加    | objects = main.o inpiut.o，objects += calcu.o | 一开始变量 objects 的值为“main.o input.o”，后面我们给他追加了一个“calcu.o”，因此变量 objects 变成了“main.o input.o calcu.o” |

```makefile
objects = $(main.o hello.o test.o)
run: 
    gcc -o run main.o hello.o test.o
.PHONY: clean
clean:
    -rm run *.o  
```

## Makefile中的文件搜索

- VPATH
  - 如果没有指明这个变量，make 只会在当前的目录中去找寻依赖文件和目标文件。
  - 如果定义了这个变量，那么，make就会在当当前目录找不到的情况下，到所指定的目录中去找寻文件了

```makefile
VPATH = src:../headers #make 会按照这个顺序进行搜索
```

- vpath
  - vpath   ***pattern   directories*** 为符合模式 ***pattern*** 的文件指定搜索目录***directories***。
  - vpath ***pattern***
    清除符合模式 ***pattern*** 的文件的搜索目录。
  - vpath
    清除所有已被设置好了的文件搜索目录。

1. vapth 使用方法中的 ***pattern*** 需要包含 ***“%”*** 字符。
2.  ***“%”*** 的意思是匹配零或若干字符，例如， ***“%.h”*** 表示所有以 ***“.h”*** 结尾的文件。
3.  ***pattern*** 指定了要搜索的文件集.
4.  ***directories*** 则指定了 ***pattern*** 的文件集的搜索的目录。

```makefile
#  make 在“../headers”目录下搜索所有以“.h”结尾的文件。
vpath %.h ../headers
```

