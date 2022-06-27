<h1 align = "center">Java一站式问题Q&A</h1>






本文总结了在Java一站式springboot微服务中遇到的一系列问题，章节分析了问题出现的原因及解决方案。





<h5 align = "center">2021-11-19</h4>

# 目录

[TOC]

# Q&A



### 001  Controller 接口Url重名

#### Question 

```java
Caused by: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'webMvcRequestHandlerProvider' defined in URL [jar:file:/D:/shijuMVN/io/springfox/springfox-spring-webmvc/3.0.0/springfox-spring-webmvc-3.0.0.jar!/springfox/documentation/spring/web/plugins/WebMvcRequestHandlerProvider.class]: Unsatisfied dependency expressed through constructor parameter 2; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'requestMappingHandlerMapping' defined in class path resource [org/springframework/boot/autoconfigure/web/servlet/WebMvcAutoConfiguration$EnableWebMvcConfiguration.class]: Invocation of init method failed; nested exception is java.lang.IllegalStateException: Ambiguous mapping. Cannot map 'keyProLanduserController' method 
```

#### Answer

**分析：**

```java
Error creating bean with name 'webMvcRequestHandlerProvider' defined in URL
```

**webMvcRequestHandlerProvider** 是spring boot中统一接口管理的类，**同一个接口中的Url不能重复**，如果接口有相同的Url，则初始化时会报该问题。

**方案：**

1. 检查接口中是否存在Url相同的方法
2. 如果存在，检查方法的参数和请求方法是否一样

**<u>以上出现任意一个情况，都需要对接口进行差异化处理。</u>**



### 002  Seata 服务发现

#### Question 

```java
no available service found in cluster 'default', please make sure registry config correct and keep your seata server running
```

#### Answer

**分析：**

registry.conf 配置文件中，指定了seata管理的服务的地址

```java
registry {
  # file 、nacos 、eureka、redis、zk、consul、etcd3、sofa
  type = "nacos"

  nacos {
    application = "serverAddr"
    serverAddr = "XXXXXXX"
    group = "SEATA_GROUP"
    namespace = "XXXXXX"
    cluster = "default"
    username = "XXXXX"
    password = "XXXX"
  }
  eureka {
    serviceUrl = "http://localhost:8761/eureka"
    application = "default"
    weight = "1"
  }
  redis {
    serverAddr = "localhost:6379"
    db = 0
    password = ""
    cluster = "default"// 为默认的服务集群
    timeout = 0
  }

```

如文件中所示，default，为默认的服务集群。

**方案：**检查 registry.conf 文件中 的cluster属性的配置是否为default，注意的是该配置必须与其他服务的nacos一致，如下所示。

```java
seata:
  enabled: true
  application-id: XXXX
  use-jdk-proxy: false
  enable-auto-data-source-proxy: false
  tx-service-group: "fsp_tx_group"
  registry:
    type: nacos
    nacos:
      application: seata
      server-addr: XXXX
      group: "DEFAULT_GROUP"
      namespace:"STRING"
  service:
    vgroup-mapping:
      fsp_tx_group: default // 尤其要注意这个问题
```

重点看这个服务组

```java
service:
    vgroup-mapping:
      fsp_tx_group: default
```



### 003  OpenFeign 负载均衡

#### Question 

```java
 com.netflix.client.ClientException: Load balancer does not have available server for client: XXXX
```

#### Answer

**分析：**

- springCloud 微服务体系，通过OpenFeign进行服务间通信。

- 每个feign-client 有自己的名字和空间。如下所示

  ```java
  @FeignClient(
  	contextId = "xxxx",
  	name = "${osmp.comm.feign-client.name:xxxx}",
  	url = "${osmp.comm.feign-client.url:}")
  ```

- 进行服务间通信时，需要确定调用对象是哪个服务，因此需要在服务中心进行配置。

**方案：**

检查nacos，并进行配置。

```java
xxxx:
    feign-client:
      name: xxxx
      url: http://服务注册地址nacos地址/xxxx
```



### 004 nacos 服务注册

#### Question

```
如何注册一个服务，供其他服务通过 openfeign 调用
```

#### Answer

**分析：**

需要结合springboot框架进行配置。

**方案：**

SpringCloud 通过nacos 注册服务，做服务发现和调度中心。其基本流程大概为：

