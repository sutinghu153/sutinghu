<h1 align="center">Elastic-Search</h1>

关于ealstic-search的原理与实践。参考：[集群内的原理 | Elasticsearch: 权威指南 | Elastic](https://www.elastic.co/guide/cn/elasticsearch/guide/current/distributed-cluster.html)

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

### 4-4 关于索引

存储数据到ES的行为叫索引，因此索引有两个方面的含义

1. **名词**——文档

   一个索引类似于传统关系数据库中的一个库，是一个存储关系型文档的地方。

2. **动词**——保存数据

   索引一个文档就是存储一个文档到一个索引（名词）中以便被检索和查询。

3. **倒排索引**——检索的方式

   关系型数据库通过增加一个索引，比如B-tree索引到指定的列上，以便提升数据检索速度。

   ES中的每一个文档的每一个属性都是被索引的（有一个倒排索引）和可搜索的，没有倒排索引的属性是不能被搜索到的。

### 4-5 管理文档

#### 索引文档

```json
PUT /megacorp/employee/1
{
    "first_name" : "John",
    "last_name" :  "Smith",
    "age" :        25,
    "about" :      "I love to go rock climbing",
    "interests": [ "sports", "music" ]
}
```

> **`megacorp`**索引名称
>
> **`employee`**类型名称
>
> **`1`**特定雇员的ID

#### 检索文档

```json
GET /megacorp/employee/1
```

> 将 HTTP 命令由 `PUT` 改为 `GET` 可以用来检索文档，同样的，可以使用 `DELETE` 命令来删除文档，以及使用 `HEAD` 指令来检查文档是否存在。如果想更新已存在的文档，只需再次 `PUT` 。

返回结构如下

```json
{
  "_index" :   "megacorp",
  "_type" :    "employee",
  "_id" :      "1",
  "_version" : 1,
  "found" :    true,
  "_source" :  {
      "first_name" :  "John",
      "last_name" :   "Smith",
      "age" :         25,
      "about" :       "I love to go rock climbing",
      "interests":  [ "sports", "music" ]
  }
}
```

|   key    |  value   |
| :------: | :------: |
|  _index  |  索引名  |
|  _type   | 类型名称 |
|   _id    |   编号   |
| _version | 索引版本 |
|  found   | 是否查到 |
| _source  | 查询结果 |

#### 轻量搜索

**基础搜索**: 搜索位于索引megacorp中的类型为employee的所有雇员的信息

```json
GET /megacorp/employee/_search
```

​			```_search``` 默认返回10条信息

**关键字段搜索**：搜索指定姓名的雇员信息

```json
GET /megacorp/employee/_search?q=last_name:Smith
```

#### 表达式搜索

```json
GET /megacorp/employee/_search
{
    "query" : {
        "match" : {
            "last_name" : "Smith"
        }
    }
}
```

#### 表达式搜索2

```json
GET /megacorp/employee/_search
{
    "query" : {
        "bool": {
            "must": {
                "match" : {
                    "last_name" : "smith" 
                }
            },
            "filter": {
                "range" : {
                    "age" : { "gt" : 30 } 
                }
            }
        }
    }
}
```

> 以上是查询姓名 last_name 为smith，年龄大于30

#### 全文搜索

```json
GET /megacorp/employee/_search
{
    "query" : {
        "match" : {
            "about" : "rock climbing"
        }
    }
}
```

> 使用 match 查询在’about‘属性 上搜索某个参数，得到匹配的文档如下

```json
{
   ...
   "hits": {
      "total":      2,
      "max_score":  0.16273327,
      "hits": [
         {
            ...
            "_score":         0.16273327, 
            "_source": {
               "first_name":  "John",
               "last_name":   "Smith",
               "age":         25,
               "about":       "I love to go rock climbing",
               "interests": [ "sports", "music" ]
            }
         },
         {
            ...
            "_score":         0.016878016, 
            "_source": {
               "first_name":  "Jane",
               "last_name":   "Smith",
               "age":         32,
               "about":       "I like to collect rock albums",
               "interests": [ "music" ]
            }
         }
      ]
   }
}
```

> ES 会默认按照相关性得分排序，即每个文档跟查询的匹配程度
>
> "_score":        得分

#### 短语搜索

为此对 `match` 查询稍作调整，使用一个叫做 `match_phrase` 的查询：

```json
GET /megacorp/employee/_search
{
    "query" : {
        "match_phrase" : {
            "about" : "rock climbing"
        }
    }
}
```

#### 高亮搜索

许多应用都倾向于在每个搜索结果中 *高亮* 部分文本片段，以便让用户知道为何该文档符合查询条件。在 Elasticsearch 中检索出高亮片段也很容易。

再次执行前面的查询，并增加一个新的 `highlight` 参数：

```json
GET /megacorp/employee/_search
{
    "query" : {
        "match_phrase" : {
            "about" : "rock climbing"
        }
    },
    "highlight": {
        "fields" : {
            "about" : {}
        }
    }
}
```

#### 聚合分析

> 终于到了最后一个业务需求：支持管理者对员工目录做分析。 Elasticsearch 有一个功能叫聚合（aggregations），允许我们基于数据生成一些精细的分析结果。聚合与 SQL 中的 `GROUP BY` 类似但更强大。

如挖掘员工中最受欢迎的兴趣爱好

```json
GET /megacorp/employee/_search
{
  "aggs": {
    "all_interests": {
      "terms": { "field": "interests" }
    }
  }
}
```

### 4-6 分布式特性

ES 可以横向扩展至数百、数千的服务器节点，同时可以处理PB级的数据。

- 分配文档到不同的容器或分片中，文档可以存储在一个或多个节点中
- 按集群节点来均衡分配这些分片，从而对索引和搜索过程进行负载均衡
- 复制每个分片以支持数据冗余，从而防止硬件故障导致的数据丢失
- 将集群中任一节点的请求路由到存有相关数据的节点
- 集群扩容时无缝整合新节点，重新分配分片以便从离群节点恢复

## 05 ES集群

ElasticSearch的主旨是随时可用和按需扩容，而扩容可以通过改用性能更好（垂直扩容、纵向扩容）或数量更多的服务器来（水平扩容、横向扩容）实现。

**真正的扩容是水平扩容，因为硬件的限制。即为集群添加更多的节点，将负载压力和稳定性分散到这些节点中。**

### 5-1 空集群

如果我们启动了一个单独的节点，里面不包含任何的数据和索引，那我们的集群就是一个空集群。

```空集群``` 包含空内容节点的集群

```节点``` 一个运行中的Elasticsearch实例称为一个节点。

 ```cluster.name```  集群是由一个或多个拥有相同 ```cluster.name``` 配置的节点组成，它们共同承担数据和负载的压力。

> 当一个节点被选举为主节点时，它将负责管理集群范围内的所有变更、例如增加、删除索引，或者增加、删除节点等。
>
> 主节点并不需要涉及到文档级别的变更和搜索等操作，所以当集群只拥有一个主节点的情况下，流量增加时并不会影响性能。
>
> 任何节点都可以成为主节点。
>
> 用户可以将请求发送到集群中的任何节点，包括主节点。
>
> 每个节点都能知道任意文档所处的位置，并且能够将我们的请求直接转发到存储所需文档的节点。

### 5-2 集群健康

Elasticsearch 的集群监控信息中包含了许多的统计数据，其中最为重要的一项就是 *集群健康* ， 它在 `status` 字段中展示为 `green` 、 `yellow` 或者 `red` 。

```json
GET /_cluster/health
```

| status |                   description                    |
| :----: | :----------------------------------------------: |
| green  |           所有主分片和副分片都正常运行           |
| yellow | 所有主分片都正常运行，但不是所有副分片都正常运行 |
|  red   |               有主分片没能正常运行               |

### 5-3 添加索引

索引实际上是指向一个或多个物理分片的逻辑命名空间。

一个分片是一个底层的工作单元，仅保存全部数据的一部分。其中，一个分片是一个Lucene的实例，以及它本身就是一个完整的搜索引擎。文档被存储和索引到分片内，但是应用程序是直接与索引而不是分片进行交互。

elastic search是利用分片将数据分发到集群内各处的。分片是数据的容器，文档保存在分片内，分片又被分配到集群内的各个节点里。当集群的规模扩大或缩小时，ES会自动在各节点中迁移分片，使数据仍然均匀分布在集群里。

一个分片可以是主分片或者副本分片，索引内任意一个文档都归属于一个主分片，所以主分片的数目决定索引能够保存的最大数据量。

```json
PUT /blogs
{
   "settings" : {
      "number_of_shards" : 3,
      "number_of_replicas" : 1
   }
}
```

> 添加索引示例
>
> number_of_shards ： 分片数
>
> number_of_replicas：副本数

### 5-4 故障转移

当集群只有一个节点在运行时，意味着会有一个单点故障问题——没有冗余。当我们启动第二个节点时，可防止数据丢失。

多个节点可以共享目录，因此只需要让所有的节点都又相同的```cluster.name```配置，就会自动发现集群并加入。

### 5-5 水平扩容

主分片的数目在索引创建时就已经确定了下来。

这个数目定义了这个索引能够 *存储* 的最大数据量。（实际大小取决于你的数据、硬件和使用场景。） 但是，读操作——搜索和返回数据——可以同时被主分片 *或* 副本分片所处理，所以当你拥有越多的副本分片时，也将拥有越高的吞吐量。

在运行中的集群上是可以动态调整副本分片数目的，我们可以按需伸缩集群。让我们把副本数从默认的 `1` 增加到 `2` ：

```json
PUT /blogs/_settings
{
   "number_of_replicas" : 2
}
```

### 5-6 应对故障

当集群的主节点被干掉时，会自动推举产生新的主节点。

而被干掉的节点的数据会被转移到正常的节点。

## 06 数据out/in

### 6-1 Json 文档

将数据按对象的方式来存储。专注于使用数据，而不是根据电子表格对数据建模。有效的提高了使用对象的灵活性。

对象，基于特定语言的内存的数据结构。为了通过网络发送或存储它。我们需要将它表示成某种标准的格式。

JSON 是一种以人可读的文本表示对象的方法。它已经变成NoSQL世界交换数据的标准。

当一个对象被序列化成为JSON，它被称为一个JSON文档。

ES是分布式的文档存储，它能存储和检索复杂的数据结构，实时的将数据序列化为JSON文档。JSON文档中的数据能够被集群中的任意节点检索。

在ES中，每个字段的所有数据都是默认被索引的，即每个字段都有快速检索设置的专用倒排索引。

### 6-2 ES文档

大多数应用中，多数实体或对象可以被序列化为包含键值对的JSON对象。

一个键可以是一个字段或字段的名称。

一个值可以是字符串、数字、另一个对象...

- 对象：仅仅是类似于hash、hashmap、字典或关联数组的JSON对象，对象中可以嵌套其它对象。
- 文档：指最顶层的根对象，这个对象被序列化成了JSON格式并被存储在ES中，指定了唯一的标识。

#### 文档元数据

一个文档不仅仅包含它的数据，它也包含元数据——有关文档的信息。

| 元数据 |        描述        |
| :----: | :----------------: |
| _index |   文档存放在哪里   |
| _type  | 文档表示的对象类别 |
|  _id   |    文档唯一标记    |

- _index：数据被存储和索引在分片中，而一个索引仅仅是逻辑上的命名空间，这个空间由一个或多个分片组合而成。对于应用程序而言，只需要知道。
- _type：用对象的类别为文档进行二次分类，标记具体的对象
- _id：是一个字符串，表示文档的位置索引

> _index,_type,_id 三者加在一起可以唯一确定elasticsearch中一个文档的具体实例。

#### 其它元数据

除了以上的三个元数据外，文档中还有很多描述文档属性、ES属性的元数据。

### 6-3 索引一个文档

我们在进行数据处理的过程中，需要对某个具体的文档进行处理，因此我们需要对文档进行索引。

#### 使用自定义ID索引

```json
PUT /{index}/{type}/{id}
{
  "field": "value",
  ...
}
```

```json
PUT /website/blog/123
{
  "title": "My first blog entry",
  "text":  "Just trying this out...",
  "date":  "2014/01/01"
}
```

#### 使用ES定义ID索引

```
POST /{index}/{type}/
{
  "field": "value",
  ...
}
```



```json
POST /website/blog/
{
  "title": "My second blog entry",
  "text":  "Still trying this out...",
  "date":  "2014/01/01"
}
```

### 6-4 取回一个文档

#### 简单取回

从ES中取回一个文档时，需要使用同样的 index、type、id，其中的区别只在于HTTP的不同。

```json
GET /website/blog/123?pretty
```

`GET` 请求的响应体包括 `{"found": true}` ，这证实了文档已经被找到。 如果我们请求一个不存在的文档，我们仍旧会得到一个 JSON 响应体，但是 `found` 将会是 `false` 。 此外， HTTP 响应码将会是 `404 Not Found` ，而不是 `200 OK` 。

#### 响应式取回

我们可以通过传递 `-i` 参数给 `curl` 命令，该参数能够显示响应的头部：

```json
curl -i -XGET http://localhost:9200/website/blog/124?pretty
```

#### 根据需要取回

默认情况下， `GET` 请求会返回整个文档，这个文档正如存储在 `_source` 字段中的一样。但是也许你只对其中的 `title` 字段感兴趣。单个字段能用 `_source` 参数请求得到，多个字段也能使用逗号分隔的列表来指定。

```json
GET /website/blog/123?_source=title,text
```

### 6-5 检查文档状态

如果只想检查一个文档是否存在--根本不想关心内容—那么用 `HEAD` 方法来代替 `GET` 方法。 `HEAD` 请求没有返回体，只返回一个 HTTP 请求报头：

```json
curl -i -XHEAD http://localhost:9200/website/blog/123
```

存在则返回

```json
HTTP/1.1 200 OK
Content-Type: text/plain; charset=UTF-8
Content-Length: 0
```

否则

```json
HTTP/1.1 404 Not Found
Content-Type: text/plain; charset=UTF-8
Content-Length: 0
```

### 6-6 更新一个文档

在内部，Elasticsearch 已将旧文档标记为已删除，并增加一个全新的文档。 尽管你不能再对旧版本的文档进行访问，但它并不会立即消失。当继续索引更多的数据，Elasticsearch 会在后台清理这些已删除文档。

 Elasticsearch 按前述完全相同方式执行以下过程：

1. 从旧文档构建 JSON
2. 更改该 JSON
3. 删除旧文档
4. 索引一个新文档

不同的地方是对于更新的文档，响应体的某个字段将会改变

```js
{
  "_index" :   "website",
  "_type" :    "blog",
  "_id" :      "123",
  "_version" : 2,
  "created":   false 
}
```

`created` 标志设置成 `false` ，是因为相同的索引、类型和 ID 的文档已经存在。

### 6-7 创建一个文档

#### 直接创建一个文档

_index` 、 `_type` 和 `_id` 的组合可以唯一标识一个文档。所以，确保创建一个新文档的最简单办法是，使用索引请求的 `POST` 形式让 Elasticsearch 自动生成唯一 `_id

```
POST /website/blog/
{ ... }
```

#### 创建不存在的文档

只有当一个文档不存在时才创建

```json
方法一：
PUT /website/blog/123?op_type=create
{ ... }
方法二：
PUT /website/blog/123/_create
{ ... }
```

### 6-8 删除一个文档

```sense
DELETE /website/blog/123
```

### 6-9 批量操作文档

bulk API 操作方式

```
{ action: { metadata }}\n
{ request body        }\n
{ action: { metadata }}\n
{ request body        }\n
...
```

`action/metadata` 行指定 *哪一个文档* 做 *什么操作* 。

`action` 必须是以下选项之一:

- **`create`**

  如果文档不存在，那么就创建它。详情请见 [创建新文档](https://www.elastic.co/guide/cn/elasticsearch/guide/current/create-doc.html)。

- **`index`**

  创建一个新文档或者替换一个现有的文档。详情请见 [索引文档](https://www.elastic.co/guide/cn/elasticsearch/guide/current/index-doc.html) 和 [更新整个文档](https://www.elastic.co/guide/cn/elasticsearch/guide/current/update-doc.html)。

- **`update`**

  部分更新一个文档。详情请见 [文档的部分更新](https://www.elastic.co/guide/cn/elasticsearch/guide/current/partial-updates.html)。

- **`delete`**

  删除一个文档。详情请见 [删除文档](https://www.elastic.co/guide/cn/elasticsearch/guide/current/delete-doc.html)。

`metadata` 应该指定被索引、创建、更新或者删除的文档的 `_index` 、 `_type` 和 `_id` 。

删除一个文档

```json
{ "delete": { "_index": "website", "_type": "blog", "_id": "123" }}
```

组合操作

```json
POST /_bulk
{ "delete": { "_index": "website", "_type": "blog", "_id": "123" }} 
{ "create": { "_index": "website", "_type": "blog", "_id": "123" }}
{ "title":    "My first blog post" }
{ "index":  { "_index": "website", "_type": "blog" }}
{ "title":    "My second blog post" }
{ "update": { "_index": "website", "_type": "blog", "_id": "123", "_retry_on_conflict" : 3} }
{ "doc" : {"title" : "My updated blog post"} } 
```

## 07  分布式的实现

### 分布式文档存储

ES中有很多分布式的概念，如文件分布到集群、集群包含多个节点、节点又有分片，而这些是分布式的基础，所以了解文档的分布是很有必要的。

### ES如何记录文档存储的位置

当索引一个文档的时候，文档会被存储到一个分片中。

**所以有个问题：创建文档的时候，如何确定文档被存储在哪个分片中？**

```
shard = hash(routing) % number_of_primary_shards
```

根据以上公式进行的。

1. routing 一个可变值，默认是文档的_id，通过hash函数生成一个数字，然后数字再除以number_of_primary_shards
2. number_of_primary_shards 主分片的数量
3. 为什么我们要在创建索引的时候就确定好主分片的数量 并且永远不会改变这个数量：因为如果数量变化了，那么所有之前路由的值都会无效，文档也再也找不到了。

### ES如何使得所有分片共享文档

**轮查所有的分片，有利于扩展扩容、负载均衡**

## 08 用ES搜索

**映射（Mapping）**

描述数据在每个字段内如何存储

**分析（Analysis）**

全文是如何处理使之可以被搜索的

**领域特定查询语言（Query DSL）**

Elasticsearch 中强大灵活的查询语言
