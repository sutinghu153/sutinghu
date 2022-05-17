# 设计模式-analysis

## 深入理解面向对象三大特性之封装

### 引入

之前我看了设计模式，并且自己着手实现了一遍，对于类、抽象类、接口之间的关系和深度有了更多的认识！

然后，这段时间用Java着手实现数据结构中的线性表、树等. 



这个过程中一方面自己思考怎么写，另一方面参考Java工具类Util中的Collection，从模仿到抄袭，完成了数据结构的实现. 



然后，我感受到了面向对象的魅力！并且，在实现某个类的时候，有种感觉就像在一个世界、一个生态畅游，并发挥自己的想象力，不断完善这个世界！	



这个感受，我个人觉得必须要基于以下几个方面.



**1. 这个世界【类】是有规则的，什么样的东西能够干什么样的事情必须要明确，就像鱼不能离开水一样，变量也不能离开类型.** 



**2. 这个世界【类】的内部是一个有生命力的城市，它可以不断的扩建，而且在每次建设前都能够被使用. 这就是类的继承和类的版本迭代.**



**3. 这个世界【类】是有自己的交际桥梁的，如果我们想访问这个世界，就必须通过这个桥梁. 就像类的实例对象和它的方法.** 



**在以上几点的启发下，我们把一个类剥离来重新审视它，就会发现，这个世界【类】的建设是可以沉浸在里面的. 比如一个人的世界【类】**

###  **我们想在这个世界里创造，先有一个人的基本信息** 

```java

public class World {

    static class Person{

        private String name;
        private int age;
        private boolean sex;

    }
}
```

###  **然后，这个世界有了一个人** 

```java

public class World {

    private Person person;

    static class Person{

        private String name;
        private int age;
        private boolean sex;

    }
}
```

###  **后来，这个世界有了一群人** 

```java

public class World {

    private List<Person> persons;

    static class Person{

        private String name;
        private int age;
        private boolean sex;

    }
}
```

### **现在，我们跟她们一起建设这个世界.** 

**我想让世界有城市，让所有的人都有家可归**

```java

public class World {

    private List<Person> persons;

    static class Person{

        private String name;
        private int age;
        private boolean sex;

    }

    static class City{
        private String cityName;
        private int area;
        private List<Person> peopleInCity;
    }
}
```

###  **这还不够，城市里的人，应该有自己的活动，这种活动是基于人与人之间的关系** 

```java
public class World {

    private List<Person> persons;

    private Map<String, String> rations;

    static class Person{

        private String name;
        private int age;
        private boolean sex;

    }

    static class City{
        private String cityName;
        private int area;
        private List<Person> peopleInCity;
    }

    public void peopleRation(){
        rations = new HashMap<>();
        this.persons.forEach(e->{
            this.persons.forEach(o->{
                // 存放两个人的关系
                rations.put(e.name,o.name);
            });
        });
    }
}

```

###  **这个世界的城市应该有很多个** 

```java

public class World {

    private List<Person> persons;

    private Map<String, String> rations;

    private List<City> cities;

    static class Person{

        private String name;
        private int age;
        private boolean sex;

    }

    static class City{
        private String cityName;
        private int area;
        private List<Person> peopleInCity;
    }

    public void peopleRation(){
        rations = new HashMap<>();
        this.persons.forEach(e->{
            this.persons.forEach(o->{
                // 存放两个人的关系
                rations.put(e.name,o.name);
            });
        });
    }
}
```

###  **我们要建设我们的城市，我们要结合生育新生儿** 

```java
public class World {

    private List<Person> persons = new LinkedList<>();

    private Map<String, String> rations;

    private List<City> cities = new LinkedList<>();

    static class Person{
        private String name;
        private int age;
        private boolean sex;
        Person(String name,int age ,boolean sex){
            this.name = name;
            this.age = age;
            this.sex = sex;
        }
    }

    static class City{
        private String cityName;
        private int area;
        private List<Person> peopleInCity;
        City(String cityName,int area){
            this.cityName = cityName;
            this.area = area;
        }
    }

    public void peopleRation(){
        rations = new HashMap<>();
        this.persons.forEach(e->{
            this.persons.forEach(o->{
                // 存放两个人的关系
                rations.put(e.name,o.name);
            });
        });
    }

    public void buildCity(String cityName,int area){
        cities.add(new City(cityName,area));
    }

    public void bearPerson(String name,int age ,boolean sex){
        persons.add(new Person(name, age, sex));
    }
    }
```

