(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{429:function(a,s,n){"use strict";n.r(s);var e=n(54),t=Object(e.a)({},(function(){var a=this,s=a.$createElement,n=a._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[n("h1",{attrs:{align:"center"}},[a._v("Linux系统一站式部署")]),a._v(" "),n("h2",{attrs:{id:"_1-准备工作"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-准备工作"}},[a._v("#")]),a._v(" 1. 准备工作")]),a._v(" "),n("h3",{attrs:{id:"_1-1-本机安装-xshell-远程连接工具"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-本机安装-xshell-远程连接工具"}},[a._v("#")]),a._v(" 1.1 本机安装 Xshell 远程连接工具")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("参考\nhttps://blog.csdn.net/qq_42455308/article/details/105528162\n")])])]),n("h3",{attrs:{id:"_1-2-本机安装navicat数据库工具"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-本机安装navicat数据库工具"}},[a._v("#")]),a._v(" 1.2 本机安装Navicat数据库工具")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("参考\nhttps://www.cnblogs.com/sunyllove/p/9776373.html\n")])])]),n("h3",{attrs:{id:"_1-3-linux-常用命令指南"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-linux-常用命令指南"}},[a._v("#")]),a._v(" 1.3 Linux 常用命令指南")]),a._v(" "),n("h4",{attrs:{id:"_1-3-1-磁盘管理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-1-磁盘管理"}},[a._v("#")]),a._v(" 1.3.1 磁盘管理")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("fdisk -l\t查询磁盘空间\n\nfdisk /dev/vdb\t\t磁盘分区，/dev/vdb为磁盘名\n\n磁盘分区及格式化教程：https://jingyan.baidu.com/article/7e4409531f27292fc0e2ef39.html\n\nmount /dev/vdb /xxzx\t  挂载分区，/dev/vdb为磁盘名，/xxzx为挂载目录\n\nhttps://www.cnblogs.com/hester/p/12385990.html\n注意mount命令为临时挂载，重启后会失效，要修改配置文件/etc/fstab添加系统启动挂载点。\n\ndf -h\t\t查看分区与挂载点详情\n\nlsblk\t\t查看设备挂载情况\n\n注意：当存在多硬盘设备管理时，建议将多个磁盘设备（物理卷PV）组成逻辑卷组（VG），再将VG分割成多个逻辑卷（LV），这样方便VG、LV进行扩展容量和收缩容量。\n\n参考：https://www.cnblogs.com/chengxuyonghu/p/13652547.html?ivk_sa=1024320u\n\n")])])]),n("h4",{attrs:{id:"_1-3-2-目录切换cd-命令"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-2-目录切换cd-命令"}},[a._v("#")]),a._v(" 1.3.2 目录切换cd 命令")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("cd /   切到根目录\ncd /usr  切换到根目录下的usr目录\ncd ../ 切换到上一级目录 或者  cd ..\ncd ~  切换到home目录\ncd -  切换到上次访问的目录 \n")])])]),n("h4",{attrs:{id:"_1-3-3-目录查看"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-3-目录查看"}},[a._v("#")]),a._v(" 1.3.3 目录查看")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("ls           查看当前目录下的所有目录和文件\nls -a        查看当前目录下的所有目录和文件（包括隐藏的文件）\nls -l 或 ll  列表查看当前目录下的所有目录和文件（列表查看，显示更多信息）\nls /dir     查看指定目录下的所有目录和文件   如：ls /usr\ndu -sh\t\t\t查看当前目录空间大小\ndf -hl\t\t\t查看磁盘剩余空间\ndf -h\t\t\t查看每个根路径的分区大小\n")])])]),n("h4",{attrs:{id:"_1-3-4-目录操作"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-4-目录操作"}},[a._v("#")]),a._v(" 1.3.4 目录操作")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("新建目录：mkdir aaa 在当前目录下创建一个名为aaa的目录\n删除目录：rm -r aaa 递归删除当前目录下的aaa目录\n删除文件：rm 文件  删除当前目录下的文件\n删除当前目录下所有文件夹和文件：rm -rf 目录名字\n重命名目录或文件：mv aaa bbb 将目录aaa改为bbb\n剪切目录或文件：mv /usr/tmp/aaa /usr  将/usr/tmp目录下的aaa目录剪切到 /usr目录下面。\n")])])]),n("h4",{attrs:{id:"_1-3-5-文件操作"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-5-文件操作"}},[a._v("#")]),a._v(" 1.3.5 文件操作")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("新建文件：touch 文件名\n打开文件：vi 文件名\n打开文件编辑模式：i （打开文件后）\n退出文件编辑模式：ESC健\n退出文件：【1】强制退出（不保存）：【:q!】\n          【2】保存后退出：【:wq】\n退出文件之前，要先退出文件编辑模式\n")])])]),n("h4",{attrs:{id:"_1-3-6-文件上传与解压"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-6-文件上传与解压"}},[a._v("#")]),a._v(" 1.3.6 文件上传与解压")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("1.安装用于上传和下载文件的rzrs工具\n执行命令：yum -y install lrzsz\n上传文件和文件压缩包：rz -be\n下载文件和文件压缩包：sz 文件名  \n2.文件解压\n（1）.tar.gz文件 \n    tar -zxvf filename.tar.gz\n（2）.zip文件\n  解压：unzip -q filename.zip\n  压缩：zip filename.zip dirnam \n")])])]),n("h4",{attrs:{id:"_1-3-7-进程查看与强杀"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-7-进程查看与强杀"}},[a._v("#")]),a._v(" 1.3.7 进程查看与强杀")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("查看进程：ps -ef | grep xxx   \n干掉进程：kill -9  1234\n")])])]),n("h4",{attrs:{id:"_1-3-8-服务器防火墙操作"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-8-服务器防火墙操作"}},[a._v("#")]),a._v(" 1.3.8 服务器防火墙操作")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("1.查看防火墙状态\nsystemctl status firewalld.service\n2.关闭防火墙\nsystemctl stop firewalld.service\n3.永久关闭防火墙\nsystemctl disable firewalld.service\n")])])]),n("h3",{attrs:{id:"_1-4-基础环境安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-基础环境安装"}},[a._v("#")]),a._v(" 1.4 基础环境安装")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("1. 安装中文字体\nhttps://blog.csdn.net/weixin_45029526/article/details/103686127\n2. 安装unzip\n3. 安装 unrar\n")])])]),n("h2",{attrs:{id:"_2-部署中间件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-部署中间件"}},[a._v("#")]),a._v(" 2. 部署中间件")]),a._v(" "),n("h3",{attrs:{id:"_2-1-安装jdk"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-安装jdk"}},[a._v("#")]),a._v(" 2.1 安装jdk")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("1.切换至usr目录下，输入rz指令上传JDK压缩包\n\t[root@localhost /]# cd usr\n\t[root@localhost usr]# rz\n2.解压JDK压缩包\n\t输入命令：tar -zxvf jdk-8u261-linux-x64.tar.gz\n3.修改配置文件\n\t输入指令打开配置文件：vi /etc/profile\n\t输入i切换为insert状态\n\t添加下面的配置：\n\texport JAVA_HOME=/usr/jdk1.8.0_261 (注意jdk的存放路径和文件名)\nexport \tCLASSPATH=.:${JAVA_HOME}/jre/lib/rt.jar:${JAVA_HOME}/lib/dt.jar:${JAVA_HOME}/lib/tools.jar \nexport PATH=$PATH:${JAVA_HOME}/bin\n4.退出配置文件并保持\n\t按ESC健退出编辑状态，执行【:wq】命令保存并退出配置文件。\n5.运行配置文件\n\t输入指令：source /etc/profile\n6.查看jdk是否安装成功\n   输入命令：java -version \n")])])]),n("h3",{attrs:{id:"_2-2-安装nacos"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-安装nacos"}},[a._v("#")]),a._v(" 2.2  安装nacos")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("1.上传安装包，并解压\n2.进入到bin目录\ncd nacos/bin\n3.启动项目\nsh startup.sh -m standalone\n4.验证是否启动成功\n浏览器访问 IP:8848/nacos    用户名/密码 nacos/naocs\n5.登录nacos，新建命名空间，输入命名空间名sds。\n6.进入配置列表，切换到新建的命名空间，注意命名空间的namespace。\n7.开机自启动nacos。\nhttps://all_jun.gitee.io/blog/2020/08/29/CentOS%E8%AE%BE%E7%BD%AEnacos%E5%BC%80%E6%9C%BA%E8%87%AA%E5%90%AF/\n")])])]),n("h3",{attrs:{id:"_2-3-安装pgsql"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-安装pgsql"}},[a._v("#")]),a._v(" 2.3 安装PGSQL")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("1.在线安装pg数据库：\n  yum install postgresql-server postgresql-contrib -y\n离线安装pgsql_10.3：\nhttps://www.jianshu.com/p/f1ae82881d69\nhttps://blog.csdn.net/weixin_42657158/article/details/99001137\n\n2.数据库初始化：postgresql-setup initdb\n3.开启启动：systemctl enable postgresql \n            systemctl start postgresql \n4.修改配置文件\n\nvi /var/lib/pgsql/data/postgresql.conf\nlisten_addresses ='localhost' localhost 修改为服务器ip；并删除port = 5432前的 # 。\n\nvi /var/lib/pgsql/data/pg_hba.conf\n添加一行：host all all 0.0.0.0/0 md5\n\n5.连接数据库\n（1）su - postgres\n（2）psql\n（3）创建一个root新用户\n        create user root with password '123456'；\n（4）给root用户分配数据库权限\n       alter role root with Superuser;\n     alter role root with CreateRole;\n     alter role root with CreateDB;\n     alter role root with Replication;\n（5）删除数据库用户: drop user root;\n（6）创建和删除数据库\n       查看数据库列表: \\l (list的意思)\n     创建数据库: create database db1;\n       删除数据库: drop database db1;\n")])])]),n("h3",{attrs:{id:"_2-4-安装es"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-安装es"}},[a._v("#")]),a._v(" 2.4 安装ES")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("1.创建用户\n（1）创建用户组：创建esgroup用户组 \tgroupadd esgroup\n（2）创建用户es并指定用户组为esgroup：useradd -g esgroup es\n（3）设置新用户密码：passwd es\n（4）设置sudo权限：visudo\n     找到root ALL=(ALL) ALL一行，添加es用户\n（5）切换用户：su es\n（6）退出用户：exit\n2.上传安装文件，并修改权限\n（1）切换到es用户，在cd /home/es目录下，上传安装包并解压：        tar -zxvf elasticsearch-6.6.2.tar.gz \n（2）将解压后的文件转移到esopt目录下：sudo mv elasticsearch-6.6.2 /esopt/\n（3）修改目录权限：sudo chown -R es:esgroup /esopt\nchown es:esgroup /esopt/elasticsearch-6.6.2 -R\n（4）查看esopt目录下各文件归属\n3.ElasticSearch 配置修改\n（1）修改elasticsearch.yml：\nvi /esopt/elasticsearch-6.6.2/config/elasticsearch.yml\n修改或添加以下配置：\nnetwork.host: 10.14.1.136\nhttp.port: 9200\nbootstrap.memory_lock: false\nbootstrap.system_call_filter: false \n（2）修改线程数threads\n  vi /etc/security/limits.d/20-nproc.conf\n注意：20可能因系统版本不同而不同。\n  * soft nproc 1024 修改为 * soft nproc 2048 \n  如果文件中的值大于2048，则不用修改。\n（3）切换到root用户下，修改/etc/sysctl.conf文件配置：\n  vi /etc/sysctl.conf\n  添加内容：vm.max_map_count=2621441\n  用命令sysctl -p 生效\n（4）root用户下修改文件/etc/security/limits.conf\n  vi /etc/security/limits.conf\n  添加如下内容:\n  * hard nofile 65536\n  * soft nofile 65536\n  * soft nproc 4096\n  * hard nproc 4096 \n  添加分词插件\n    切换到es用户，切换到elasticsearch-6.6.2目录下，删除plugins目录，然后上传分词插件安装包：es-pliginx.tar.gz，再解压即可。\nrm -rf plugins\ntar -zxvf es-pliginx.tar.gz\n4.ES的启动与停止\n（1）直接启动：在es用户的elasticsearch-6.6.2下执行：     bin/elasticsearch\n（2）停止:Ctrl+c\n（3）后台运行：bin/elasticsearch -d\n（4）看进程：jps\n5.验证\ncurl http://ip:9200   IP为服务器ip\n6.遇到问题与解决方案\n（1）找不到java\n解决方案：\nvi /home/es/esopt/elasticsearch-6.6.2/config/elasticsearch.yml     \n添加：JAVA_HOME=/usr/local/java  (JAVA_HOME可以参考安装jdk时的路径）\n（2）当前系统不支持X-Pack特性\n解决方案：在elasticsearch.yml配置文件中添加：\n    xpack.ml.enabled: false\n")])])]),n("h3",{attrs:{id:"_2-5-安装kafka"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-安装kafka"}},[a._v("#")]),a._v(" 2.5 安装Kafka")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v('1.上传安装包，并解压\n2.修改配置文件\n3. server.properties\n   打e置文件：vi kafka_2.11-2.3.1/config/server.properties\n   添加命令：listeners=PLAINTEXT://10.14.2.212:9092  把IP改为自己服务器的IP\n   4.启动\n   进入bin目录：cd /kafka_2.11-2.3.1/bin\n   启动：\n  ./zookeeper-server-start.sh -daemon ../config/zookeeper.properties \n  ./kafka-server-start.sh -daemon ../config/server.properties \n5.验证 ps -ef |grep kafka ，正常会有两个线程\n6.国产麒麟服务器在启动阶段遇到问题：\n\n解决方法：vi /kafka_2.11-2.3.1/bin/kafka-run-class.sh，找到下面语句：\nKAFKA_JVM_PERFORMANCE_OPTS="-server -XX:+UseG1GC -XX:MaxGCPauseMillis=20\n直接删掉 -XX:+UseG1GC后重启 。\n7.定时启动（防kafka挂掉）\n（1）执行crontab -e命令\n（2）添加以下语句（文件路径根据具体情况更改）：\n*/1 * * * * . /etc/profile; sh /kafka_2.11-2.3.1/bin/kafka-server-start.sh -daemon /kafka_2.11-2.3.1/config/server.properties >> /kafka_2.11-2.3.1/logs/log.out 2>&1\n（3）退出并保存：:wq\n')])])]),n("h3",{attrs:{id:"_2-6-安装redis"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-6-安装redis"}},[a._v("#")]),a._v(" 2.6 安装redis")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("参考资料：https://www.cnblogs.com/monjeo/p/7568785.html\n1.在服务器/usr/local目录下上传安装包\n   cd /usr/local\n   tar -zxvf redis-5.0.7.tar.gz\n2.安装gcc\n   查看gcc版本：gcc -v（如已安装则不需要执行下一步安装命令）\n   安装命令：yum install gcc\n   升级为9.1版本：\n   yum -y install centos-release-scl\n    yum -y install devtoolset-9-gcc devtoolset-9-gcc-c++ devtoolset-9-binutils\n    echo \"source /opt/rh/devtoolset-9/enable\" >>/etc/profile\n离线安装gcc9.1（可能会报缺少依赖包的提示）：https://blog.csdn.net/wanglin199709/article/details/94553903\n下载4个依赖包：\nftp://gcc.gnu.org/pub/gcc/infrastructure/\n3.安装redis\n   cd redis-5.0.7\n   make\n   cd src\n   make install PREFIX=/usr/local/redis\n  安装成功会出现：Hint: It's a good idea to run 'make test' \n  执行 make test 进行测试\nLinux安装Redis后，make test出现You need tcl 8.5 or newer in order to run the Redis test”问题\nhttps://blog.csdn.net/hussci/article/details/103340422\n\n4.修改redis.conf 文件 ,修改这四个配置，\n   redis.conf文件在redis-5.0.7目录下：\n   vi编辑器使用/：向后搜索；?：向前搜索n：查找下一处；N：查找上一处。进行内容查找定位。\n   daemonize yes #修改redis为后台运行\n   启动\n   cd /usr/local/redis/bin\n   ./redis-server /usr/local/redis-5.0.7/redis.conf\nredis常用命令\n1、查看redis是否在运行： ps aux | grep redis  或  netstat -lntp\n2、启动redis：   redis-server /etc/redis.conf\n3、关闭redis：   /usr/b in/redis-cli shutdown\n4、当设置密码后，上面的关闭命令无效： \n带密码输入：   redis-cli -a [password]    回车后输入：shutdown\n即可关闭redis，输入exit 退出。\n如果上面都无法关闭，直接使用 kill -9 进程号   来关闭。\n查看redis密码；可查看 redis 安装根目录下的配置文件：redis-conf 中SECURITY下面的 requirepass 后面的内容。\nredis远程访问：./redis-cli -h 100.64.16.13 -p 6379\n\n")])])]),n("h3",{attrs:{id:"_2-7-安装seata"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-7-安装seata"}},[a._v("#")]),a._v(" 2.7 安装SeaTa")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("1.上传安装包，并解压\n  tar -zxvf seata.tar.gz\n2.修改配置文件registry.conf和file.confg\n修改配置参考资料：https://blog.csdn.net/qq853632587/article/details/111644295\n   vi registry.conf   修改nacos中的serverAddr和namespace\nusername和password为空。\n注意nacos配置项内容是否有重复项，否则会无法添加到nacos。\n vi file.conf   根据当前环境的数据库配置，修改图中配置。\nPGSQL配置：\n3.启动seata\n    进入bin目录cd ../bin\n   后台启动seata：nohup ./seata-server.sh &。\n   启动成功后，在nacos的服务列表中可以看到seata服务。\n")])])]),n("h3",{attrs:{id:"_2-8-安装nginx"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-8-安装nginx"}},[a._v("#")]),a._v(" 2.8 安装nginx")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("1.安装插件\n（1）yum install -y pcre pcre-devel \n（2）yum install -y zlib zlib-devel \n（3）yum install -y openssl openssl-devel \n2.安装nginx\n（1）上传并解压文件：tar -zxvf nginx-1.16.1.tar.gz\n（2）安装nginx：\n      cd nginx-1.16.1\n      ./configure \n      make \n      make install \n（3）修改nginx配置\n     cd /usr/local/nginx/conf/\n     修改nginx.conf文件的ip，可以下载其他项目的配置文件，把其他项目配置文件的ip改成自己服务器的ip，然后再上传到该目录下。记得先删除原配置文件再上传。\n3.启动nginx\n  cd /usr/local/nginx/sbin/ \n  ./nginx #启动 \n  ./nginx -t #检查配置 \n  ./nginx -s reload #重启 \n  ./nginx -s stop #停止 \n")])])]),n("h3",{attrs:{id:"_2-9-安装hadoop"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2-9-安装hadoop"}},[a._v("#")]),a._v(" 2.9 安装Hadoop")]),a._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("1.创建用户，并为其添加root权限\n  sudo adduser hadoop\n  visudo    #添加一行\n  2.给hadoop用户创建目录，并添加到sudo用户组中，命令如下\n  sudo chown hadoop /home/hadoop\n  sudo adduser -G hadoop sudo\n3.配置shh无码登录\n   ssh localhost\n   ssh-keygen -t dsa -P '' -f ~/.ssh/id_dsa\n   cat ~/.ssh/id_dsa.pub >> ~/.ssh/authorized_keys\n4.安装hadoop\n（1）切换到hadoop用户下\n     su hadoop\n（2）在home/hadoop目录下上传安装包，并解压\n（3）在home/hadoop目录下新建tmp、hdfs/name、hdfs/data目录\n        mkdir tmp\n        mkdir hdfs\n        mkdir hdfs/name\n        mkdir hdfs/data\n（4）设置环境变量，vi ~/.bash_profile\n添加：export HADOOP_HOME=/home/hadoop/hadoop-2.9.2\n      export PATH=$PATH:$HADOOP_HOME/bin\n使配置生效：source ~/.bash_profile\n（5）修改配置文件，在/home/hadoop/hadoop-2.9.2/etc/hadoop目录下\n1）vi hadoop-env.sh\nexport JAVA_HOME =/usr/jdk1.8.0_261\n2）yarn-env.sh\nexport JAVA_HOME =/usr/jdk1.8.0_261\n\n3）core-site.xml\n<configuration>\n<property>\n　　<name>fs.default.name</name>\n　　<value>hdfs://10.14.2.214:9000</value>\n　　<description>HDFS的URI，文件系统://namenode标识:端口号</description></property>\n<property>\n　　<name>hadoop.tmp.dir</name>\n　　<value>/home/hadoop/tmp</value>\n　　<description>namenode上本地的hadoop临时文件夹</description>\n</property>\n</configuration>\n\n4）hdfs-site.xml\n<configuration>\n<property>\n　　<name>dfs.name.dir</name>\n　　<value>/home/hadoop/hdfs/name</value>\n　　<description>namenode上存储hdfs名字空间元数据 </description> </property>\n<property>\n　　<name>dfs.data.dir</name>\n　　<value>/home/hadoop/hdfs/data</value>\n　　<description>datanode上数据块的物理存储位置</description></property>\n<property>\n　　<name>dfs.replication</name>\n　　<value>1</value>\n　　<description>副本个数，配置默认是3,应小于datanode机器数量</description>\n　　</property>\n</configuration>\n\n5）cp mapred-site.xml.template mapred-site.xml\nmapred-site.xml\n<configuration>\n<property>\n　　<name>mapreduce.framework.name</name>\n　　<value>yarn</value>\n　　</property>\n</configuration>\n\n6）yarn-site.xml \n5.启动\n（1）切换到hadoop-2.9.2目录下，格式化hdfs文件系统：\n     bin/hadoop namenode -format\n（2）cd sbin\n（3）./start-dfs.sh\n（4）./start-yarn.sh\n6.执行jps命令，有如下进程，说明Hadoop正常启动\n")])])])])}),[],!1,null,null,null);s.default=t.exports}}]);