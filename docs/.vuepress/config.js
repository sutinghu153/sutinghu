module.exports = {
	

	logo: './imags/tou.png',
	title:'suting-Blogs',
	description:'分布式博客云笔记',
	themeConfig : {
		backToTop: true,
		head: [
			["link", { rel: "icon", href: "/imags/tou.png" }],
		],
		nav : [
			{text:'home',link:'/'},
			{text:'JavaGuide',link:'https://javaguide.cn/'},
			{text:'code-nav',link:'https://home.code-nav.cn/'},
			{text:'github',link:'https://github.com/sutinghu153'},
			{text:'WK听潮',link:'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA5ODI3NTI1OA==&scene=124#wechat_redirect'},
			{text:'book',link:'https://github.com/itdevbooks/'}
		],
		sidebar: [
			{
                title:'个人项目',
                //collapsable: true,
                children: [
                    ['/collection/xm.md', '项目介绍']
                ]
             },{
                title:'Linux系统开发',
                //collapsable: true,
                children: [
                    ['/collection/xtkf.md', 'IO-系统开发'],
					['/collection/jcjtx.md', '进程间通信'],
					['/collection/dxctx.md', 'Linux多线程']
                ]
             },{
                title:'设计模式',
                //collapsable: true,
                children: [
                    ['/collection/designcode.md', '设计模式-编码'],
					['/collection/designfx.md', '设计模式-分析']
                ]
             },{
                title:'数据结构',
                //collapsable: true,
                children: [
                    ['/collection/dscode.md', '仿JKD实现数据结构'],
					['/collection/dsanalys.md', '数据结构分析']
                ]
             },{
                title:'常用命令',
                //collapsable: true,
                children: [
                    ['/collection/gitml.md', '常用命令']
                ]
             },{
                title:'数据库',
                //collapsable: true,
                children: [
					['/collection/db_sql_base.md', '数据库基础'],
                    ['/collection/sql.md', '数据库常用总结']
                ]
             },{
                title:'系统部署',
                //collapsable: true,
                children: [
                    ['/collection/xtbs.md', 'Linux系统一站式部署']
                ]
             },{
                title:'中间件',
                //collapsable: true,
                children: [
                    ['/collection/mvn.md', 'Maven'],
					['/collection/kafka.md', 'Kafka'],
					['/collection/ElasticSearch.md', 'ElasticSearch']
                ]
             }
		]
	}
}