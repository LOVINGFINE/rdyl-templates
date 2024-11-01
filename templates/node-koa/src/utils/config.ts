import os from 'os';
import path from 'path';

function getIPAdress() {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    const iface = interfaces[key];
    if (iface) {
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.internal
        ) {
          return alias.address;
        }
      }
    }
  }
  return '127.0.0.1';
}

export function defineConfig(p: DefConfig): ConfigInfo {
  const ip = getIPAdress();

  const {
    port = 9999,
    upload = {},
    prefix = '',
    publicDir = '',
    mongod = {},
    mysql = {},
  } = p;
  // 上传文件大小限制 | 5MB
  const { maxFileSize = 5 * 1024 * 1024, rootDir = '' } = upload;
  const {
    port: mongodPort = 27017,
    host: mongodHost = 'localhost',
    user: mongodUser,
    password: mongodPass,
    database: mongodDatabase = 'DATABASE',
  } = mongod;
  const {
    port: mysqlPort = 33016,
    host: mysqlHost = 'localhost',
    user: mysqlUser,
    password: mysqlPass,
    database: mysqlDatabase = 'DATABASE',
  } = mysql;
  return {
    prefix,
    ip,
    port,
    publicDir,
    toFilePath(p: string) {
      const url = path.resolve(prefix, publicDir, p);
      return `${ip}${url}`;
    },
    upload: {
      maxFileSize,
      rootDir,
    },
    mongod: {
      port: mongodPort,
      host: mongodHost,
      password: mongodPass,
      user: mongodUser,
      database: mongodDatabase,
    },
    mysql: {
      port: mysqlPort,
      host: mysqlHost,
      password: mysqlPass,
      user: mysqlUser,
      database: mysqlDatabase,
    },
  };
}
