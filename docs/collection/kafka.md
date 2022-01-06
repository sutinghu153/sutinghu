<h1 align="center">Kafka</h1>

本文是关于Kafka实践及原理的总结。

## 01 关于Kafka

### 1-1 定义

分布式流式处理平台，具有高吞吐、可持久化、可水平扩展、支持流数据处理等多种特性。

- **分布式：**多服务器
- **高吞吐：**单位时间内，能传输的数据量
- **低延迟：**对一个请求，提供响应所需要的时间

### 1-2 功能

#### 1-2-1 消息系统

具备系统解耦、冗余存储、流量削峰、缓冲、异步通信、高拓展、可恢复性等功能

#### 1-2-2 存储系统

可以把消息持久化到磁盘，保证了数据丢失的风险，得益于Kafka的消息持久化功能和多副本机制

#### 1-2-3 流式处理平台

Kafka不仅为每个流行的流式处理框架提供了可靠的数据来源，还提供了一个完整的处理类库。类别Java中的Stream()。

## 02 基本框架

### 2-1 框架的组成

Kafka的基本组成包括```Producer```、```Broker```、```Consumer``` 以及一个```ZooKeeper``` 集群。

- Zookeeper : 集群管理器、负责将Kafka集群元数据的管理、控制器的选举等操作
- Producer : 消息的生产者、将消息发送到Broker
- Broker : 消息的协调者，负责将消息存储到磁盘并提供Consumer消费，也是服务的代理节点，对于Kafka而言，Broker可以简单看作一个独立的Kafka服务节点或Kafka服务实例
- Consumer : 消息的消费者，接收消息的一方

### 2-2 信息的管理

Kafka中信息即消息的管理是通过主题（Topic）和分区（Partition）进行的。

- 消息以主题为单位进行分类
- 主题可以细分为若干个分区
- 一个分区仅属于一个主题
- 同一主题下不同的分区包含的消息是不同的
- 消息在被追加到分区日志文件的时候会被追加一个偏远量，这是消息在分区中的唯一标记
- Kafka保证的是分区有序而不是主题有序
- 一个主题的不同分区可以被分布在多个broker上，即一个主题可以横跨多个broker

![image-20211223105248173](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\image-20211223105248173.png)

#### 2-2-1 通过分区实现水平拓展扩容

如果一个主题只对应一个文件，则该文件所在机器的I/O系统将成为这个主题的瓶颈，设计多个分区，实现消息的跨服务、跨机器的存储则解决了这个问题。

在创建主题的时候，可以通过指定的参数来设置分区的个数，即通过增加分区的方式实现水平的拓展。

#### 2-2-2 用多副本机制提升容灾能力

Kafka 为分区引入了多副本机制。通过增加副本的数量可以提升容灾的能力。

- 同一个分区的不同副本保存相同的信息
- 副本之间是一主多从的关系
  - leader主本负责处理读写请求
  - follower副本负责与leader主本消息同步
  - 副本在不同的broker中，当leader副本出现故障时，follower副本中将会重新选举新的leader副本对外提供服务

Kafka通过多副本机制实现了故障的自动转移，当Kafka集群中的某个broker失效时仍然能够保证服务可用

![image-20211223110415128](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\image-20211223110415128.png)

#### 2-2-3 消费定位模式避免消息丢失

Kafka的消费端具备一定的容灾能力，Consumer使用pull拉模式从服务端拉取消息，并且将消息消费的具体位置进行保存，当消费者宕机后可以根据之前保存的消费位置重新拉取需要的消息。

#### 2-2-4 分区中的副本管理机制

- AR :  分区中的所有副本
- ISR : 所有与leader副本保持一定程度同步的副本
- OSR : 与leader副本同步滞后过多的副本组成的集合
- AR = ISR + OSR
- 当某个副本在ISR中滞后的消息太多的时候，leader副本会将其从ISR中剔除
- 如果OSR中某个副本的滞后状态符合ISR集合的要求，则会被归于ISR集合中
- HW : 高水位，标记了一个特定的消息偏移量，消费者只能拉取到该标记之前的消息
- LEO : 当前日志分区中最后一条消息的标记值+1，即用来表示待写入消息的标记

![image-20211223113436179](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\image-20211223113436179.png)

## 03 安装和配置

ZooKeeper 和 Kafka 是运行在JDK上的应用程序，因此，需要部署JDK环境

### 3-1 安装JDK

```
根据网上教程安装配置
```

