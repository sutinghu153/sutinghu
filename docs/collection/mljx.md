# 命令解析

```
<build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-plugin-plugin</artifactId>
        <version>3.5.2</version>
      </plugin>
      <plugin>
        <!-- 指定maven编译的jdk版本 -->
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-compiler-plugin</artifactId>
        <version>3.8.1</version>
        <configuration>
          <verbose>true</verbose>
          <fork>true</fork>
          <!--你的jdk地址-->
          <executable>C:/Program Files/Java/jdk1.8.0_20/bin/javac</executable>
          <source>8</source>
          <target>8</target>
        </configuration>
      </plugin>

      <plugin>
        <groupId>sutinghu.tools</groupId>
        <artifactId>countcodes-maven-plugin</artifactId>
        <version>1.0.0</version>
        <configuration>
          <type>all</type>
          <startTime>2020-02-01</startTime>
          <endTime>2021-12-01</endTime>
        </configuration>
      </plugin>

    </plugins>
  </build>
```

