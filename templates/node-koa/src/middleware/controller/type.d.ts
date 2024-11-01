interface InitOpts {
  root: string;
  prefix?: string;
}

interface ASTCacheHandler {
  url: string;
  method: string;
  isPublic: boolean;
  name: string;
}

interface ASTCacheRoute {
  Instance: any;
  isPublic: boolean;
  prefix: string;
  handlers: ASTCacheHandler[];
}

interface ASTCacheProp {
  routes: ASTCacheRoute[];
  whitelist: string[];
}
