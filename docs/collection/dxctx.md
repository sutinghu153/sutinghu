# Linux多线程

使用多线程的目的，是合理的利用资源，提高CPU的效率。

>  [进程、线程基础知识](https://zhuanlan.zhihu.com/p/158965214) 

## 什么是线程？

### 关于进程

一个正在执行的程序，它是**资源分配**的**最小单位**，进程中的事情都需要按一定的时间顺序进行执行。

### 关于线程

进程只能按顺序执行，有很多问题

1. 进程是资源拥有者，创建、销毁与切换存在较大的时空开销
2. 由于对称处理机（SMP）出现，可以满足多个运行单位，而多个进程并行开销过大

因此引入线程进行资源管理。

线程有时被**称为轻量级进程**，**程序执行的最小单位**，**系统独立调度和分配CPU的基本单位**，它是**进程中的一个实体**，**一个进程中可以有多个线程**，这些**线程共享进程的所有资源**，线程本身只包含一点必备的资源。

### 线程和进程的关系

1. 以进程为主的编码方式被称为单线程的编码方式
2. 进程是线程的映射，线程是资源的消耗者，线程和进程是多对一的关系
3. 线程是进程的基本单位
4. 进程可以有多个线程，这些线程共享进程的所有资源
5. 子进程创建时会拷贝父进程所有的资源

### 线程基本场景

#### 并发

在同一个时刻，只能有一条指令执行，但多进程模式下，指令能够快速轮换执行，使得在宏观上具有多个进程同时执行的效果。

- 看起来是同时发生
- 单核处理

#### 并行

在同一时刻，有多条指令在多个处理器上同时执行。

- 真正的同时发生
- 多核处理

#### 同步

彼此有依赖的调用不应该同时发生，而同步就是阻止那些”同时发生“的事。因此同步需要确定一些机制，来实现这个目的。

#### 异步

异步和同步是相对的，表示任何两个彼此独立的操作是独立的，表明事情的发生独立性。

### 多线程的优势

1. 在多处理器中开发程序的并行性
2. 在等待慢速IO操作时，程序可以执行其它操作，提高并发性
3. 模块化的编程，能更清楚的表单程序独立事件的关系，结构清晰
4. 占用较少的系统资源（相对于多进程而言）
5. 多线程不一定需要多处理器

## 线程的周期

### 查看线程ID



> 多线程头文件存在于以下目录
>
> /usr/include/bits/pthreadtypes.h

- 线程ID : 无符号整数

  ```c
  typedef unsigned long int pthread_t;
  ```

- 获取线程ID和进程ID的区别

|            |           线程            |     进程     |
| :--------: | :-----------------------: | :----------: |
| 标识符类型 | pthread_t    无符号长整型 |  **pid_t**   |
|   获取ID   |      pthread_self();      |  getpid();   |
|    创建    |     pthread_create();     | fork( void); |

**查看进程、线程ID实例**

```c
#include "stdio.h"
#include "pthread.h"
#include "string.h"
#include "stdlib.h"
#include "unistd.h"
#include "sys/types.h"

int main()
{
        pthread_t self;
        pid_t pid;
        pid = getpid();
        self = pthread_self();
        printf("pid is %u,self is %u",pid,self);
        return 0;
}
```

### 创建一个线程

- 创建线程的方法

  ```c
  #include<phread.h>
  
  int pthread_create(pthread_t *id , pthread_attr_t *attr, void(*fun)(void*), void *arg);
  ```

  - id ：传递一个pthread_t类型的变量的地址，创建成功后，用来获取新创建的线程的TID

  - attr：指定线程的属性 默认使用NULL 表示线程的调度策略、继承性、分离性

  - fun：线程函数的地址，回调函数（新线程要执行的函数）

  - arg：传递给线程函数的参数（回调函数的参数，多参数使用结构体传递）

  - 返回值，成功返回0，失败返回错误码

    - usr/include/asm-generic/errno.h 包含了所有的错误码

      ```c
      #define	EDEADLK		35	/* Resource deadlock would occur */
      #define	ENAMETOOLONG	36	/* File name too long */
      #define	ENOLCK		37	/* No record locks available */
      #define	ENOSYS		38	/* Function not implemented */
      #define	ENOTEMPTY	39	/* Directory not empty */
      #define	ELOOP		40	/* Too many symbolic links encountered */
      #define	EWOULDBLOCK	EAGAIN	/* Operation would block */
      #define	ENOMSG		42	/* No message of desired type */
      #define	EIDRM		43	/* Identifier removed */
      #define	ECHRNG		44	/* Channel number out of range */
      #define	EL2NSYNC	45	/* Level 2 not synchronized */
      #define	EL3HLT		46	/* Level 3 halted */
      #define	EL3RST		47	/* Level 3 reset */
      #define	ELNRNG		48	/* Link number out of range */
      #define	EUNATCH		49	/* Protocol driver not attached */
      #define	ENOCSI		50	/* No CSI structure available */
      #define	EL2HLT		51	/* Level 2 halted */
      #define	EBADE		52	/* Invalid exchange */
      #define	EBADR		53	/* Invalid request descriptor */
      #define	EXFULL		54	/* Exchange full */
      #define	ENOANO		55	/* No anode */
      #define	EBADRQC		56	/* Invalid request code */
      #define	EBADSLT		57	/* Invalid slot */
      
      #define	EDEADLOCK	EDEADLK
      
      #define	EBFONT		59	/* Bad font file format */
      #define	ENOSTR		60	/* Device not a stream */
      #define	ENODATA		61	/* No data available */
      #define	ETIME		62	/* Timer expired */
      #define	ENOSR		63	/* Out of streams resources */
      #define	ENONET		64	/* Machine is not on the network */
      #define	ENOPKG		65	/* Package not installed */
      #define	EREMOTE		66	/* Object is remote */
      #define	ENOLINK		67	/* Link has been severed */
      #define	EADV		68	/* Advertise error */
      #define	ESRMNT		69	/* Srmount error */
      #define	ECOMM		70	/* Communication error on send */
      #define	EPROTO		71	/* Protocol error */
      #define	EMULTIHOP	72	/* Multihop attempted */
      #define	EDOTDOT		73	/* RFS specific error */
      #define	EBADMSG		74	/* Not a data message */
      #define	EOVERFLOW	75	/* Value too large for defined data type */
      #define	ENOTUNIQ	76	/* Name not unique on network */
      #define	EBADFD		77	/* File descriptor in bad state */
      #define	EREMCHG		78	/* Remote address changed */
      #define	ELIBACC		79	/* Can not access a needed shared library */
      #define	ELIBBAD		80	/* Accessing a corrupted shared library */
      #define	ELIBSCN		81	/* .lib section in a.out corrupted */
      #define	ELIBMAX		82	/* Attempting to link in too many shared libraries */
      #define	ELIBEXEC	83	/* Cannot exec a shared library directly */
      #define	EILSEQ		84	/* Illegal byte sequence */
      #define	ERESTART	85	/* Interrupted system call should be restarted */
      #define	ESTRPIPE	86	/* Streams pipe error */
      #define	EUSERS		87	/* Too many users */
      #define	ENOTSOCK	88	/* Socket operation on non-socket */
      #define	EDESTADDRREQ	89	/* Destination address required */
      #define	EMSGSIZE	90	/* Message too long */
      #define	EPROTOTYPE	91	/* Protocol wrong type for socket */
      #define	ENOPROTOOPT	92	/* Protocol not available */
      #define	EPROTONOSUPPORT	93	/* Protocol not supported */
      #define	ESOCKTNOSUPPORT	94	/* Socket type not supported */
      #define	EOPNOTSUPP	95	/* Operation not supported on transport endpoint */
      #define	EPFNOSUPPORT	96	/* Protocol family not supported */
      #define	EAFNOSUPPORT	97	/* Address family not supported by protocol */
      #define	EADDRINUSE	98	/* Address already in use */
      #define	EADDRNOTAVAIL	99	/* Cannot assign requested address */
      #define	ENETDOWN	100	/* Network is down */
      #define	ENETUNREACH	101	/* Network is unreachable */
      #define	ENETRESET	102	/* Network dropped connection because of reset */
      #define	ECONNABORTED	103	/* Software caused connection abort */
      #define	ECONNRESET	104	/* Connection reset by peer */
      #define	ENOBUFS		105	/* No buffer space available */
      #define	EISCONN		106	/* Transport endpoint is already connected */
      #define	ENOTCONN	107	/* Transport endpoint is not connected */
      #define	ESHUTDOWN	108	/* Cannot send after transport endpoint shutdown */
      #define	ETOOMANYREFS	109	/* Too many references: cannot splice */
      #define	ETIMEDOUT	110	/* Connection timed out */
      #define	ECONNREFUSED	111	/* Connection refused */
      #define	EHOSTDOWN	112	/* Host is down */
      #define	EHOSTUNREACH	113	/* No route to host */
      #define	EALREADY	114	/* Operation already in progress */
      #define	EINPROGRESS	115	/* Operation now in progress */
      #define	ESTALE		116	/* Stale file handle */
      #define	EUCLEAN		117	/* Structure needs cleaning */
      #define	ENOTNAM		118	/* Not a XENIX named type file */
      #define	ENAVAIL		119	/* No XENIX semaphores available */
      #define	EISNAM		120	/* Is a named type file */
      #define	EREMOTEIO	121	/* Remote I/O error */
      #define	EDQUOT		122	/* Quota exceeded */
      
      #define	ENOMEDIUM	123	/* No medium found */
      #define	EMEDIUMTYPE	124	/* Wrong medium type */
      #define	ECANCELED	125	/* Operation Canceled */
      #define	ENOKEY		126	/* Required key not available */
      #define	EKEYEXPIRED	127	/* Key has expired */
      #define	EKEYREVOKED	128	/* Key has been revoked */
      #define	EKEYREJECTED	129	/* Key was rejected by service */
      
      /* for robust mutexes */
      #define	EOWNERDEAD	130	/* Owner died */
      #define	ENOTRECOVERABLE	131	/* State not recoverable */
      
      #define ERFKILL		132	/* Operation not possible due to RF-kill */
      
      #define EHWPOISON	133	/* Memory page has hardware error */
      
      #endif
      
      ```

  - 创建线程的使用

**代码示例**

```c
include "stdio.h"
#include "pthread.h"
#include "string.h"
#include "stdlib.h"
#include "unistd.h"
#include "sys/types.h"

void print_id(char *name)
{
        pid_t pid;
        pthread_t tid;
        pid = getpid();
        tid = pthread_self();
        printf("%s pid is %u , tid is %u\n",name,pid,tid);
}

void *thread_fun(void *arg)
{
        print_id(arg);
        return (void *)0;
}

int main()
{
        pthread_t self;
        int err;
        err = pthread_create(&self,NULL,thread_fun,"new thread name is sutinghu");

        if(err!=0)
        {
                printf("thread create failure\n");
                return -1;
        }

        print_id("main thread:");
        sleep(2);
        return 0;
}
```

**结果**

```shell
[root@localhost test]# ./thread_create 
main thread: pid is 14794 , tid is 1560885056
new thread name is sutinghu pid is 14794 , tid is 1552488192
```

### 线程的生命周期

主函数中的 ```main``` 方法也是一个线程，它被称为**主线程** 。

>  [Linux线程生命周期与状态 ](https://zhuanlan.zhihu.com/p/175943809) 

#### 生命周期

1. 当```C程序运```行时，首先运行```main```函数，在线程代码中，这个特殊的执行流程被称为 **初始线程 或 主线程**。
2. 主线程的特殊性在于，它在```main函数```返回的时候，会导致进程结束，进程内所有的线程都会结束。
3. 在主线程中使用 ```pthread_exit()``` 函数，这样进程会等待所有线程结束时终止
4. 主线程接受参数的方式是通过 ```argc``` 和````argv``` 普通的线程只有一个参数```void*```
5. 在绝大多数情况下，主线程在默认堆栈上运行，这个堆栈可以增长到足够的长度，而普通的线程的堆栈是受限制的，一旦溢出就会出错。
6.  主线程和其他子线程获取在整个CPU时钟周期中**获得资源调度的程度是均等**的,也就是说所有线程默认状态下是**异步独立**运行的。 
7. 主线程是随着进程的创建而创建
8. 其它线程可以通过调用函数来创建，主要调用 pthread_create
9. 新线程可能在当前线程从函数 pthread_create 返回之前就已经运行了，甚至新线程可能在当前线程从pthread_create返回之前就已经运行完毕了

#### 线程状态

- **就绪**：等待可用的CPU资源，其他条件一切准备好。当线程被pthread_create创建时或者阻塞状态结束后就处于准备状态。

- **运行** ：线程已经获得CPU的使用权，并且正在运行，在多核心的机器中同时存在多个线程正在运行。如果这种情况不加以控制，会造成整个程序没响应。

- **阻塞**：指一个线程在执行过程中暂停，以等待某个条件的触发。

- - 例如线程可能在处理有关I/O的任务，可能I/O设备繁忙尚未响应或没有可用的I/O缓存。
  - 也可能当前线程等待一个可用的条件便来变量。
  - 错误地对一个已被锁住的互斥量加锁
  - 调用sigwait等待尚未发生的信号。

- **终止**：线程已经从回调函数中返回，或者调用pthread_exit返回，或者被强制终止。

<img :src="$withBase('/imags/xc_smzq.png')" alt="xc_smzq">

#### 线程的回收

1. 线程默认是 非分离的
2. 具有分离性的线程，终止时会立刻被回收，回收将释放所有线程终止时来释放的系统资源
3. 线程占用的程序资源，需要自己释放
4. 没有被分离的线程在终止时，保留了虚拟内存及系统资源，这种线程被称为僵尸线程

## 线程的控制

线程的控制是指通过一些特定的函数对线程进行终止、连接、取消、清除等操作。

### 线程终止

- exit 是危险的

  - 如果进程中的任意一个线程调用了exit，_Exit， _exit，那么整个进程就会终止。

- 普通的单个线程有3种方式退出（不会终止进程）

  - 从启动例程中返回，返回值是线程的退出码

  - 线程可以被同一进程中的其它线程取消

  - 线程调用pthread_exit(void *rval) 函数，rval是退出码

    ```c
    void pthread_exit(void *retval);
    函数总数成功的
    ```

    ```c
    #include "stdio.h"
    #include "pthread.h"
    #include "string.h"
    #include "stdlib.h"
    #include "unistd.h"
    #include "sys/types.h"
    
    void *thread_fun(void *arg)
    {
            if(strcmp("1",(char *)arg)==0)
            {
                    printf("new thread return\n");
                    return (void *) 1;
            }
            if(strcmp("2",(char *)arg)==0)
            {
                    printf("new thread pthread_exit\n");
                    pthread_exit((void *)2);
            }
            if(strcmp("3",(char *)arg)==0)
            {
                    printf("new thread exit\n");
                    exit(3);
            }
    }
    
    int main(int argc,char *argv[])
    {
            int err;
            pthread_t self;
            err = pthread_create(&self,NULL,thread_fun,(void *)argv[1]);
            if(err!=0)
            {
                    printf("create new thread failed\n");
                    return -1;
            }
            sleep(2);
            return 0;
    }
    ```

### 线程链接 

```c
int pthread_join(pthread_t tid,void *rval);
pthread_t tid //指定线程的tid
void *rval //参数的rval是指定线程的返回码，如果线程被取消，那么rval是PTHREAD_CANCELED
// 返回值：成功0 失败错误码
```

-  使一个线程等待另一个线程结束 ， 代码中如果没有pthread_join，主线程会很快结束从而使整个进程结束，从而使创建的线程没有机会开始执行就结束了。
- 加入pthread_join后，主线程会一直等待直到等待的线程结束自己才结束，使创建的线程有机会执行。
- 调用该函数会一直阻塞，直到指定的线程tid调用pthread_exit从启动例程返回或者被取消
- 调用该函数会使指定线程处于分离状态，如果指定线程已经处于分离状态，那么调用就会失败

```c
int pthread_detach(pthread_t thread);
thread // 线程tid
```

- 该函数可以分离一个线程
- 成功返回0 失败返回错误码

**函数test**

```c
#include "stdio.h"
#include "pthread.h"
#include "string.h"
#include "stdlib.h"
#include "unistd.h"
#include "sys/types.h"
void *thread_fun1(void *arg)
{
	printf("i am thread one\n");
	return(void *)1;
}
void *thread_fun2(void *arg)
{
	printf("i am thread two");
	pthread_detach(pthread_self());
	pthread_exit((void *)2);
}
int main()
{
	int err1,err2;
	pthread_t self1,self2;
	void *rval1, *rval2;
	err1 = pthread_create(&self1,NULL,thread_fun1,NULL);
	err2 = pthread_create(&self2,NULL,thread_fun2,NULL);
	if(err1 || err2)
	{
		printf("create new thread failed\n");
		return 0;
	}
	printf("my name is main thread successed!\n");

	printf("join1 return code is %d\n ",pthread_join(self1,&rval1));
	printf("join2 return code is %d\n ",pthread_join(self2,&rval2));

	printf("thread1 exit code is %d\n",(int *)rval1);
	printf("thread2 exit code is %d\n",(int *)rval2);
	printf("my name is main thread successed!\n");	
	return 0;
}
```

**结果**

```shell
[root@localhost test]# gcc -lpthread -o join join.c 
[root@localhost test]# ./join 
my name is main thread successed!
i am thread twoi am thread one
join1 return code is 0
 join2 return code is 22
 thread1 exit code is 1
thread2 exit code is 0
my name is main thread successed!
```

### 线程取消

取消只是发送一个去请求，使得线程处于就绪状态，并不是使得线程终止。

```c
int pthread_cancel(pthread_t tid);
// tid 待取消的指定的线程
// 成功返回0 
```

```c
int pthread_setcancelstate(int state,int *oldstate);
```

- 设置线程对cancel信号的反应
- state 有两种方式
  - PTHREAD_CANCEL_ENABLE（缺省）
  - PTHREAD_CANCEL DISABLE

取消线程的类型，是线程对取消信号的响应方式，立即取消或者延时取消，线程创建时**默认延时取消**。延时取消是到取消点再取消。

```c
int pthread_setcanceltype(int type,int *oldtype);
```

**关于取消点**

取消一个线程，它通常需要被取消线程的配合，线程在很多时候会查看自己是否有取消请求，如果有就主动退出，这些查看是否有取消的地方称为取消点。

很多时候都有查看的动作：

- pthread_join()
- pthread_testcancel()
- pthread_cond_wait()
- pthread_timedwait()
- sem_wait()
- sigwait()
- write
- read
- 大多数的系统阻塞调用

### 信号处理

>  [(linux多线程信号处理](https://blog.csdn.net/lsjseu/article/details/51823468) 

#### pthread_kill

```c
int pthread_kill(pthread_t tid,int sig);
```

- 不会杀掉线程，而是发送一个信号量
- tid 要发送信号的线程tid
- sig 信号 0是保留信号，作用是用来判断线程是不是还活着
- 返回值
  - 成功 0
  - 线程不存在 ESRCH
  - 线程不合法 EINVAL

```c
int kill_rc = pthread_kill(thread_id,0);
if(kill_rc == ESRCH)
printf("the specified thread did not exists or already quit\n");
else if(kill_rc == EINVAL)
printf("signal is invalid\n");
else
printf("the specified thread is alive\n");
```

#### 信号处理

```c
int sigaction(int signum,const struct sigaction *act,struct sigaction *oldact);
```

给信号signum设置一个处理函数，处理函数在sigction中指定

act.sa_mask 信号屏蔽字

act.sa_handler 信号集处理程序

int sigemptyset(sigset_t *set);清空信号集

int sigfillset(sigset_t *set);将所有信号加入信号集

int sigaddset(sigset_t *set,int signum);增加一个信号到信号集

int sigdelset(sigset_t *set,int signum);删除一个信号到信号集

## 线程的同步

### 互斥量

 互斥量是另一种用于多线程中的同步访问方法，它允许程序锁住某个对象，使得每次只能有一个线程访问它。为了控制对关键代码的访问，必须在进入这段代码之前锁住一个互斥量，然后在完成操作之后解锁。 

#### 为什么要使用互斥量

使用互斥量可以确保**线程同步**。

**寄存器处理数据+1操作一般分为三步**

- 从内存读变量值到寄存器
- 寄存器的值加1
- 将寄存器的值写回内存

<img :src="$withBase('/imags/dxc_tbswt.png')" alt="dxc_tbswt">

 当多个线程共享相同的内存时，需要每一个线程看到相同的视图。当一个线程修改变量时，其它线程也可以读取或者修改这个变量，就需要对这些线程进行同步操作，确保访问的变量不会混乱无效出错。 

#### 互斥锁的初始化、上锁、解锁、销毁

- 互斥量是```pthread_mutex_t```类型的变量。
- 互斥量有两种状态：```lock（上锁）```、```unlock（解锁）```
- 当对一个互斥量加锁后，其他任何试图访问互斥量的线程都会被堵塞，直到当前线程释放互斥锁上的锁。
- 如果释放互斥量上的锁后，有多个堵塞线程，这些线程只能按一定的顺序得到互斥量的访问权限，完成对共享资源的访问后，要对互斥量进行解锁，否则其他线程将一直处于阻塞状态。

```c
#include <pthread.h>

//pthread_mutex_t是锁类型，用来定义互斥锁
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

//互斥锁的初始化
//restrict，C语言中的一种类型限定符，用于告诉编译器，对象已经被指针所引用，不能通过除该指针外所有其他直接或间接的方式修改该对象的内容。 第二个参数一般为NULL
int pthread_mutex_init(pthread_mutex_t *restrict mutex, const pthread_mutexattr_t *restrict attr);

//上锁
int pthread_mutex_lock(pthread_mutex_t *mutex);

//判断是否上锁
//返回值：0表示已上锁，非0表示未上锁。
int pthread_mutex_trylock(pthread_mutex_t *mutex);

//解锁 
int pthread_mutex_unlock(pthread_mutex_t *mutex);

//销毁互斥锁
int pthread_mutex_destroy(pthread_mutex_t *mutex);
```

函数test

```c
#include <stdio.h>
#include <stdlib.h>
#include <windows.h>
#include <iostream>
#include <queue>

#include "include/pthread.h"

#ifndef _WIN64
#pragma comment(lib,".\\lib32\\pthreadVC2.lib")
#else
#pragma comment(lib,".\\lib64\\pthreadVC2.lib")
#endif 

/*
4、	互斥量用pthread_mutex_t类型的数据表示，在使用之前需要对互斥量初始化
1）、如果是动态分配的互斥量，在申请内存(malloc)之后, 可以调用pthread_mutex_init（）函数初始化
2）、如果是静态分配的互斥量，不需要调用 pthread_mutex_init() 函数。还可以把它置为常量PTHREAD_MUTEX_INITIALIZER
3）、动态分配的互斥量在释放内存之前需要调用pthread_mutex_destroy（）
*/

pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
struct queue {
	int len;
	int write_pos;
	int read_pos;
	int data[50];
};

struct queue *queue_init()
{
	struct queue *que;
	//申请内存
	que = (struct queue *)malloc(sizeof(struct queue));
	if (que == NULL)
	{
		printf("malloc failed\n");
		return NULL ;
	}

	//初始化
	que->len = 0;
	que->write_pos = 0;
	que->read_pos = 0;

	return que;
}

void queue_destroy(struct queue *que)
{
	//销毁互斥量和que
	pthread_mutex_destroy(&mutex);
	free(que);
}

void *queue_add(void *arg)
{
	struct queue *que = (struct queue *)arg;
	int buf = 0;
	while (buf < 50)
	{
		pthread_mutex_lock(&mutex);
		que->data[que->write_pos] = buf;
		que->write_pos++;
		que->len++;
		buf++;
		printf("write data %d   to   queue\n", que->data[que->write_pos - 1]);

		pthread_mutex_unlock(&mutex);
		Sleep(1);
	}
	return (void*)0;
}

void *queue_del(void *arg)
{
	struct queue *que = (struct queue *)arg;
	int buf = 0;
	while (1)
	{
		Sleep(2);
		pthread_mutex_lock(&mutex);
		buf = que->data[que->read_pos];
		que->read_pos++;
		if (que->len-- == 0)
		{
			printf("queue is empty\n");
			return (void*)0;
		}
		buf++;
		printf("read  data %d   from queue\n", que->data[que->read_pos - 1]);
		pthread_mutex_unlock(&mutex);
	}
}

int main()
{
	pthread_t tid1, tid2;
	int err;
	struct queue *que;

	//队列和锁都要初始化
	que = queue_init();

	//如果是静态分配的互斥量，不需要调用 pthread_mutex_init() 函数。
	//还可以把它置为常量PTHREAD_MUTEX_INITIALIZER
	/*err = pthread_mutex_init(&mutex, NULL);
	if (err)
	{
		printf("mutex init failed\n");
		free(que);
		return 0;
	}
*/
	err = pthread_create(&tid1, NULL, queue_add, (void *)que);
	if (err)
	{
		printf("create add thread failed\n");
		queue_destroy(que);
		return 0;
	}

	err = pthread_create(&tid2, NULL, queue_del, (void *)que);
	if (err)
	{
		printf("create del thread failed\n");
		queue_destroy(que);
		return 0;
	}

	//等待增加和删除操作完成
	pthread_join(tid1, NULL);
	pthread_join(tid2, NULL);

	//销毁
	queue_destroy(que);


	return 0;
}
```

#### 死锁的情况

- 同一个线程已拥有A锁的情况下，再次请求获取A锁，导致线程阻塞
  解决方法：使用完资源后立刻解锁
- 线程一拥有A锁，再次请求获取B锁，同时线程二拥有B锁，请求获取A锁，导致线程阻塞
  解决方法：当拥有锁的情况下，请求获取另外一把锁失败时，释放已拥有的锁

### 读写锁

#### 读写锁与互斥锁的区别

互斥量可以使得多线程并行，但是带来了新的问题， 即同一时刻只有一个线程能运行，其他竞争不到互斥量的线程会被阻塞，这就阻碍了程序的并行性。

 读写锁与互斥量类似，不过读写锁有更高的并行性。对于一个变量的读操作，完全可以让多个线程同时进行操作，多个读操作同时进行不会改变数据。 

#### 读写锁的状态

 读写锁非常适合对数据结构读次数大于写次敌的程序，当它以读模式锁住时，是以共享的方式锁住的;当它以写模式谈住时,是以独占的模式谈住的。 

- 读模式下加锁
  -  多个线程可以同时占有读模式的读写锁
  -   所有试图以读模式对其加锁的线程都会获得访问权，但是如果线程希望以写模式对其加锁，它必须阻塞直到所有的线程释放锁 
- 写模式下加锁
  - 一次只有一个线程可以占有写模式下的读写锁
  - 读写锁在写加锁状态时，在它被解锁之前，所有试图对这个锁加锁的线程都会阻塞
  -  线程试图以写模式对其加锁，那么读写锁会阻塞随后的读模式锁请求 
- 不加锁

#### 读写锁的初始化和销毁

**读写锁在使用之前必须初始化**

```c
int pthread_rwlock_init(pthread_rwlock_t *restrict rwlock, const pthread_rwlockattr_t *restrict attz);
```

 成功返回0﹐共败返回错误码 

**使用完需要销毁**

```c
int pthread_rwlock_destroy(pthread_rwlock_t *rwlock);
```

 成功返回0﹐共败返回错误码 

#### 读模式加锁

```c
NAME
       pthread_rwlock_rdlock, pthread_rwlock_tryrdlock — lock a read-write lock object for reading

SYNOPSIS
       #include <pthread.h>

       int pthread_rwlock_rdlock(pthread_rwlock_t *rwlock);
       int pthread_rwlock_tryrdlock(pthread_rwlock_t *rwlock);
```

#### 写模式加锁

```c
NAME
       pthread_rwlock_trywrlock, pthread_rwlock_wrlock — lock a read-write lock object for writing

SYNOPSIS
       #include <pthread.h>

       int pthread_rwlock_trywrlock(pthread_rwlock_t *rwlock);
       int pthread_rwlock_wrlock(pthread_rwlock_t *rwlock);
```

#### 读写锁的解锁

```c
NAME
       pthread_rwlock_unlock — unlock a read-write lock object

SYNOPSIS
       #include <pthread.h>

       int pthread_rwlock_unlock(pthread_rwlock_t *rwlock);
```

#### 函数实例

```c
#include <iostream>
#include <pthread.h>
#include <unistd.h>

using namespace std;

pthread_rwlock_t rwlock;

int shared_num = 100;

void* thread_fun1(void *arg)
{
  pthread_rwlock_wrlock(&rwlock);
  cout << "thread 1: " << shared_num << endl;
  sleep(2);
  pthread_rwlock_unlock(&rwlock);

  return (void*)1;
}

void* thread_fun2(void *arg)
{
  pthread_rwlock_rdlock(&rwlock);
  cout << "thread 2: " << shared_num << endl;
  sleep(2);
  pthread_rwlock_unlock(&rwlock);
  return (void*)1;
}

int main()
{
  pthread_t tid1, tid2;

  pthread_rwlock_init(&rwlock, NULL);

  pthread_create(&tid1, NULL, thread_fun1, NULL);

  pthread_create(&tid2, NULL, thread_fun2, NULL);

  pthread_join(tid1, NULL);
  pthread_join(tid2, NULL);

  pthread_rwlock_destroy(&rwlock);

  return 0;
}
```

### 条件变量

#### 为什么需要条件变量

> 1. 有一个IO请求队列，入队线程不断的往队列里面push_back请求，出队线程不断的从队列里面pop_front请求。
>
> 
>
> 2. 入队线程在push_back的时候要独占队列，出队线程在pop_front的时候也要独占队列。
>
> 
>
> 3. 如果在某一时刻，入队线程抢到了互斥量，但是发现队列是满的，自己不断的轮询查询队列是否非满状态这样很消耗CPU资源，也导致无意义的占用锁资源。
>
> 
>
> 4. 出队线程由于拿不到互斥量，一直阻塞。这样会导致程序僵死或者时间消耗变大。
>
> 
>
> 5. 换句话说就是当线程拿到锁之后，如果发现不满足自己的执行条件就应该立即释放锁，并阻塞在当前位置，等待满足自己的执行条件时，通过某种途径来唤醒它继续运行。
>
> >  如，入队线程查询到队列是满的时候，就应该释放锁，出队线程开始工作消耗队列。
>
> 这时我们引入条件变量来解决这种场景。 

#### 条件队列的初始化、销毁

 **条件变量的申明：pthread_cond_t cond;** 

```c
NAME
       pthread_cond_init — initialize condition variables

SYNOPSIS
       #include <pthread.h>

       int pthread_cond_init(pthread_cond_t *restrict cond,
           const pthread_condattr_t *restrict attr);
```

 第一个参数是创建的条件变量，第二个参数是属性，默认为NULL 

```c
NAME
       pthread_cond_destroy — destroy condition variables

SYNOPSIS
       #include <pthread.h>

       int pthread_cond_destroy(pthread_cond_t *cond);
```

#### 条件队列的使用

```c
NAME
       pthread_cond_wait — wait on a condition

SYNOPSIS
       #include <pthread.h>

       int pthread_cond_wait(pthread_cond_t *restrict cond,
           pthread_mutex_t *restrict mutex);
```

-  需要等待条件为真，即等待传入的第一个参数cond，执行pthread_cond_wait函数的线程会阻塞，直到cond条件为真，线程恢复运行。

- 第二个参数互斥量mutex，就是线程在还没发现是否满足自己条件时加的锁，在pthread_cond_wait函数里面进行释放。当条件满足时，继续对互斥量加锁，线程就可以在满足自己条件的情况下继续往下执行。

- 这一系列动作都由pthread_cond_wait在完成。

  

   

```c
NAME
       pthread_cond_timedwait — wait on a condition

SYNOPSIS
       #include <pthread.h>

       int pthread_cond_timedwait(pthread_cond_t *restrict cond,
           pthread_mutex_t *restrict mutex,
           const struct timespec *restrict abstime);
```

-  在等待条件变量cond为真的过程中增加等待时间，超过等待时间就不等了，直接返回。 

**当条件满足时，需要唤醒等待条件变量的线程：**

```cpp
NAME
       pthread_cond_broadcast, pthread_cond_signal — broadcast or signal a condition

SYNOPSIS
       #include <pthread.h>

       int pthread_cond_broadcast(pthread_cond_t *cond);
       int pthread_cond_signal(pthread_cond_t *cond);
```

唤醒等待条件变量的线程有两个函数：

- pthread_cond_broadcast唤醒等待条件变量的所有线程。
- pthread_cond_signal至少唤醒等待条件变量的某一个线程，至于唤醒哪一个线程由系统的调度机制决定

#### 函数实例

```c
#include <iostream>
#include <pthread.h>
#include <unistd.h>
#include <list>

using namespace std;

pthread_mutex_t lock; //入队,出队之前要加独占锁
pthread_cond_t cond; //条件变量

list<int> _queue; //请求队列
#define queue_max_size 5 //队列最大存放请求个数

void _enqueue(int op)
{
  pthread_mutex_lock(&lock);
  if(_queue.size() >= 5){
    cout << "current queue is full, please wait" << endl;
    pthread_cond_wait(&cond, &lock); //队列满了就阻塞这里,并释放互斥量,等待条件变量唤醒
  }
  _queue.push_back(op);
  pthread_mutex_unlock(&lock);

}
int _dequeue()
{
  int op;
  pthread_mutex_lock(&lock);
  if(_queue.empty()){
    cout << "current queue is empty" << endl;
  }else {
    op = _queue.front();
    _queue.pop_front();
    pthread_cond_signal(&cond); //通知条件变量满足条件了,唤醒因为这个条件变量阻塞的线程
  }
  pthread_mutex_unlock(&lock);
  return op;
}
//入队线程工作函数
void* enqueue_op(void* arg)
{
  int n = 1;//每次入队的内容是一个整数
  while(true){
    sleep(1); //控制每秒入队一个请求
    _enqueue(n);
    cout << "op enqueue success: " << n << endl;
    n++;
  }

  return NULL;
}
//出队线程工作函数
void* dequeue_op(void* arg)
{
  int op; //每次出队的请求
  while(true){
    sleep(2); //控制每秒出队一个请求
    op = _dequeue();
    cout << "op dequeue success " << op << endl;
  }

  return NULL;
}
int main(int args, const char **argv)
{
	// 初始化互斥量和条件变量 
  pthread_mutex_init(&lock, NULL);
  pthread_cond_init(&cond, NULL);

	// 定义两个线程变量 
  pthread_t th_enqueue, th_dequeue;
	//入队线程
  pthread_create(&th_enqueue, NULL, enqueue_op, NULL);
  	// 出队线程
  pthread_create(&th_dequeue, NULL, dequeue_op, NULL);

  //等待子线程值执行完成
  pthread_join(th_enqueue, NULL);
  pthread_join(th_dequeue, NULL);
  //销毁资源
  pthread_mutex_destroy(&lock);
  pthread_cond_destroy(&cond);
  return 0;
}
```



