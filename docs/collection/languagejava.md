# Java

## 反射

### 框架
半成品的软件，在框架的基础上进行编程，能够简化编程过程。

### 反射机制
反射机制，将类的各个组成部分封装为其他类的对象

Java代码在计算机中主要经历三个阶段：

1.代码编译阶段---class.forname（全名）
		编写代码 通过Javac将Java文件变成class文件，字节码文件，字节码文件，
		是将类按不同的属性和方法进行封装，封装在字节码文件中。
2.动态加载阶段---类名.class
		动态加载的过程，是将字节码文件通过class类按不同的方法和属性进行对象式封装
		即不同类型的字节码文件也是对象，通常是封装为三个 成员变量 成员方法 构造方法
		Field Costructor Methon
3.创建运行阶段----对象.getclass();
		字节码中的对象按照一定的条件进行封装，然后在我们使用new关键字的时候
		创建对象并运行。

### test

```java
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
public class Excetion {
    public static void main(String[] args) throws  Exception {
        //获取类对象
        Class  cls = Class.forName("cn.husuting.class01.Teacher");
        Object obj = cls.newInstance();
        Method m = cls.getMethod("name");
        m.invoke(obj);
    }
}
class Teacher{
    public String name;
    public int age;
    public int id;
    public Teacher(){
    }
    public void name(){
        System.out.println("老师");
    }
}
class Person1{
    public String name;
    public int age;
    public int id;
    public void name(){
        System.out.println("普通人");
    }
}
```

## 注解

### 注解
什么是注解：也叫元数据，一种代码级别的说明。
	它是JDK1.5以后引入的一个特性，与类、接口、枚举在同一个层次。
	它可以声明在包、类、字段、方法、局部变量、参数列表等前面，用来对这些元素进行说明、注释。
有哪些注解：
	JDK中预定义的一些注解
	自定义的注解
注解有什么用：
1.编写文档：生成文档doc

```java
/**
 * @since 1.5
 * @author husuting
 * @version 1.0
 */
public class Demo1 {
    /**
     * 计算两数之和
     * @param a 整数
     * @param b 整数
     * @return 两数之和
     */
  public int add(int a,int b){
      return a + b;
  }
}
```

2.代码分析：对代码进行分析---使用注解

3.编译检查：通过程序中的注解让编译器实现基本的编译检查

### 基本注解
	@override：监测被该注解标注的方法是否继承自父类
	@Deprecated：该注解标注的内容，已过时，有更好的替代方法
	@SuppressWarinings：压制警告
```java
@SuppressWarnings("all")//压制所有的警告 一般传递参数all
public class Demo2 {
    @Override
    public String toString(){
        return super.toString();
    }
    @Deprecated
    public void show1(){
        //有缺陷
    }
    public void show2(){
        //替代show1方法
    }
    public void demo(){
        show1();//已经过时 但还是可以使用 因为要兼容低版本
        show2();
    }
}
```
### 自定义注解
格式：
	元注解：
	public @Interface 注解名称（）{}
	public @interface Demo3 {}
本质：本质就是一个接口，该接口默认继承Annotation接口
属性：接口中可以定义的方法，接口中的抽象方法，要给属性赋值
	如果定义属性时，使用default关键字给属性默认初始化值，则使用默认值
	如果只有一个属性，且这个属性的名称是value，则value可以省略。

```java
@Demo3(show2 = 1,name = "12")
public @interface Demo3 {
    String name();//抽象方法是注解的属性
    int show2();
}
```
### 元注解
用来描述注解的注解
	@Target()//描述注解能够作用的范围
	@Retention()//描述注解保留的阶段
	@Documented//注解是否被抽取到api文档
	@Inherited//描述注解是否被子类继承

```java
/*
    @Target()//描述注解能够作用的范围
        @Target(value={ElementType.TYPE})//只能作用在类上
        @Target(value={ElementType.FIELD})//只能作用在成员变量上
        @Target(value={ElementType.METHOD})//只能作用在方法上
    @Retention()//描述注解保留的阶段
        @Retention(RetentionPolicy.CLASS)在源码中保留JVM不可以读取
        @Retention(RetentionPolicy.RUNTIME)在运行时保留JVM可以读取
        @Retention(RetentionPolicy.SOURCE)加载过程中保留
    @Documented//注解是否被抽取到api文档
    @Inherited//描述注解是否被子类继承
 */
@Target(value={ElementType.TYPE})//只能作用在类上
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface Demo3 {
    String name();//抽象方法是注解的属性
    int show2();
}
```
### 解析注解
注解到底有什么用，获取值

```java
//@Demo3(show2 = 1,name = "12")
public static void main(String[] args) {
    Class<Demo2> demo2Class = Demo2.class;//将进行了注解的类进行解析
    //即将被注解注释的类进行解析
    String name = demo2Class.getAnnotation(Demo3.class).name();//获取注解中的值
    System.out.println(name);
}
```

