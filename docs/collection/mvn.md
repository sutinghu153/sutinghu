<h1 align="center">maven</h1>
本文是对maven系统的简要梳理和总结，如果有maven相关的问题可以参考本文。

## maven 坐标系统

```maven``` 采用坐标系统，包的依赖和下载是通过坐标系统来管理的

```groupId:```所属组织或项目，并非多对多关系

```artifactId:```当前项目在坐标系统中的标记

```version:```依赖的包及版本

```scope:```项目对包的使用范围

| 依赖范围 | 编译有效 | 测试有效 | 运行时有效 |
| :------: | :------: | :------: | :--------: |
| complie  |    Y     |    Y     |     Y      |
|   test   |    -     |    Y     |     -      |
| provided |    Y     |    Y     |     -      |
| runtime  |    -     |    Y     |     Y      |
|  system  |    Y     |    Y     |     -      |

## maven 依赖管理

### 01 依赖传递

maven中所有的依赖关系是通过POM文件的规约管理的。如果一个pom文件对另一个pom文件产生了依赖，就说包之间存在传递性依赖

### 02 依赖调节

如果一个传递性依赖产生了冲突，即对于A项目有这样的依赖关系：

```XML
关系1
A->B->C->X(1.0)
关系2
A->D->X(2.0)
```

对于以上的冲突，依赖调节机制会自动按最短路径依赖相同的包，不会将两个版本的包同时下载。

### 03 可选依赖

当前项目所依赖的包的依赖是可选时，即

```xml
<Option>true</Option>
```

以上关系存在时，当前项目不会根据传递性依赖原则获取对应包的能力

### 04 排除依赖

当需要指定对应包的版本而不用通过传递性依赖原则获取的包时，可以通过排除依赖的方式，获取指定版本的包，以避免未知的错误。

```xml
<exclusions>
    <exclusion>
        <groupId>xxx.xxx.xxx</groupId>
        <artifactId>project-name</artifactId>
    </exclusion>
</exclusions>
```

如上所示，需要指定对应的maven坐标。

### 05 归类依赖

当我们依赖的一个系统的包太多，为了方便统一管理时，可以使用归类依赖的方式，为所有的依赖指定统一的版本，不至于在项目改变时而修改所有的依赖。

```xml
<properties>
    <version>xxx</version>
</properties>
```

## maven 仓库体系

什么是maven的仓库？在maven中，任何一个依赖、插件或者项目构建的输出，都可以被称为构件。

maven仓库中，统一存储所有的maven项目共享的构件，这个共享的实现得益于maven中的坐标系统，坐标系统使得我们可以通过项目中的依赖关系进行文件的管理和共享。

文件的共享释放了资源、节约了时间、提高了复用率。

### 01 仓库的布局

任何一个构件都有自己的唯一的坐标，根据这个坐标可以将其定义在仓库中的唯一路径。例如

```xml
log4j:log4j:1.2.15
```

其对应的仓库路径为

```xml
log4j/log4j/log4j-1.2.15.jar
```

### 02 仓库的生成

1. 基于构件的groupId准备路径，formatAsDirectory()将groupId中的句点分隔符转换成路径分隔符。
2. 基于构件的artifactId准备路径，在前面的基础上加上artifactId以及一个路径分隔符
3. 使用版本信息，在前面的基础上添加版本信息形成新的文件
4. 将以上所有的步骤进行执行，获得最终的文件路径

### 03 仓库的分类

maven中只有两类仓库：本地仓库和远程仓库

maven根据坐标寻找构件时，会首先查看本地依赖，如果没有找到，会取远程，下载到本地后才会使用。

仓库的分类

- 本地仓库
- 远程仓库
  - 中央仓库
  - 私服仓库
  - 其他公共库

仓库的介绍

本地仓库：需要在settings文件中定义本地仓库的目录地址

```xml
<settings>
    <localRepository>本地路径
    </localRepository>
</settings>
```

### 04 仓库的配置

对于远程仓库的配置，需要在settings文件中进行配置，在repositories元素下，使用repository子元素声明一个或多个远程仓库。如下所示:

```xml
<repositories>
    <repository>
        <id>xxx</id>
        <name>xxx</name>
        <url>{{url}}</url>
        <releases>
            <enabled>true</enabled>
            <updatePolicy>daily</updatePolicy>
            <checksumPolicy>ignore</checksumPolicy>
        </releases>
        <snapshots>
        	<enabled>true</enabled>
            <updatePolicy>daily</updatePolicy>
            <checksumPolicy>ignore</checksumPolicy>
        </snapshots>
        <layout>default</layout>
    </repository>
</repositories>
```

```id``` 唯一

```name``` 仓库名称

```url``` 远程仓库的地址

```releases```  ```snapshots``` 用来控制maven 对于发布版构件和快照版构件的下载。

```enabled``` 是否开启对应版本的下载

```updatePolicy``` 配置maven从远程仓库检查更新的频率

```checksumPolicy``` 配置maven 检查检验和文件的策略

### 05 仓库的认证

认证信息需要部署在settings中，因为POM往往是被提交的所有成员访问、

```xml
<servers>
    <server>
      <id>xxx</id>
      <username>xxx</username>
      <password>xxx</password>
	</server>
</servers>
```

### 06 部署到远程

maven 除了能对项目进行编译、测试、打包之外，还能将项目生成的构件部署到仓库中，如下：

```xml
<distributionManagement>
    <repository>
        <id>xxx</id>
        <name>xxx</name>
        <url>xxx</url>
    </repository>
</distributionManagement>
```

## maven 版本管理

maven的世界中，任何一个项目或者构件都必须有自己的版本，版本的值可能是

1. 1.0.0
2. alpha-4.2.0
3. 2.1-SNAPSHOT
4. 2.1-SNAPSHOT

其中带有SNAPSHOT的是快照版本。

### 01 快照版本

maven中的快照版本在定义后，不用手动的频繁更新，快照版本号不会改变，但是基于maven本身的快照版本更新机制，每次有新的构件，快照版本都会被打上时间戳。

当用户使用快照版本时，maven 会自动拉取最新时间戳的版本。

```xml
<versioning>
    <snapshot>
        <timestamp>xxxx</timestamp>
        <buildNumber>xxxx</buildNumber>
    </snapshot>
    <lastUpdated>xxxxx</lastUpdated>
</versioning>
```

```timestamp``` 快照的时间戳

```buildNumber``` 构建号

### 02 镜像管理

如果仓库 X 可以提供仓库 Y 存储的所有内容，那么就可以认为 X 是 Y的一个镜像。

maven中对于镜像的管理，需要在settings中进行配置，如下

```xml
<mirrors>
    <mirror>
        <id>xxx</id>
        <name>xxx</name>
        <url>xxx</url>
        <mirrorOf>xxx</mirrorOf>
    </mirror>
</mirrors>
```

``` mirrorOf ``` 值表示该配置的仓库名

