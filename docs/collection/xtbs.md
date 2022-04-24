<h1 align="center" >Linux系统一站式部署</h1>



## 1. 准备工作

### 1.1 本机安装 Xshell 远程连接工具

```
参考
https://blog.csdn.net/qq_42455308/article/details/105528162
```

### 1.2 本机安装Navicat数据库工具

```
参考
https://www.cnblogs.com/sunyllove/p/9776373.html
```

### 1.3 Linux 常用命令指南

#### 1.3.1 磁盘管理

```
fdisk -l	查询磁盘空间

fdisk /dev/vdb		磁盘分区，/dev/vdb为磁盘名

磁盘分区及格式化教程：https://jingyan.baidu.com/article/7e4409531f27292fc0e2ef39.html

mount /dev/vdb /xxzx	  挂载分区，/dev/vdb为磁盘名，/xxzx为挂载目录

https://www.cnblogs.com/hester/p/12385990.html
注意mount命令为临时挂载，重启后会失效，要修改配置文件/etc/fstab添加系统启动挂载点。

df -h		查看分区与挂载点详情

lsblk		查看设备挂载情况

注意：当存在多硬盘设备管理时，建议将多个磁盘设备（物理卷PV）组成逻辑卷组（VG），再将VG分割成多个逻辑卷（LV），这样方便VG、LV进行扩展容量和收缩容量。

参考：https://www.cnblogs.com/chengxuyonghu/p/13652547.html?ivk_sa=1024320u

```

#### 1.3.2 目录切换cd 命令

```
cd /   切到根目录
cd /usr  切换到根目录下的usr目录
cd ../ 切换到上一级目录 或者  cd ..
cd ~  切换到home目录
cd -  切换到上次访问的目录 
```

#### 1.3.3 目录查看

```
ls           查看当前目录下的所有目录和文件
ls -a        查看当前目录下的所有目录和文件（包括隐藏的文件）
ls -l 或 ll  列表查看当前目录下的所有目录和文件（列表查看，显示更多信息）
ls /dir     查看指定目录下的所有目录和文件   如：ls /usr
du -sh			查看当前目录空间大小
df -hl			查看磁盘剩余空间
df -h			查看每个根路径的分区大小
```

#### 1.3.4 目录操作

```
新建目录：mkdir aaa 在当前目录下创建一个名为aaa的目录
删除目录：rm -r aaa 递归删除当前目录下的aaa目录
删除文件：rm 文件  删除当前目录下的文件
删除当前目录下所有文件夹和文件：rm -rf 目录名字
重命名目录或文件：mv aaa bbb 将目录aaa改为bbb
剪切目录或文件：mv /usr/tmp/aaa /usr  将/usr/tmp目录下的aaa目录剪切到 /usr目录下面。
```

#### 1.3.5 文件操作

```
新建文件：touch 文件名
打开文件：vi 文件名
打开文件编辑模式：i （打开文件后）
退出文件编辑模式：ESC健
退出文件：【1】强制退出（不保存）：【:q!】
          【2】保存后退出：【:wq】
退出文件之前，要先退出文件编辑模式
```

#### 1.3.6 文件上传与解压

```
1.安装用于上传和下载文件的rzrs工具
执行命令：yum -y install lrzsz
上传文件和文件压缩包：rz -be
下载文件和文件压缩包：sz 文件名  
2.文件解压
（1）.tar.gz文件 
    tar -zxvf filename.tar.gz
（2）.zip文件
  解压：unzip -q filename.zip
  压缩：zip filename.zip dirnam 
```

#### 1.3.7 进程查看与强杀

```
查看进程：ps -ef | grep xxx   
干掉进程：kill -9  1234
```

#### 1.3.8 服务器防火墙操作

```
1.查看防火墙状态
systemctl status firewalld.service
2.关闭防火墙
systemctl stop firewalld.service
3.永久关闭防火墙
systemctl disable firewalld.service
```

### 1.4 基础环境安装

```
1. 安装中文字体
https://blog.csdn.net/weixin_45029526/article/details/103686127
2. 安装unzip
3. 安装 unrar
```

## 2. 部署中间件

### 2.1 安装jdk

