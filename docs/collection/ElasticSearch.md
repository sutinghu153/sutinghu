<h1 align="center">Elastic-Search</h1>

关于ealstic-search的原理与实践。

## 01 大数据

### 1-1 大数据的检索问题

当系统中的数据量达到上亿规模时，数据量会达到PB级别，这个时候，对于数据的架构设计，会存在相当多的问题，比如

1. 哪个数据库更适合做大数据的处理
2. 大数据的单点故障如何解决
3. 数据的安全性怎么保证
4. 如何实现高效的大数据检索
5. 大数据下统计分析如何进行

### 1-2 大数据下的传统方案

**关系型数据库**

1）通过主从备份解决数据安全性问题；
2）通过数据库代理中间件心跳监测，解决单点故障问题；
3）通过代理中间件将查询语句分发到各个slave节点进行查询，并汇总结果

**非关系型数据库**

1）通过副本备份保证数据安全性；
2）通过节点竞选机制解决单点问题；
3）先从配置库检索分片信息，然后将请求分发到各个节点，最后由路由节点合并汇总结果

## 02 关于ES

elastic-search 是一个分布式、可拓展、实时的搜索与数据分析引擎。它可以从项目一开始就让我们能够获得数据的搜索、分析和探索的能力。

能够满足的需求

- 全文检索
- 结构化搜索
- 分析
- ...

## 03 安装ES

### 3-1 下载和安装



> 下载 ES
>
> [Download Elasticsearch | Elastic](https://www.elastic.co/cn/downloads/elasticsearch)

> 安装 ES
>
> [Installation | Elasticsearch Reference [5.6\] | Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/_installation.html)

### 3-2 启动和检测

#### 启动

```
cd elasticsearch-<version>
./bin/elasticsearch  【A】
```

> 注： 如果想将Elasticsearch 作为一个守护进程在后台运行，则需要在后面添加参数 -d [A]
>
> 如果是在windows上面运行elastic search，需要运行bin\elasticsearch.bat 而不是bin\elasticsearch

#### 检测

方案一

```
执行 jps
检查是否存在 es进程：Elasticsearch
```

方案二

```
curl 'http://localhost:9200/?pretty'
```

在另一个终端访问该地址，如果访问成功，会得到一个类似的结果

```
{
  "name" : "Tom Foster",
  "cluster_name" : "elasticsearch",
  "version" : {
    "number" : "2.1.0",
    "build_hash" : "72cd1f1a3eee09505e036106146dc1949dc5dc87",
    "build_timestamp" : "2015-11-18T22:40:03Z",
    "build_snapshot" : false,
    "lucene_version" : "5.3.1"
  },
  "tagline" : "You Know, for Search"
}
```

> 以上json格式返回的结果表示当前已启动并运行了一个ElasticSearch节点
>
> 单个节点可以作为一个运行中的ES实例，而一个集群是一组拥有相同 ```cluster_name``` 的节点，集群中的节点可以一起工作并共享数据，还提供容错与可伸缩性。

## 04 交互ES

### 4-1 客户端

Java 与ES的交互可以使用ES内置的两个客户端。

- 节点客户端（Node client）

  节点客户端作为一个非数据节点加入到本地集群中。节点客户端本身不保存任何数据，但是它知道数据在集群的哪个节点中，并且可以把请求转发到准确的节点。

- 传输客户端（Transport client）

  轻量级的传输客户端可以将请求发送到远程集群，本身不加入集群，但是可以将请求转发到集群的节点上。

> 两个Java客户端都是通过  9300 端口并使用 ES 的原生传输协议和集群交互。集群中的节点通过 9300 彼此通信，如果该端口没有打开，节点将无法形成一个集群。

### 4-2 访问

1. Java之外的其它语言都可以使用 RESTful API 通过端口9200 和 ES 进行通信。

2. 使用```curl``` 命令进行交互

   1. 交互的路径

      ```
      curl -X<VERB> '<PROTOCOL>://<HOST>:<PORT>/<PATH>?<QUERY_STRING>' -d '<BODY>'
      ```

   2. 参数的说明

      |     部件     |                   解释                    |
      | :----------: | :---------------------------------------: |
      |     VERB     | HTTP方法或GET POST PUT HEAD DELETE 等谓词 |
      |   PROTOCOL   |                http或https                |
      |     HOST     |             ES集群中的主机名              |
      |     PORT     |             端口号，默认 9200             |
      |     PATH     |               API的终端路径               |
      | QUERY_STRING |           任意可选的查询字符串            |
      |     BODY     | 一个 JSON 格式的请求体 (如果请求需要的话) |

   3. 例子

      ```
      curl -XGET 'http://localhost:9200/_count?pretty' -d '
      {
          "query": {
              "match_all": {}
          }
      }
      '
      ```

   4. 返回值

      ```
      {
          "count" : 0,
          "_shards" : {
              "total" : 5,
              "successful" : 5,
              "failed" : 0
          }
      }
      ```

### 4-3 面向文档

在应用程序中很少只是一个简单的键值对的列表。通常，它们拥有更复杂的数据结构，可能包括日期、地理信息、其它对象或者数组等。

ElasticSearch 是面向文档的，意味着它存储整个对象或文档。elastic search不仅存储文档，而且索引每个文档的内容，使之可以被检索。

在ES中，我们对文档进行索引、检索、排序和过滤而不是对行列数据进行处理。这是一种完全不同的思考数据的方式，也是ES能支持复杂全文检索的原因。

ES对文档的序列化格式是JSON。