1. nacos 访问地址及统一端口号作为系统的入口，并由spring自带的鉴权模块统一管理入口权限

   ```
   spring:
     security:
       oauth2:
         resourceserver:
           jwt:
             jwk-set-uri: http://nacos访问地址:端口号/public/服务地址/oauth/jwks.json
   ```

2. nacos 添加服务配置，并将鉴权管理添加（如上）

3. 配置中添加有效端口地址

   ```
   server:
     port: 有效端口地址
   ```

4. 为了seata调度中心能够统一，管理，nacos中需要添加seata的配置

   ```
   seata:
     enabled: true
     application-id: 服务名
     use-jdk-proxy: false
     enable-auto-data-source-proxy: false
     tx-service-group: fsp_tx_group
     registry:
       type: nacos
       nacos:
         application: seata
         server-addr: nacos地址
         group: "DEFAULT_GROUP"
         namespace: 系统nacos命名空间
     service:
       vgroup-mapping:
         fsp_tx_group: default
   ```




### 005 pg 客户过多

#### Question

```java
org.postgresql.util.PSQLException: 致命错误: 对不起, 已经有太多的客户
```

#### Answer

**分析：**

由数据库连接数太多导致的问题。

**方案：**

- 首先通过查询，查看连接数

```
select * from pg_stat_activity WHERE state = 'active' 
```

结果集会显示出当前连接的数据库名，用户，IP地址，连接开始时间，查询的语句，状态等。
这时我们可以根据 state 列进行区分。

- 两种处理办法

  - 如果大部分的连接state列的值为active，则需要考虑增加数据库的最大连接数，修改方法为：

  ```
  找到postgresql安装配置文件 postgresql.conf ，直接修改配置值
  max_connections = 2500 # (change requires restart)
  其中2500为修改的具体值，根据自己的需要指定，修改后需要重启数据库服务。
  ```

  - 如果大部分的连连接state值为idle，并且我们不想重启的话

    可以用pg_stat_get_backend_activity(integer) 函数kill掉处于空闲状态的连接，完整sql如下：

  ```
  SELECT pg_terminate_backend(pid) from pg_stat_activity where state = 'idle'
  ```

### 006 has not been refreshed yet

#### Question

```java
fileListener execute error, dataId :service.vgroupMapping.fsp_tx_group
    
Caused by: java.lang.IllegalStateException: org.springframework.boot.web.servlet.context.AnnotationConfigServletWebServerApplicationContext@73e132e0 has not been refreshed yet
```

####  Answer

**分析**：

> 在Spring容器初始化时发生异常，此时 Spring还没有执行 destroy（该方法中会执行 close()->doClose()） 方法时尝试去获取Bean时会出现这个问题。
>
> 因为在Spring容器初始化时发生异常 Spring会在catch块中捕捉异常然后调用 cancelRefresh方法，这个方法中会将 AbstractApplicationContext.active 设为 false，Spring在尝试进行获取 Bean 时会进入AbstractApplicationContext.assertBeanFactoryActive 方法，这个方法会校验 active 的值，如果为false 则会校验AbstractApplicationContext.closed 的值，如果 close 也为 true 的话就抛出has been closed already 异常，否则抛出 has not been refreshed yet 的异常。
>
> close 在执行 AbstractApplicationContext.doClose 方法中会被设为 true 。				

**服务中抛出异常的源码为**

```java
/**
	 * Assert that this context's BeanFactory is currently active,
	 * throwing an {@link IllegalStateException} if it isn't.
	 * <p>Invoked by all {@link BeanFactory} delegation methods that depend
	 * on an active context, i.e. in particular all bean accessor methods.
	 * <p>The default implementation checks the {@link #isActive() 'active'} status
	 * of this context overall. May be overridden for more specific checks, or for a
	 * no-op if {@link #getBeanFactory()} itself throws an exception in such a case.
	 */
	protected void assertBeanFactoryActive() {
		if (!this.active.get()) {
			if (this.closed.get()) {
				throw new IllegalStateException(getDisplayName() + " has been closed already");
			}
			else {
				throw new IllegalStateException(getDisplayName() + " has not been refreshed yet");
			}
		}
	}
```

```
断言此上下文的BeanFactory当前处于活动状态，如果未处于活动状态，则抛出{@link IllegalStateException} 由依赖于活动上下文的所有{@linkBeanFactory}委托方法调用，尤其是所有bean访问器方法。默认实现检查此上下文的{@link#isActive（）'active'}状态。如果{@link#getBeanFactory（）}本身在这种情况下引发异常，则可能会覆盖更具体的检查，或覆盖no-op。
```

