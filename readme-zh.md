当在开发阶段使用Vite构建前端应用时，有时需要与多个后端服务器进行交互。
> 例如：mock环境、测试环境、生产环境

为了简化这一过程，我创建了一个名为"Vite动态反向代理插件"的工具。
这个插件可以根据URL上的参数（?debug=URL）动态设置反向代理，
能够轻松地在不同的开发和测试环境中切换，而无需手动更改代理设置。

### 功能特点

- **动态代理配置**：根据URL上的参数自动配置反向代理，无需手动更改Vite配置文件。
- **简单易用**：只需安装插件并提供所需的参数，即可轻松集成到您的Vite项目中。
- **灵活性**：支持在开发阶段灵活切换代理目标，以适应不同的测试环境。

### 如何使用

1. 安装插件：

   ```shell
   npm install vite-plugin-debug-proxy
   ```

2. 在Vite配置文件中使用插件：

   ```javascript
   // vite.config.js
   import dynamicProxy from 'vite-plugin-debug-proxy';

   export default {
     // ...其他配置

     plugins: [
       // ...
       dynamicProxy({
           path:new RegExp("^/api")//使用正则
         //path:"/api" //使用字符串路径
       }),
     ],
   };
   ```


3. 访问您的应用程序时，可以通过URL参数自动设置代理目标，例如：

   -  ` 例如：http://localhost:3000?debug=https://192.168.1.123:8080/`
   表示将所有http://localhost:3000/api/* 代理到 https://192.168.1.123:8080/*   
