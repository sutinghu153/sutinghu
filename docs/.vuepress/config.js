module.exports = {
	
	// base:"/sutinghu/",
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
                collapsable: true,
                children: [
                    {
                        //title: 'collection',
                        collapsable: true,
                        children: [
                            ['/collection/xm.md', '项目介绍']
                        ]
                    }
                ]
             },{
                title:'Linux应用开发',
                collapsable: true,
                children: [
                    {
                        // title: 'collection',
                        collapsable: true,
                        children:[ 
                            ['/collection/xtkf.md', 'IO-系统开发']
                        ]
                    }
                ]
             },{
                title:'数据库',
                collapsable: true,
                children: [
                    {
                        // title: 'collection',
                        collapsable: true,
                        children:[ 
                            ['/collection/sql.md', '数据库常字']
                        ]
                    }
                ]
             },{
                title:'常用命令',
                collapsable: true,
                children: [
                    {
                        // title: 'collection',
                        collapsable: false,
                        children: [
                            ['/collection/gitml.md', '常用命令'],
							['/collection/gitml.md', '命令解析']
                        ]	
                    }
                ]
             },{
                title:'系统部署',
                collapsable: true,
                children: [
                    {
                        // title: 'collection',
                        collapsable: false,
                        children: [
							['/collection/xtbs.md', 'Linux系统一站式部署']
                        ]	
                    }
                ]
             },{
                title:'中间件',
                collapsable: true,
                children: [
                    {
                        // title: 'collection',
                        collapsable: false,
                        children: [
                            ['/collection/mvn.md', 'Maven'],
							['/collection/kafka.md', 'Kafka'],
							['/collection/ElasticSearch.md', 'ElasticSearch']
                        ]	
                    }
                ]
             }
		]
	}
}