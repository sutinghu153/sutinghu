# Shell不完全指南

Linux Shell 是用户和 Linux 内核之间的接口程序，为用户提供使用操作系统的接口。当 Shell 向 Linux 传递命令时，内核会做出相应的反应。

- Shell 是一个用户程序，一个为用户与系统交互提供的环境
- 从标准版输入设备读入命令的语言解释集
- 拥有内建 Shell 命令集
- 可以被系统中其它的应用程序调用
- 登录或打开控制台时 shell 已经开始执行
- shell 不是内核的一部分，但是它使用系统内核执行程序，创建文件

## 关于Shell脚本

shell 程序在 Linux 机器启动时，它执行的``` /etc/rc.d ```目录中的Shell脚本来加载系统配置和运行服务。因此编写Shell脚本对程序有以下帮助

1. 简单高效，可以将冗长的命令合并为一条
2. 可以进行高效的可持续化集成，进行自动化工具的部署和应用程序开发
3. 系统管理的任务自动化
4. 监控 Linux 系统

## Shell连接用户和内核

Shell是一个强大的应用程序，它通过封装好的命令调用内核的API，以此实现用户和内核的交互。

从某种程序上讲，Shell 是一个应用程序，它连接了用户和 Linux 内核，让用户能够更加高效、安全、低成本地使用 Linux 内核，这就是 Shell 的本质。

<img :src="$withBase('/imags/1653012670297.png')" alt="1653012670297">

Shell 本身并不是内核的一部分，它只是站在内核的基础上编写的一个应用程序，它和 QQ、迅雷、Firefox 等其它软件没有什么区别。然而 Shell 也有着它的特殊性，就是开机立马启动，并呈现在用户面前；用户通过 Shell 来使用 Linux，不启动 Shell 的话，用户就没办法使用 Linux。 

可以将Shell理解为windows系统下的可视化界面，Linux系统下，通过shell实现用户和系统的交互。

## Hello Shell

### 输出

```shell
#!/bin/bash 
echo 'hello world!'
```

- echo 输出，相当于printf
- ```#!``` 告诉系统找个脚本所使用的解释器
- 文件拓展名为 ```.sh``` 或不需要

### 执行

#### 方法一

 直接运行解释器，`hello.sh` 作为 Shell 解释器的参数 ， 此时 Shell 脚本就不需要指定解释器信息，第一行可以去掉 

```shell
# 方法1 
sh hello.sh  
```

#### 方法二

 作为可执行程序运行，Shell 脚本第一行一定要指定解释器 

```shell
# 方法2 
chmod +x hello.sh #使shell脚本具有执行权限
./hello.sh
```

## 定义一个变量

变量是程序运行的基础，定义一个变量能够实现数据的逻辑流转和交互。

### 如何定义一个变量

```shell
variable=value
variable='value'
variable="value"
```

- variable 是变量名
- value是变量值
  - 当value没有空格等特殊符号时可以不用加引号
  - 当含有特殊字符时必须加引号
    - 单引号：引号里面是什么就输出什么
    - 双引号：引号里面可以写变量或命令
- 变量的定义不用处理数据类型

### 定义变量要遵守的规则

1. 变量名只能由数字、字母和下划线组成
2. 不能以数字开头
3. 不能有特殊符号
4. 不能用Shell里的关键字（通过help命令可以查看保留关键字）

### 如何使用变量

当按上述方式定义好变量后，如何引用变量？

- 使用变量的时候，需要用``` $ ``` + ```变量名``` 

- 变量等号两侧不能有空格等其它符号

  - ```shell
    author="sutinghu" #正确
    author ="sutinghu" #错误
    ```

- 为了提高可读性和规范，最好在引用的变量名后加 ```{}```

```shell
author="sutinghu"
echo $author
echo ${author}
```

### 如何修改变量

当定义好一个变量后，如果想修改变量的值，在使用该变量的地方，重新定义，变量会自动使用最新定义的值

### 如何用Shell执行命令行

Shell如果想执行命令行，需要按以下两种方式进行变量命名

```shell
variable=`command`
variable=$(command)
```

```shell
author='sutinghu' #定义普通变量
echo ${author}
commands=$(ls)#定义命令行
echo ${commands}
```

### 如何定义一个常量

如果向定义一个不会被改变值的常量，以进行全局的引用，可以使用 ```readonly``` 关键字修饰

```shell
author="sutinghu"
readonly author
```

### 变量的作用范围

Shell脚本中，可以定义多种变量类型，三种变量类型包括以下几个

- 局部变量

  - 在 ```.sh``` 脚本中定义的变量
  - 只能用于当前shell脚本，其它shell脚本无法访问

- 环境变量

  - 环境变量是Linux全局的变量

  - 所有的shell程序都可以访问它

  - 设置环境变量

    -  在`/etc/profile`文件中添加环境变量，对所有用户永久生效 

      ```shell
      export CLASSPATH=./JAVA_HOME/lib;$JAVA_HOME/jre/lib
      ```

    -  在`~/.bash_profile`文件中添加环境变量，只对当前用户永久有效 

      ```shell
      export CLASSPATH=./JAVA_HOME/lib;$JAVA_HOME/jre/lib
      ```

    - 环境变量设置完后，需要立即重启修改文件

