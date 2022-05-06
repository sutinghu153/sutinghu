# IO 系统开发

## 关于Linux

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

## 文件IO

### 01 关于文件IO

应用层：输入，内核输至应用层。输出，应用层输至内核层

内核层：

硬件层

是从用户空间角度考虑

input:输入，内核输至应用层

output:输出，应用层输至内核层

相关函数

- open：打开内核的文件
- read：读取内核中的文件
- write：写入内核中的文件
- close：关闭内核中的文件
- leek：调整读写的位置指针

### 02 相关函数

#### 01 open函数

##### 函数功能

- 打开一个文件
- 创建一个文件

##### 参数列表

| 参数名 |      参数说明      |
| :----: | :----------------: |
| char*  | 包含有文件名和路径 |
|  flag  |      操作文件      |
|  mode  |   创建文件的权限   |



##### **参数用法**

|   flag   |                             功能                             |
| :------: | :----------------------------------------------------------: |
| O_RDONLY |                             只读                             |
| O_WRONLY |                             只写                             |
|  O_RDWR  |                             读写                             |
| O_CREAT  |                         创建一个文件                         |
| O_TRUNC  |              打开文件（会把已经存在的内容删除）              |
| O_APPEND |         追加方式用于打开文件（不会删除已存在的内容）         |
|  O_EXCL  | 如果创建一个文件时存在，则返回错误消息，该参数用于测试文件是否存在 |

##### **返回值**

- 成功：文件描述符，它是一个非负的正整数，即文件的ID号，相当于人的身份证号
- 失败：-1

##### **关于文件描述符**

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

##### **设计touch函数**

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

##### **umask**【权限掩码】

- ​	linux umask命令指定在建立文件时预设的权限掩码。

- ​	umask可用来设定[权限掩码]。[权限掩码]是由3个八进制的数字所组成，将现有的存取权限减掉权限掩码后，即可产生建立文件时预设的权限。

##### **如当掩码为022时：**

```
掩码：将权限掩掉了

777：111 111 111 本身权限

022：000 010 010 掩码

755：111 101 101 掩码结果
```

#### 02 read&write函数

向Linux内核中写入流。内核中存在很多文件，将流写入某个文件时，为write。

将流从文件中读取时，为read。

##### 参数与返回值

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

##### **write函数测试**

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

#### 03 close函数

 **int close(int fd);**

##### 参数与返回值

- fd 文件描述符
-  调用成功返回0，否则返回-1并设置errno； 

#### 04 lseek函数

##### 功能

调整读写的位置指针。

**lseek(int fd,off_t offset,int whence)**

##### 参数说明

|   参数名称   | 解释 |                           参数说明                           |
| :----------: | :--: | :----------------------------------------------------------: |
|    int fd    |      |                   要调整的文件的文件描述符                   |
| off_t offset |      | 偏移量，每读写操作所需要移动的距离，单位是字节的数量，可正可负（前移，后移） |
|  int whence  |      |                        当前位置的基点                        |

##### int whence 参数说明

|   参数   |                          说明                          |      |
| :------: | :----------------------------------------------------: | :--: |
| SEEK_SET |        当前位置的文件开头，新位置为偏移量的大小        |      |
| SEEK_CUR |   当前位置为文件指针位置，新位置为当前位置加上偏移量   |      |
| SEEK_END | 当前位置为文件的结尾，新位置为文件的大小加偏移量的大小 |      |

##### 返回值 说明

- 成功 文件当前的位置
- 失败 -1

##### 通过lseek实现cp命令

