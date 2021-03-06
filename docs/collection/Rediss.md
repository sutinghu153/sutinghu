# Redis 初学者教程





[TOC]





### 01 Redis 为什么能够诞生



Redis是当下最热门的缓存技术，它的优良性能提供了更好的服务，只有在了解redis诞生前，当时的技术主流和解决方案，以及核心问题，我们才能更好的认识到redis是解决了什么样的问题。因为官方redis诞生时间是2008年，因此我调研了2007-2008年之间的web服务开发标准和方案，来进行过渡。

 

#### 旧的标准

 

web2.0刚提出的时候，网页程序风靡全球，各大小网站层出不穷。

2008年前，**建站标准基本是单点服务，网站架构为三层，web、服务、数据库，当网站访问量大的时候，存在服务器性能的问题**。所以在运维的过程中，出现了因为**【高并发】**而产生的大量问题。

 

限制于当时的技术水平和信息基础设施，当时主流的解决方案包括：

 

##### 页面静态化

服务器的负载过大，原因之一是CPU的负荷过大，因此前台多为静态页面，以降低请求负荷。

##### 数据库优化

进行数据库优化，提高数据库性能，避免使用select * from的查询语句。

##### 使用缓存技术

缓存技术是将动态数据存储到缓存文件，动态网页直接调用这些文件，而不用直接访问数据库。（后世比较出名的是redis

##### 限制非友好请求

外部网站或爬虫网站的图片及文件盗链会带来大量的请求压力，一般对图片等资源文件添加水印，使资源可用性降低，以降低非友好盗资源。

##### 控制大文件的下载

大文件下载会占用很大的流量。

##### 初步的集群方案

将文件放在不同的主机，提供不同的镜像供数据资源的下载。



#### 简单介绍集群技术

 

- 集群(Cluster)：是一组独立的计算机系统构成一个松耦合的多处理器系统，它们之间通过网络实现进程间的通信。应用程序可以通过网络共享内存进行消息传送，实现分布式计算机。
- 负载均衡(LoadBalance)：先得从集群讲起，集群就是一组连在一起的计算机，从外部看它是一个系统，各节点可以是不同的操作系统或不同硬件构成的计算机。如一个提供Web服务的集群，对外界来看是一个大Web服务器。不过集群的节点也可以单独提供服务。
- 特点：在现有网络结构之上，负载均衡提供了一种廉价有效的方法扩展服务器带宽和增加吞吐量，加强网络数据处理能力，提高网络的灵活性和可用性。

集群系统(Cluster)主要解决下面几个问题：

- 高可靠性（HA）：利用集群管理软件，当主服务器故障时，备份服务器能够自动接管主服务器的工作，并及时切换过去，以实现对用户的不间断服务。
- 高性能计算（HP）：即充分利用集群中的每一台计算机的资源，实现复杂运算的并行处理，通常用于科学计算领域，比如基因分析，化学分析等。
- 负载平衡：即把负载压力根据某种算法合理分配到集群中的每一台计算机上，以减轻主服务器的压力，降低对主服务器的硬件和软件要求。

 

**以上，有个关键词【缓存技术】，因为数据库和服务性能无法再优化，因此提出的曲线救国的解决方案。缓存技术成为了一项新的技术体系和标准。**



大概的思路是将用户请求过的查询数据缓存在某个容器，当用户再次发起请求时，在该容器中返回查询结果，如果没有缓存，则再通过服务调用数据库查询的方案。这就是新标准的大概思路。

那当时基于该思路，都诞生了哪些方面缓存技术呢？在redis诞生之前，开发人员普遍接受的方案有以下几个。

 

#### 缓存技术

 

在缓存的思想提出来以后，很多基于缓存的解决方案被研发了出来。



##### CDN内容分发网络



CDN的全称是ContentDelivery Network，即内容分发网络。其基本思路是尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输得更快、更稳定。

通过在网络各处放置节点服务器所构成的在现有的互联网基础之上的一层智能虚拟网络，CDN系统能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。

 

