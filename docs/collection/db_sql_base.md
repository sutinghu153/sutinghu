# 数据库基础

## 基本认识
数据库的英文名称：DataBase 简称DB

### 什么是数据库

​	用于存储和管理数据的仓库

### 数据的特点

- 持久化存储数据，其实数据库就是一个文件系统。
- 方便的进行数据的管理。
- 使用了统一的方式操作数据库---SQL

### 常见数据库

-  sqlserver——微软数据库 对Java的兼容性不高 性能高
- oracle——性能优良 收费
- DB2——IBM生产大型机器 性能不高
- Mysql——性能优良 免费

- 配置
  		MySQL服务---启动数据库服务的命令services.msc
  		net stop MySQL
  		net start MySQL
- MySQL登录和退出的方式
  		登录MySQL -uroot -proot
  		推出exit quit
- MySQL目录结构
  		1.安装目录
  			my.ini
  		2.数据目录
  			数据库---文件夹
  			表---文件
  			数据---内容

## SQL
### 什么是SQL？

​	定义了一种所有操作关系型数据库的规则，是结构化查询语言。
​	方言：不同数据库中操作数据库的特有的方法。

### 什么是关系型数据库？

- ​	关系型数据库，是指采用了关系模型来组织数据的数据库，其以行和列的形式存储数据，以便于用户理解，关系型数据库这一系列的行和列被称为表，一组表组成了数据库。
- 用户通过查询来检索数据库中的数据，而查询是一个用于限定数据库中某些区域的执行代码。
- 关系模型可以简单理解为二维表格模型，而一个关系型数据库就是由二维表及其之间的关系组成的一个数据组织。			

## SQL通用语法	


- 语句以分号结束 可以单行或多行进行		

- 可使用空格和缩进提高可读性

- 建议用大写 数据库不区分大小写

- 注释：
  	单行注释：
  		-- 注释内容
  	多行注释：
  		/*	注释内容  	*/

- SQL分类

  ​	DDL:数据定义语言，用来定义数据库对象
  ​	DML:数据库操作语言，用来对数据库对象进行增删查改
  ​	DQL:用来查询数据库中的表的记录
  ​	DCL：数据控制语言

## DDL---定义数据库对象

### 操作数据库：CRUD

#### 	1.Create：创建数据库

​		  *创建一个数据库
​		  	  creata database 数据库名称；
​		   * 添加判断条件
 				create database if not exists db1
 				（如果不存在db1数据时，创建新的数据库，否则不创建）
​			 *创建指定字符集的数据库
​				 create database db3 character set utf8;

#### 	2.Retrieve：查询数据库

​		*查询所有数据的名称
​			show databases;
​		*查询某个数据库的字符集
​			 show create database mysql;

#### 	3.Updata：更新数据库

​			alter database db3 character set gbk;

#### 	4.Delete：删除数据库

​			drop database 数据库名称；
​			判断数据库是否存在 
​			drop database if exists 数据库名称；

### 	使用数据库

​			查询当前正在使用的数据库名称：
​			select database();
​			使用数据库
​			mysql> use mysql;
​			Database changed

### 操作表：CRUD

#### 	1.create:创建

​		create 表名（列名称 列对应的类型，列。。。）；
​		create table mytable(age int);

#### 	2retrieve:查询

​		show tables;查询所有表
​		desc 表名称；查询表结构

#### 	3.updata:更新

​		1.修改表名
​			alter table 表名 rename to 新的表名称；
​		2.修改字符集
​			alter table 表名 character set 字符集；
​		3.添加列
​			alter table 表名 add 列名 数据类型；
​		4.修改列的名称、类型
​			alter table 表名 change 旧列名 新列名称 数据类型；
​		5.删除列
​			alter table drop 列名；

#### 	4.delete:删除

​		drop table 表名；
​		drop table if exists 表名；

## DML---增删改表中的数据
### 1.添加数据

```sql
	insert into 表名（列名1，列名2，，，，，列名n）values（值1，值2，，，，，值n）
	INSERT INTO mytable (ages,score) VALUES (1,5);
```

### 2.删除数据

```sql
	delete from 表名 [where 条件]；从表中根据某个条件删除某个值
	DELETE FROM mytable WHERE (ages=2);---有多少条记录有多少次删除
	DELETE FROM mytable WHERE (ages=2);删除原来的表，创建一个一模一样的新空表
```

### 3.修改数据

```sql
updata 表名 set 列名1 = 值1，列名2 = 值2，，，列名n = 值n,[where 条件]；
	UPDATE mytable SET ages = 81,score = 115 WHERE ages = 1;
```

## DQL---查询语句



```sql
select *from 表名
SELECT *FROM mytable; 	
```

### 1.排序查询

```sql
order by 排序字段，排序方式（可多个字段叠加使用）
	SELECT *FROM mytable ORDER BY score;
		ASC升序---SELECT *FROM mytable ORDER BY score ASC;
		DESC降序---SELECT *FROM mytable ORDER BY score DESC;
		SELECT *FROM mytable ORDER BY ages ASC,score DESC;
```

### 2.聚合函数---排除空值，不计算null值

```sql
将一列数据作为一个整体，进行纵向的计算。
		count 计算个数
			SELECT COUNT(ages) FROM mytable;
		max 计算最大值
			SELECT MAX(ages) FROM mytable;
		min计算最小值
			SELECT MIN(ages) FROM mytable;
		sum计算和求和
			SELECT SUM(ages) FROM mytable;
		avg计算平均值
			SELECT AVG(ages) FROM mytable;
```

### 3.分组查询