```c
#include "stdio.h"
#include "unistd.h"
#include "fcntl.h"
#include "string.h" 

int main(int argc,char *argv[]){
	// 操作文件的文件描述符和目标文件的文件描述符 
	int rd_fd,wr_fd;
	// 缓冲区 
	char read_buf[128] = {0}; 
	//  保存文件的文件描述符 
	int rd_ret = 0; 
	// 如果没有源文件和目标文件路径 
	if(argc<3)
	{
		printf("please input src file and des file\n");
		return -1;		
	}
	// 打开操作文件 
	rd_fd = open(argv[1],O_RDONLY); 
	// 如果操作文件报错 
	if(rd_fd<0){
		printf("open src file %s failure\n",argv[1]);
		return -2;
	} 
	printf("open src file %s success,rd_fd=%d\n",argv[1],rd_fd);
	// 打开目标文件 
	wr_fd = open(argv[2],O_WRONLY);
	// 如果目标文件报错 
	if(wr_fd<0)
	{
		printf("open des file %s failure\n",argv[2]);
		return -3;
	} 
	printf("open des file %s success,rd_fd=%d\n",argv[2],wr_fd);
	// 将内容从源文件copy到目标文件
	while(1)
	{
		rd_ret = read(rd_fd,read_buf,128);
		if(rd_ret<128){
			break;
		}
		write(wr_fd,read_buf,rd_ret);
		// 清空缓存 
		memset(read_buf,0,128);
	} 
	write(wr_fd,read_buf,rd_ret);
	close(rd_fd);
	close(wr_fd);
	return 0;
}


```

## 标准IO

### 01 标准IO与文件IO的区别

1. 文件IO，是直接调用内核提供的系统调用函数，头文件是unistd.h

2. 标准IO，是间接调用系统调用函数，头文件是stdio.h

   

   ```
   getchar(),putchar()--单个字符
   gets(),puts()--多个字符
   scanf(),printf()--多个或单个都可
   
   输入输出相关的函数，都是和标准的输入（键盘），标准的输出（显示器）相关，与一些普通文件的读写没有关系，即这些函数不能读写普通文件。
   ```

3. 标准的IO中的相关函数，不仅可以读写普通文件，也可以向标准的输入或标准的输出中读写。

4. Linux中做文件IO最常用到的5个函数是： open ,  close ,  read ,  write 和 lseek ，不是ISO C的组成部分，这5个函数是**不带缓冲的IO**，也即每个read和write都调用了内核的一个系统调用。

5.  标准IO库提供缓冲功能，减少系统调用。 

6. 文件IO函数直接操作内核函数，标准IO函数先操作C库函数，获得一定的缓冲。

### 02 三个缓存的概念

1. 用户空间的缓存，user buff，用户空间的缓存（用户使用的缓存）
2. 内核空间的缓存，kernel buff，内核在使用时会开辟内核缓存(最底层的缓存)
3. 库缓存，lib buff，标准IO中调用库函数时的缓存（缓冲缓存的缓存）

### 03 缓存的特征

1. printf 函数在满足一定的条件，即 遇到 \n 时，会将库缓存的内容写到内核中，即调用了系统调用函数。
2. 库缓存写满时，会调用系统调用函数。库缓存大小为 1024 byte.

### 04 缓存的分类

#### 全缓存

 全缓冲指的是系统在填满标准IO缓冲区之后才进行实际的IO操作；注意，对于驻留在磁盘上的文件来说通常是由标准IO库实施全缓冲。 

#### 行缓存

遇到 **\n** 时会将库缓存中的内容写入内核中。行缓存1024byte.

#### 无缓存

 无缓冲指的是标准IO库不对字符进行缓冲存储；注意，标准出错流stderr通常是无缓冲的。 

#### 缓冲区

缓冲区是库函数在系统调用的上层，是对系统调用的封装。

### 05 相关的函数

#### 打开/创建 fopen()

FILE *fopen(const char *path,const char *mode);

##### 返回值

FILE* 文件流指针 类似于IO中的文件描述符

FILE定义：struct_IO_FILE，在/usr/include/libio.h中包含读写缓存的首地址、大小、位置指针等。

- stdin 标准输入流
- stdout 标准输出流
- stder 标准出错流

##### 参数

| 参数  |    类型    |                             说明                             |
| :---: | :--------: | :----------------------------------------------------------: |
| *path | const char |                           文件路径                           |
| *mode |    r/rb    |                 打开只读文件，该文件必须存在                 |
| *mode |  r+或r+b   |                打开只读写文件，该文件必须存在                |
| *mode |    w/wb    | 打开只写文件，该文件存在则文件长度为0，即会擦除文件以前内容，若文件不存在则建立该文件 |
| *mode | w+/w+b/wb+ | 打开可读写文件，若文件存在则文件长度为0，即会擦除文件以前内容，若文件不存在则建立该文件 |
| *mode |    a/ab    | 以附加的方式打开只写文件，若文件不存在，则建立该文件，如果文件存在，写入的数据会被加到文件尾，即文件原先的内容会被保留 |
| *mode | a+/a+b/ab+ | 以附加的方式打开读写文件，若文件不存在，则建立该文件，如果文件存在，写入的数据会被加到文件尾，即文件原先的内容会被保留 |

