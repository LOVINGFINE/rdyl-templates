interface DbConfig {
  host: string;
  port: number;
  user?: string;
  password?: string;
  database: string;
}

interface DefConfig {
  prefix?: string;
  port?: number;
  publicDir?: string;
  upload?: {
    maxFileSize?: number;
    rootDir?: string;
  };
  mongod?: Partial<DbConfig>;
  mysql?: Partial<DbConfig>;
}

interface ConfigInfo {
  prefix: string;
  publicDir: string;
  toFilePath(p: string): string;
  port: number;
  ip: string;
  upload: {
    maxFileSize: number;
    rootDir: string;
  };
  mongod: DbConfig;
  mysql: DbConfig;
}