大概意思是bean工厂有问题，工厂没有启动或初始化。seata主要用来进行分布式事务管理，数据全局保持一致性。

**方案**：

对于以上问题，产生的原因可能有

1. springboot 上下文声明有问题
2. seata服务有问题
3. 数据库连接数据源有问题
4. mapper文件读取数据有问题

### 007  seata集群问题

#### Question

```java
can not get cluster name in registry config 'service.vgroupMapping.jiance-seata-service-group', please make sure registry config correct
    
无法在注册表配置“service.vgroupMapping.jiance seata service group”中获取群集名称，请确保注册表配置正确
```

#### Answer

**分析**：

这是因为nacos中没有设置集群服务管理

**方案**：进行下面的配置就完事了

```java
seata:
  enabled: true
  application-id: jiance
  use-jdk-proxy: false
  enable-auto-data-source-proxy: false
  tx-service-group: DEFAULT_GROUP
  registry:
    type: nacos
    nacos:
      application: seata
      server-addr: 10.14.2.31:8848
      group: "DEFAULT_GROUP"
      namespace: 19dc9793-a32b-4a2c-af18-95c54e8aa811
  service:
    vgroup-mapping:
      DEFAULT_GROUP: seata
    enable-degrade: false
    disable-global-transaction: false
```

### 008 服务集成天山

#### Question

```
新增的服务模块如何集成天山
```

#### Answer

- 新增配置接口

```Java
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface EnableOsmpJianceConfiguration {

}
```

- 天山启动类中新增以上配置

```Java
@EnableOsmpHomeConfiguration
@EnableOsmpMeetingConfiguration
@EnableProcessConfiguration
@EnableOsmpSuperviseConfiguration
@EnableOsmpOpConfiguration
@EnableOpBusinessConfiguration
@EnableOsmpJianceConfiguration
@EnableMisFlowAutoConfiguration
@EnableOsmpArchiveConfiguration
@EnableTzConfiguration
@EnableTzEnforcementConfigration
@EnableVenusCoreConfiguration
@EnableVenusCoreModuleUrlPrefix

@EnableAsync
@EnableCaching
@EnableDiscoveryClient
@SpringBootApplication(exclude = {DruidDataSourceAutoConfigure.class})
public class TianShanWebApplication {
    public static void main(String[] args) {
        SpringApplication.run(TianShanWebApplication.class, args);
    }
}	
```

- pom文件新增模块依赖

```Java
<dependency>
			<groupId>com.hnup.osmp</groupId>
			<artifactId>jiance-starter</artifactId>
		</dependency>

		<dependency>
			<groupId>com.hnup.osmp</groupId>
			<artifactId>jiance-model</artifactId>
		</dependency>
```

- 修改nacos中的gateway文件

```Java
- id: jiance-app
          uri: lb:/tianshan/jiance
          predicates:
            - Path=/api/jiance/**
          filters:
            - StripPrefix=1
```

### 009 本地项目POM文件引入Jar（无maven仓库）

#### Question

```
如何不用maven仓库将jar包引入项目中
```

#### Answer

```java
mvn install:install-file -DgroupId=com.hnup.osmp -DartifactId=doc-model -Dversion=4.0.0-20211115-SNAPSHOT -Dpackaging=jar -Dfile=C:\Users\MSI\Desktop\doc-model.jar 

```

### 010 数据库批量大小写设置

#### Question

```
如果想把数据库中的表名及字段都改为大写，如何办
```

#### Answer

```mysql
begin
for c in (select COLUMN_NAME cn from all_tab_columns where table_name='JC_MANAGEMENT_CONTRO') loop
begin
execute immediate 'alter table JC_MANAGEMENT_CONTRO rename column "'||c.cn||'" to '||c.cn;
exception
when others then
dbms_output.put_line('JC_MANAGEMENT_CONTRO'||'.'||c.cn||'已经存在');
end;
end loop;
end;
	
```

### 011 数据库循环遍历SQL语句

#### Question

> 需要循环遍历 给一些表新增同样的字段，因此需要使用数据库遍历SQL语句

#### Answer

对于简单的新增可以用for循环 ，如下

