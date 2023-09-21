When developing frontend applications with Vite, there is often a need to interact with multiple backend servers, such as mock environments, testing environments, and production environments. To simplify this process, I have created a tool called the "Vite Dynamic Reverse Proxy Plugin." This plugin can dynamically set reverse proxies based on URL parameters (`?debug=URL`), allowing you to easily switch between different development and testing environments without manual proxy configuration.
[中文文档](https://github.com/zjpzjp/vite-plugin-debug-proxy/blob/master/readme-zh.md)

### Key Features

- **Dynamic Proxy Configuration**: Automatically configure reverse proxies based on URL parameters, eliminating the need to manually modify the Vite configuration file.
- **Simple and Easy to Use**: Install the plugin and provide the required parameters to seamlessly integrate it into your Vite project.
- **Flexibility**: Supports flexible switching of proxy targets during development to adapt to different testing environments.

### How to Use

1. Install the plugin:

   ```shell
   npm install vite-plugin-dynamic-proxy
   ```

2. Use the plugin in your Vite configuration file:

   ```javascript
   // vite.config.js
   import dynamicProxy from 'vite-plugin-dynamic-proxy';

   export default {
     // ...other configuration

     plugins: [
       // ...
       dynamicProxy(),
     ],
   };
   ```

3. When accessing your application, you can automatically set the proxy target using URL parameters. For example:

   - Accessing `http://localhost:3000?debug=https://192.168.1.123:8080/` will proxy all requests from `http://localhost:3000/api/*` to `https://192.168.1.123:8080/*`.

This "Vite Dynamic Reverse Proxy Plugin" will greatly simplify the configuration of backend interactions during development, allowing you to switch between different environments effortlessly. No manual proxy settings are required. If you have any questions or suggestions, please feel free to reach out.