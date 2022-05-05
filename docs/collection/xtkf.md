# IO 系统开发

### 01 Linux的五大功能

文件管理

进程管理

内存管理

网络管理

### 02 Linux高级编程的特点

涉及到内核向用户空间提供的接口

1. 内核要为应用程序服务，否则应用程序很单一
2. 内核是稳定的代码，同时也要为多个用户空间服务，为了防止用户空间某些用户程序使用内核代码产生其它问题

内核向用户空间提供接口，同时在接口上添加保护，这样会使符合接口函数的应用程序提供服务，同时也保护内核。

### 03 系统编程的三要素

接口

参数

返回值

## IO 编程

### 01 文件IO

应用层：输入，内核输至应用层。输出，应用层输至内核层

内核层：

硬件层

是从用户空间角度考虑

input:输入，内核输至应用层

output:输出，应用层输至内核层

- open：打开内核的文件
- read：读取内核中的文件
- write：写入内核中的文件
- close：关闭内核中的文件

### 02 open

#### 功能

- 打开一个文件
- 创建一个文件

#### 函数

| 参数名 |      参数说明      |
| :----: | :----------------: |
| char*  | 包含有文件名和路径 |
|  flag  |      操作文件      |
|  mode  |   创建文件的权限   |



##### open函数

###### **参数用法**

|   flag   |                             功能                             |
| :------: | :----------------------------------------------------------: |
| O_RDONLY |                             只读                             |
| O_WRONLY |                             只写                             |
|  O_RDWR  |                             读写                             |
| O_CREAT  |                         创建一个文件                         |
| O_TRUNC  |              打开文件（会把已经存在的内容删除）              |
| O_APPEND |         追加方式用于打开文件（不会删除已存在的内容）         |
|  O_EXCL  | 如果创建一个文件时存在，则返回错误消息，该参数用于测试文件是否存在 |

###### **返回值**

- 成功：文件描述符，它是一个非负的正整数，即文件的ID号，相当于人的身份证号
- 失败：-1

###### **关于文件描述符**

ls -lai 可以获取文件描述符。

-  每个文件的描述符并不是固定的 
- 文件描述符总是从3开始，因为系统创建的进程默认为打开 3 个文件
  - 标准输入（0）
  - 标准输出（1）
  - 标准错误（2）
- 文件描述符不是递增产生的，并且可以被回收且进行再次分配
- 文件描述符是非负整型
- 每个进程单独维护了一个文件描述符的集合
- 文件描述符其实就是file结构体数组的索引

>  [文件描述符了解一下 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/108744787) 

###### **设计touch函数**

```c
// touch函数的实现
// 文件创建函数
#include "stdio.h"
#include "unistd.h"
#include "fcntl.h"
int main(int argc,char *argv[]){
	int fd;
	fd = open(argv[1],O_CREAT | O_RDWR,0777);
	if(fd<0){
		printf("创建了一个文件 %s ",argv[1]);	return -1;
}
		printf("创建了一个文件 %s sucess fd=%d\n ",argv[1],fd);
		close(fd);
		return 0;
}  
```

###### **umask**【权限掩码】

- ​	linux umask命令指定在建立文件时预设的权限掩码。

- ​	umask可用来设定[权限掩码]。[权限掩码]是由3个八进制的数字所组成，将现有的存取权限减掉权限掩码后，即可产生建立文件时预设的权限。

**如当掩码为022时：**

```
掩码：将权限掩掉了

777：111 111 111 本身权限

022：000 010 010 掩码

755：111 101 101 掩码结果
```

##### read&write函数

向Linux内核中写入流。内核中存在很多文件，将流写入某个文件时，为write。

将流从文件中读取时，为read。

###### 参数与返回值

**write(int fd,void *buf,size_t touch)**

**read(int fd,void *buf,size_t touch)**

| 函数  |                   条件                    |     具体描述     |
| :---: | :---------------------------------------: | :--------------: |
| write |           写到哪里去,文件描述符           |     int fld      |
| write |  写入什么,存放要写入的数据的缓冲区首地址  |    void *buff    |
| write |         写多少个,想要写入的字节数         |   size t touch   |
| write |                  返回值                   | 实际写入的字节数 |
|       |                                           |                  |
| read  |            从哪里读,文件描述符            |     int fld      |
| read  | 读到哪里去,存放要写入的数据的缓冲区首地址 |    void *buff    |
| read  |        想读多少个,想要写入的字节数        |   size t touch   |
| read  |                  返回值                   | 实际读出的字节数 |

**write函数测试**

```c
#include "stdio.h"
#include "unistd.h"
#include "fcntl.h"
int main(int argc,char *argv[]){
	int fd;
	char buf[] = "hello world";
	int wr_ret;
	fd = open("./a.c",O_RDWR|O_TRUNC);
	
	if(fd<0) {
		printf("open file a.c failure\n");
		return -1;
	}
	
	printf("open file a.c success fd = %d\n",fd);
	wr_ret = write(fd,buf,sizeof(buf));
	printf("写入的字节数为 ： %d\n",wr_ret);
	close(fd);
	return 0; 
}
```

