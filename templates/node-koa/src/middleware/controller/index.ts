import Koa from 'koa';
import Router from 'koa-router';
import fs from 'fs';
import { resolve, join } from 'path';

export const ASTCache: ASTCacheProp = {
  routes: [],
  whitelist: [],
};

function RegisterASTCacheRoutes(router: Router) {
  ASTCache.routes.forEach((route) => {
    const { handlers, prefix, Instance } = route;
    handlers.forEach((handler) => {
      const { method, url, name } = handler;
      const path = join('/' + prefix, url);
      const isPublic = route.isPublic || route.isPublic;
      if (isPublic) {
        ASTCache.whitelist.push(path);
      }
      // @ts-ignore
      router[method.toLowerCase()](path, (_ctx) => {
        try {
          const instance = new Instance(_ctx);
          instance[name]();
        } catch {
          console.log(path + ':配置错误!');
        }
      });
    });
  });
}
export async function useController(app: Koa, { root, prefix = '' }: InitOpts) {
  const router = new Router({
    prefix,
  });
  const rootDir = resolve(process.cwd(), 'src', root);
  const initAST = async (dir: string) => {
    const list = fs.readdirSync(dir);
    for (const p of list) {
      const url = resolve(dir, p);
      const stat = fs.statSync(url);
      const isDir = stat.isDirectory();
      if (isDir) {
        // 文件架
        await initAST(url);
      } else {
        try {
          const sp = p.split('.');
          const ext = sp[sp.length - 1];
          if (ext === 'ts' || ext === 'js') {
            // ts | js 文件
            await import(url);
          }
        } catch {
          console.warn('解析出现错误!');
        }
      }
    }
  };

  await initAST(rootDir);
  // 注册路由
  RegisterASTCacheRoutes(router);

  app.use(router.routes()).use(router.allowedMethods());
  return Promise.resolve({
    whitelist: ASTCache.whitelist,
  });
}

export * from './meta';
