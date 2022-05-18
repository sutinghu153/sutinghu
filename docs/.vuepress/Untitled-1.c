#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <string.h>
#include <malloc.h>

struct NodeList
{
	int name;
	int age;
	struct NodeList *next;
};

int main()
{
	
	struct NodeList node1 ;
	struct NodeList node2 ;
	
//	struct NodeList node1 = malloc(sizeof(*NodeList));
//	struct NodeList node2 = malloc(sizeof(*NodeList));
	
	node1.age = 1;
	node1.name= "first";
	node1.next = &node2;
	
	node2.age = 2;
	node2.name= "second";
	node2.next = NULL;
	struct NodeList node = node1;
	while(1)
	{
		
		printf("node value age is %d,name is %s\n",node.age,node.name);
		if(node.next==NULL)
		{
			break;
		}else
		{
			struct NodeList node = *node.next;
		}
	}
	
	
	return -1;
}