### 3-2 安装ZooKeeper

#### 3-2-1 安装

```xml
01 下载
wget https://dlcdn.apache.org/zookeeper/zookeeper-3.6.3/apache-zookeeper-3.6.3.tar.gz

02 安装
tar -zxvf apache-zookeeper-3.6.3.tar.gz

03 配置
cd apache-zookeeper-3.6.3/
cd conf/
cp zoo_sample.cfg zoo.cfg
cd ..
cd bin/

04 启动
sh zkServer.sh start

05 启动客户端
sh zkCli.sh
```

#### 3-2-2 报错

**具体描述**

```
Starting zookeeper ... FAILED TO START
```

**解决方案**

```
建议使用低版本
https://dlcdn.apache.org/zookeeper/zookeeper-3.5.9/apache-zookeeper-3.5.9-bin.tar.gz
```

### 3-3 安装Kafka

```
01 下载
wget https://dlcdn.apache.org/kafka/2.6.3/kafka-2.6.3-src.tgz

02 解压
tar -zxvf https://dlcdn.apache.org/kafka/2.6.3/kafka-2.6.3-src.tgz

03 安装 

```

## 04 基本使用

### 4-1 创建主题 

```kafka-topics.sh```  用来创建主题的脚本命令

|         命令         |               作用               |
| :------------------: | :------------------------------: |
|     --zookeeper      | 指定Kafka链接的zookeeper服务地址 |
|       --topic        |      指定要创建的主题的名称      |
| --replication-factor |           指定副本因子           |
|     --partitions     |           指定分区个数           |
|       --create       |             创建主题             |
|      --describe      |       主题的更多的具体信息       |

### 4-2 发送消息

```kafka-console-consumer.sh``` 消费者脚本命令

```kafka-console-producer.sh``` 生产者脚本命令

|        命令        |          脚本           |
| :----------------: | :---------------------: |
| --bootstrap-server | 指定连接的Kafka集群地址 |
|      --topic       |  指定消费者订阅的主题   |
|   --broker-list    |    指定Kafka集群地址    |
|      --topic       | 指定了发送消息时的主题  |

## 05 Producer 生产者

负责向Kafka发送消息的应用程序。

### 5-1 基本生产流程

1. 配置生产者客户端参数并创建相应的生产者实例
2. 构建待发送的消息
3. 发送消息
4. 关闭生产者实例

### 5-2 使用Java客户端的生产者

```java
public class ProducerFastStart {
    public static final String brokerList = "localhost:9092";
    public static final String topic = "topic-demo";

    public static void main(String[] args) {
        Properties properties = new Properties();
        properties.put("key.serializer",
                "org.apache.kafka.common.serialization.StringSerializer");
        properties.put("value.serializer",
                "org.apache.kafka.common.serialization.StringSerializer");
        properties.put("bootstrap.servers", brokerList);


        KafkaProducer<String, String> producer =
                new KafkaProducer<>(properties);
        ProducerRecord<String, String> record =
                new ProducerRecord<>(topic, "hello, Kafka!");
        try {
            producer.send(record);
//            producer.send(record).get();
        } catch (Exception e) {
            e.printStackTrace();
        }
        producer.close();
    }
}
```

```java
关于：ProducerRecord
public class ProducerRecord<K, V> {
    // 主题
    private final String topic;
    // 分区号
    private final Integer partition;
    // 消息头部
    private final Headers headers;
    // 键——让消息进行二次归类
    private final K key;
    // 值
    private final V value;
    // 消息的时间戳 CreateTime和LogAppendTime两种类型，前者表示消息创建的时间，后者表示消息追加到日志文件的时间
    private final Long timestamp;
    }
```

### 5-3 发送消息的三种方式

#### 5-3-1 发后即忘 fire-and-forget

它只管往Kafka中发送消息而并不关心消息是否正确到达。 容易造成数据的丢失。

性能最高，可靠性最差。

```
producer.send(record);
```

#### 5-3-2 同步 sync

```
producer.send(record).get();
```

#### 5-3-3 异步 async

```
 producer.send(record, new Callback() {
@Override
public void onCompletion(RecordMetadata recordMetadata, Exception e) {
}
});
```

### 5-4 使用Java客户端的消费者

