# 算法分析

## 双指针

### 定义

双指针是指用两个**不同速度**或**不同方向**的指针对数组或对象进行访问，通过**两个不同的指针的碰撞**从而达到**特定的目的**。

### 问题

在时间或空间条件有限的情况下使用单向遍历，需要消耗大量的时间。

- 循环问题
- 闭环问题
- 查找问题

### 分类

- 左右指针
  - 在数组有序的情况下，从最小和最大端对数组进行处理，直到碰撞
- 快慢指针
  - 通过两个指针移动速度的不同，抽象为指针追赶问题，指针碰撞后处理问题
- 双指针
  - 通过两个指针的配合，可以对数据进行处理
- 滑块
  - 通过指针对滑块的处理 完成不同的数据分析

### 快慢指针详解

##### 快慢指针算法思想

1. 定义快慢指针fast和slow，起始均位于链表头部。规定fast每次后移2步，slow后移1步；
2. 若fast遇到null节点，则表示链表无环，结束；
3. 若链中有环，fast和slow一定会再次相遇；
4. 当fast和slow相遇时，额外创建指针ptr，并指向链表头部，且每次后移1步，最终slow和ptr会在入环点相遇。

##### 问题

- 为什么fast和slow一定会相遇？

  >  slow刚进入环的时候，轮到fast行动。如果开始两个距离为n,fast追一次距离为n-2，slow逃一次,距离为n-1。这样始终每次距离在1步1步接近(n-1-1-1...)。（fast在环入口负1的位置就先错过一次，然后直接slow就追上fast了） 

- fast和slow相遇时，slow指针是否绕环超过一圈？

  > 环长为N，还是slow进环的时候，相距为n。那么一定n<N。根据第一题可知，slow每次行动完后距离n-1，当距离为0的时候也就是n-1*n。slow就走了n。因为n<N，所以一定不超过1圈。

-  为什么fast指针每次移动2步，能不能移动3、4、5...步？ 

  > 设环外长度为w，环长度为s。取一特殊值j，保证j>w且是s整数倍的最小值。将slow走了j步后的位置记为X(j)，则fast走了kj步，记为X(kj)，其中k为fast与slow的速度比值。

  > 因为j>w，所以slow和fast都在环内，而且X(kj)可以看做从X(j)出发，走了(k-1)*j步，因为j是环长的整数倍，所以又回到了X(j)，两者相遇。

  > 从上面的分析可知，无论fast取任何值，两者都会相遇。即使比值K是小数2.3（如slow=10，fast=23），也只需要j乘以10，就证明了这个问题。

  > 我们之所以取fast=2，是因为快指针的时间复杂度为O(n*fast)，可以保证算法效率最高。

##### 复杂度分析

- 时间复杂度：O(N)，N为链表节点数量，通过问题2、问题3的解答，slow与fast相遇时，slow不会绕环超过一周；寻找入环点时，也只走了环外距离a。因此，总的执行时间为：O(N)

- 空间复杂度：O(1)。因为只使用了slow、fast、ptr三个指针。

