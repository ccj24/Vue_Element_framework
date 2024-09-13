# vue_Element_framework (vue.js+ElementUI)

> 这一个基于vue.js 框架的管理后台框架，方便后期的项目复用并快速进行业务开发。
> 引进了Element ui组件库和axios库 & iconfont图标等。
> 


## 功能清单
- 1、用户鉴权（根据用户角色生成侧边栏、操作权限）
- 2、国际化
- 3、拖拽排序、选择器排序
- 4、数字滚动
- 5、密码加密
- 6、打开的页面标签


## 进阶
- 回到顶部
- 在table中将选中的导出
- 复制


## 组件清单
- 1、表格（包含分页器）
- 2、表单
- 3、上传文件、图片


## 页面清单
- 1、注册
- 2、登录（多种风格：黑底白字、图片背景、白底卡片、科技炫酷、图片背景+卡片）
- 3、首页（多种风格：用户入口、数据面板）
- 4、后台管理基础：增删改查页（表单+表格+导出表格）、上传文件、图片页
- 5、组件（环形进度条、选择器排序、数字滚动）
- 6、插件（国际化、拖拽排序）
- 7、全局方法（input全局指令、filter）
- 8、复制
- 9、回到顶部
- 10、在table中将选中的导出



## 个性化配置
- 管理系统名称（在src/settings.js中的title）
- 管理系统图标（在public/favicon.png更换图标）
- 开发端口（在vue.config.js修改）
- Element UI颜色主题（在src/styles/element-variables.scss中更换）
- 侧边栏颜色（在src/styles/variables.scss中更换）


## 借鉴项目
- [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin)


## 构建命令行
```bash
# 克隆项目
git clone https://github.com/ccj24/Vue_Element_framework.git

# 进入项目目录
cd Vue_Element_framework

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev

# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```
