# 基于Aspose.Words的Word模板填充









本文基于Aspose.words设计和实现word模板填充方案，由浅入深，让你能学到也能做到！







# 目录

[TOC]





# Apose.Word



## 01 前情提要

> 在进行Apose.word 的学习和使用时，需要提前熟悉和了解Apose.Word给每个文档Document设计的数据结构及结构之间的关系。

以下提供一个了解的渠道：

[学前必看：文档对象模型概述](http://www.cnblogs.com/asxinyu/p/3242754.html)

:sos: 以上链接内容学完后再进行下面的学习！！！



## 02 极速入门

### 学习思路

1. CV以下代码
2. 运行代码
3. 查看输出结果
4. 查看注释

### Create 一个 Document

```java
public class Test {


	public static void main(String[] args) {
		try {
			new Test().createDoc();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void createDoc() throws Exception {
		// 创建一个文档对象
		Document doc = new Document();
		// 创建一个文档操作对象——可以理解为光标
		DocumentBuilder builder = new DocumentBuilder(doc);
		// 在文档中写入
		builder.writeln("sutinghu，牛逼!");
		// 将文档输出下 
		doc.save("C:\\Users\\MSI\\Desktop\\123.doc");//
	}

}

```

### 设置Document格式

```java
public void test2()
	{
		try
		{
			Document doc = new Document();
			DocumentBuilder builder = new DocumentBuilder(doc);
			builder.writeln("sutinghu，牛逼!");
			// 改变格式
			builder.getFont().setColor(Color.decode("#66ccff"));//设置颜色
			builder.getFont().setBold(true);//设置粗体
			builder.getFont().setItalic(true);//设置斜体
			builder.getFont().setName("微软雅黑");//设置字体
			builder.getFont().setHighlightColor(Color.gray);//设置背景高亮
			builder.getFont().setUnderlineColor(Color.RED);//设置字体颜色
			builder.getFont().setUnderline(Underline.DOUBLE);//设置下划线
			/*
			 * 缩进
			 */
			builder.getParagraphFormat().setFirstLineIndent(30);//首行缩进
			builder.getParagraphFormat().setLeftIndent(30);//缩进：文本之前
			builder.getParagraphFormat().setRightIndent(30);//缩进：文本之后
			/*
			 * 行距：
			 * AT_LEAST 最小值
			 * EXACTLY 固定值
			 * MULTIPLE 多倍行距
			 * 注：多倍行距的值以12为基准，12为一倍行距，24为两倍，以此类推
			 */
			builder.getParagraphFormat().setLineSpacingRule(LineSpacingRule.MULTIPLE);
			builder.getParagraphFormat().setLineSpacing(24);
			builder.getParagraphFormat().setSpaceBefore(10);//段前，单位磅
			builder.getParagraphFormat().setSpaceAfter(10);//段后，单位磅
			/*
			 * 对齐方式
			 * CENTER 居中对齐
			 * DISTRIBUTED 分散对齐
			 * JUSTIFY 两端对齐
			 * LEFT 左对齐
			 * RIGHT 右对齐
			 */
			builder.getParagraphFormat().setAlignment(ParagraphAlignment.RIGHT);
			builder.getParagraphFormat().setBidi(false);//方向：true 从右向左 false 从左向右
			builder.writeln("111111111111111111111111111111111111111111111111111111");
			doc.save("C:\\Users\\MSI\\Desktop\\456.doc");
		} catch (Exception e)
		{
			e.printStackTrace();
		}
	}
```

### 设置页面分隔

```java
/**
* 页面分隔符
*/
@Test
public void test3(){
try{
    Document doc = new Document();
    DocumentBuilder builder = new DocumentBuilder(doc);
    builder.writeln("66666666666666666666666666666666666666");
    builder.insertBreak(BreakType.PAGE_BREAK);//分页符
    builder.writeln("This is the 1st section,2nd Page");
    builder.insertBreak(BreakType.LINE_BREAK);//换行符
    builder.insertBreak(BreakType.COLUMN_BREAK);//分栏符
    builder.insertBreak(BreakType.SECTION_BREAK_CONTINUOUS);//连续分节符
    builder.writeln("This is the 3rd section,1nd Page");
    builder.writeln("连续分节符");
    builder.insertBreak(BreakType.SECTION_BREAK_EVEN_PAGE);//偶数页分节符
     builder.writeln("This is the 4th section,1nd Page");
    builder.writeln("偶数页分节符");
    builder.insertBreak(BreakType.SECTION_BREAK_ODD_PAGE);//奇数页分节符
    builder.writeln("This is the 5th section,1nd Page");
    builder.writeln("奇数页分节符");
    builder.insertBreak(BreakType.SECTION_BREAK_NEW_PAGE);//下一页分节符
    builder.writeln("This is the 6th section,1nd Page");
    builder.writeln("下一页分节符");
    builder.insertBreak(BreakType.SECTION_BREAK_NEW_COLUMN);//节的结尾
    builder.writeln("This is the 7th section,1nd Page");
    builder.writeln("节的结尾");
    doc.save(...);
} catch (Exception e){
	e.printStackTrace();
	}
}
```

### 设置文档属性

```
public void test4(){
try{
    Document doc = new Document();
    DocumentBuilder builder = new DocumentBuilder(doc);
    builder.write("222222222222222222222222222");
    builder.getPageSetup().setPaperSize(PaperSize.A4);//纸张大小
    builder.getPageSetup().setLeftMargin(20);//设置边距 单位为磅
    builder.getPageSetup().setRightMargin(10);
    builder.getPageSetup().setTopMargin(10);
    builder.getPageSetup().setBottomMargin(10);
    builder.getPageSetup().setTextOrientation(TextOrientation.DOWNWARD);//文字方向
    builder.getPageSetup().setOrientation(Orientation.LANDSCAPE);//横纵向 PORTRAIT 纵向 LANDSCAPE 横向
     doc.save(...);
} catch (Exception e)
{
e.printStackTrace();
}
}
```

### 设置页眉页脚

```
public void test5(){
try{
    Document doc = new Document();
    DocumentBuilder builder = new DocumentBuilder(doc);
    builder.write("55555555555555555555555555555555!");
    builder.insertBreak(BreakType.LINE_BREAK);
    builder.moveToHeaderFooter(HeaderFooterType.HEADER_PRIMARY);//移动到页眉
    builder.getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
    builder.writeln("Hello,Lain!");
    builder.moveToDocumentEnd();
    builder.writeln("Hello,Lain!");
    builder.moveToHeaderFooter(HeaderFooterType.FOOTER_PRIMARY);//移动到页脚
    builder.getParagraphFormat().setAlignment(ParagraphAlignment.CENTER);
    builder.getFont().setName("微软雅黑");
    builder.write("第");
    builder.insertField("PAGE", "");//当前页数
    builder.write("页");
    builder.write(" 共");
    builder.insertField("NUMPAGES", "");//总页数
    builder.write("页");
    builder.moveToDocumentEnd();
    builder.insertBreak(BreakType.SECTION_BREAK_NEW_PAGE);
    builder.write("Hello,Lain!");
    doc.save(getTempFileName());
} catch (Exception e){
e.printStackTrace();
}
}
```

### 插入表格

```java
public void test6() {
		Document doc;
		try
		{
			doc = new Document();
			DocumentBuilder builder = new DocumentBuilder(doc);
			builder.startTable();
			// 插入一行设置表头
			builder.insertCell();
			builder.getCellFormat().setWidth(100);
			builder.getFont().setName("华文正楷");
			builder.getFont().setColor(Color.decode("#66ccff"));
			builder.getParagraphFormat().setLineSpacing(24);
			builder.write("序号");
			builder.insertCell();
			builder.getCellFormat().setWidth(200);
			builder.write("代码");
			// 结束行
			builder.endRow();
			for (int i = 0;i<10;i++) {
				builder.insertCell();
				builder.getCellFormat().setWidth(100);
				builder.write("序号："+i);
				builder.insertCell();
				builder.getCellFormat().setWidth(200);
				builder.write("代码："+-i);
				builder.endRow();
			}
			builder.endTable();
			doc.save("C:\\Users\\MSI\\Desktop\\789.doc");
		} catch (Exception e)
		{
			e.printStackTrace();
		}
	}
```

### 插入柱状图

```
	// 创建一个文档对象
		Document doc = new Document();
		// 获取文件建造者
		DocumentBuilder builder = new DocumentBuilder(doc);

		Shape shape = builder.insertChart(ChartType.COLUMN, 430, 250);

		Chart chart = shape.getChart();
		chart.getSeries().clear();
		chart.getSeries().add("test",new String[]{"ONE","TWO","THREE"},new double[]{1.2,1.3,1.4});

		chart.getAxisX().setHidden(true);

		doc.save("C:\\Users\\MSI\\Desktop\\123456.doc");
```



## 03 核心方法

### 学习思路

1. 掌握核心代码
2. 查看主要方法

### 获取mergefield字段集

##### 核心代码

```
Document doc = new Document(is);
String[] tables = doc.getMailMerge().getFieldNames();
```

> 邮件字段集，是通过word手动添加的配置字段，通过以上操作可以获得文档中的所有邮件字段

##### 主要方法

```java
/**
	 * 功能描述: 获取文档的mergefield字段集
	 * @author sutinghu
	 * @date
	 * @param file 参数
	 * @return java.lang.String[]
	 */
	public static String[] getFields(byte[] file){

		InputStream is = new ByteArrayInputStream(file);
		String[] tables = null;
		try {
			Document doc = new Document(is);
			tables = doc.getMailMerge().getFieldNames();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return tables;
	}

```

### 替换merges

#### 替换普通邮件

##### 核心代码

替换的关键代码只有以下一行

```
doc.getMailMerge().execute(new String[]{},new String[]{});
```

其中第一个array是字段集即key，第二个参数是字段集对应的值即value

#### 替换嵌套型邮件

##### 核心代码

替换的主要方法为

```
DataTable dataTable = fillListData((List) value, key);
doc.getMailMerge().executeWithRegions(dataTable);
```

##### 主要方法

其中DataTable为嵌套层，其本质是一个表格，它的构造代码如下

```java
/**
	 * 功能描述: 封装 list 数据到 word 模板中（word表格）
	 * @author sutinghu
	 * @date
	 * @param list 数据
	 * @param tableName 表格列表变量名称
	 * @return word表格数据DataTable
	 */
	private static DataTable fillListData(List<Object> list,
										  String tableName) throws Exception {

		//创建DataTable,并绑定字段
		DataTable dataTable = new DataTable(tableName);
		for (Object obj : list) {
			//创建DataRow，封装该行数据
			DataRow dataRow = dataTable.newRow();
			Class<?> objClass = obj.getClass();
			Field[] fields = objClass.getDeclaredFields();
			for (int i = 0; i < fields.length; i++) {
				Field field = fields[i];
				dataTable.getColumns().add(fields[i].getName());
				PropertyDescriptor pd = new PropertyDescriptor(field.getName(), objClass);
				Method method = pd.getReadMethod();
				dataRow.set(i, method.invoke(obj));
			}
			dataTable.getRows().add(dataRow);
		}
		return dataTable;
	}
```

#### Map结构填充方法

##### 主要方法

```java
/**
	 * 功能描述: 填充 word 模板（map数据格式）
	 * @author sutinghu
	 * @date
	 * @param file word二进制
	 * @param data 要填充的数据
	 * @return 组合数据之后的word二进制
	 */
	public static byte[] fillWordDataByMap(byte[] file,
										   Map<String, Object> data) throws Exception {
		byte[] ret = null;

		if (data == null || data.isEmpty()) {
			return ret;
		}

		try (
			InputStream is = new ByteArrayInputStream(file);
			ByteArrayOutputStream out = new ByteArrayOutputStream()) {
			Document doc = new Document(is);
			Map<String, String> toData = new HashMap<>();
			for (Map.Entry<String, Object> en : data.entrySet()) {
				String key = en.getKey();
				Object value = en.getValue();

				if (value instanceof List) {
					//写入表数据
					DataTable dataTable = fillListData((List) value, key);
					doc.getMailMerge().executeWithRegions(dataTable);
				}

				String valueStr = String.valueOf(en.getValue());
				if (value == null || value.equals(NULL)) {
					continue;
				}

				toData.put(key, valueStr);
			}

			String[] fieldNames = new String[toData.size()];
			String[] values = new String[toData.size()];

			int i = 0;
			for (Map.Entry<String, String> entry : toData.entrySet()) {
				fieldNames[i] = entry.getKey();
				values[i] = entry.getValue();
				i++;
			}

			//合并数据
			doc.getMailMerge().execute(fieldNames, values);
			doc.save(out, SaveOptions.createSaveOptions(SaveFormat.PDF));
			ret = out.toByteArray();
		}

		return ret;
	}
```

### 文档类型转换

##### 核心代码

```
ByteArrayOutputStream out = new ByteArrayOutputStream()；
doc.save(out, SaveOptions.createSaveOptions(SaveFormat.PDF));
```

其中out，为文件输出流，SaveFormat为文件常量标记，该方法执行后，可以将out输出流转换为特定格式的文件。

### 表格的处理

##### 核心代码

```java
DataTable dataTable = fillListDataByMap((List) value, key);
doc.getMailMerge().executeWithRegions(dataTable);

// 需要注意的是，在填充的时候要进行列绑定
dataTable.getColumns().add(field.getKey());
```

##### 主要方法

```
DataTable dataTable = new DataTable(tableName);通过tableName 绑定表为模板中对应的表格
```

```java
DataRow dataRow = dataTable.newRow();
			Map<String, Object> map = (Map<String, Object>) obj;
			for (Map.Entry<String, Object> field:map.entrySet()) {
				String key = field.getKey();
				Object value = field.getValue();
				dataRow.set(key,value);
			}
dataTable.getRows().add(dataRow);
将map型的数据结构存于绑定的表中
```

