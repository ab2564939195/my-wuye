let appConfig;

if (process.env.NODE_ENV === 'production') {
    // 生产环境，优先使用window对象下的全局配置
    appConfig = window.APP_CONFIG;
    if (appConfig === undefined) {
        appConfig = require('./appConfig.prod.json');
        console.log('使用编译时配置文件', appConfig);
    } else {
        console.log('使用运行时配置文件', appConfig);
    }
} else {
    // 开发环境，直接使用开发配置文件
    appConfig = require('./appConfig.dev.json');
}

export default appConfig;