# 共识算法

>  [blockchainGuide (github.com)](https://github.com/blockchainGuide/) 

区块链系统具有以下几个特点

- 去中心化设计（去中心化）
- 网络节点分散且独立（分布式）
- 节点间需要依赖某种制度实现数据一致性（事务）
- 服务提供确认机制（权限）

可能会遇到某些问题

- 节点之间通讯不可靠的，延迟和阻塞
- 节点的处理可能是错误的，甚至节点自身随时可能宕机
- 节点作恶

以上，该制度的建立需要依赖一套方法和规则，即由谁取得一个区块的记账权，并获取该区块的奖励，并实现区块的同步，这套方法和规则就是共识机制。

共识机制市场有很多，比较常见的有以下几个

- 工作量证明算法（Proof of Work ,PoW）
- 权益证明算法（Proof of Stake,PoS）
- 股份授权证明算法（Delegated Proof of Stake,DPoS）
- 实用拜占庭容错算法（Practical Byzantine Fault Tolerance,PBFT）

## PoW 

