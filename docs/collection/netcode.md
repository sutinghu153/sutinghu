# Linux网络编程

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
6. 

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

- 