- b:二进制文件
- r:只读方式打开文件，文件必须存在
- w/a:只写方式打开文件，文件不存在则创建（a追加、w删除）
- r+:读写方式打开文件，文件必须存在
- +:读写方式打开文件，文件必须存在

#### 读写函数

##### 分类

1. 行缓存，遇到换行符 \n或写满缓存时 即调用系统调用函数
   1. 读，fgets、gets、printf、fprintf、sprintf
   2. 写，fputs、puts、scanf
   3. 按字符的读，fgetc、getc、getchar
   4. 按字符的写，fputc、putc、putchar
2. 无缓存，只要用户调用了该函数，就会将其中的内容写入到内核中
3. 全缓存，只有写满缓存再调用系统调用函数
   1. 读，fread
   2. 写，fwrite

##### fgets和fputs(行缓存)

**char *fgets(char *s,int size,FILE *stream)**

**int fputs(const char *s,FILE *stream)**

| 函数  | 参数   | 说明                        | 其它         |
| ----- | ------ | --------------------------- | ------------ |
| fgets | s      | 缓存                        | 读到那里去   |
| fgets | size   | 读取量                      | 读多少个字节 |
| fgets | stream | 读取位置                    | 读取的来源   |
| fgets | 返回值 | 成功则为s缓存的地址或文件尾 | 出错则为null |
|       |        |                             |              |
| fputs | s      | 缓存                        | 写入什么内容 |
| fputs | stream | 写到哪里去                  | 目标文件     |
| fputs | 返回值 | 成功则为非负值              | 出错为EOF    |

##### gets和puts（行缓存）

**char *gets(char *s);**

**int puts(const char *s);**

###### gets与fgets的区别

- gets()不能指定缓存的长度，可能造成缓存越界，写到缓存之后的存储空间中，从而产生不可预料的后果。
- gets()只能从标准输入中读
- gets()与fgets()的另一个区别是，gets()并不将新行符存入缓存中，fgets将新行符存入缓存中

###### puts与fgets的区别

- puts()只能向标准输出中写
- puts()与fputs()的另一个区别是puts()输出时会添加一个新行符，fputs不会

##### fprint、printf与sprintf

int fprintf(FILE *stream,"字符串格式")；

- fprintf 可以输出到文件中，也可以输出到显示器
- printf 只能输出到显示器中

int sprintf(str*,"字符串格式")；

- 输出内容到一个字符串中

##### fgetc和fputc

int fgetc(FILE *fp)

- 将文件中的内容从一个字符的输出到显示器，到文件结尾时返回EOF
- 功能，从文件中读取一个字符
- 返回值，正确为读取的字符，到文件结尾或出错时返回EOF

int fputc(int c,FILE *fp)

- 输入一个字符到一个文件中，成功则返回输入的字符，失败返回EOF
- 功能，写一个字符到文件中
- 参数，第一个为要写的字符，第二个为文件流
- 返回值，成功则返回输入的字符，失败则返回EOF

**fgetc有缓存，但不是行缓存函数**

##### fread和fwrite(全缓存)

size_t fread (void *ptr,size_t  size,size_t nmemb,FILE *stream);

size_t fwrite (const void *ptr,size_t  size,size_t nmemb,FILE *stream);

- 功能，全缓存的读写函数
- ptr，第一个参数，buf，缓存中要写入的内容（读到哪里去）
- size，第二个参数，写的内容中，每一个单元所占的字节数
- nmemb，第三个参数，写的内容中，有多少个单元数
- stream，第四个参数，写到哪里去（从哪里读）
- size *nmemb，总共写了多少个字节
- 返回值，实际写的单元数

#### 刷新fflush(FILE *fp)

###### 功能

刷新函数，强制将行缓存中的内容写入内核。

FILE *fp 类似于文件描述符。

###### 注

flose()函数中包含fflush()函数。

###### 无缓存

#### 读写位置指针函数