```
1.切换至usr目录下，输入rz指令上传JDK压缩包
	[root@localhost /]# cd usr
	[root@localhost usr]# rz
2.解压JDK压缩包
	输入命令：tar -zxvf jdk-8u261-linux-x64.tar.gz
3.修改配置文件
	输入指令打开配置文件：vi /etc/profile
	输入i切换为insert状态
	添加下面的配置：
	export JAVA_HOME=/usr/jdk1.8.0_261 (注意jdk的存放路径和文件名)
export 	CLASSPATH=.:${JAVA_HOME}/jre/lib/rt.jar:${JAVA_HOME}/lib/dt.jar:${JAVA_HOME}/lib/tools.jar 
export PATH=$PATH:${JAVA_HOME}/bin
4.退出配置文件并保持
	按ESC健退出编辑状态，执行【:wq】命令保存并退出配置文件。
5.运行配置文件
	输入指令：source /etc/profile
6.查看jdk是否安装成功
   输入命令：java -version 
```

### 2.2  安装nacos

```
1.上传安装包，并解压
2.进入到bin目录
cd nacos/bin
3.启动项目
sh startup.sh -m standalone
4.验证是否启动成功
浏览器访问 IP:8848/nacos    用户名/密码 nacos/naocs
5.登录nacos，新建命名空间，输入命名空间名sds。
6.进入配置列表，切换到新建的命名空间，注意命名空间的namespace。
7.开机自启动nacos。
https://all_jun.gitee.io/blog/2020/08/29/CentOS%E8%AE%BE%E7%BD%AEnacos%E5%BC%80%E6%9C%BA%E8%87%AA%E5%90%AF/
```

### 2.3 安装PGSQL

```
1.在线安装pg数据库：
  yum install postgresql-server postgresql-contrib -y
离线安装pgsql_10.3：
https://www.jianshu.com/p/f1ae82881d69
https://blog.csdn.net/weixin_42657158/article/details/99001137

2.数据库初始化：postgresql-setup initdb
3.开启启动：systemctl enable postgresql 
            systemctl start postgresql 
4.修改配置文件

vi /var/lib/pgsql/data/postgresql.conf
listen_addresses ='localhost' localhost 修改为服务器ip；并删除port = 5432前的 # 。

vi /var/lib/pgsql/data/pg_hba.conf
添加一行：host all all 0.0.0.0/0 md5

5.连接数据库
（1）su - postgres
（2）psql
（3）创建一个root新用户
        create user root with password '123456'；
（4）给root用户分配数据库权限
       alter role root with Superuser;
     alter role root with CreateRole;
     alter role root with CreateDB;
     alter role root with Replication;
（5）删除数据库用户: drop user root;
（6）创建和删除数据库
       查看数据库列表: \l (list的意思)
     创建数据库: create database db1;
       删除数据库: drop database db1;
```

### 2.4 安装ES

```
1.创建用户
（1）创建用户组：创建esgroup用户组 	groupadd esgroup
（2）创建用户es并指定用户组为esgroup：useradd -g esgroup es
（3）设置新用户密码：passwd es
（4）设置sudo权限：visudo
     找到root ALL=(ALL) ALL一行，添加es用户
（5）切换用户：su es
（6）退出用户：exit
2.上传安装文件，并修改权限
（1）切换到es用户，在cd /home/es目录下，上传安装包并解压：        tar -zxvf elasticsearch-6.6.2.tar.gz 
（2）将解压后的文件转移到esopt目录下：sudo mv elasticsearch-6.6.2 /esopt/
（3）修改目录权限：sudo chown -R es:esgroup /esopt
chown es:esgroup /esopt/elasticsearch-6.6.2 -R
（4）查看esopt目录下各文件归属
3.ElasticSearch 配置修改
（1）修改elasticsearch.yml：
vi /esopt/elasticsearch-6.6.2/config/elasticsearch.yml
修改或添加以下配置：
network.host: 10.14.1.136
http.port: 9200
bootstrap.memory_lock: false
bootstrap.system_call_filter: false 
（2）修改线程数threads
  vi /etc/security/limits.d/20-nproc.conf
注意：20可能因系统版本不同而不同。
  * soft nproc 1024 修改为 * soft nproc 2048 
  如果文件中的值大于2048，则不用修改。
（3）切换到root用户下，修改/etc/sysctl.conf文件配置：
  vi /etc/sysctl.conf
  添加内容：vm.max_map_count=2621441
  用命令sysctl -p 生效
（4）root用户下修改文件/etc/security/limits.conf
  vi /etc/security/limits.conf
  添加如下内容:
  * hard nofile 65536
  * soft nofile 65536
  * soft nproc 4096
  * hard nproc 4096 
  添加分词插件
    切换到es用户，切换到elasticsearch-6.6.2目录下，删除plugins目录，然后上传分词插件安装包：es-pliginx.tar.gz，再解压即可。
rm -rf plugins
tar -zxvf es-pliginx.tar.gz
4.ES的启动与停止
（1）直接启动：在es用户的elasticsearch-6.6.2下执行：     bin/elasticsearch
（2）停止:Ctrl+c
（3）后台运行：bin/elasticsearch -d
（4）看进程：jps
5.验证
curl http://ip:9200   IP为服务器ip
6.遇到问题与解决方案
（1）找不到java
解决方案：
vi /home/es/esopt/elasticsearch-6.6.2/config/elasticsearch.yml     
添加：JAVA_HOME=/usr/local/java  (JAVA_HOME可以参考安装jdk时的路径）
（2）当前系统不支持X-Pack特性
解决方案：在elasticsearch.yml配置文件中添加：
    xpack.ml.enabled: false
```

