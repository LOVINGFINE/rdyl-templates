const { resolve } = require('path');
const fs = require('fs');

const enableKeys = [
  'public',
  'noUser',
  'noHeader',
  'auth',
  'name',
  'title',
  'icon',
  'tab',
  'route',
];
const AstMeta = {
  values(res) {
    const maps = {
      public: (v) => v !== undefined && v !== null,
      noUser: (v) => v !== undefined && v !== null,
      tab: (v) => {
        if (v !== undefined && v !== null) {
          return isNaN(Number(v)) ? 0 : Number(v);
        }
      },
      noHeader: (v) => v !== undefined && v !== null,
      route: (v) => v !== undefined && v !== null,
      auth: (v) => {
        if (v) {
          const list = v.split('|');
          if (list.length > 0) {
            return list;
          }
          return v;
        }
      },
    };
    return Object.fromEntries(
      Object.keys(res)
        .filter((k) => enableKeys.includes(k))
        .map((k) => {
          if (maps[k]) {
            return [k, maps[k](res[k])];
          } else {
            return [k, res[k]];
          }
        })
    );
  },
  comment(url) {
    try {
      // 读取文件内容
      const content = fs.readFileSync(url, 'utf-8');
      // 正则表达式匹配注释内容
      const regex = /\/\*\*(.*?)\*\//s;
      const match = content.match(regex);
      if (match) {
        const target = match[1].trim(); // 去除首尾空格
        if (target.indexOf('@route') > -1) {
          return target;
        }
        return target;
      }
      return '';
    } catch (error) {
      return '';
    }
  },
  meta(str = '') {
    const comment = str.replace(/\n/g, ' ');
    const regex = /@(\w+)\s*([^*]*)/g;
    let match;
    const result = {};
    while ((match = regex.exec(comment)) !== null) {
      const n = match[1];
      const v = match[2].trim();
      result[n] = v;
    }
    return AstMeta.values(result);
  },
  parse(dir, n) {
    const path = `${dir}/${n}`;
    const children = AstMeta.getCtx(path);
    let t = '';
    if (path.lastIndexOf('.tsx') > -1) {
      t = this.comment(path);
    }
    return {
      name: n.replace('.tsx', ''),
      path: path.replace('./src/pages', ''),
      comment:
        t.indexOf('@route') > -1 || t.indexOf('@tab') > -1 ? t : undefined,
      children,
    };
  },
  getCtx(dir) {
    const stat = fs.statSync(dir);
    if (stat.isDirectory()) {
      return fs
        .readdirSync(dir)
        .map((n) => this.parse(dir, n))
        .filter((ele) => {
          if (Array.isArray(ele.children)) {
            const has = ele.children.filter((e) => !!e.comment);
            return has.length > 0;
          }
          return !!ele.comment;
        });
    }
  },
  importUrls(list) {
    return (
      list
        .map((ele) => {
          return `import ${ele.name} from '@/pages${ele.pathname}';\n`;
        })
        .join('') + '\n'
    );
  },
  exportRoutes(list) {
    const items = list
      .map((ele) => {
        const str = Object.keys(ele)
          .map((k) => {
            if (typeof ele[k] === 'string' && k !== 'component') {
              return `\n    ${k}: '${ele[k]}',`;
            }
            return `\n    ${k}: ${ele[k]},`;
          })
          .join('');
        return `  {${str}\n  },`;
      })
      .join('\n');
    return `export const RoutesMeta = [\n${items}\n];\n`;
  },
  exportTabs(list) {
    const items = list
      .map((ele) => {
        const str = Object.keys(ele)
          .map((k) => {
            if (typeof ele[k] === 'string' && k !== 'component') {
              return `\n    ${k}: '${ele[k]}',`;
            }
            return `\n    ${k}: ${ele[k]},`;
          })
          .join('');
        return `  {${str}\n  },`;
      })
      .join('\n');
    return `export const TabsMeta = [\n${items}\n];\n`;
  },
  routes(list = []) {
    const target = [];
    if (list.length > 0) {
      list.forEach((ele) => {
        const meta = this.meta(ele.comment);
        if (meta) {
          const p = ele.path.replace('/index.tsx', '').replace('.tsx', '');
          const name = p
            .split('/')
            .filter(Boolean)
            .join('.')
            .replace(/(?:^|[\.-])\w/g, (match) => match.toUpperCase())
            .replace(/[\.-]/g, '');

          const item = {
            ...meta,
            pathname: p,
            name,
            component: name,
          };
          if (ele.children) {
            target.push(...AstMeta.routes(ele.children));
          } else {
            target.push(item);
          }
        }
      });
    }
    return target;
  },
};

function main() {
  const items = AstMeta.routes(AstMeta.getCtx('./src/pages'));
  const RoutesMeta = items.filter((ele) => !ele.tab);
  const TabsMeta = items.filter((ele) => ele.tab);
  const importUrls = AstMeta.importUrls(items);
  const exportRoutes = AstMeta.exportRoutes(RoutesMeta);
  const exportTabs = AstMeta.exportTabs(TabsMeta.sort((a, b) => a.tab - b.tab));

  const content = importUrls + exportRoutes + '\n' + exportTabs;
  fs.writeFileSync(resolve(__dirname, '../src/__routes__.ts'), content);
}

module.exports = main;
