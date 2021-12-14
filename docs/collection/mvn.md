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