```sql
	group by分组字段【分组之后查询的字段是分组字段或聚合函数】
	SELECT ages ,AVG(score)FROM mytable GROUP BY ages;
	having：查询句柄，分组之后进行限定，如果不满足，则不会被查询出来。聚合函数之后可以跟。
	where：在分组之前进行限定，where之后不可以跟聚合函数。
```

### 4.分页查询

​	limit 开始的索引 ，每页查询的条数；SELECT *FROM mytable LIMIT 0,3;【0，3）前包后不包

### 5.基础查询

```sql
select
		字段列表
	from
		表名列表
	where
		条件列表；
	group by
		分组字段；
	having
		分组之后的条件；
	order by
		排序；
	limit
		分页查询；
	distinct---去除重复的字段；
	>,	<,	=,	!=,	<=,	>=;
	AND
	between and
```

### 6.模糊查询

```sql
like
	select *from student where name like ‘马’；_ 表示字符的位 ，%表示一个字符
```

## 约束
```sql
对表中的数据进行限定，保证数据的正确性，有效性和完整性。
	主键约束primay key
		代表非空且唯一
		一张表只能有一个主键
		主键是表的唯一标识
		创建表时添加主键约束
		CREATE TABLE stu1(
	     id INT,
	     NAME VARCHAR(20)  primay key
	   );
	  
	非空约束not null
		CREATE TABLE stu1(
			 id INT,
			 NAME VARCHAR(20) NOT NULL
		);
	唯一约束unique
		CREATE TABLE stu3(
			 id INT,
			 NAME VARCHAR(20) UNIQUE----同一个表中该值只能有一个
			);
	外键约束foreign key
		解决数据冗余的问题。让两个表中的数据记录产生唯一关联。
```
## 多表之间的关系
数据库设计

### 1.一对一

​	人和身份证
​	一个表的主键指向另外一个表的外键

### 2.一对多

​	部门和员工的关系
​	一个部门有多个员工，一个员工只能有一个部门
​	在多的一方建立外键，指向一的一方的主键，外键要唯一

### 3.多对多

​	学生和课程，一个学生有很多课程，一个课程可以被很多学生选择
​	借助第三张表，第三章表的字段作为外键分别指向另外的表的主键

## 范式---遵循的规范
设计关系数据库的合理范式。

### 	第一范式

每一列都是不可分割的原子项

### 	第二范式

在第一范式的基础上，非属性码依赖候选码
		函数依赖：通过A的值来确定B
		完全函数依赖：通过一个组A的所有组成的值来确定B
		部分函数依赖：通过一个组A的部分组成的值来确定B
		传递函数依赖：通过一个值A来确定B,再通过B来确定C
		码——被完全依赖的属性称为码
			主属性：码属性
			非主属性：非码属性集合

### 	第三范式

在第二范式的基础上

## 数据库的备份和还原
	对数据库进行备份，防止数据库出现问题。

## 事务
如果一个包含多个业务的操作，被事务管理，那么这些操作要么同时成功，要么同时失败。
	开启事务：start transaction
	事务回滚：rollback
	提交事务：commit
mysql数据库中默认自动提交：
	一条DML数据语句会自动提交一次事务。
	@@autocommit----1，自动提交，0手动提交
	set @@sutocommit=0；自动提交

## 事务的四大特征
### 1.原子性

事务是原子性的，不可分割的最小操作单位，要么同时成功，要么同时失败。

### 2.持久性

当事务提交或回滚后，数据库会持久化的保存数据。

### 3.隔离性

多个事务之间，相互独立。

### 4.一致性

事务操作前后，数据的总量不变。

## 事务的隔离级别
多个事务之间隔离的，相互独立的，但是如果多个事务操作同一批数据，就会有一些问题，

设置不同的隔离级别能够解决这些问题。

### 存在问题：

​	脏读：一个事务读取到另一个事务中没有提交的数据称为脏读。
​	不可重复读：在同一个事务中，两次读到的数据不一样。
​	幻读：一个事务操作数据表中的所有记录，另一个事务添加了一条数据，则第一个事务查询不到自己的修改。

### 隔离级别：

```sql
read uncommitted：读未提交
		脏读，虚读，幻读
	read commited：读已提交
		虚读、幻读
	repeatable read：可重复读
		虚读、幻读
	serializable：串行读
		可以解决所有问题
	注意：隔离级别从小到大，安全性越来越高，效率越来越低
数据库设置隔离级别：
	select @@tx_isolation查询隔离级别
	set global transaction isolation level 级别字符串；设置隔离级别
```

## DCL----管理用户
### 1.管理用户

#### 	1.添加用户

```sql
	-- 创建用户
		CREATE USER '用户名'@'主机名'IDENTIFIED BY '密码';
```

#### 	2.删除用户

```sql
DROP USER '用户名'@'主机名';
```

#### 	3.修改用户

```sql
-- 修改密码
		UPDATE USER SET PASSWORD = PASSWORD('新密码')WHERE USER = '用户名';
		SET PASSWORD FOR '用户名'@'主机名' = PASSWORD ('新密码');
```

#### 	4.查询用户

```sql
-- 切换到MySQL数据库
		USE mysql;
		-- 查询user表
		SELECT *FROM USER;
```

### 2.权限授予

#### 	1.查询权限

```sql
SHOW GRANTS FOR 'root'@'localhost'
```

#### 	2.授予权限

```sql
	GRANT SELECT,DELETE,UPDATE ON `db3`.`mytable` TO 'root'@'localhost';
		GRANT ALL ON `db3`.`mytable` TO 'root'@'localhost';
```

#### 	3.撤销权限

```sql
REVOKE UPDATE ON `db3`.`mytable` FROM 'root'@'localhost';
```