```java
public class ConsumerFastStart {
    public static final String brokerList = "localhost:9092";
    public static final String topic = "topic-demo";
    public static final String groupId = "group.demo";

    public static void main(String[] args) {
        Properties properties = new Properties();
        properties.put("key.deserializer",
                "org.apache.kafka.common.serialization.StringDeserializer");
        properties.put("value.deserializer",
                "org.apache.kafka.common.serialization.StringDeserializer");
        properties.put("bootstrap.servers", brokerList);
        properties.put("group.id", groupId);

        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(properties);
        consumer.subscribe(Collections.singletonList(topic));

        while (true) {
            ConsumerRecords<String, String> records =
                    consumer.poll(Duration.ofMillis(1000));
            for (ConsumerRecord<String, String> record : records) {
                System.out.println(record.value());
            }
        }
    }
}
```

### 5-5 数据传输的序列化

Kafka的消息生产和消费及发送都需要通过serializer 序列化器将数据序列为byte[] 来进行数据的传输。

用来对传输对象进行序列化的方法一般是实现Serializer序列化器。如String的序列化

```java
public class StringSerializer implements Serializer<String> {
    private String encoding = "UTF8";

    @Override
    public void configure(Map<String, ?> configs, boolean isKey) {
        String propertyName = isKey ? "key.serializer.encoding" : "value.serializer.encoding";
        Object encodingValue = configs.get(propertyName);
        if (encodingValue == null){

            encodingValue = configs.get("serializer.encoding");
        }
        if (encodingValue instanceof String){

            encoding = (String) encodingValue;
        }
    }

    @Override
    public byte[] serialize(String topic, String data) {
        try {
            if (data == null){

                return null;
            }
            else{

                return data.getBytes(encoding);
            }
        } catch (UnsupportedEncodingException e) {
            throw new SerializationException("Error when serializing string to byte[] due to unsupported encoding " + encoding);
        }
    }

    @Override
    public void close() {
        // nothing to do
    }
}

```

- configure() 方法用来配置当前类
- serialize() 方法用来执行序列化操作
- close() 方法用来关闭当前的序列化器

生产者使用的序列化器和消费者使用的反序列化器需要一一对应。

序列化器在使用的时候，将参数 ```value.serializer```设置为序列化器的全限定名。

```java
Properties properties = new Properties();
        properties.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,
                StringSerializer.class.getName());
```

### 5-5 使用分区器

如果在发送消息的时候使用的	ProducerRecord 构造器传了指定的分区号，即下

```Java
public ProducerRecord(String topic, Integer partition, K key, V value) {
        this(topic, partition, (Long)null, key, value, (Iterable)null);
    }
```

则不需要分区器。

分区器的作用在于控制消息的自动拓展机制、提升容灾能力且避免消息丢失。其作用是为消息分配分区。

使用分区器，需要实现Partitioner分区接口。

```java
public class DemoPartitioner implements Partitioner {
    private final AtomicInteger counter = new AtomicInteger(0);

    @Override
    public int partition(String topic, Object key, byte[] keyBytes,
                         Object value, byte[] valueBytes, Cluster cluster) {
        
    }

    @Override
    public void close() {
    }

    @Override
    public void configure(Map<String, ?> configs) {
    }
}
```

- partition() 方法用来计算分区号 
  - topic 主题
  - key  序列化后的键
  - value 序列化后的值
  - Cluster 集群的元数据信息
- configure() 方法用来获取配置信息及数据初始化

使用分区器的方式

```java
props.put (ProducerConfig.PARTITIONER_CLASS_CONFIG,
DemoPartitioner.class.getName() ) ;
```

## 06 Consumer 消费者

与生产者对应的是消费者。生产者将消息发送到服务器中，消费者通过订阅主题，拉取消息。

### 6-1 消费者和消费者组

- 消费者：Consumer，负责订阅Kafka中的主题。并从订阅的主题上拉取消息。
- 消费者组：每个消费者对应一个消费者组，当消息发布到主题后，只会被投递给订阅它的每个消费者组中的一个消费者。即一个组只能获取一次数据。

- 一个分区只能被一个消费组中的一个消费者所消费。

### 6-2 消息投递模式

对于消息中间件来说，消息的投递模式一般有两种。

|    属性    |         模式一         |                模式二                |
| :--------: | :--------------------: | :----------------------------------: |
|    名称    |   点对点（P2P）模式    |       发布-订阅（Pub-Sub）模式       |
|  数据结构  |          队列          |    内容节点（主题）传递消息的中介    |
| 生产者行为 |  生产者发送消息到队列  |         将消息发布到某个主题         |
| 消费者行为 | 消费者从队列中接收消息 |           从主题中订阅消息           |
|   耦合性   |                        | 主题使消息在订阅和发布者之间保持独立 |
|  传输关系  |         一对一         |             一对多广播式             |
|            |                        |                                      |

