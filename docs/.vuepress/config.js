module.exports = {
	// base:"/sutinghu/",
	logo: './imags/tou.png',
	title:'suting-Blogs',
	description:'最便携技术文档',
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
                title:'常用命令',
                collapsable: true,
                children: [
                    {
                        //title: 'collection',
                        collapsable: false,
                        children: [
                            ['/collection/gitml.md', 'git命令']
                        ]
                    }
                ]
             }
		]
	}
}