# Linux 系统

## Linux系统中的文件目录及说明

```shell
[root@localhost /]# ls -l
total 64404
lrwxrwxrwx.   1 root root           7 May 14  2020 bin -> usr/bin
dr-xr-xr-x.   5 root root        4096 May 24  2020 boot
drwxr-xr-x.   5 root root          48 Apr 25 11:33 data
drwxr-xr-x.  21 root root        3300 Feb 22 11:34 dev
drwxr-xr-x.   9 es   esgroup      170 Feb 28 15:12 esopt
drwxr-xr-x.  80 root root        8192 Mar 25 14:24 etc
drwxr-xr-x.   2 root root          29 Mar  9 16:22 gateway
drwxr-xr-x.  10 root root          98 Mar 10 10:16 home
drwxr-xr-x.   4 root root          34 Mar 14 15:12 image
drwxr-xr-x.   7 root root         101 Mar  1 09:40 kafka_2.11-2.3.1
-rw-r--r--.   1 root root    64867270 Aug 23  2021 kafka_2.11-2.3.1.tgz
lrwxrwxrwx.   1 root root           7 May 14  2020 lib -> usr/lib
lrwxrwxrwx.   1 root root           9 May 14  2020 lib64 -> usr/lib64
drwxr-xr-x.  17 root root        4096 Mar 31 15:27 logs
drwxr-xr-x.   2 root root           6 Apr 11  2018 media
drwxr-xr-x.   2 root root           6 Apr 11  2018 mnt
drwxr-xr-x.   9 xxzx xxzx         186 Mar  1 09:43 nginx-1.16.1
-rw-r--r--.   1 root root     1032630 Aug 23  2021 nginx-1.16.1.tar.gz
drwxr-xr-x.   6 root root          61 Mar 25 14:24 opt
dr-xr-xr-x. 191 root root           0 Feb 22 11:33 proc
dr-xr-x---.  13 root root        4096 May 14 10:44 root
drwxr-xr-x.  26 root root         880 Mar 28 11:15 run
lrwxrwxrwx.   1 root root           8 May 14  2020 sbin -> usr/sbin
drwxr-xr-x.   4 root root         132 Mar  7 14:39 soft
drwxr-xr-x.   2 root root           6 Apr 11  2018 srv
dr-xr-xr-x.  13 root root           0 Feb 22 11:33 sys
drwxr-xr-x.   2 root root          36 May 14 10:45 test
drwxrwxrwt. 198 root root       16384 May 16 15:55 tmp
drwxrwxrwx.  13 root root         155 May 14  2020 usr
drwxr-xr-x.  19 root root         267 May 14  2020 var
[root@localhost /]# 
```

> **/bin** 存储一些二进制可执行命令文件，**/usr/bin** 也存放了一些基于用户的命令文件。
>
> **/sbin** 存储了很多系统命令，**/usr/sbin** 也存储了许多系统命令。
> **/root** 超级用户 **root** 的根目录文件。
>
> **/home** 普通用户默认目录，在该目录下，每个用户都有一个以本用户名命名的文件夹。
>
> **/boot** 存放 **Ubuntu** 系统内核和系统启动文件。
>
> **/mnt** 通常包括系统引导后被挂载的文件系统的挂载点。
>
> **/dev** 存放设备文件，我们后面学习 Linux 驱动主要是跟这个文件夹打交道的。
>
> **/etc** 保存系统管理所需的配置文件和目录。
>
> **/lib** 保存系统程序运行所需的库文件，**/usr/lib** 下存放了一些用于普通用户的库文件。
>
> **/lost+found** 一般为空，当系统非正常关机以后，此文件夹会保存一些零散文件。
>
> **/var** 存储一些不断变化的文件，比如日志文件
>
> **/usr** 包括与系统用户直接有关的文件和目录，比如应用程序和所需的库文件。
>
> **/media** 存放 **Ubuntu** 系统自动挂载的设备文件。
>
> **/proc** 虚拟目录，不实际存储在磁盘上，通常用来保存系统信息和进程信息。
>
> **/tmp** 存储系统和用户的临时文件，该文件夹对所有的用户都提供读写权限。
>
> **/opt** 可选文件和程序的存放目录。
>
> **/sys** 系统设备和文件层次结构，并向用户程序提供详细的内核数据信息。

## Linux中的文件类型

```shell
[root@localhost /]# ls -l
lrwxrwxrwx.   1 root root           7 May 14  2020 bin -> usr/bin
dr-xr-xr-x.   5 root root        4096 May 24  2020 boot
drwxr-xr-x.   5 root root          48 Apr 25 11:33 data
drwxr-xr-x.  21 root root        3300 Feb 22 11:34 dev
drwxr-xr-x.   9 es   esgroup      170 Feb 28 15:12 esopt
drwxr-xr-x.  80 root root        8192 Mar 25 14:24 etc

```

> **-**普通文件，一些应用程序创建的，比如文档、图片、音乐等等。
>
> **d** 目录文件。
>
> **c** 字符设备文件，Linux 驱动里面的字符设备驱动，比如串口设备，音频设备等。
>
> **b** 块设备文件，存储设备驱动，比如硬盘，U 盘等。
>
> **l** 符号连接文件，相当于 Windwos 下的快捷方式。
>
> **s** 套接字文件。
>
> **p** 管道文件，主要指 FIFO 文件。

## Linux中文件的权限

文件的权限有三种：

**读(r)、写(w)和执行(x)**，除了用 r、w 和 x 表示以外，
我们也可以使用二进制数表示，三种权限就可以使用 3 位二进制数来表示，一种权限对应一个二进制位。a、u、g 和 o 表示文件的归属关系，用=、+和-表示文件权限的变化。

![1652703934575](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\1652703934575.png)

![1652703953464](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\1652703953464.png)

![1652703965345](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\1652703965345.png)

![1652704001360](C:\Users\MSI\AppData\Roaming\Typora\typora-user-images\1652704001360.png)