![图片](https://mmbiz.qpic.cn/mmbiz_png/RSHC1Vs0ibzGliavsH60tbibwNuMLLN55MXaEtwMEukNPCSb4AgEnIdcgPmJzvqPQ6R9ugDLw3cdygYyuOMBiabNicQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)



其目的是使用户可就近取得所需内容，解决 Internet网络拥挤的状况，提高用户访问网站的响应速度。核心是网站代替用户查找最优的服务。



##### 硬盘级缓存

 

硬盘级别的缓存是指将需要动态生成的内容暂时缓存在硬盘上，在一个可接受的延迟时间范围内，同样的请求不再动态生成，以达到节约系统资源，提高网站承受能力的目的。

Linux环境硬盘级缓存一般使用Squid。Squid是一个高性能的代理缓存服务器。

和一般的代理缓存软件不同，Squid用一个单独的、非模块化的、I/O驱动的进程来处理所有的客户端请求。它接受来自客户端对目标对象的请求并适当地处理这些请求。



比如说，用户通过浏览器想下载（即浏览）一个web页面，浏览器请求Squid为它取得这个页面。Squid随之连接到页面所在的原始服务器并向服务器发出取得该页面的请求。取得页面后，Squid再将页面返回给用户端浏览器，并且同时在Squid本地缓存目录里保存一份副本。

 

当下一次有用户需要同一页面时，Squid可以简单地从缓存中读取它的副本，直接返回给用户，而不用再次请求原始服务器。当前的Squid可以处理HTTP， FTP， GOPHER， SSL和WAIS等协议。

 

##### 内存级缓存

 

内存级别的缓存是指将需要动态生成的内容暂时缓存在内存里，在一个可接受的延迟时间范围内，同样的请求不再动态生成，而是直接从内存中读取。Linux环境下内存级缓存Memcached是一个不错的选择。

 

Memcached是danga.com开发的一套非常优秀的分布式内存对象缓存系统，用于在动态系统中减少数据库负载，提升性能。

 

和 Squid 的前端缓存加速不同，它是通过基于内存的对象缓存来减少数据库查询的方式改善网站的性能，而其中最吸引人的一个特性就是支持分布式部署；也就是说可以在一群机器上建立一堆 Memcached 服务，每个服务可以根据具体服务器的硬件配置使用不同大小的内存块，这样，理论上可以建立一个无限大的基于内存的缓存系统。

 

客户端首先与 Memcached 服务建立连接，然后存取对象。每个被存取的对象都有一个唯一的标识符 key，存取操作均通过这个 key 进行，保存的时候还可以设置有效期。

 

保存在 Memcached 中的对象实际上是放置在内存中的，而不是在硬盘上。Memcached 进程运行之后，会预申请一块较大的内存空间，自己进行管理，用完之后再申请一块，而不是每次需要的时候去向操作系统申请。Memcached将对象保存在一个巨大的Hash表中，它还使用NewHash算法来管理Hash表，从而获得进一步的性能提升。所以当分配给Memcached的内存足够大的时候，Memcached的时间消耗基本上只是网络Socket连接了。【与当下Redis工作原理比较接近】

 

Memcached也有它的不足。首先它的数据是保存在内存当中的，一旦服务进程重启（进程意外被关掉，机器重启等），数据会全部丢失。其次Memcached以root权限运行，而且Memcached本身没有任何权限管理和认证功能，安全性不足。第一条是Memcached作为内存缓存服务使用无法避免的，当然，如果内存中的数据需要保存，可以采取更改Memcached的源代码，增加定期写入硬盘的功能。对于第二条，我们可以将Memcached服务绑定在内网IP上，通过Linux防火墙进行防护。

 

##### 网站服务器

 

Apache是开源界的首选Web服务器，因为它的强大和可靠，而且适用于绝大部分的应用场合。但是它的强大有时候却显得笨重，配置文件复杂得让人望而生畏，高并发情况下效率不太高。而轻量级的Web服务器Lighttpd却是后起之秀，基于单进程多路复用技术，其静态文件的响应能力远高于Apache。Lighttpd对PHP的支持也很好，还可以通过Fastcgi方式支持其他的语言，比如Python等。虽然Lighttpd是轻量级的服务器，功能上不能跟Apache比，某些复杂应用无法胜任，但即使是大部分内容动态生成的网站，仍免不了会有一些静态元素，比如图片、JS脚本、CSS等等，可以考虑将Lighttpd放在Squid的前面，构成 Lighttpd->Squid->Apache的一条处理链，Lighttpd在最前面，专门处理静态内容的请求，把动态内容请求通过Proxy模块转发给Squid，如果Squid中有该请求的内容且没有过期，则直接返回给Lighttpd。新请求或者过期的页面请求交由Apache中的脚本程序来处理。经过Lighttpd和Squid的两级过滤，Apache需要处理的请求大大减少，减少了Web应用程序的压力。同时这样的构架，便于把不同的处理分散到多台计算机上进行，由Lighttpd在前面统一分发。

 

#### 曙光和朝阳



实际上，在redis诞生之前，缓存技术及理念就已经得到了发展，网站高负荷的请求和高并发问题虽然得到了解决，各种各样的缓存技术各有所长。但是，这只是黎明前的曙光，在2008年的某一天，一群智慧的开发者，提出了一系统高性能的优化方案，web发展开始了井喷时代。Redis便是其中之一。

### 02 安装Redis 

#### 下载安装包

```
https://redis.io/
```

#### 移动到Linux安装目录下

#### 解压Redis安装包

#### 进入解压后的文件

> 可以看到Redis的配置文件Redis.config

#### 安装

```
yum install gcc-c++ // 安装 

make // 环境搭建

make install // 确认安装
```

#### Redis的默认安装路径 

```
/user/local/bin
```

#### Redis配置文件处理

将redis.config 单独建立文件夹，提高环境安全性

#### 启动Redis

redis默认不是后台安装的，改为默认后台启动

```
daemonize 改为yes
```

进入bin目录，启动redis

```
redis-server 指定的配置文件
```

```
redis-cli -p 6379 指定端口号
```

#### 链接测试

```
ping  ----PONG
```

```
set "key" "value"
get "key"
keys * ----查看所有键
shutdown ----redis关机
```

### 03 Redis 为什么是最受欢迎的缓存技术