**就这样，这个世界不断的被完善. 我们沉浸在自己的世界中建设.** 

**这就是封装. 自成世界，自有生态!**

## 学设计模式的意义

### 为什么要学设计模式？

 对于设计模式学习的必要性：个人的学习体会，**初学编程者，不要学**. **什么样的人适合学习它？ 有实际生产经验的小伙伴.** 



带着实际生产过程中的问题和对代码使用的熟练度来学习设计模式，学得更快、理解得更深、明白的透彻. 否则，可能会越学越糊涂. 



**至于学习它的必要性，强制学.** 这是我们**能够读懂源码****的基础. 是未来天花板有多高的基础. 也是编程路上能够远行的核心之一**. 

### 随心所欲的编程

 **类是一种思想，是一种模型. 现实中所有的事物都能够被它表示，无论真实的还是抽象的.** 并用计算机能够明白的方式，让它呈现. 



OOP，面向对象编程的方式，让类的作用更加伟大. 为什么是伟大？**你见过世界上有什么样的数学模型是能够表达所有事物吗？ ****NO. 但类做到了.** 



 **接口是一种思想，是一种模式. 现实或虚拟中所有的规则都能够被它表示，它的规则依赖类的表达. 是对OOP的延申.**  



**类和接口的关系，就像鱼和水，现实和虚拟，阳和阴. 它们在一起就是完整的.** 它们的结合，让世界上现实的事物和虚拟的规则都得以实现，因此，计算机被它们构建. 能够变成一个真实世界的映射. 这些的实现可以称之为伟大.**掌握了它们表达世界的法则，就掌握了随心所欲编程的奥秘.** 

### 设计模式的核心

如果你去回顾所有的设计模式，就会发现这些法则，因为所有的设计模式，并没有用到多么高级技术. 它们只有一套. 这一套包括以下一些规则：



【继承】：extend，这个规则，让类之间有不用调用就存在的通道，就像亲戚和陌生人之间的关系一样，继承了一个类，就继承了这个类的所有.

【实现】：implements，这个规则，给类的行为一些约束，类的执行看它的约束，就像颁布的法令，需要人去执行一样. 实现只存在于接口和类之间.

【规则】：其他的类似于 类的成员变量、类的构造方法、类的调用和类的生产，都是很基础的知识.



以上，都是很基础的知识. 设计模式就是在这些的基础上，把编码玩出了花. 

但是看完设计模式，你会发现，**所有的模式都用一套方案解决一些共性的问题，比如耦合性，灵活度等**. 

### 关于类的职能

【单一职能】：一个类只解决一个问题

【类有规范】：不管多大的项目，多简单的项目，类都在接口的规范下设计，也就是先有接口，后有类

【自顶向下】：所有的解决方案都是从解决一类问题开始，再通过类的单一功能实现问题的细分和解决.

【模块化的】：类之间的关系通过模块化的方式去设计

【可开放性】：封闭性就是类是否向外开放，一个开放的类具有get方法，不开放的类不给get方法，如果对类的开放程度有要求，可以在get方法里面写一些约束.

【高端调用】：在进行类的使用的时候，如果有接口，就通过接口调用，而不直接让类之间产生耦合

【面向问题】：所有的设计模式都是面向问题的解决方案，如空对象模式解决空对象问题，享元模式解决资源浪费问题，过滤器模式解决约束问题

### 从设计模式看类和接口

#### **1.接口的能力**

------

**接口：我是一个接口，我的诞生是一个跨越式的进步. 因为我有很多能力，完善计算机的漏洞，让编程变得更加高效. 以下是我的能力清单.**

##### 【管理类的能力】

我是如何管理类的呢？**凡是实现了我的类都需要遵循我的规则，重新实现自己的方法. 我能够管理的类，都是有相同特征的类，一个接口只负责一个能力. 被我管理的类就只有这一个能力.**

```java
//我是一个接口，我的能力是计算策略，实现了我的类都具备计算的能力
1public interface Strategy {
   public int doOperation(int num1, int num2);
}
//我是一个类，我实现了上面的接口，我具有加法计算的能力
public class OperationAdd implements Strategy{
   @Override
   public int doOperation(int num1, int num2) {
      return num1 + num2;
   }
}
//我是一个类，我实现了上面的接口，我具有减法计算的能力
public class OperationSubtract implements Strategy{
   @Override
   public int doOperation(int num1, int num2) {
      return num1 - num2;
   }
}
```

