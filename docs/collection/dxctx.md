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

