<h1 align="center">Kafka</h1>

本文是关于Kafka实践及原理的总结。

## 关于Kafka

### 定义

分布式流式处理平台，具有高吞吐、可持久化、可水平扩展、支持流数据处理等多种特性。

- **分布式：**多服务器
- **高吞吐：**单位时间内，能传输的数据量
- **低延迟：**对一个请求，提供响应所需要的时间

### 功能

#### 消息系统

具备系统解耦、冗余存储、流量削峰、缓冲、异步通信、高拓展、可恢复性等功能

#### 存储系统

可以把消息持久化到磁盘，保证了数据丢失的风险，得益于Kafka的消息持久化功能和多副本机制

#### 流式处理平台

Kafka不仅为每个流行的流式处理框架提供了可靠的数据来源，还提供了一个完整的处理类库。类别Java中的Stream()。

## 基本框架

### 框架的组成

Kafka的基本组成包括```Producer```、```Broker```、```Consumer``` 以及一个```ZooKeeper``` 集群。

- Zookeeper : 集群管理器、负责将Kafka集群元数据的管理、控制器的选举等操作
- Producer : 消息的生产者、将消息发送到Broker
- Broker : 消息的协调者，负责将消息存储到磁盘并提供Consumer消费，也是服务的代理节点，对于Kafka而言，Broker可以简单看作一个独立的Kafka服务节点或Kafka服务实例
- Consumer : 消息的消费者，接收消息的一方

### 信息的管理

Kafka中信息即消息的管理是通过主题（Topic）和分区（Partition）进行的。

- 消息以主题为单位进行分类
- 主题可以细分为若干个分区
- 一个分区仅属于一个主题
- 同一主题下不同的分区包含的消息是不同的
- 消息在被追加到分区日志文件的时候会被追加一个偏远量，这是消息在分区中的唯一标记
- Kafka保证的是分区有序而不是主题有序
- 一个主题的不同分区可以被分布在多个broker上，即一个主题可以横跨多个broker

![image-20211223105248173](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\image-20211223105248173.png)

#### 通过分区实现水平拓展扩容

如果一个主题只对应一个文件，则该文件所在机器的I/O系统将成为这个主题的瓶颈，设计多个分区，实现消息的跨服务、跨机器的存储则解决了这个问题。

在创建主题的时候，可以通过指定的参数来设置分区的个数，即通过增加分区的方式实现水平的拓展。

#### 用多副本机制提升容灾能力

Kafka 为分区引入了多副本机制。通过增加副本的数量可以提升容灾的能力。

- 同一个分区的不同副本保存相同的信息
- 副本之间是一主多从的关系
  - leader主本负责处理读写请求
  - follower副本负责与leader主本消息同步
  - 副本在不同的broker中，当leader副本出现故障时，follower副本中将会重新选举新的leader副本对外提供服务

Kafka通过多副本机制实现了故障的自动转移，当Kafka集群中的某个broker失效时仍然能够保证服务可用

![image-20211223110415128](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\image-20211223110415128.png)

#### 消费定位模式避免消息丢失

Kafka的消费端具备一定的容灾能力，Consumer使用pull拉模式从服务端拉取消息，并且将消息消费的具体位置进行保存，当消费者宕机后可以根据之前保存的消费位置重新拉取需要的消息。

#### 分区中的副本管理机制

- AR :  分区中的所有副本
- ISR : 所有与leader副本保持一定程度同步的副本
- OSR : 与leader副本同步滞后过多的副本组成的集合
- AR = ISR + OSR
- 当某个副本在ISR中滞后的消息太多的时候，leader副本会将其从ISR中剔除
- 如果OSR中某个副本的滞后状态符合ISR集合的要求，则会被归于ISR集合中
- HW : 高水位，标记了一个特定的消息偏移量，消费者只能拉取到该标记之前的消息
- LEO : 当前日志分区中最后一条消息的标记值+1，即用来表示待写入消息的标记

![image-20211223113436179](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\image-20211223113436179.png)

## 安装和配置

ZooKeeper 和 Kafka 是运行在JDK上的应用程序，因此，需要部署JDK环境

### 安装JDK

```
根据网上教程安装配置
```

### 安装ZooKeeper

#### 安装

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

#### 报错

**具体描述**

```
Starting zookeeper ... FAILED TO START
```

**解决方案**

```
建议使用低版本
https://dlcdn.apache.org/zookeeper/zookeeper-3.5.9/apache-zookeeper-3.5.9-bin.tar.gz
```

### 安装Kafka

```
01 下载
wget https://dlcdn.apache.org/kafka/2.6.3/kafka-2.6.3-src.tgz

02 解压
tar -zxvf https://dlcdn.apache.org/kafka/2.6.3/kafka-2.6.3-src.tgz

03 安装 

```

## 基本使用

### 创建主题 

```kafka-topics.sh```  用来创建主题的脚本命令

|         命令         |               作用               |
| :------------------: | :------------------------------: |
|     --zookeeper      | 指定Kafka链接的zookeeper服务地址 |
|       --topic        |      指定要创建的主题的名称      |
| --replication-factor |           指定副本因子           |
|     --partitions     |           指定分区个数           |
|       --create       |             创建主题             |
|      --describe      |       主题的更多的具体信息       |

### 发送消息

```kafka-console-consumer.sh``` 消费者脚本命令

```kafka-console-producer.sh``` 生产者脚本命令

|        命令        |          脚本           |
| :----------------: | :---------------------: |
| --bootstrap-server | 指定连接的Kafka集群地址 |
|      --topic       |  指定消费者订阅的主题   |
|   --broker-list    |    指定Kafka集群地址    |
|      --topic       | 指定了发送消息时的主题  |

## Producer 生产者

负责向Kafka发送消息的应用程序。

### 基本生产流程

1. 配置生产者客户端参数并创建相应的生产者实例
2. 构建待发送的消息
3. 发送消息
4. 关闭生产者实例

### 使用Java客户端的生产者

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

### 发送消息的三种方式

#### 发后即忘 fire-and-forget

它只管往Kafka中发送消息而并不关心消息是否正确到达。 容易造成数据的丢失。

性能最高，可靠性最差。

```
producer.send(record);
```

#### 同步 sync

```
producer.send(record).get();
```

#### 异步 async

```
 producer.send(record, new Callback() {
@Override
public void onCompletion(RecordMetadata recordMetadata, Exception e) {
}
});
```

### 使用Java客户端的消费者

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

### 数据传输的序列化

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

### 使用分区器

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