## Junit单元测试
测试分类：
1.黑盒测试
	不需要写代码 
	不需要关注代码的运行
	只需要输入参数，看程序的运行结果
2.白盒测试
	需要写代码
	需要关注代码的具体的执行流程
3.Junit单元测试---白盒测试
	1.定义一个测试类
		测试类名 被测试的类Test
		包名
	2.定义一个测试方法 可独立运行
		方法名：testAdd
		返回值：void
		参数列表：空参
	3.给方法加注解 @Test
	4.导入测试环境依赖
	5.判定结果
		红色为异常---绿色为测试成功
	6.一般通过断言来测试结果Assert：期望的结果和运算的结果进行比对

```java
public class Calculator {
    @Test
    public void testAdd(){
        System.out.println("wbzxl");
        calculator c = new calculator();
        int result = c.add(1,3);
        System.out.println(result);
        //断言 -- 我断言 
        Assert.assertArrayEquals(4,result);
    }
}
```
两个很重要的方法和注解@after @before
避免重复的代码初始化资源和释放资源的过程

```java
/*
初始化方法 用于资源申请 所有的资源使用前进行申请 即所有测试方法执行前执行该方法
 */
@Before//该注解将该方法在所有测试方法之前执行
public void init(){
    //
}
/*
释放资源的方法
所有的方法执行完后 都会自动执行该方法
 */
@After
public void close(){
    //
}
```

## IOC控制反转

### 一个问题

面向过程------
	想象一个过程----当我们的计算机技术还没有这么发达的时候，所有的代码，就是建立在面向过程的。
这种代码模式带来一个重要的问题，大项目的程序在写的过程中，会有相当的代码量是冗余重复的。
不仅仅耗时耗力，一不小心就可能让我们的整个工程出现坍塌事故。
面向对象------
	我们在写代码的过程中，发现很多的代码实例都是重复的，他们仅仅需要一个参数实例化，这样一样的代码就能起到不一样的
作用，面向对象的编程出现了，一切皆可对象化，对象的实例化就是参数转移的过程。
一个问题？------
	注意上述过程，当我们在写一个项目的时候，所有的代码建立在类上，类与类之间有一定的依赖关系，倘若你的工程
中有个类跟其他的类一点关系也没有，那你可以把这个类删掉了，因为它很可能没有被编译。
	现在有个问题，创建一个项目需要不同的类之间的依赖关系，那么当我们的这个项目有大的变动时，修改其中的一个类
其他的类及代码是否也需要改变？答案是肯定的，那么在这个过程中，可想而知，重复的工作和没必要的代码以及重新搭建
的工程是怎么样的耗时耗力不讨好的过程了。

### 耦合与依赖
耦合就是项目中类与类之间的依赖关系，就像学生和班级的关系，学生的班级改变后，对应的班主任也不一样。
类与类之间的依赖越多越深，类与类之间的耦合越大。

### 接口
接口是抽象的类，其所有的方法和属性都是抽象的，我们在使用它的时候需要先实例化，创建一个类来实现它。

### 容器和依赖注入
通过以上描述，当前需要解决的问题是，有没有一种模式，让我们在进行类的使用的时候，
可以根据我们的需要进行不同的类之间的依赖关系的重新设置——即依赖注入。
当类和类之间的关系变得可控的时候，以上提出的问题都能够被解决。	

### 两个思路
- 我们知道类和类之间之所以出现耦合的关系，是因为对象有自己特定的实例化的时间和过程，即班级的对象必定要在学生对象之前出现。
- 基于此，如果我们能够控制类创建对象的时间，就能够伪实现类和类的耦合，为什么是伪实现，因为即使控制了不同的类创建对象的时间，但是类与类时间的书写关系并没有改变。
- 当所有的类都分离，借用第三方的容器，该容器拥有所有类的使用权，你只需要告诉它什么时候创建哪个对象，并和哪个类有什么的关系，这样我们就实现了类和类之间的无耦合关系。
- 上述两个解决方案，显然第二个更值得尝试。

控制反转IOC：将组件间的依赖关系在系统中抽离出来。
依赖注入DI：将组件间的依赖关系通过外部传参的方式注入。

这里我们提出两个概念 IOC 和 DI 来实现我们上面提到的第二个解决方案。首先编程的过程中进行IOC再根据我们的需要进行DI

## 序列化和反序列化
Java序列化是指将对象转化为字节序列的过程。
Java反序列化是指将字节序列转换为对象的过程。

### 为什么序列化
写入硬盘，减少内存压力。
进行数据的传输。
进程通信间的数据传输。

### 如何实现序列化
ObjectOutputStream对象输出流----WriteObject();
ObjectInputStream对象输入流------ReadObject();
实现serialziable接口---进行序列化的接口 实现该接口 即可将该类进行序列化
transient---用来忽略不进行序列化的变量。

### 作用
序列化和反序列化是MVC模型的基础
实现数据的持久化
进行数据的远程传输		

