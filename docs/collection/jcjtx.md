# 进程间通信

## 关于进程

### 什么是进程间通信？

两个进程借助内核空间进行通信。 

进程与进程之间是相互独立的，各自运行在自己的[虚拟内存](https://so.csdn.net/so/search?q=虚拟内存&spm=1001.2101.3001.7020)中。

要想在进程与进程间建立联系，需要通过内核，在内核中开辟一块缓冲区，两个进程的信息在缓冲区中进行交换或者传递。

- 在用户空间实现进程通信不可能
- 实现进程通信需要借助Linux内核空间
- 通信方式（单击模式，仅一个Linux内核的通信模式）
  - 管道通信
    - 无名管道
    - 有名管道（文件系统中有名）
  - 信号通信
    - 信号的发送
    - 信号的接收
    - 信号的处理
  - IPC通信
    - 共享内存
    - 消息队列
    - 信号灯
  - Socket通信
    - 存在于一个网络中两个进程间的通信
- 进程间通信方式的实现是基于文件IO的思想

### 什么是线程间通信？

- 可以在用户空间就实现
- 可以通过全局变量通信

## 管道通信

### 什么是管道通信

1. 管道的实质是队列，先进先出，入队是写，出队是读

2. 管道文件是特殊的文件，不能用open函数创建

3. 管道创建的方式是pipe函数

   1. int pipe(int fd[2])
   2. 创建管道，为系统调用

   > pipe()函数用于在内核中创建一个管道，该管道一端用于读取管道中的数据，另一端用于将数据写入管道。在创建一个管道后，会获得一对文件描述符，用于读取和写入，然后将参数数组filedes中的两个值传递给获取到的两个文件描述符，filedes[0]指向管道的读端，filedes[1]指向写端。
   >
   > 
   >
   > pipe()函数调用成功，返回值为0；否则返回-1，并且设置了适当的错误返回信息。此函数只是创建了管道，要想从管道中读取数据或者向管道中写入数据，需要使用read()和write()函数来完成。当管道通信结束后，需要使用close()函数关闭管道的读写端。

4. 管道是创建在内存中的，进程结束，空间释放，管道就不存在了

5. 管道中的东西，读完就不存在了

6. 如果管道中没有东西可读，就会阻塞

### 管道通信的分类



#### 无名管道

##### 无名管道创建函数

```c
#include <unistd.h>
int pipe(int filedes[2]);
```

##### **无名管道如何实现进程间通信——框架**

1. 只能用于具有共同祖先的进程（具有亲缘关系的进程）之间进行通信；通常，一个管道由一个进程创建，然后该进程调用fork()，此后父子进程之间就可以应用该管道。因为子进程在创建时，是被复制了父进程的所有的数据。
2. 一般而言，进程退出，管道释放，所以管道的生命周期跟随进程。
3. 管道要实现通信，两个进程必须操作同一个管道
4. 一般而言，内核会对管道操作进行同步与互斥
5. 管道是半双工的，数据只能向一个方向流动；需要双方通信时，需要建立起两个管道。
6. 无名管道写阻塞时，是管道队列数据塞满时，阻塞值5400*（hello linux）-->5500*(hello linux)
7. 无名管道读阻塞时，是管道队列为空时

##### **无名管道如何实现进程间通信——内核**

1. 在父进程中调用pipe()函数创建一个管道，产生一个文件描述符filedes[0]指向管道的读端和另一个文件描述符filedes[1]指向管道的写端。
2. 在父进程中调用fork()函数创建一个一模一样的新进程，也就是所谓的子进程。父进程的文件描述符一个指向读端，一个指向写端。子进程同理。
3. 在父进程关闭指向管道写端的文件描述符filedes[1]，在子进程中，关闭指向管道读端的文件描述符filedes[0]。此时，就可以将子进程中的某个数据写入到管道，然后在父进程中，将此数据读出来。

##### **通信实例**

```c
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#define MAXSIZE 100

int main()
{
    int fd[2], pid, line;
    char message[MAXSIZE];
    /*创建管道*/
    if(pipe(fd) == -1)
    {
	perror("create pipe failed!");
	return 1;
    }
    /*创建新进程*/
    else if((pid = vfork()) < 0)
    {
	perror("not create a new process!");
	return 1;
    }
    /*子进程*/
    else if(pid == 0)
    {
	close(fd[0]);
	printf("child process SEND message!\n");
	write(fd[1], "Hello Linux!",12); /*向文件中写入数据*/ 
    }
    else
    {
	close(fd[1]);
	printf("parent process RECEIVE message is:\n");
	line = read(fd[0], message, MAXSIZE); /*读取消息，返回消息长度*/
	write(STDOUT_FILENO,message,line); /*将消息写入终端*/
	printf("\n");
	wait(NULL);
	_exit(0);
    }
    return 0;
}
```

#### 有名管道

> > 所谓有名管道，是对无名管道进行改进，使之能够在非亲缘进程间进行通信的方式。
> >
> > 所谓的有名，即文件系统中存在这个文件节点，每一个文件节点都有一个inode号，而且是一个特殊的文件类型：p管道类型。
> >
> > > 普通文件：—，open函数创建
> > >
> > > 目录文件：d，mkdir函数创建
> > >
> > > 链接文件：l，in -s方式创建
> > >
> > > 管道文件：p，mkfifo函数创建
> > >
> > > S-C-B文件

##### 有名管道的创建函数

int mkfifo(const char *filename,mode_t mode);

- 功能，创建管道文件
- 参数，管道文件名，权限
- 创建的文件的权限依旧与umask掩码有关系
- 返回值，创建成功返回0，创建失败返回-1
- 不会在内核中创建管道

##### 不占磁盘空间的文件类型

1. 有名管道
2. 字符设备
3. 块设备
4. 套接字

以上文件不占磁盘空间，只有文件节点

##### 有名管道实现进程通信——框架

1. 进程调用了mkfifo，会通知内核创建P文件
2. 内核会在用户空间生成文件名
3. open打开用户空间生成的文件时，会在内核生成对应的管道

##### 有名管道实现进程通信——实例

创建管道

```c
#include "stdio.h"
#include "unistd.h"
#include "stdlib.h"
#include "fcntl.h"
#include "sys/types.h"
#include "sys/stat.h"

int main()
{
        int ret;
        ret = mkfifo("myp",0777);
        if(ret < 0)
        {
                printf("creat myfifo failure\n");
                return -1;
        }

        printf("creat myfifo sucess\n");

        return 0;
 }

```

读写通信

```c
#include "stdio.h"
#include "unistd.h"
#include "stdlib.h"
#include "sys/types.h"
#include "fcntl.h"

int main()
{
	int fd;
	
	char process_inter=0;
	
	fd = open("./myfifo",O_WRONLY);
	
	if(fd<0)
	{
		printf("open myfifo failure");
		return -1;
	}
	
	for(i =0;i<5;i++)
	{
		printf("this is first process i = %d\n",i);
		usleep(100);
	}
	
	process_inter=1;
	
	write(fd,&process_inter,1);
	
	while(1);
	
	return 0;
}
```

```c
#include "stdio.h"
#include "unistd.h"
#include "stdlib.h"
#include "sys/types.h"
#include "fcntl.h"

int main()
{
	int fd;
	
	int process_inter=0;
	
	fd=open("./myfifo",O_RDONLY);
	
	if(fd<0)
	{
		printf("open myfifo failure\n");
		return -1;
	}
	
	printf("open myfifo sucess\n");
	
	read(fd,&process_inter,1);
	
	while(process_inter==0);
	
	if(fi=0;i<5;i++)
	{
		printf("this is first process i = %d\n",i);
		usleep(100);
	}
	
	while(1);
	return 0;
}
```

## 信号通信

### 关于信号通信

信号通信的对象是信号，用户空间无法发出信号，必须通知内核发送信号给另一个用户空间的用户。

#### 内核空间的信号

kill 命令 kill -l可以查看内核发送的信号类型

64 种不同的信号

```c
1) SIGHUP	 2) SIGINT	 3) SIGQUIT	 4) SIGILL	 5) SIGTRAP
 6) SIGABRT	 7) SIGBUS	 8) SIGFPE	 9) SIGKILL	10) SIGUSR1
11) SIGSEGV	12) SIGUSR2	13) SIGPIPE	14) SIGALRM	15) SIGTERM
16) SIGSTKFLT	17) SIGCHLD	18) SIGCONT	19) SIGSTOP	20) SIGTSTP
21) SIGTTIN	22) SIGTTOU	23) SIGURG	24) SIGXCPU	25) SIGXFSZ
26) SIGVTALRM	27) SIGPROF	28) SIGWINCH	29) SIGIO	30) SIGPWR
31) SIGSYS	34) SIGRTMIN	35) SIGRTMIN+1	36) SIGRTMIN+2	37) SIGRTMIN+3
38) SIGRTMIN+4	39) SIGRTMIN+5	40) SIGRTMIN+6	41) SIGRTMIN+7	42) SIGRTMIN+8
43) SIGRTMIN+9	44) SIGRTMIN+10	45) SIGRTMIN+11	46) SIGRTMIN+12	47) SIGRTMIN+13
48) SIGRTMIN+14	49) SIGRTMIN+15	50) SIGRTMAX-14	51) SIGRTMAX-13	52) SIGRTMAX-12
53) SIGRTMAX-11	54) SIGRTMAX-10	55) SIGRTMAX-9	56) SIGRTMAX-8	57) SIGRTMAX-7
58) SIGRTMAX-6	59) SIGRTMAX-5	60) SIGRTMAX-4	61) SIGRTMAX-3	62) SIGRTMAX-2
63) SIGRTMAX-1	64) SIGRTMAX
```

数字代表信号ID，宏代表的是不同的意义，功能。

#### 信号通信的问题

- 告诉内核发什么信号，这个信号代表的含义(which) pipe
- 告诉内核信号要发送给哪个进程（who）PID，即进程的代号

### 信号通信的框架

#### 信号的发送

发送信号进程

kill

raise

alarm

##### kill 系统调用函数

 一个进程可以向另一个进程发送信号，因此信号可以很好的用于进程之间的通信。通过信号输出的信息，使多个进程可以协作完成一个任务。Linux环境使用kill函数向进程或进程组发送信号。 

int kill (pid_t pid,int sig);

| 参数 |  取值   |                  含义                   |
| :--: | :-----: | :-------------------------------------: |
| pid  |   >0    |     将此信号发送给进程ID为pid的进程     |
| pid  |   ==0   | 将此信号发送给进程ID和该进程相同的进程  |
| pid  |   <0    | 将此信号发送给进程组内进程ID为pid的进程 |
| pid  |  ==-1   |       将此信号发送给系统所有进程        |
| sig  | kill -l |               信号宏的ID                |

###### 返回值

 成功执行时，返回0；失败返回-1。errno被设为以下的某个值EINVAL：指定的信号码无效（参数sig不合法）；EPERM：权限不够无法传送信号给指定进程；ESRCH：参数pid所指定进程或进程组不存在。 

###### kill 命令实现

```c
#include "sys/types.h"
#include "signal.h"
#include "unistd.h"
#include "stdio.h"
#include "stdlib.h"

int main(int argc,char *argv[])
{
	int sig;
	int pid;
	
	if(argc < 3)
	{
		printf("please input param");
		return -1;
	}
	
	sig = atoi(argv[1]);
	pid = atoi(argv[2]);
	
	printf("input sig=%d,pid=%d\n",sig,pid);
		
	// 调用系统调用函数 kill
	kill(pid,sig); 
		
	return 0;
}
```

##### raise 系统调用函数

###### int raise(int sig)

- 函数功能：向进程本身发送一个信号，相当于 kill(getpid(), sig)
- 函数参数：signo,要发送的信号值
- 返回值：成功返回0，出错返回 -1

raise告诉内核发送信号给自己，该进程干某些事。

```c
#include <stdio.h>
#include <signal.h>
#include <stdlib.h>
int main(void)
{
   printf("这是一个raise函数的应用实例\n");
   if(raise(SIGABRT) == -1)    //向进程本身发送SIGABRT信号失败
   {
     printf("调用raise函数失败!\n");   //提示发送失败，然后退出
     exit(1);
   }
   printf("raise发送SIGABRT信号没有成功!\n");   //如果进程被自己中止则不显示
   return 0;
}
```

##### alarm系统调用函数

###### unsigned int alarm(unsigned int seconds);

- 函数说明：
  - alarm 函数可设置定时器，当定时器超时，产生 SIGALRM 信号
  - 信号由内核产生，在指定的 seconds 秒之后，给**进程本身**发送一个 SIGALRM 信号。
  - 收到信号后的进程默认终止当前进程
  - 参数为 0，取消以前设置的定时器
  - alarm 发送定时结束后发送信号
- 返回值：
  - 0 或以前设置的定时器时间余留秒数

#### 信号的接收

接收信号的进程，要有什么条件，要想使接收的进程收到信号，这个进程不能结束

pause（睡眠）、sleep（睡眠）、while（挂起）

##### pause 系统调用函数

###### int pause(void);

使调用进程进入休眠状态，直到接收信号 signal 时中断。

返回值始终为-1

#### 信号的处理

接收信号的处理

##### signal 系统调用函数

###### void (*signal(int signum,void (*handler)(int)))(int);

> void (*handler)(int) 参数
>
> > 函数指针变量
> >
> > 含有一个整型参数，无返回值
>
> 第一个参数，信号值，告诉内核处理哪个信号
>
> 第二个参数，函数指针，告诉内核采用哪个处理方式
>
> 返回值，函数指针
>
> [信号处理方式](https://www.freesion.com/article/64521006466/)
>
>  [C 库函数 – signal() ](https://www.runoob.com/cprogramming/c-function-signal.html) 

###### 不同的处理方式

- 忽略  signal(SIGINT, SIG_IGN); 

  ```c
  
  #include<stdio.h>
  #include<signal.h>
            
  int main()
  {          
          signal(SIGINT,SIG_IGN); 
          int i;
          for( i = 0; i<10;++i)
          {
                  printf("hello world\n");
                  sleep(1); 
          }
          return 0;
  }
  ```

  

- 系统默认处理方式  signal(SIGINT, SIG_DFL); 

  ```c
  
  #include<stdio.h>
  #include<signal.h>
            
  int main()
  {             
          signal(SIGINT,SIG_DFL); 
          int i;
          for( i = 0; i<10;++i)
          {
                  printf("hello world\n");
                  sleep(1); 
          }
          return 0;
  }  
  ```

  

- 自定义指针   程序能够告诉内核，当程序到来时应该调用哪个函数。   signal(signum, functionname); 

  ```c
  
  #include<stdio.h>
  #include<signal.h>
            
  int main()
  {         
          void f(int);      
          signal(SIGINT,f); 
          int i;
          for( i = 0; i<10;++i)
          {
                  printf("hello world\n");
                  sleep(1); 
          }
          return 0;
  }   
  // 当前进程处理以下操作后结束该进程
  void f(int signum)
  {   
          printf("SIGINT\n");
  }
  ```

  signal 函数到达控制流转向信号处理器，从信号处理器返回后继续执行原来的控制流。

## IPC通信

### IPC的分类

- 消息队列：system V message queue
- 信号量：system V semphore
- 共享内存：system V share memory

### IPC对象的基本概念

支持不同的进程通过ipc对象通信，IPC对象是存储在内核之中，且全局可见。

- 每个IPC对象在内核之中有自己的数据结构，定义在各自头文件
- 如何引用IPC对象
  类似于普通文件是通过文件名（文件描述符）进行读写操作，通过IPC对象：IPC key和 IPC标识符进行IPC对象的读写操作。

#### IPC标识符

- 类似于文件描述符，可以用一个IPC标示符来引用一个IPC对象
- IPC对象描述符类似于文件描述符，是一个整数，是IPC对象的内部名字
- 当多个进程引用同一个IPC对象时，需要一个统一的外部名
- 类似于文件名，每个IPC对象与一个key相关联

#### IPC key

- IPC key，ipc对象的外部名，是一个独一无二的整数，用来确保ipc对象的唯一性
- 该整数类型为key_t,在sys/types.h中被定义为长整型
- 普通文件是通过open打开一个文件名，获得文件描述符；IPC队形是通过get可根据给定的key 去创建一个IPC对象，并返回IPC标识符

### IPC管理

ipcs 查看内核空间对象  

#### 查看IPC对象

 ipcs -m 

```shell
------ Shared Memory Segments --------
key        shmid      owner      perms      bytes      nattch     status      
0x0052e2c1 622592     postgres   600        41222144   34    
```

#### 删除IPC对象

 ipcrm -m id

### 共享内存

-  共享内存是在内存中单独开辟的一段内存空间
- 这段内存空间有自己特有的数据结构
- 包括访问权限、大小和最近访问的时间等。 
- 共享内存的数据读取后不会消失，即数据会一直存在，直到被删除或系统关闭

#### 共享内存的创建/打开

##### int shmget(ket_t key,int size,int shmflg);

- key : IPC_PRIVATE或ftok()的返回值
- size : 共享内存区的大小
- shmflg : 同open函数的权限位，也可以用8进制法
- 返回值 成功，共享内存段标识符ID 文件描述符 失败-1

##### 通信类型

通过IPC_PRIVATE创建的只能用于亲缘关系之间的通信，ftok()方式创建的可以用于无亲缘关系的通信。

#### 共享内存的映射/删除

##### void *shmat(int shmid,const void *shmaddr,int shmflg);

将进程的共享内存映射到用户空间

- 第一个参数 ID 号
- 第二个参数 映射的地址，NULL为系统自动完成的映射
- 第三个参数 shmflg : SHM_RDONLY共享内存只读，默认是0，表示共享内存可读写
- 返回值，成功，映射后的地址，失败NULL

##### int shmdt(const void *shmaddr);

将进程里的地址映射删除

- 参数共享内存映射后的地址
- 返回值，成功 0 ，失败 -1