```sql
1.创建一个序列，是为了主键自增。

create sequence t_hvm_seq;

2.以下是我在 HVM_ZSB_TJ这张表中添加数据

insert into hvm_zsb_tj t (t.id,t.stsres,t.bdzdydj,t.byq) values(t_hvm_seq.nextval,'a','a',1);
3.循环执行sql，以下是循环执行100遍

declare   
  i integer;  
begin  
  i:=0;  
  for i in 1..100 loop  
insert into hvm_zsb_tj t (t.id,t.stsres,t.bdzdydj,t.byq) values(t_hvm_seq.nextval,'a','a',1);
  end loop;     
end;  

```

对于复杂情况下的，可以使用SQL

```sql

DECLARE
  V_SQL        VARCHAR2(2000);---定义一个变量接收SQL
  V_TABLE_NAME VARCHAR2(30);----定义一个变量接收表名
  CURSOR C1 IS----定义一个游标 接收查询结果方便遍历
      SELECT DISTINCT CONCAT('form_data_', FORM_ID) as TABLE_NAME  FROM (SELECT FORM_ID FROM TZ WHERE FORM_ID is not NULL) ;
BEGIN
  OPEN C1;----打开游标
  LOOP
    --提取一行数据到c1
    FETCH C1
      INTO V_TABLE_NAME;
    --判读是否提取到值，没取到值就退出
    --取到值c_job%notfound 是false 
    --取不到值c_job%notfound 是true
    EXIT WHEN C1%NOTFOUND;
    V_SQL := 'alter table ' || V_TABLE_NAME || ' add DATA_SOURCE NUMBER(4,0)';----拼接SQL
    EXECUTE IMMEDIATE V_SQL;---执行SQL
  END LOOP; --关闭游标
  CLOSE C1;
END;
```

如果要判断数据库是否存在某个表或表中是否存在某个字段

```sql

DECLARE
  V_SQL        VARCHAR2(2000);---定义一个变量接收SQL
  V_TABLE_NAME VARCHAR2(30);----定义一个变量接收表名
	COUNT_N NUMBER(4);----定义一个变量判断字段是否存在
  CURSOR C1 IS----定义一个游标 接收查询结果方便遍历
      SELECT DISTINCT CONCAT('FORM_DATA_', FORM_ID) as TABLE_NAME  FROM (SELECT FORM_ID FROM TZ WHERE FORM_ID is not NULL) ;
BEGIN
  OPEN C1;----打开游标
  LOOP
    --提取一行数据到c1
    FETCH C1
      INTO 	V_TABLE_NAME;
			
    --判读是否提取到值，没取到值就退出
    --取到值c_job%notfound 是false 
    --取不到值c_job%notfound 是true
    EXIT WHEN C1%NOTFOUND;
		dbms_output.put_line('开始更新表' || V_TABLE_NAME);
		 
		 
	  -----判断数据库中是否存在某个表
	  select count(*) INTO COUNT_N from user_objects where  object_name = V_TABLE_NAME;
	  IF (COUNT_N =1) THEN
					---判断表中是否存在字段
				SELECT COUNT(*) INTO COUNT_N FROM USER_TAB_COLUMNS WHERE UPPER(TABLE_NAME)= V_TABLE_NAME AND COLUMN_NAME = 'DATA_SOURCE';
				dbms_output.put_line(COUNT_N);
				IF (COUNT_N = 0 ) THEN
				dbms_output.put_line(V_TABLE_NAME || '不存在 DATA_SOURCE 字段 开始新增');
					V_SQL := 'alter table ' || V_TABLE_NAME || ' add DATA_SOURCE NUMBER(4,0)';----拼接SQL
					EXECUTE IMMEDIATE V_SQL;---执行SQL
				ELSE
				dbms_output.put_line(V_TABLE_NAME || '已存在 DATA_SOURCE 字段 ');
				END IF;
		END IF;
  END LOOP; --关闭游标
  CLOSE C1;
END;
```

### 012 数据库设置自增序列

#### Question

> 有时候我们需要在数据库插入数据，这个时候，需要我们自增序列

#### Answer

```sql
create sequence TEST_SEQ  ---序列名（TEST_SEQ 为序列名，自定义命名）­
increment by 1  ---/每次增加1­
start with 1 ----从1开始­
minvalue 1  -----/最小值1­
nomaxvalue  ---//没有最大值 或者­ maxvalue 99999999999999999
nocache  ---//没有缓存序列­ 或者 cache 20 缓存20个


select TEST_SEQ.currval from dual;   ---//查询当前的序列值
select TEST_SEQ.nextval from dual;  ---//查询下一个序列值
```



