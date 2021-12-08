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
			{text:'github',link:'https://github.com/sutinghu153'},
			{text:'WK听潮',link:'https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzA5ODI3NTI1OA==&scene=124#wechat_redirect'}
		],
		sidebar: [
			{
                title:'命令',
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
                title:'项目',
                collapsable: true,
                children: [
                    {
                        //title: 'collection',
                        collapsable: false,
                        children: [
                            ['/collection/xm.md', '项目介绍']
                        ]
                    }
                ]
             }
		]
	}
}