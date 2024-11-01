import Koa from 'koa';
import koaBody from 'koa-body';
import koaJwt from 'koa-jwt';
import staticFiles from 'koa-static';
import chalk from 'chalk';
import { join } from 'path';
import AppConfig from '@/App.config';
import { useController } from './middleware/controller';
import { connect as mongoConnect } from './helpers/mongo';

const App = new Koa();

App.use(staticFiles(AppConfig.upload.rootDir));

// 使用中间件处理 post 传参 和上传图片
App.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: AppConfig.upload.maxFileSize,
    },
  })
);

useController(App, {
  root: 'controllers',
  prefix: AppConfig.prefix,
}).then(({ whitelist }) => {
  App.use(
    koaJwt({ secret: 'shared-secret' }).unless({
      path: [/^\/public/, ...whitelist],
    })
  );
  App.listen(AppConfig.port, async () => {
    const { port, prefix, ip } = AppConfig;
    const suffix = join(port.toString(), prefix);
    console.clear();
    console.log('✨ server running\n');
    console.log(`- Local:  ${chalk.green(`http://localhost:${suffix}`)}`);
    console.log(`- Network:  ${chalk.green(`http://${ip}:${suffix}`)}\n`);
    await mongoConnect();
    console.log(`📦  ${chalk.blue(`Mongodb is connected`)} 📦`);
  });
});
