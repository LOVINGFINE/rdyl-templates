import { ParameterizedContext } from 'koa';
import { ASTCache } from './index';
import { IRouterParamContext } from 'koa-router';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export class BaseController {
  constructor(
    public _ctx: ParameterizedContext<any, IRouterParamContext<any, {}>, any>
  ) {}

  get pathname() {
    return this._ctx.request.path;
  }

  get query() {
    return this._ctx.query;
  }

  get params() {
    return this._ctx.params || {};
  }

  get body() {
    return this._ctx.request.body;
  }

  async files() {
    return this._ctx.request.files;
  }

  get status() {
    const { _ctx } = this;
    const sendJson = (body: Partial<ResData<unknown>>) => {
      _ctx.response.set('Content-Type', 'application/json;charset=utf-8');
      _ctx.body = body;
    };
    return {
      ok(data?: unknown) {
        sendJson({ data });
      },
      okCreated(data: unknown, msg?: string) {
        sendJson({ code: 201, data, msg });
      },
      okAccept(data: unknown, msg?: string) {
        sendJson({ code: 203, data, msg });
      },
      parameterError(msg: string = 'Parameter Error') {
        sendJson({ msg, code: 400 });
      },
      unauthorized(msg: string = 'User Unauthorized') {
        sendJson({ msg, code: 401 });
      },
      inaccessible(msg: string = 'User Inaccessible') {
        sendJson({ msg, code: 403 });
      },
      exception(msg: string = 'Service Exception') {
        sendJson({ msg, code: 500 });
      },
    };
  }
}

function MethodFactory(method: HttpMethod) {
  return function (url: string, isPublic: boolean = false) {
    return function (target: any, name: string) {
      const item = {
        url,
        method,
        name,
        isPublic,
      };
      if (target.routes) {
        target.routes.push(item);
      } else {
        target.routes = [item];
      }
    };
  };
}

export function Controller(prefix: string, isPublic: boolean = false) {
  return function (target: any) {
    const route = {
      Instance: target,
      prefix,
      handlers: target.prototype?.routes || [],
      isPublic,
    };
    ASTCache.routes.push(route);
  };
}

export const Get = MethodFactory(HttpMethod.GET);
export const Post = MethodFactory(HttpMethod.POST);
export const Delete = MethodFactory(HttpMethod.DELETE);
export const Put = MethodFactory(HttpMethod.PUT);
export const Patch = MethodFactory(HttpMethod.PATCH);
