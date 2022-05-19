# 数据结构分析

## 链表

链表是一种特殊的数据结构，一般，代码中的栈、队列、堆都在该结构体基础上实现。

- 队列：先进先出，可以用首填充节点，尾消费节点的单链表实现
- 栈：先进后出，可以用首填充节点，首消费节点的单链表实现

一般，链表由两部分组成

- 数据域：通常用来描述该节点的信息
- 指针域：指针域指向下一个节点（上一个节点），指针域的方向和数量决定了链表是单向链表还是双向链表
- 如果链表的首尾节点可以互相连接，那这样的链表是循环链表

### C 链表实现

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<windows.h>
#include<conio.h>

int x,y;

// 数据域元素 
typedef struct elemtype{
	int index; 
	char name; 
	int x;
	int y;
}elemtype;

// 链表结点 
typedef struct LinkList{
	// 数据域 
	struct elemtype elem;
	// 指针域
	struct LinkList *next; 
} LinkList;

int initlist(LinkList* first);
int getLength(LinkList *list); 
int addNodeTail(LinkList* list,elemtype *e);
void findelem(LinkList* list,int index,elemtype *e);
int createNode(LinkList* node);

// 链表的尾部新增一个节点
int addNodeTail(LinkList* list,elemtype *e) 
{
	LinkList node;
	if(createNode(&node)<0){
		printf("create node failturn\n");
	}
	node.elem = *e;
	list->next = &node;
}

// 查找链表中的元素,返回链表list中的第index个元素，用e接收 
void findelem(LinkList* list,int index,elemtype *e)
{
	int length = getLength(list);
	if(length<index)
	{
		printf("outof Index exception\n");
		return -1;
	}
	LinkList *mid;
	mid = list;
	for(int i=0;i<index;i++){
		mid = mid->next;
	} 
	e = &(mid.elem);
	return;	
} 

// 创建一个节点
int createNode(LinkList* node)
{
	// 定义链表的首节点
	node = (LinkList*)malloc(sizeof(LinkList));
	// 空间分配失败则 结束当前 
	if(node==NULL)
	{
		printf("init failure\n");
		return -1;
	}
	node->next = NULL;
	return 0;
}

// 初始化一个链表 
int initlist(LinkList* first){
	// 定义链表的首节点
	first = (LinkList*)malloc(sizeof(LinkList));
	// 空间分配失败则 结束当前 
	if(first==NULL)
	{
		printf("init failure\n");
		return -1;
	}
	first->next = NULL;
	return 0;
} 

// 计算当前链表的长度
int getLength(LinkList *list)
{
	// 定义初始长度 
	int length = 0;
	if(list==NULL)
	{
		return 0;
	}
	// 定义中间节点
	LinkList *mid;
	mid = list;
	while (mid)
	{
		length++;
		mid = mid->next;
	}
	return length;
}
```

