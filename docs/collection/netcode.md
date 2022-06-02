# Linux网络编程

>  [网络协议与套接字编程 ](https://mp.weixin.qq.com/s/4EqKdrqVmD92HsFkpaOOiA) 

### 互联网链接

客户端-服务器端建立通信链接，可以建立多对一的链接。

端与端之间进行通信。

1. 网络采用的是分而治之的策略设计，将网络的功能划分为不同的模块，以分层的形式有机的组合在一起
2. 每层实现不同的功能，内部实现方法对外部其它层次来说是透明的，每层向上提供服务，同时使用下层提供的服务
3. 网络体系结构指网络的层次结构和每层使用协议的集合
4. 体系结构中有两类是最基本的
   1. OSI
   2. TCP/IP
5. 通信五要素
   1. 本地地址
   2. 本地端口
   3. 远程地址
   4. 远程端口

### 网络拓扑

#### 局域网

<img :src="$withBase('/imags/1652425466883.png')" alt="652425466883">

#### 广域网拓扑

<img :src="$withBase('/imags/1652425595535.png')" alt="1652425595535">

## 网络传输模型

### 网络模型分层

- OSI七层模型：物、数、网、传、会、表、应

- TCP/IP 4层模型：网（链路层/网络接口层）、网、传、应

- - 应用层：http、ftp、nfs、ssh、Telnet。。。
  - 传输层：TCP、UDP
  - 网络层：IP、ICMP、IGMP
  - 链路层：以太网帧协议、ARP

#### ISO模型模块化分层

<img :src="$withBase('/imags/qgcsc.png')" alt="qgcsc">

#### ISO7层模型的功能

<img :src="$withBase('/imags/tcp_3.png')" alt="tcp_3">

#### TCP/IP 各层的传输协议

<img :src="$withBase('/imags/tcp.png')" alt="tcp">

#### TCP/IP 端到端的过程

<img :src="$withBase('/imags/tcp_4.png')" alt="tcp_4">

#### 数据的封装和传递过程

<img :src="$withBase('/imags/tcp_5.png')" alt="tcp_5">

#### 什么是TCP

- 传输控制协议
- 向用户进程提高可靠的全双工字节流
- 数据可靠性要求高、传输量大的需求

#### 什么是UDP

User DataGram Protocol 用户数据报协议

##### 特点

- 用户数据报协议
- 无连接的不可靠的
- 协议用于实时性高、对可靠性要求低

#### 进行通信

- c-s模型

  - client server模型

    | server   | 解释                 | client   | 解释         |
    | -------- | -------------------- | -------- | ------------ |
    | socket   | 链接网络             | socket   | 链接网络     |
    | bind     | 绑定请求             | connect  | 发送请求     |
    | recvfrom | 阻塞数据（处理）     | sendto   | 发送数据     |
    | accept   | 接收请求             |          |              |
    | sendto   | 返回数据（服务应答） | recvfrom | 服务应答接收 |
    | close    | 关闭                 | close    | 关闭         |

- socket

  - 函数

  ```c
  #include "sys/types.h"
  #include "sys/socket.h"
  
  int socket(int domain,int type, int protocol);
  ```

  - 功能
    - 创建套接字
  - 参数
    - int domain 地址族 网际协议版本 IPV4/IPV6
      - AF_INEF    IPV4
      - AF_INET6  IPV6
    - int type  套接字类型
      - SOCK_STREAM 字节流 ，流式套接字 TCP
      - SOCK_DGRAM 数据报流，数据报套接字 UDP
    - int protocol 协议编号
      - 0 表示默认，系统根据参数2 自动查找协议号
    - 返回值
      - 成功返回 套接字的描述符，用来定义唯一的标识
      - 失败返回 -1
  - test

  ```c
  #include "stdlib.h"
  #include "stdio.h"
  #include "sys/types.h"
  #include "sys/socket.h"
  int main()
  {
  	int sockfd = socket(AF_INET,SOCK_DGRAM,0);
  	if (sockfd<0)
  	{
  		perror("socket");
  		exit(-1);
  	}
  	printf("succeed sockfd = %d\n",sockfd);
  }
  ```

- connect() (bind)

  - 函数

    ```c
    int connect(int sock, struct sockaddr *serv_addr, socklen_t addrlen);  
    ```

  - 参数

    - sock socket文件描述符

    - addr sockaddr结构体变量指针

      - 结构体

        ```c
        struct sockaddr_in{
            sa_family_t     sin_family;   //地址族（Address Family），也就是地址类型
            uint16_t        sin_port;     //16位的端口号
            struct in_addr  sin_addr;     //32位IP地址
            char            sin_zero[8];  //不使用，一般用0填充
        };
        ```

        

    - addrlen  结构体变量的大小

  - 返回值

    - 成功 1
    - 失败 -1

## OSI模型

ISO（International Organization for Standardization）即国际标准化组织为计算机的通信开发系统互连设计的模型，即OSI模型，全称计算机通信开发系统互联模型（open systems interconnection）。

该模型采用分层方式进行架构，架构如下：

### OSI网络架构

<img :src="$withBase('/imags/1654069971926.png')" alt="1654069971926">

### OSI层次介绍

| 层级 |    名称    |                        描述                         |
| :--: | :--------: | :-------------------------------------------------: |
|  1   |   物理层   |                 进行网络链接的硬件                  |
|  2   | 数据链路层 |                 转发网络请求的硬件                  |
|  3   |   网络层   | IPv4&IPv6协议处理进行路由和寻址，决定数据的游走路径 |
|  4   |   传输层   |    TCP/UDP 确定两个主机间进程通信的网络传输服务     |
|  5   |   会话层   |           进行主机进程间的通信的会话管理            |
|  6   |   表示层   |        数据处理层（编码、解码、压缩、解压）         |
|  7   |   应用层   |                为计算机用户提供服务                 |

### 套接字为什么只提供了上三层进入传输层的接口

1. 顶上三层处理具体的网络应用（FTP,HTTP)的所有细节，对通信细节了解很少，底下四层对具体网络应用了解很少，在处理通信的细节。
2. 因为Linux系统分为用户空间和内核空间，内核空间通常已经封装了下四层的操作，而对于大多数的应用程序，均是通过用户进程实现，因此API被构建在了传输层和会话层。

