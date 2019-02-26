# 准备工作
npm install

npm run build

# 使用
dist 文件夹中 pre-dem-web-xx.js 文件引入到 HTML 页面中

- 引入 js 文件
```
 <script type="text/javascript"
         src="./../dist/pre-dem-web-v1.0.16.js"
         data-app-key="${AppKey}"
         data-domain="${Domain}"></script>   
```     
- 参数说明
| 参数 | 类型 | 说明 |
| - | - |
| src | string | sdk 路径 |
| data-app-key | string | AppKey |
| data-domain | string | Domain |
        
# 注意
不兼容 jquery 1.6 以下的版本

