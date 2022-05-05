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

#### Navicate 跨库连接

安装插件

```
create extension dblink;
```

连接数据库

```
SELECT dblink_connect('source','hostaddr=10.14.2.31 port=5432 dbname=venusmas user =venus password=venus');
```

## 数据库正则匹配

### 字符串匹配

匹配数据库中存在的字符是否存在中文、英文、特殊字符

```sql
~ '[\u2e80-\ua4cf]|[\uf900-\ufaff]|[\ufe30-\ufe4f]|[a-z]|[A-Z]|[/]|[~]'
```

## 数据库查看

### 数据库的表

```sql
---查看数据库有几个表
SELECT count(*) FROM pg_tables WHERE tablename NOT LIKE 'pg%' AND tablename NOT LIKE 'sql_%' ORDER  BY  tablename;
```

### 批量查找相关表

```sql
批量查找相关表
SELECT count(*) FROM pg_tables WHERE tablename NOT LIKE 'pg%' AND tablename NOT LIKE 'sql_%' ORDER  BY  tablename;

SELECT count(*) FROM pg_tables WHERE tablename NOT LIKE 'pg%' AND tablename NOT LIKE 'sql_%' AND tablename NOT LIKE 'form_data_%' ORDER  BY  tablename;
```

### 批量删除表

```sql
批量删除表
SELECT 'drop table ' || tablename || ';' as tablename1 FROM pg_tables WHERE tablename NOT LIKE'pg%' AND tablename NOT LIKE'sql_%' AND tablename NOT LIKE'form_data_%' ORDER BY tablename;
```

## 数据库脚本

```sql
DECLARE
  V_SQL        VARCHAR2(2000);
  V_TABLE_NAME VARCHAR2(30);
	COUNT_N NUMBER(4);
  CURSOR C1 IS
      SELECT DISTINCT CONCAT('FORM_DATA_', FORM_ID) as TABLE_NAME  FROM (SELECT FORM_ID FROM TZ WHERE FORM_ID is not NULL) ;
BEGIN
  OPEN C1;
  LOOP
    FETCH C1
      INTO V_TABLE_NAME;
			EXIT WHEN C1%NOTFOUND;
			dbms_output.put_line('开始更新表' || V_TABLE_NAME);
			select count(*) INTO COUNT_N from user_objects where  object_name = V_TABLE_NAME;
			IF (COUNT_N =1) THEN
					SELECT COUNT(*) INTO COUNT_N FROM USER_TAB_COLUMNS WHERE UPPER(TABLE_NAME)= V_TABLE_NAME AND COLUMN_NAME = 'DATA_SOURCE';
					dbms_output.put_line(COUNT_N);
					IF (COUNT_N = 0 ) THEN
					dbms_output.put_line(V_TABLE_NAME || '不存在 DATA_SOURCE 字段 开始新增');
						V_SQL := 'alter table ' || V_TABLE_NAME || ' add DATA_SOURCE NUMBER(4,0)';
						EXECUTE IMMEDIATE V_SQL;
					ELSE
					dbms_output.put_line(V_TABLE_NAME || '已存在 DATA_SOURCE 字段 ');
					END IF;
				ELSE
				dbms_output.put_line(V_TABLE_NAME || ' 不存在 ');
			END IF;
  END LOOP; 
  CLOSE C1;
END;

```