- 如果所有的消费者都隶属于同一个消费者组，则所有的消息都会被均衡地投递给每一个消费者，点对点模式
- 如果所有的消费者都隶属于不同的消费者组，则所有的消息都会被广播给所有的消费者，即每条消息会被所有消费者处理。

### 6-3 一般的消费过程

#### 6-3-1 一般过程

- 配置消费者客户端参数及创建相应的消费者实例
- 订阅主题
- 拉取消息并消费
- 关闭消费者实例

#### 6-3-2 代码实现

```java
public class KafkaConsumerAnalysis {
    public static final String brokerList = "localhost:9092";
    public static final String topic = "topic-demo";
    public static final String groupId = "group.demo";
    public static final AtomicBoolean isRunning = new AtomicBoolean(true);

    public static Properties initConfig() {
        Properties props = new Properties();
        props.put("key.deserializer",
                "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("value.deserializer",
                "org.apache.kafka.common.serialization.StringDeserializer");
        props.put("bootstrap.servers", brokerList);
        props.put("group.id", groupId);
        props.put("client.id", "consumer.client.id.demo");
        return props;
    }

    public static void main(String[] args) {
        Properties props = initConfig();
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
        consumer.subscribe(Arrays.asList(topic));

        try {
            while (isRunning.get()) {
                ConsumerRecords<String, String> records =
                        consumer.poll(Duration.ofMillis(1000));
                for (ConsumerRecord<String, String> record : records) {
                    System.out.println("topic = " + record.topic()
                            + ", partition = " + record.partition()
                            + ", offset = " + record.offset());
                    System.out.println("key = " + record.key()
                            + ", value = " + record.value());
                    //do something to process record.
                }
            }
        } catch (Exception e) {
            log.error("occur exception ", e);
        } finally {
            consumer.close();
        }
    }
}

```

#### 6-3-3 参数配置

```bootstrap.servers``` 该参数的释义和生产者客户端KafkaProducer中的相同，用来指定连接Kafka集群所需的broker地址清单。

```group.id``` 消费者隶属的消费者的名称，默认值为“”。如果设置为空，则会异常。

```key.deserializer``` ``value.deserializer`` 与生产者客户端参数对应，消费者从broker端获取的消息格式都是字节数组byte[] 类型，所以需要执行相应的反序列化操作。

```client.id``` 设定KafkaConsumer对应的客户端id，默认值也为""

### 6-4 订阅主题与分区

对于消费者使用集合的方式来订阅主题而言，是以下的方式

```java
consumer.subscribe(Arrays.asList(topic));
```

- 如果前后两次订阅了不同的主题，那么消费者以最后一次为准
- 如果使用正则表达式的方式订阅主题，在之后的过程中，如果有人创建了新的主题，并且主题的名字与正则表达式匹配，则消费者可以消费

### 6-5 消息消费

Kafka中消息是基于拉模式的，消息的消费一般有两种模式：推模式和拉模式。

- 推模式：服务端主动将消息推送给读者
- 拉模式：消费者主动向服务端发起请求来来取消息

### 6-6 位移提交

对于Kafka中的分区而言，它的每条消息都有唯一的提交位移。用来表示消息在分区中对应的位置。对于消费者而言，它也有自己的位移概念。

消费者在每次调用```poll()``` 方法时，返回的是还没有被消费过的消息集（当然这个前提是消息已经存储在Kafka中了），要做到这一点，需要记录上一次消费者消费时的位移，并将其做持久化保存，而不是单单保存在内存中，否则消费者重启之后无法知晓之前的消费位移。

在旧的消费者客户端中，消费位移是存储在ZooKeeper中的，而在新的消费者客户端中，消费位移存储在Kafka内部的主题：_consunmer_offsers中。

以上将消费位移存储（持久化）起来的动作，称之为“提交”，消费者在消息消费完后需要执行消费位移的提交。