|       函数       |                功能                |        参数        |           返回值            |
| :--------------: | :--------------------------------: | :----------------: | :-------------------------: |
|     fseek()      |          设定文件位置指示          | 参数与lseek()一致  |    成功返回0 失败返回-1L    |
| rewind(FILE *fp) | 用于设定流的文件位置指示为文件开始 | fp类似于文件描述符 |   该函数调用成功无返回值    |
| ftell(FILE *fp)  |     用于取得当前文件的位置指针     | fp类似于文件描述符 | 成功为当前文件位置，失败-1L |

#### 读写状态判断函数

|            函数             |         功能         |  参数  |             返回值             |
| :-------------------------: | :------------------: | :----: | :----------------------------: |
|   int feof(FILE *stream)    | 判断是否到了文件结束 | 文件流 | 文件结束时，返回为非0，否则为0 |
|  int ferror(FILE *stream)   |   判断是否读写错误   | 文件流 |  读写错误 返回非0，否则返回0   |
| void clearerr(FILE *stream) |      清除流错误      | 文件流 |               无               |

#### cat 函数的实现

```c
// linux中cat的实现
#include "stdio.h"
// 将文件的内容输出到显示器
int main(int argc,char *argv[])
{
	// 定义文件指针 
	 FILE *src_fp;
	 
	 // 获取文件的字符 
	 int read_ret;
	 
	 // 如果参数输入不全 则退出 且提示 
	 if(argc < 2)
	 {
	 	printf("please input src file\n");
	 	return -1;
	 }
	 
	 // 打开指定文件 
	 src_fp=fopen(argv[1],"r");
	 
	 // 如果文件不存在报错 
	 if(src_fp==NULL)
	 {
	 	printf("open src file %s failure\n",argv[1]);
	 	return -2;
	 }
	 
	 printf("open src file %s SUCCESS\n",argv[1]);
	 
	 // 读取文件 
	 while(1)
	 {
	 	read_ret = fgetc(src_fp);
	 	// 判断文件是否读取结束 
	 	if(feof(src_fp))
	 	{
	 		printf("read file %s end\n",argv[1]);
	 		break;
		 }
	 	fputc(read_ret,stdout);
	 }
	 // 关闭文件流 
	 fclose(src_fp);
	 return 0;
}
```

## 函数库的制作

Linux下函数库分为静态库和动态库。

静态库：在程序生成.c文件编译运行时，就已经将库加载到运行环境中

- .a 后缀
- 编译时酒将库编译进可执行程序中
- 优点，程序的运行环境不需要外部的函数库
- 缺点，可执行程序大

动态库：在程序编运行时，动态的将库加载到运行环境中

- .so 后缀
- 又称共享库，在运行时将库加载到可执行程序中
- 优点，可执行程序
- 缺点，程序的运行环境必须提供相应的库

**库函数在 usr\lib——参考**