### 2.5 安装Kafka

```
1.上传安装包，并解压
2.修改配置文件
3. server.properties
   打e置文件：vi kafka_2.11-2.3.1/config/server.properties
   添加命令：listeners=PLAINTEXT://10.14.2.212:9092  把IP改为自己服务器的IP
   4.启动
   进入bin目录：cd /kafka_2.11-2.3.1/bin
   启动：
  ./zookeeper-server-start.sh -daemon ../config/zookeeper.properties 
  ./kafka-server-start.sh -daemon ../config/server.properties 
5.验证 ps -ef |grep kafka ，正常会有两个线程
6.国产麒麟服务器在启动阶段遇到问题：

解决方法：vi /kafka_2.11-2.3.1/bin/kafka-run-class.sh，找到下面语句：
KAFKA_JVM_PERFORMANCE_OPTS="-server -XX:+UseG1GC -XX:MaxGCPauseMillis=20
直接删掉 -XX:+UseG1GC后重启 。
7.定时启动（防kafka挂掉）
（1）执行crontab -e命令
（2）添加以下语句（文件路径根据具体情况更改）：
*/1 * * * * . /etc/profile; sh /kafka_2.11-2.3.1/bin/kafka-server-start.sh -daemon /kafka_2.11-2.3.1/config/server.properties >> /kafka_2.11-2.3.1/logs/log.out 2>&1
（3）退出并保存：:wq
```

### 2.6 安装redis

```
参考资料：https://www.cnblogs.com/monjeo/p/7568785.html
1.在服务器/usr/local目录下上传安装包
   cd /usr/local
   tar -zxvf redis-5.0.7.tar.gz
2.安装gcc
   查看gcc版本：gcc -v（如已安装则不需要执行下一步安装命令）
   安装命令：yum install gcc
   升级为9.1版本：
   yum -y install centos-release-scl
    yum -y install devtoolset-9-gcc devtoolset-9-gcc-c++ devtoolset-9-binutils
    echo "source /opt/rh/devtoolset-9/enable" >>/etc/profile
离线安装gcc9.1（可能会报缺少依赖包的提示）：https://blog.csdn.net/wanglin199709/article/details/94553903
下载4个依赖包：
ftp://gcc.gnu.org/pub/gcc/infrastructure/
3.安装redis
   cd redis-5.0.7
   make
   cd src
   make install PREFIX=/usr/local/redis
  安装成功会出现：Hint: It's a good idea to run 'make test' 
  执行 make test 进行测试
Linux安装Redis后，make test出现You need tcl 8.5 or newer in order to run the Redis test”问题
https://blog.csdn.net/hussci/article/details/103340422

4.修改redis.conf 文件 ,修改这四个配置，
   redis.conf文件在redis-5.0.7目录下：
   vi编辑器使用/：向后搜索；?：向前搜索n：查找下一处；N：查找上一处。进行内容查找定位。
   daemonize yes #修改redis为后台运行
   启动
   cd /usr/local/redis/bin
   ./redis-server /usr/local/redis-5.0.7/redis.conf
redis常用命令
1、查看redis是否在运行： ps aux | grep redis  或  netstat -lntp
2、启动redis：   redis-server /etc/redis.conf
3、关闭redis：   /usr/b in/redis-cli shutdown
4、当设置密码后，上面的关闭命令无效： 
带密码输入：   redis-cli -a [password]    回车后输入：shutdown
即可关闭redis，输入exit 退出。
如果上面都无法关闭，直接使用 kill -9 进程号   来关闭。
查看redis密码；可查看 redis 安装根目录下的配置文件：redis-conf 中SECURITY下面的 requirepass 后面的内容。
redis远程访问：./redis-cli -h 100.64.16.13 -p 6379

```

