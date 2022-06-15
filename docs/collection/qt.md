# Qt

> [Qt-C++](http://shouce.jb51.net/qt-beginning/49.html)

- 体积小
- 运行时耗用系统资源小
- 上层接口与硬件无关
- 高度可移植

## 什么是Qt事件？

 Qt 事件指的是应用程序和用户之间的交互过程，例如用户按下某个按钮，点击某个输入框等等。 

Qt事件的本质是驱动开发。

### 事件驱动开发-监听器模式

事件驱动的本质实质上是遍历-阻塞-等待，即  for-loop + sleep 模式。

```c
int main()
{
    while (true) {
        Message msg = GetMessage();
        if (msg.isQuitRequest)
            break;
        
        // Process the msg object...
    }

    // Clean up here...
    return 0;
}
```

当有事件发生时，例如按钮点击事件，即按钮被点击时，监控键盘的线程被唤醒，从而调用了特定的程序。

事件驱动的基本模式是监听器模式， [监听器模式 (qq.com)](https://mp.weixin.qq.com/s/Lr0DsRoAbdRWUcWYR7tmbg) ，监听器监听控件，如果对应控件被唤醒，则触发特定的事件。

监听器模式在进行一定程度的发展和筛选后，发展出了两个比较通用的模型，即Reactor模式和Preactor模式。

而Qt中的事件驱动，其传播媒介为信号和槽。。

## 什么是信号和槽？

通过信号的发送和槽，进行两个对象之间的通信。

### 事件

事件是指用户发起点击、下拉、删除等操作的过程。

### 动作

动作是指用户的点击、下拉、删除等具体动作。

### 信号

信号是指用户在发起某个事件时，传递的信号。

 在 Qt 中，用户和控件的每次交互过程称为一个事件，比如“用户点击按钮”是一个事件，“用户关闭窗口”也是一个事件。每个事件都会发出一个信号，例如用户点击按钮会发出“按钮被点击”的信号，用户关闭窗口会发出“窗口被关闭”的信号。 

 Qt 中的所有控件都具有接收信号的能力，一个控件还可以接收多个不同的信号。对于接收到的每个信号，控件都会做出相应的响应动作。 

![1655090817527](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\1655090817527.png)

### connect()函数实现信号和槽

connect() 是 QObject 类中的一个静态成员函数，专门用来关联指定的信号函数和槽函数。

- 信号发送者
- 信号函数
- 信号的接收者
- 接收信号的槽函数

```c++
QObject::connect(const QObject *sender, const char *signal, const QObject *receiver, const char *method, Qt::ConnectionType type = Qt::AutoConnection)
```

各个参数的含义分别是：

- sender：指定信号的发送者；
- signal：指定信号函数，信号函数必须用 SIGNAL() 宏括起来；
- reveiver：指定信号的接收者；
- method：指定接收信号的槽函数，槽函数必须用 SLOT() 宏括起来；
- type 用于指定关联方式，默认的关联方式为 Qt::AutoConnection，通常不需要手动设定。

一个 connect() 函数只能关联一个信号函数和一个槽函数，程序中可以包含多个 connect() 函数，能实现以下几种效果：

- 关联多个信号函数和多个槽函数；
- 一个信号函数可以关联多个槽函数，当信号发出时，与之关联的槽函数会一个接一个地执行，但它们执行的顺序是随机的，无法人为指定哪个先执行、哪个后执行；
- 多个信号函数可以关联同一个槽函数，无论哪个信号发出，槽函数都会执行。