- shell变量

  -  shell变量是由shell程序设置的特殊变量
  - shell变量中有一部分是环境变量，有一部分是局部变量 

### 特殊变量

<img :src="$withBase('/imags/1653015854441.png')" alt="1653015854441">

举个例子，如下

```shell
echo "File Name: $0"
echo "First Parameter : $1"
echo "First Parameter : $2"
echo "Quoted Values: $@"
echo "Quoted Values: $*"
echo "Total Number of Parameters : $#"
```

执行结果

```shell
File Name: test1.sh
First Parameter : 
First Parameter : 
Quoted Values: 
Quoted Values: 
Total Number of Parameters : 0
```

### 转义字符及执行

Shell中的转义字符包括以下几个

<img :src="$withBase('/imags/1653016354309.png')" alt="1653016354309">

转移字符的使用，需要根据以下规则进行

- 执行转义 ``` echo -e ```
- 禁止转义 ```echo -E``` 默认也 是不转义
- 禁止插入换行符 ```echo -n``` 

```shell
a=10
echo -e "Value of a is $a \n"
```

如以上命令的执行结果有两种情况

```shell
Value of a is 10 # echo -e 下的执行结果
Value of a is 10\n #echo 下的执行结果
```

### 反引号````\``` 的作用

与 ```$()```的作用类似，只是反引号可以用于系统命令

### 动态的进行变量替换

<img :src="$withBase('/imags/1653017128874.png')" alt="1653017128874">

## 通过Shell进行运算

### 加减乘除四则运算

原生Bash不支持运算，但是可以借助 ```expr```

```shell
val=$(expr 2 + 2);
echo "value $val"
```

- 运算符和操作数之间要有空格

- 因为变量含有expr关键字 因此需要

  - 用 $() 包起来
  - 或用 `` 包起来

  <img :src="$withBase('/imags/1653030882301.png')" alt="1653030882301">

### 大于小于比较运算

 关系运算符只支持数字，不支持字符串，除非字符串的值是数字 

```shell
a=10
b=20
if [ $a -eq $b ]
then
   echo "$a -eq $b : a is equal to b"
else
   echo "$a -eq $b: a is not equal to b"
fi
```

<img :src="$withBase('/imags/1653031050815.png')" alt="1653031050815">

### 是还是否布尔运算

<img :src="$withBase('/imags/1653031127185.png')" alt="1653031127185">

### 字符串处理运算符

<img :src="$withBase('/imags/1653031219367.png')" alt="1653031219367">

### 文件测试运算符

```shell
#!/bin/sh
file="/var/www/tutorialspoint/unix/test.sh"
if [ -r $file ]
then
   echo "File has read access"
else
   echo "File does not have read access"
fi
if [ -w $file ]
then
   echo "File has write permission"
else
   echo "File does not have write permission"
fi
if [ -x $file ]
then
   echo "File has execute permission"
else
   echo "File does not have execute permission"
fi
if [ -f $file ]
then
   echo "File is an ordinary file"
else
   echo "This is sepcial file"
fi
if [ -d $file ]
then
   echo "File is a directory"
else
   echo "This is not a directory"
fi
if [ -s $file ]
then
   echo "File size is zero"
else
   echo "File size is not zero"
fi
if [ -e $file ]
then
   echo "File exists"
else
   echo "File does not exist"
fi
```

```shell
File has read access
File has write permission
File has execute permission
File is an ordinary file
This is not a directory
File size is zero
File exists
```

<img :src="$withBase('/imags/1653031254685.png')" alt="1653031254685">

## 字符串处理

### 拼接字符串

```shell
your_name="qinjx"
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting $greeting_1
```

### 获取字符串长度

```shell
string="abcd"
echo ${#string} #输出 4
```

### 提取子字符串

```shell
string="alibaba is a great company"
echo ${string:1:4} #输出liba
```

### 查找字符串

```shell
string="alibaba is a great company"
echo `expr index "$string" is`
```

## 数组处理

### 定义数组

Bash仅仅支持一维数组的定义，不支持多维数组

数组定义时，通过 ```()```将值包括起来，数组中的元素用空格分开。如

```shell
array_name=(value0 value1 value2 value3)
```

或

```shell
array_name[0]=value0
array_name[1]=value1
array_name[2]=value2
```

### 读取数组

```  ${array_name[index]}  ```

```shell
valuen=${array_name[2]}
```

### 数组长度

```shell
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
lengthn=${#array_name[n]}
```

## 简单逻辑处理

### 数据分流

数据分流，一般有三种写法

- if ..then.. fi 语句
- if ..then.. else ... fi 语句
- if ..the.. elif ..the.. else ... fi 语句

```shell
if [ $a == $b ]
then
   echo "a is equal to b"
else
   echo "a is not equal to b"
fi
```

### 数据流转

```
for 变量 in 列表
do
    command1
    command2
    ...
    commandN
done
```

```shell
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done
```

结果

```shell
The value is: 1
The value is: 2
The value is: 3
The value is: 4
The value is: 5
```

