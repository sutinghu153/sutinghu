<h1 align = "center" >数据库常字</h1>

<font face="华文行楷" size="5">有关数据库的不常用、不常见、常用较复杂、不常用但很有用的知识点及应用整理如下</font>

## 批量插入

<font face="华文行楷" size="4">批量插入是一种经常用到的数据插入方式，但是Pg、Oracle、MySQL等数据库对于插入有不同的要求，并且如果通过mybatis-plus实现批量的插入，将对程序的开发起到事半功倍的作用，现梳理如下</font>

### MySQL&PostgreSql

#### SQL

```sql
insert into tableName (col1,col2,col3...)values(v1,v2,v3)...
```

#### myBatis

```java
@Param("tableName")String tableName,
@Param("columnMap")Map<String, Object> columnMap,
@Param("mapList") List<Map<String, Object>> mapList
```

```xml
insert into ${tableName}
		(
		<foreach collection="columnMap" item="value" index="key" separator=",">
			${key}
		</foreach>
		)
		values
		<foreach collection="mapList" item="columnMap" separator=",">
			(
			<foreach collection="columnMap" item="value" index="key" separator=",">
				#{value}
			</foreach>
			)
		</foreach>
```

### Oracle

#### SQL

```sql
INSERT ALL INTO tableName ( col1,col2,col3...) values (     v1,v2,v3...)   
           INTO tableName ( col1,col2,col3...) values (     v1,v2,v3...)   
           INTO tableName ( col1,col2,col3...) values (     v1,v2,v3...)   
SELECT * FROM dual;
```

#### Mybatis

```java
@Param("tableName")String tableName,
@Param("columnMap")Map<String, Object> columnMap,
@Param("mapList") List<Map<String, Object>> mapList
```

```xml
INSERT ALL
	<foreach collection="mapList" item="columnMap" separator=" ">
	INTO ${tableName}
	(
	<foreach collection="columnMap" item="value" index="key" separator=",">
				${key}
	</foreach>
	)
	values
	(
	<foreach collection="columnMap" item="value" index="key" separator=",">
				#{value}
	</foreach>
	)
	</foreach>
SELECT * FROM dual
```