```java
 public static void main(String[] args) {
        Properties props = initConfig();
        KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);


        TopicPartition tp = new TopicPartition(topic, 0);
        consumer.assign(Arrays.asList(tp));
        long lastConsumedOffset = -1;
        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(1000);
            if (records.isEmpty()) {
                break;
            }
            List<ConsumerRecord<String, String>> partitionRecords
                    = records.records(tp);
            lastConsumedOffset = partitionRecords
                    .get(partitionRecords.size() - 1).offset();
            consumer.commitSync();//同步提交消费位移
        }
        System.out.println("comsumed offset is " + lastConsumedOffset);
        OffsetAndMetadata offsetAndMetadata = consumer.committed(tp);
        System.out.println("commited offset is " + offsetAndMetadata.offset());
        long posititon = consumer.position(tp);
        System.out.println("the offset of the next record is " + posititon);
    }
```

### 6-7 控制或关闭消费

KafkaConsumer提供了对消费速度进行控制的方法，在有些应用场景下我们可能需要暂停某些分区的消费而先消费其它分区，当达到一定条件时再恢复这些分区的消费。KafkaConsumer中使用pause()和resume()方法来实现暂停某些分区在拉取操作时返回数据给客户端和恢复某些分区向客户端返回数据的操作。

```java
public void pause (Collection<TopicPartition> partitions)
public void resume (Collection<TopicPartition> partitions)
```

### 6-8 再均衡

再均衡是指分区的所属权从一个消费者转移到另一个消费者的行为，它为消费组具备高可用性和伸缩性提供保障。作用如下：

- 可以既方便又安全地删除组内的消费者
- 往消费者组内添加消费者

### 6-9 消费者拦截器

消费者拦截器对消息进行定制化的操作。比如修改返回的消息内容、按照某种规则过滤消息。

## 07 主题和分区

主题和分区是Kafka的两个核心概念，生产者和消费者的设计理念针对的都是主题和分区层面的操作。

它们的基本关系可以认为是：

​						主题 = 分区1+分区2+分区3+....分区n

​						分区可以有多个副本，每个副本对应一个日志文件

​						每个日志文件对应一个至多个日志分段

​						每个日志分段细分为索引文件、日志存储文件、快照文件

所以：

- 主题是对消息的归类
- 分区是对消息的细分

### 7-1 主题的管理

#### 7-1-1 主题的基本操作

1. 创建主题
2. 查看主题
3. 修改主题
4. 删除主题

#### 7-1-2 操作的基本方式

- 可以通过Kafka提供的 ```kafka-topics.sh``` 脚本来执行这些操作
- 通过KafkaAdminClient的方式来实现，这种方式的本质是通过发送CreateTopicsRequest、DeleteTopicsResquest 等请求来实现
- 通过操作日志文件和ZooKeeper节点来实现

### 7-2 创建主题详解

**创建主题**

```shell
./kafka-topics.sh --create --topic "sutinhu2-topic" --zookeeper localhost:2181 --replication-factor 1 --partitions 1
```

**查看主题**

```shell
./kafka-topics.sh --list --zookeeper localhost:2181
```

**查看主题详细信息**

```shell
./kafka-topics.sh --describe --zookeeper localhost:2181
```

**删除主题**

```shell
 ./kafka-topics.sh --delete --topic "sutinghu2-topic" --zookeeper localhost:2181不同的场景
```

- 主题的自动创建（auto.create.topics.enable=true）
  - 当生产者向一个尚未创建的主题发送消息时，会自动创建一个主题，该主题分区数为num.partitions 默认为 1 、副本因子为default.replaication.factor默认为1
  - 当消费者向一个未知的主题中读取消息时，或者当任意一个客户端向未知主题发送元数据请求时，会默认创建一个对应的主题
- 主题的手动创建
  - Kafka-topics.sh脚本创建

![image-20211229113738076](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\image-20211229113738076.png)

### 7-3 分区副本的分配

- 生产者的分区分配是指为每条消息指定其所要发往的分区。

- 消费者中的分区分配是指为消费者指定其可以消费消息的分区。

  

  本文中的分区分配是指为集群指定创建主题时的分区副本分配方案，即在哪个broker中创建哪些分区的副本

#### 7-3-1 replica-assignment 参数

1. 指定replica-assignment参数——按照指定的方案进行
2. 未指定replica-assignment参数——按照内部的逻辑计算分配方案

#### 7-3-2 Kafka-topics 脚本机架信息

使用 Kafka-topics 脚本创建主题时的内部分配逻辑按照机架信息划分为两种策略

1. 指定机架信息
2. 未指定机架信息

### 7-4 查看主题详解

Kafka-topics.sh 脚本中有5种指令类型：create、list、describe、alter、delete