>  [ Linux_静态库与动态库的制作与使用](https://blog.csdn.net/weixin_45157820/article/details/115789297) 

### 01 静态库的制作

1. 函数文件及main.c文件
2. gcc -o file.o
3. gcc -c -o file.o file.c
4. ar -cr -o lib_file.a  file.o
5. gcc -o main main.c lib_file.a (使用)

### 02 动态库的制作



1. 函数文件及main.c文件
2. gcc -o file.o
3. gcc -c -o file.o file.c
4. gcc -shared -fpic -o lib_file.so file.o
5. gcc -o main main.c lib_file.a (使用)

动态库默认在usr/lib文件夹下找对应的实现库，要让程序能够执行成功，有以下几个方法可以使用

1. 将自己的库放到/usr/lib文件夹中
2. 设置环境变量
   1. 假设lib_file.so 在/home/linux/file中，则设置环境变量
   2. export LD_LIBRARY_PATH=/home/linux/file:$LD_LIBRARY_PATH
3. 在/etc/ld.so.conf文件里加入生成的库的目录，然后通过/sbin/ldconfig

脚本运行ld.so.conf

```c
include ld.so.conf.d/*.conf
```

## 目录IO

>  [【Linux】文件IO详解](https://blog.csdn.net/qq_41669298/article/details/105331453) 
>
>  [Linux高级编程之目录IO](https://blog.csdn.net/weixin_43937576/article/details/116596766) 

> #include <sys/type.h>
>
> #include<dirent.h>

### 01 目录IO与文件IO函数的比较

|   目录IO    |   功能描述   |  文件IO  |   功能描述   |
| :---------: | :----------: | :------: | :----------: |
|  opendir()  | 只能打开目录 |  open()  |  打开文件流  |
|   mkdir()   |   创建目录   |          |              |
|  readdir()  |   读取目录   |  read()  |  读取文件流  |
| rewinddir() | 调整位置指针 | rewind() | 调整位置指针 |
|  telldir()  | 调整位置指针 | ftell()  | 调整位置指针 |
|  seekdir()  | 调整位置指针 | fseek()  | 调整位置指针 |
| closedir()  |   关闭目录   | close()  |  关闭文件流  |

### 02 相关函数

#### opendir

DIR *opendir(const char *pathname);

- 参数，打开文件的目录路径
- 返回值，成功返回目录流指针，否则返回NULL

#### mkdir

int mkdir(const char *path,mode_t mode);

- path为想要创建的目录文件路径
- mode为该目录的访问权限
- 返回值，如果目录创建成功则返回0，失败则返回-1
- 访问权限是与umask为补集

##### mkdir 命令的实现

```c
#include "stdio.h"
#include "sys/types.h"
#include "dirent.h"

int main()
{
	int ret;
	ret = mkdir("./mydir",0777);
	if(ret<0)
	{
		printf("creat mydir failure\n");
		return -1;
	}
		printf("creat mydir success\n");
	return 0;
}
```

#### readdir

struct dirent *readdir(DIR *dr)

- 目录流指针
- 返回值，成功时返回struct dirent 指针，失败则返回NULL
- struct dirent定义在头文件dirent.h中

```c
struct dirent
{
	ino_t d_ino: //inode号--内核进行管理的唯一的标识
	char d_name[NAME_MAX+1];//文件名
}
```

**目录中的子目录和子文件通过一个链表存放。因此要读取所有的文件，需要遍历整个链表。**

#### closedir

int closedir(DIR *dir);

- 参数，目录流指针
- 返回值，成功0，失败-1

## 单机模式下文件的上传和下载实现

### 01 实现内容

1. 输入的条件
   1. 服务器的地址
   2. 路径和目录名
2. 列出服务器中存在的文件：opendir readdir
3. 输入从服务器下载的文件名  或  上传文件到服务器的文件名
4. 文件下载 或 文件上传
5. 使用到的函数
   1. 文件io open read write close
   2. 标准io fopen fputs fgets fputs fgets fread fwrite fclose

### 02 代码实现

```c
// 共享目录文件的上传下载 
#include "stdio.h"
#include "sys/types.h"
#include "dirent.h"
#include "string.h"
#include "unistd.h"
#include "fcntl.h"
int main()
{
	// 文件夹目录指针 
	DIR  *dp;
	// 下载或上传的文件描述符 
	int src_fd;
	int des_fd;
	int ret;
	char buff[128]={0};
	int fd;
	// 文件夹结构体 
	struct dirent *dir;
	// 输入的服务名 
	char server[128]={0};
	// 输入的文件名 
	char file[128]={0};
start:
	printf("please servre IP and file url\n");
	
	// 将结果存入对应的变量中
	scanf("%s",server);
	
	// 打开文件夹 并展示文件列表
	dp = opendir(server); 
	
	if(dp == NULL)
	{
		printf("open file failure\n");
		goto start;
	}
	
	printf("open this dir%s\n",server);
	
	// 循环读取目录中的内容
	while(1)
	{
		dir=readdir(dp);
		if(dir==NULL)
		{
			break;
		}else
		{
			printf("inode=%ld\t file_name=%s\n",dir->d_ino,dir->d_name);
		}
	 }
	 
	printf("\n please input this dir \n");
	
	scanf("%s",file);
	
	src_fd = open(strcat(strcat(server,"/"),file),O_RDONLY);
	
	if(src_fd<0)
	{
		printf("open file failure\n");
		return -1; 
	}
	
	des_fd = open(file,O_WRONLY,0777);
	
	if(des_fd<0)
	{
			printf("target server create failure\n");
			return -2; 
	}
	
	while(1)
	{
		ret = read(src_fd,buff,128);
		if(ret<128)
		{
			break;
		}
		write(des_fd,buff,ret);
	 } 
	write(des_fd,buff,ret);
	close(src_fd);
	close(des_fd);
	closedir(dp);
	return 0;
}
```

