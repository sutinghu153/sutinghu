# linux 内核架构

## Linux 系统特征

- 开放性
  - 兼容国际标准，多系统互联
  - 可移植性高
- 多用户、多任务环境
- 功能强大且高效
- 丰富的网络功能
- 支持多处理器功能

## Linux 系统的内核结构

1. 硬件，系统的基础
2. OS核心，管理系统资源的核心
3. 用户接口Shell程序等

<img :src="$withBase('/imags/1653383535200.png')" alt="1653383535200">

### 进程控制子系统

进程控制子系统负责对处理机及存储器进行管理。

#### 进程控制

在Linux中，提供了一系列用于对进程进行控制的系统调用。

#### 进程通信

用于实现进程之间通信的消息机制，用于在同一用户的各进程之间通信的“信号”通信工具以及性能优良的信号量机制等

#### 存储器管理

该功能用于为进程分配物理存储空间

- 采用段式存储管理方式，以提高内存利用率且方便用户
- 采用页式存储管理方式，以便于从逻辑上扩充内存

#### 进程调度

采用**动态优先数轮转调度算法**。系统**按优先数最小者优先的策略**，为选中的**某一进程分配一个 CPU 时间片**。当进程运行完一个时间片后，内核**便把它送回就绪队列的末尾**。

### 文件子系统

文件子系统用于有效地管理系统中的所有设备和文件。

#### 文件管理

该功能用于为文件分配存储空间、管理空闲磁盘块、控制对文件的存取
以及为用户检索数据。用户可通过一组系统调用来实现对文件的各种操作。

#### 高速缓冲机制

为使核心与外设之间的数据流在速率上相匹配，设置了多个缓冲区，每个缓冲区的大小与一个盘块的大小相当。这些缓冲区被分别链入各种链表中，如空闲缓冲区链表等。

#### 设备驱动程序

Linux系统把设备分成块设备(如磁盘、磁带等)和字符设备(如打印机)两类。相应地，也把驱动程序分成两类，文件子系统将在缓冲机制的支持下，与块设备的驱动程序之间交互作用。

## Linux如何描述和控制进程

- Linux采用段页式存储管理方式
- 系统中将段称为区region
- 每个进程配置一个进程控制块
- 一个进程 = 若干个区
- 一个区 = 正文程序区 + 数据区 + 栈区 + 共享存储区
- 一个区 = 若干个页

## 进程控制块

- 进程表项，其中包括最常用的核心数据。
  - 进程标识符（PID）
  - 用户标识符（UID）拥有该进程的用户
  - 进程状态，该进程的当前状态
  - 事件描述符
  - 进程和U区在内存或外存的地址 
  - 软中断信息
  - 计时器
  - 进程的大小
  - 偏置值nice 计算优先数时使用
  - P_Link 指针，指向就绪队列中的下一个PCB指针
-  U 区，用于存放用户进程表项的一些扩充数据。
  - 进程表项指针，指向当前(正在执行)进程的进程表项。
  - 真正用户标识符 u-ruid(real user ID)，这是由超级用户分配给用户的标识符，以后，每次用户在登录进入系统时，均须输入此标识符。
  - 有效用户标识符 u-euid(effective user ID)，在一般情况下，它与 ruid 相同，但在其他用户允许的情况下，可用系统调用 setuid 将它改变为其他用户标识符，以获得对该用户的文件进行操作的权力。
  - 用户文件描述符表，其中记录了该进程已打开的所有文件。
  - 当前目录和当前根，用于给出进程的文件系统环境。
    计时器，记录该进程及其后代在用户态和核心态运行的时间。
  - 内部 I/O 参数，给出要传输的数据量、源(或目标)数据的地址、文件的输入/输出偏移量。
  - 限制字段，指对进程的大小及其能“写”的文件大小进行限制。
  - 差错字段，记录系统调用执行期间所发生的错误。
  - 返回值，指出系统调用的执行结果。
  - 信号处理数组，用于指示在接收到每一种信号时的处理方式。
-  系统区表，存放各个区在物理存储器中的地址信息等。
  - 一个进程的虚地址空间划分为若干个连续的区域：正文区、数据区、栈区等。这些区是可被共享和保护的独立实体。
  - 为了对区进行管理，在核心中设置了一个系统区表(简称区表)
  - 区的类型和大小。
  - 区的状态。一个区有这样几种状态: 锁住、在请求中、在装入过程、有效(区已装入内存)。
  - 区在物理存储器中的位置。
  - 引用计数，即共享该区的进程数
  - 指向文件索引结点的指针
-  进程区表，用于存放各区的起始虚地址及指向系统区表中对应区表项的指针。
  - 为了记录进程的每个区在进程中的虚地址，并通过它找到该区在物理存储器中的实地址，系统为每个进程配置了一张进程区表。表中的每一项记录一个区的起始虚地址及指向系统区表中对应的区表项的指针

<img :src="$withBase('/imags/1653447619958.png')" alt="1653447619958">

## 进程的状态

一图看懂Linux中的进程状态

<img :src="$withBase('/imags/1653447684094.png')" alt="1653447684094">