### 2.7 安装SeaTa

```
1.上传安装包，并解压
  tar -zxvf seata.tar.gz
2.修改配置文件registry.conf和file.confg
修改配置参考资料：https://blog.csdn.net/qq853632587/article/details/111644295
   vi registry.conf   修改nacos中的serverAddr和namespace
username和password为空。
注意nacos配置项内容是否有重复项，否则会无法添加到nacos。
 vi file.conf   根据当前环境的数据库配置，修改图中配置。
PGSQL配置：
3.启动seata
    进入bin目录cd ../bin
   后台启动seata：nohup ./seata-server.sh &。
   启动成功后，在nacos的服务列表中可以看到seata服务。
```

### 2.8 安装nginx

```
1.安装插件
（1）yum install -y pcre pcre-devel 
（2）yum install -y zlib zlib-devel 
（3）yum install -y openssl openssl-devel 
2.安装nginx
（1）上传并解压文件：tar -zxvf nginx-1.16.1.tar.gz
（2）安装nginx：
      cd nginx-1.16.1
      ./configure 
      make 
      make install 
（3）修改nginx配置
     cd /usr/local/nginx/conf/
     修改nginx.conf文件的ip，可以下载其他项目的配置文件，把其他项目配置文件的ip改成自己服务器的ip，然后再上传到该目录下。记得先删除原配置文件再上传。
3.启动nginx
  cd /usr/local/nginx/sbin/ 
  ./nginx #启动 
  ./nginx -t #检查配置 
  ./nginx -s reload #重启 
  ./nginx -s stop #停止 
```

### 2.9 安装Hadoop

```
1.创建用户，并为其添加root权限
  sudo adduser hadoop
  visudo    #添加一行
  2.给hadoop用户创建目录，并添加到sudo用户组中，命令如下
  sudo chown hadoop /home/hadoop
  sudo adduser -G hadoop sudo
3.配置shh无码登录
   ssh localhost
   ssh-keygen -t dsa -P '' -f ~/.ssh/id_dsa
   cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys
4.安装hadoop
（1）切换到hadoop用户下
     su hadoop
（2）在home/hadoop目录下上传安装包，并解压
（3）在home/hadoop目录下新建tmp、hdfs/name、hdfs/data目录
        mkdir tmp
        mkdir hdfs
        mkdir hdfs/name
        mkdir hdfs/data
（4）设置环境变量，vi ~/.bash_profile
添加：export HADOOP_HOME=/home/hadoop/hadoop-2.9.2
      export PATH=$PATH:$HADOOP_HOME/bin
使配置生效：source ~/.bash_profile
（5）修改配置文件，在/home/hadoop/hadoop-2.9.2/etc/hadoop目录下
1）vi hadoop-env.sh
export JAVA_HOME =/usr/jdk1.8.0_261
2）yarn-env.sh
export JAVA_HOME =/usr/jdk1.8.0_261

3）core-site.xml
<configuration>
<property>
　　<name>fs.default.name</name>
　　<value>hdfs://10.14.2.214:9000</value>
　　<description>HDFS的URI，文件系统://namenode标识:端口号</description></property>
<property>
　　<name>hadoop.tmp.dir</name>
　　<value>/home/hadoop/tmp</value>
　　<description>namenode上本地的hadoop临时文件夹</description>
</property>
</configuration>

4）hdfs-site.xml
<configuration>
<property>
　　<name>dfs.name.dir</name>
　　<value>/home/hadoop/hdfs/name</value>
　　<description>namenode上存储hdfs名字空间元数据 </description> </property>
<property>
　　<name>dfs.data.dir</name>
　　<value>/home/hadoop/hdfs/data</value>
　　<description>datanode上数据块的物理存储位置</description></property>
<property>
　　<name>dfs.replication</name>
　　<value>1</value>
　　<description>副本个数，配置默认是3,应小于datanode机器数量</description>
　　</property>
</configuration>

5）cp mapred-site.xml.template mapred-site.xml
mapred-site.xml
<configuration>
<property>
　　<name>mapreduce.framework.name</name>
　　<value>yarn</value>
　　</property>
</configuration>

6）yarn-site.xml 
5.启动
（1）切换到hadoop-2.9.2目录下，格式化hdfs文件系统：
     bin/hadoop namenode -format
（2）cd sbin
（3）./start-dfs.sh
（4）./start-yarn.sh
6.执行jps命令，有如下进程，说明Hadoop正常启动
```