## 发现网络拓扑

```netstat -i```  提供网络接口的信息

```shell
Kernel Interface table
// 
Iface             MTU    RX-OK RX-ERR RX-DRP RX-OVR    TX-OK TX-ERR TX-DRP TX-OVR Flg

docker0          1500        0      0      0 0             3      0      0      0 BMU
// 以太网接口
eth0             1500 272441368      0 143712 0      28478500      0      0      0 BMRU
// 环回接口
lo              65536 5281851012      0      0 0      5281851012      0      0      0 LRU
```

```netstat -r```   展示路由表

```shell
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface

default         gateway         0.0.0.0         UG        0 0          0 eth0
10.14.2.0       0.0.0.0         255.255.255.0   U         0 0          0 eth0
172.17.0.0      0.0.0.0         255.255.0.0     U         0 0          0 docker0
```

```ifconfig+网络接口名称``` 获取接口详细信息

```ifconfig eth0``` 

```shell
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 10.14.2.214  netmask 255.255.255.0  broadcast 10.14.2.255
        inet6 fe80::2a6e:d4ff:fe8a:2eda  prefixlen 64  scopeid 0x20<link>
        ether 28:6e:d4:8a:2e:da  txqueuelen 1000  (Ethernet)
        RX packets 272451869  bytes 168057163491 (156.5 GiB)
        RX errors 0  dropped 143727  overruns 0  frame 0
        TX packets 28478593  bytes 16473596749 (15.3 GiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

```ping```  查看本地网络中IP地址的命令

## 传输层有哪些协议？

传输层包括TCP、UDP、SCTP协议。其中，TCP和UDP是常见的，用途广泛的协议，但是SCTP是一个比较新的协议，这些网络传输协议都通过网络层IP协议进行转发。

- UDP协议
  - 是简单的不可靠的数据报协议
- TCP协议
  - 复杂的可靠的字节流协议
- SCTP协议
  - SCTP协议与TCP协议相似，是一个可靠的传输协议，并且提供消息边界

## TCP/IP协议族

### 关于协议族

- 协议是指网络通信过程中的约定或协议，通信的双方必须遵守一样的协议才能建立连接。

-  TCP/IP 模型包含了 TCP、IP、UDP、Telnet、FTP、SMTP 等上百个互为关联的协议，其中 TCP 和 IP 是最常用的两种底层协议，所以把它们统称为“TCP/IP 协议族”。 

### 协议族架构图

<img :src="$withBase('/imags/1654072807990.png')" alt="1654072807990">

### 各协议作用

| 协议 | 协议名称         | 协议作用                                                  |
| ---- | ---------------- | --------------------------------------------------------- |
| IPv4 | 网际协议4版本    | 使用32位地址，为TCP UDP SCTP ICMP IGMP提供分组递送服务    |
| IPv6 | 网际协议6版本    | 使用128位地址 为 TCP UDP SCTP ICMPv6提供分组递送服务      |
| TCP  | 传输控制协议     | TCP是一个面向链接的协议，为用户进程提供可靠的全双工字节流 |
| UDP  | 用户数据报协议   | UDP是无连接协议，不能保证最终到达它们的目的地             |
| SCTP | 流控制传输协议   | 提供可靠的全双工关联的面向连接的协议                      |
| ICMP | 网际控制消息协议 | 处理在路由器和主机之间流通的错误和控制消息                |
| IGMP | 网际组管理协议   | 用于多播                                                  |
| ARP  | 地址解析协议     | 把一个IPv4地址映射为硬件地址                              |
| RARP | 反向地址解析协议 | 把硬件地址映射为IPv4                                      |
| BPE  | BSD分组过滤      | 提供对数据链路层的访问能力                                |

### 关于UDP协议

- 属于传输层协议
- 用户进程使用UDP套接字写入一个消息，该消息随后被封装到一个UDP数据报，进而被封装到一个IP数据报
- UDP 不保证数据报送到的目的地，也不保证数据报的先后顺序
- UDP提供无连接的服务，因为UDP和服务器之间没有长期存在的关系

### 关于TCP协议

- TCP提供了可靠的连接和数据发送服务
- 其首先与某个服务器建立连接，再跨连接与服务器交换数据，最后终止该连接
- TCP并不能提供可靠的端对端的数据传输服务，但是内部建立了一套可靠的数据传递机制
- TCP协议传输数据是有序的、基于字节流的，这是因为它为每个数据报提供了一个顺序位
- TCP通过通告窗口实现流量控制，以实现通信的可靠性
- TCP是双全工模式，即能够同时进行信号数据的双向传输

### 关于SCTP协议

- SCTP协议在客户端和服务端之间提供关联关系，并像TCP那样为应用进程提供可靠性、排序、流量控制及双全工的数据传送
- SCTP是面向消息的传送，它提供各个记录的按序递送服务
- 能够在建立的端点间提供多个流，每个流各自可靠的按序递送消息，消息消失不会阻塞其它消息的投递

## TCP三次握手创建连接

我们在建立TCP的连接时，必须做好以下准备

- 服务器必须准备好接受外来的连接，即能够被动打开
- 客户通过调用connect发起主动打开，客户机将发送一个SYN分节连接中发送的数据的初始序列号
- 服务器必须确认客户机的消息即SYN分节，本身将会发送ACK确认信号，同时发送一个SYN，将返回初始序列号
- 客户机再次确认服务器SYN

<img :src="$withBase('/imags/1654075001924.png')" alt="1654075001924">

## TCP 协议选项

TCP选项中的参数及含有

<img :src="$withBase('/imags/1654075158460.png')" alt="1654075158460">

### MSS最大段大小选项

最大段大小是指TCP协议所允许的从对方接收到的最大报文段，最大段大小只记录TCP数据的字节数而不包括其他相关的TCP与IP头部。当建立一条TCP连接时, 通信的每一方都要在**SYN**报文段的**MSS**选项中说明自已允许的最大段大小。

### SACK选择确认选项

 TCP “**选择确认**”（**SACK**）能在报文段丢失或被接收方遗漏时更好地进行重传工作。通过接收SYN (或者SYN+ACK)报文段中的“允许选择确认”选项, TCP通信方会了解到自身具有了发布SACK信息的能力。当接收到乱序的数据时, 它就能提供一个SACK选项来描述这些乱序的数据, 从而帮助对方有效地进行重传。 

### WSOPT窗口缩放选项

窗口缩放选项(表示为WSCALE或WSOPT)能够有效地将TCP窗口广告字段的范围从16位增加至30位。TCP头部不需要改变窗口广告字段的大小, 仍然维持16位的数值。

### UTO用户超时选项

用户超时(**UTO**)选项是一个相对较新的TCP的功能。用户超时数值(也被称为**USER_TIMEOUT**)指明了TCP发送者在确认对方未能成功接收数据之前愿意等待该数据ACK确认的时间。

### 认证选项

TCP设置了一个选项用于增强连接的安全性，当发送数据时, TCP会根据共享的密钥生成一个通信密钥, 并根据一个特殊的加密算法计算散列值。接收者装配有相同的**密钥**, 同样也能够生成**通信密钥**。

>  [(63条消息) TCP的连接与断开_zkccpro的博客-CSDN博客_tcp连接断开](https://blog.csdn.net/weixin_42923076/article/details/120087088) 

## TCP四次挥手终止连接

- 应用进程首先调用close，执行主动关闭，TCP发送一个FIN分节，表示数据发送完毕
- 接收到FIN的对端执行被动关闭，这个FIN由TCP确认，它的接收也作为一个文件结束符传递给接收端应用程序
- 接收该文件结束符的应用将调用close关闭套接字，并发送FIN
- 接收这个最终FIN的原发送端TCP确认这个FIN

<img :src="$withBase('/imags/1654079255729.png')" alt="1654079255729">

## TCP 状态转换图

<img :src="$withBase('/imags/1654130489526.png')" alt="1654130489526">

## 什么是端口号

 端口号的主要作用是表示一台计算机中的特定进程所提供的服务。网络中的计算机是通过IP地址来代表其身份的，它只能表示某台特定的计算机，但是一台计算机上可以同时提供很多个服务，如数据库服务、FTP服务、Web服务等，我们就通过端口号来区别相同计算机所提供的这些不同的服务，如常见的端口号21表示的是FTP服务，端口号23表示的是Telnet服务端口号25指的是SMTP服务等。 

- TCP/UDP是16位字节的端口，因此端口号16位整数
- 端口号小于256定义为常用端口，服务器一般通过常用端口识别
- 端口号只需保证端口号在本机唯一就可以了
- 客户端端口号因为存在时间太短被称为临时端口 
- 大多数TCP/IP分配了1024-49151之间的端口，即用户端口
- 私用端口是49152-65535
- 任何TCP/IP实现的提供服务都用1-1023之间的端口

<img :src="$withBase('/imags/1654131805283.png')" alt="1654131805283">

如图，为LANA和BSD规范的不同的端口使用，目前以LANA为主

## 什么是套接字

### 套接字

标识每个端点的两个值（IP和端口号）通常称为一个套接字。

### 套接字对

套接字对，则标识为连接两个端点的四元组：本地IP地址、本地TCP端口号、外地IP地址、外地TCP端口号。

### 套接字的记号

```{*:21,*:*}```

```*``` 是通配符，用来指定本地IP的地址

```:``` 用来将IP地址和端口号进行连接，即某个IP的某个端口连接服务器

## 并发服务器如何处理请求

并发服务器中主服务器循环通过派生一个子进程来处理每个新的连接。

并发服务器在处理客户连接时，fork一个自身的副本，让子进程来处理客户的请求。

<img :src="$withBase('/imags/1654132754166.png')" alt="1654132754166">

## 套接字缓冲区及限制

### MTU 最大传输单元

- 最大传输单元，在[数据链路层](https://so.csdn.net/so/search?q=数据链路层&spm=1001.2101.3001.7020)中，往往规定了MTU大小
- IP层的数据包通过数据链路层如果大于MTU，将被分片，到达接收端IP层后再被重组
- 以太网的MTU为1500字节

### MSS  最大报文段

-  最大报文段，是TCP协议的一个选项。
- MSS选项用于在TCP建立连接时，收发双方协商一个TCP报文段所能承载的最大数据长度。
- MSS选项只在初始化连接请求(SYN=1)的报文段中使用。
- 选择合适的MSS很重要。如果MSS小了，网络利用率低。如果MSS大了，由于在网络层需要分片，也会影响网络性能。
- 一般MSS的长度为MTU(1500)-IP首部(20)-TCP首部(20)=1460字节。 

## TCP 缓冲区及数据输出

<img :src="$withBase('/imags/1654134895613.png')" alt="1654134895613">

1. 应用程序调用write函数将数据写入内核缓冲区
2. 内核从缓冲区中将数据复制到套接字的发送缓冲区
   1. 发送缓冲区无法容纳应用程序的数据时，应用程序进入睡眠
   2. TCP中提供了 SO_SNDBUF套接字更改缓冲区大小
3. TCP在进行数据发送时，往往在本地留有副本，直到确认对端收到副本为止
4. 本端TCP以MSS大小或更小的字节块将数据传递给IP，同时每个字节块被做了标记
5. IP为每个块新增IP标记，构成IP数据报，根据目标IP地址查找路由表选项以确定外出接口，然后数据被传递给相应的数据链路

## UDP缓冲区及数据输出

<img :src="$withBase('/imags/1654135121893.png')" alt="1654135121893">

- UDP因为并不可靠，因此并没有缓冲区进行数据的留存和观察

## 套接字的地址结构

- 套接字是网络通信的主要手段，每个套接字都需要一个参数，即套接字地址。
- 套接字用来进行目标机和本机的判别，因此主要包含IP地址和端口号
- 每个协议族都有自己的套接字地址结构 ```sockaddr``` 为套接字的起始

### POSIX数据类型

Unix的理念是可移植性操作系统，因此，我们在进行底层开发时，必须遵守POSIX的规范，这种规范要求我们在进行网络编程时，定义的结构必须符合一些要求，如必须有至少三个字段， **sin_family、sin_addr和sin_port** 。

```c
int8_t			带符号8位整数			<sys/types.h>
uint8_t			无符号8位整数			<sys/types.h>
int16_t			带符号				  <sys/types.h>
uint16_t		无				   <sys/types.h>
int32_t			带					<sys/types.h>
uint32_t		无					<sys/types.h>
sa_family_t		套接字地址结构的地址族	<sys/socket.h>
socklen_t		套接字地址结构的长度，一般为uint32_t			<sys/socket.h>
in_addr_t		IPv4地址，一般为uint32_t		<netinet/in.h>
in_port_t		TCP或UDP端口，一般为uint16_t	<netinet/in.h>
```



### IPv4 套接字地址结构

>  *定义在<netinet/in.h>头文件中* 
>
> ```c
> sockaddr_in     
> 		struct in_addr{							//定义该结构来表示IPv4地址
> 		in_addr_t  	s_addr;				        //32位IPv4的地址			
> };
> struct sockaddr_in{		//套接字地址结构
> 		uint8_t		sin_len;					//1字节，表示整个结构的长度=16字节
> 		sa_family_t	sin_family;		 		    //1字节AF_INET，表示是IPv4地址族
> 		in_port_t	sin_port;					//2字节，uint16_t，16位的端口号，0～65535
> 		struct in_addr	sin_addr;				//4字节，32位IPv4地址
> 		char		sin_zero[8];				//8字节，unused，用来补充位数，一般为0
> };
> ```
>
>  ***struct in_addr_t可以指明为通配地址，此时sin_addr=INADDR_ANY*** 
>
> 
>
>  ***为什么要定义结构in_addr来表示IPv4地址：因为早期这个结构中还存储了其他类型，用于给IPv4地址进行A、B、C类的分类。先在随着子网划分技术的来临，这些分类逐渐被废除。现在的in_addr中仅仅有一个in_addr_t字段。*** 

### 通用套接字地址结构（IPv4）

> 在任何套接字函数中，需要传递进一个指向套接字地址结构的指针作为参数。为了适用于任意的协议族的不同套接字地质结构，因此定义了通用套接字地址结构。 
>
>通用套接字地址结构定义在<sys/socket.h>
>
>```c
>struct sockaddr{
>		uint8_t		sa_len;
>		sa_family 	sa_family;
>		char		sa_data[14];
>}
>```

### IPv6 套接字地址结构

> 头文件定义在<netinet/in.h>
>
> ```c
> struct in6_addr{						
> 		uint8_t		sa_addr[16];		//128位IPv6地址，IPv4为32位in_addr_t(uint32)
> 	}
> struct sockaddr_in6{
> 		uint8_t		sin6_len;		//1字节，表示整个结构的长度=28字节
> 		sa_family_t	sin6_family;		//1字节，AF_INET6，表示是IPv6地址族，IPv4为AF_INET
> 		in_port_t	sin6_port;		//2字节，端口号
> 		uint32_t		sin6_flowinfo;		//4字节，流量窗口信息，未定义，IPv4没有
> 		struct in6_addr	sin6_addr;		//16字节，IPv6地址，IPv4为in_addr
> 		uint32_t		sin6_scpor_id;		//4字节，用来标识地址所在范围的接口，IPv4没有
> }
> ```
>
>  ***struct in6_addr可以指明为通配地址，此时sin6_addr=in6addr_any（在该头文件中定义了）*** 

### 通用套接字地址结构（IPv6）

> ```c
> struct sockaddr_storage{
> 		uint8_t		ss_len;		//本结构长度
> 		sa_family_s	sa_family;	//地址族，AF_xxx。
> }
> ```
>
> 定义在头文件<netinet/in.h>

<img :src="$withBase('/imags/1654150881129.png')" alt="1654150881129">

## 进程和内核的结果传递

### 从进程到内核传递套接字地址结构的函数：传递值

```bind```

```connect```

```sendto```

### 从内核到进程传递套接字地址结构的函数：传递指针

```accept```

```recvfrom```

```getsockname```

```getpeername```

## 网络中的基本系统调用函数

| 函数名     | 功能                                                         |
| ---------- | ------------------------------------------------------------ |
| socket()   | 根据指定的地址族、数据类型和协议来分配一个套接口的描述字及其所用的资源。 |
| bind()     | 当用socket()创建套接口后，它便存在于一个名字空间（地址族）中，但并未赋名。bind()函数通过给一个未命名套接口分配一个本地名字来为套接口建立本地捆绑（主机地址/端口号）。 |
| listen()   | 创建一个套接口并[监听](https://baike.baidu.com/item/监听/17293)申请的连接. |
| accept()   | 是在一个套接口接受的一个连接                                 |
| connect()  | 用于建立与指定socket的连接                                   |
| recvfrom() | 接收一个数据报并保存源地址。                                 |
| close()    | 用来关闭套接字，并终止TCP连接                                |



## IO模型-阻塞、非阻塞、多路复用、异步

网络IO数据传输，在进行端到端的传输过程中，一般分两个阶段

1. 客户端向服务端发送请求——数据进行网络传输——数据传输完成
2. 数据从内核空间复制到进程空间

<img :src="$withBase('/imags/1654154016432.png')" alt="1654154016432">

几种IO模型均是基于以上阶段进行传输，不同的模型采用了不同的策略。

### 阻塞式IO模型

<img :src="$withBase('/imags/1654154101242.png')" alt="1654154101242">

1. 应用发出请求，执行recvfrom系统调用，以获取数据
2. 由于数据还没准备好，当前请求线程被阻塞，只能等待
3. 直到数据可读或者抛出异常
   1. 如果是单线程应用，主线程挂起，CPU空置
   2. 如果是多线程，当前线程挂起，CPU切换时间片去执行其他线程

### 非阻塞式IO模型

<img :src="$withBase('/imags/1654154327680.png')" alt="1654154327680">

>  一般的Socket对象都会有一个  setblocking(False)  或者  ConfigureBlocing(false)  之类的方法，将当前IO线程设置成非阻塞模式

1. 当socket设置为nonblocking时，在一阶段（数据准备阶段）线程会不断的发起recvfrom轮询
2. 如果还没有准备好数据，会得到一个EWouldBLOCK错误信号
3. 数据准备好之后，开始真正执行recvfrom拉取数据
   1. 轮询会极大的消耗CPU时间，所以这种模型极少用到