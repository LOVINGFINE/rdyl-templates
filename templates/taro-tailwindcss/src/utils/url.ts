export class URLSearchParams {
  constructor(str: string) {
    const q = str.split("?")[1];
    if (q) {
      const keys = q.split("&");
      this.values = Object.fromEntries(
        keys.map((s) => {
          const arr = s.split("=");
          return [arr[0], arr[1]];
        })
      );
    }
  }

  private values: Record<string, string | string[]> = {};

  get keys() {
    return Object.keys(this.values);
  }

  get size() {
    return this.keys.length;
  }

  append(k: string, n: string | number) {
    if (this.values[k]) {
      if (Array.isArray(this.values[k])) {
        this.values[k] = [...this.values[k], `${n}`];
      } else {
        this.values[k] = [this.values[k] as string, `${n}`];
      }
    } else {
      this.values[k] = `${n}`;
    }
  }

  assign(pay: Record<string, unknown>) {
    Object.keys(pay).forEach((k) => {
      if (Array.isArray(pay[k])) {
        (pay[k] as string[]).forEach((v) => {
          this.append(k, v);
        });
      } else {
        this.append(k, pay[k] as string);
      }
    });
  }

  get(k: string) {
    return this.values[k];
  }

  delete(...arr: string[]) {
    this.values = Object.fromEntries(
      Object.keys(this.values)
        .filter((e) => !arr.includes(e))
        .map((k) => [k, this.values[k]])
    );
  }

  forEach(fn: (k: string, v: string | string[]) => unknown) {
    const { values, keys } = this;
    keys.forEach((k) => {
      fn(k, values[k]);
    });
  }

  toString() {
    if (this.size) {
      const uList: string[] = [];
      const { values, keys } = this;
      keys.forEach((k) => {
        if (Array.isArray(values[k])) {
          (values[k] as string[]).forEach((v) => {
            uList.push(`${k}=${v}`);
          });
        } else {
          uList.push(`${k}=${values[k]}`);
        }
      });
      return `?${uList.join("&")}`;
    }
    return "";
  }
}

export  class URL {
  static pattern =
    /(https?):\/\/(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+|localhost):(\d+)?/g;

  searchParams = new URLSearchParams("");
  host = "";
  port: string | number = ""; //端口;
  protocol = ""; // 协议
  pathname = ""; // 地址
  hash = ""; //hash
  constructor(public href: string) {
    const match = URL.pattern.exec(href);
    if (match) {
      this.protocol = match[1];
      this.host = match[2];
      this.port = match[3] ? Number(match[3]) : "";
    }
    const sq = href.replace(URL.pattern, "");
    const p = sq.split("?")[0] || "";
    this.pathname = p.split("/#/")[0] || "";
    this.hash = p.replace(this.pathname, "");
    this.searchParams = new URLSearchParams(sq.replace(p, ""));
  }

  get origin() {
    const { protocol, host, port } = this;
    let o = protocol;
    if (host) {
      o += `://${host}`;
    }
    if (port) {
      o += `:${port}`;
    }
    return o;
  }

  toString() {
    const { origin, pathname, hash, searchParams } = this;
    return `${origin}${pathname}${hash}${searchParams.toString()}`;
  }
}