##### 【分身术的能力】

什么是我的分身术呢？我是一个接口，我的一天很繁忙. 需要做的事情很多，**因为我是一个接口，我是抽象的虚拟的，只要我不断的分化自己，产生新的不一样的我，让它们替我工作，就有无数个我.** 在需要某个具体的事时，我只要找到那个具体的我就好了. 我的这些分身被称为类.

```java
//我是一个接口，我有很多工作，比如画图形的工作，很多时候我都忙不过来，这时候我就会创造一些分身，让它们去画
public interface Shape {
   void draw();
}
//我是一个画矩形的类，是上面的接口创造的我，我是它的分身之一，我只负责画矩形
public class Rectangle implements Shape {
 
   @Override
   public void draw() {
      System.out.println("Inside Rectangle::draw() method.");
   }
}
//我是一个画正方形的类，是上面的接口创造的我，我是它的分身之一，我只负责画正方形
public class Square implements Shape {
 
   @Override
   public void draw() {
      System.out.println("Inside Square::draw() method.");
   }
}
```

##### 【附身术的能力】

**我是一个接口，我有一个分身术的能力，只要我愿意，我可以是分身中的任何一个.** 因为分身是我自己，我想成为任何一个分身都可以. 

```java
//使用 getShape 方法实现接口的附身术
//Shape：这就是我，不管它们是谁，最终都是我
   public Shape getShape(String shapeType){
      if(shapeType == null){
         return null;
      }
      if(shapeType.equalsIgnoreCase("CIRCLE")){
         return new Circle();
      } else if(shapeType.equalsIgnoreCase("RECTANGLE")){
         return new Rectangle();
      } else if(shapeType.equalsIgnoreCase("SQUARE")){
         return new Square();
      }
      return null;
   }
```

##### 【隐身术的能力】

**我是一个接口，我有一个分身术的能力，只要我愿意，我可以是分身中的任何一个. 我还有附身术的能力，可以随时成为分身中的任意一个. 因为我的这两个能力，没有人知道哪个才是真的我.** 

```java
ShapeFactory shapeFactory = new ShapeFactory();
 
      //获取 Circle 的对象，并调用它的 draw 方法
      Shape shape1 = shapeFactory.getShape("CIRCLE");
 
      //调用 Circle 的 draw 方法
      shape1.draw();
 
      //获取 Rectangle 的对象，并调用它的 draw 方法
      Shape shape2 = shapeFactory.getShape("RECTANGLE");
 
      //调用 Rectangle 的 draw 方法
      shape2.draw();
 
      //获取 Square 的对象，并调用它的 draw 方法
      Shape shape3 = shapeFactory.getShape("SQUARE");
 
      //调用 Square 的 draw 方法
      shape3.draw();
```

#### **2.类的规则**

------

**类：我是一个类，我的诞生是一个里程碑的进步. 因为我的能力，世界万物皆可被建模. 以下是我的能力清单.**

##### 【模仿抽象的能力】

我是一个类，我可以模仿世间万物. 因为我有两个神器：属性和方法. 它们可以用来抽象所有的事物.

```java
//我是一个类，用来抽象一个人
@Data
public class People{
//这些是我的属性，用来描述这个人的特征
private int age;
private string name;
private string sex;
private string shenggao;
......

//这些是我的方法，用来描述这个人的行为特征
public void eat(){

}
.......

}
```

##### 【自我保护的能力】

我是一个类，我可以模仿世间万物. 因为我有两个神器：属性和方法. 它们可以用来抽象所有的事物. 我也可以选择保护自己，让自己不被发现，这取决于我自己的想法.

```java
//我是一个钱的类，我可以选择性的让别人知道我是不是有很多钱
public class money{

private int money;

//我可以知道你的秘密
public void setMoney(int money){
this.money = money;
}

//我可以选择性的让你知道我的秘密
public int getMoney(Object object){
 if(object){
    return something;
    }
 return this.money;
    }
}
```

##### 【生产对象的能力】

我是一个类，我可以模仿世间万物. 因为我有两个神器：属性和方法. 它们可以用来抽象所有的事物. 但是我仅仅是一个模板，如果要得到一个具体的事物，就需要生产，生产的具体事物是对象. new 是我生产对象的神器.

```java
People people = new People();
```