##### leetcode

 [141. 环形链表 - 力扣（LeetCode）](https://leetcode.cn/problems/linked-list-cycle/) 

```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }
        ListNode slow = head;
        ListNode fast = head.next;
        while (slow != fast) {
            if (fast == null || fast.next == null) {
                return false;
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        return true;
    }
}
```

 [142. 环形链表 II - 力扣（LeetCode）](https://leetcode.cn/problems/linked-list-cycle-ii/) 

```java
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode detectCycle(ListNode head) {
        ListNode fast = head, slow = head;
        while (true) {
            if (fast == null || fast.next == null) return null;
            fast = fast.next.next;
            slow = slow.next;
            if (fast == slow) break;
        }
        fast = head;
        while (slow != fast) {
            slow = slow.next;
            fast = fast.next;
        }
        return fast;
    }
}
```

 [202. 快乐数 - 力扣（LeetCode）](https://leetcode.cn/problems/happy-number/) 

```java
class Solution {

      public int getNext(int n) {
        int totalSum = 0;
        while (n > 0) {
            int d = n % 10;
            n = n / 10;
            totalSum += d * d;
        }
        return totalSum;
    }

    public boolean isHappy(int n) {
        int slowRunner = n;
        int fastRunner = getNext(n);
        while (slowRunner != fastRunner) {
            slowRunner = getNext(slowRunner);
            fastRunner = getNext(getNext(fastRunner));
        }
        return fastRunner == 1;
    }
}
```

 [287. 寻找重复数 - 力扣（LeetCode）](https://leetcode.cn/problems/find-the-duplicate-number/) 

```java
class Solution {
    public int findDuplicate(int[] nums) {
        /**
        快慢指针思想, fast 和 slow 是指针, nums[slow] 表示取指针对应的元素
        注意 nums 数组中的数字都是在 1 到 n 之间的(在数组中进行游走不会越界),
        因为有重复数字的出现, 所以这个游走必然是成环的, 环的入口就是重复的元素, 
        即按照寻找链表环入口的思路来做
        **/
        int fast = 0, slow = 0;
        while(true) {
            fast = nums[nums[fast]];
            slow = nums[slow];
            if(slow == fast) {
                fast = 0;
                while(nums[slow] != nums[fast]) {
                    fast = nums[fast];
                    slow = nums[slow];
                }
                return nums[slow];
            }
        }
    }
}
```

 [876. 链表的中间结点 - 力扣（LeetCode）](https://leetcode.cn/problems/middle-of-the-linked-list/) 

我们可以继续优化方法二，用两个指针 slow 与 fast 一起遍历链表。slow 一次走一步，fast 一次走两步。那么当 fast 到达链表的末尾时，slow 必然位于中间。

```java
class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}
```

 链表的缺点在于不能通过下标访问对应的元素。因此我们可以考虑对链表进行遍历，同时将遍历到的元素依次放入数组 A 中。如果我们遍历到了 N 个元素，那么链表以及数组的长度也为 N，对应的中间节点即为 A[N/2]。

```java
class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode[] A = new ListNode[100];
        int t = 0;
        while (head != null) {
            A[t++] = head;
            head = head.next;
        }
        return A[t / 2];
    }
}
```

[19. 删除链表的倒数第 N 个结点 - 力扣（LeetCode）](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/) 

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {    
        ListNode pre = new ListNode(0);
        pre.next = head;
        ListNode start = pre, end = pre;
        while(n != 0) {
            start = start.next;
            n--;
        }
        while(start.next != null) {
            start = start.next;
            end = end.next;
        }
        end.next = end.next.next;
        return pre.next;
    }
}
```

 [160. 相交链表 - 力扣（LeetCode）](https://leetcode.cn/problems/intersection-of-two-linked-lists/) 

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
   public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
    if (headA == null || headB == null) return null;
    ListNode pA = headA, pB = headB;
    while (pA != pB) {
        pA = pA == null ? headB : pA.next;
        pB = pB == null ? headA : pB.next;
    }
    return pA;
}
}
```

## 递归

递归是函数直接或间接调用自身的算法，递归算法的本质是树不断查找最小树，即将原问题不断分解为规模更小的子问题。

### 核心注意点

- 明确递归的终止条件
- 提取重复的逻辑，缩小问题的规模不断递去
- 给出递归终止时的处理办法

### leetcode

 [70. 爬楼梯 - 力扣（LeetCode）](https://leetcode.cn/problems/climbing-stairs/) 

##### 经典递归

```java
public class ClimbingStairs {
    public static int climbStairsWithRecursion(int n) {
        if (n == 1) {
            return 1;
        } else if (n == 2) {
            return 2;
        } else {
            return climbStairsWithRecursion(n - 1) + climbStairsWithRecursion(n - 2);
        }
    }
}
```

##### 缓存递归

```java
public class ClimbingStairs {

    public static int climbStairsWithRecursionMemory(int n) {
        int[] memoryArray = new int[n + 1];
        return subClimbStairsWithRecursionMemory(n - 1, memoryArray) + subClimbStairsWithRecursionMemory(n - 2, memoryArray);

    }

    public static int subClimbStairsWithRecursionMemory(int n, int[] memoryArray) {
        if (n == 1) {
            return 1;
        } else if (n == 2) {
            return 2;
        } else {
            if (memoryArray[n] > 0) {
                return memoryArray[n];
            }
            memoryArray[n] = subClimbStairsWithRecursionMemory(n - 1, memoryArray) + subClimbStairsWithRecursionMemory(n - 2, memoryArray);
            return memoryArray[n];
        }
    }
}
```

 [112. 路径总和 - 力扣（LeetCode）](https://leetcode.cn/problems/path-sum/) 

```java
 public boolean hasPathSum(TreeNode root, int sum) {
        if(root==null)
            return false;
        if(root.left==null&&root.right==null)
        {
            return sum-root.val==0;
        } 
        return hasPathSum(root.left,sum-root.val)||hasPathSum(root.right,sum-root.val);
    }
```

 [509. 斐波那契数 - 力扣（LeetCode）](https://leetcode.cn/problems/fibonacci-number/) 

```java
public class ClimbingStairs {
    public static int climbStairsWithRecursion(int n) {
        if (n == 1) {
            return 1;
        } else if (n == 2) {
            return 2;
        } else {
            return climbStairsWithRecursion(n - 1) + climbStairsWithRecursion(n - 2);
        }
    }
}
```

## 二分查找

二分查找又称折半查找，优点是比较次数少，查找速度快，平均性能好；其缺点是要求待查表为有序表，且插入删除困难。 
此方法适用于不经常变动而查找频繁的有序列表。

### 基本要义

- 如果目标值等于中间元素，则找到目标值。
- 如果目标值小于中间元素，则在中间元素左侧搜索。
- 如果目标值大于中间元素，则在中间元素右侧搜索。

### 算法分类

1. 精确二分查找，如果找不到返回error
2. 进行精确查找，如果找不到则返回第一个小于该数值的元素的位置
3. 进行精确查找，如果找不到则返回第一个大于该数值的元素的位置

### 算法分析

相较于线性查找需要遍历整个数组，时间复杂度为O(n)，二分查找总能在一次比较后抛弃掉查找区间内一半的数组，所以

- 时间复杂度：O(logn)，是因为当数据越大，一次二分后抛弃掉的数组就会越多。
- 空间复杂度：O(1)，无论数组多长，都只会开辟额外的指针空间。

#### leetcode

LeetCode33、34