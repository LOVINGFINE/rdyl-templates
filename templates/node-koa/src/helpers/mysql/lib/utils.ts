export class MysqlParser {
  static valueTypeOf(v: unknown): string {
    if (typeof v === 'string') return `'${v}'`;
    return `${v}`;
  }

  static toValuesOf(values: unknown[]) {
    const items: unknown[] = [];
    for (var v in values) {
      items.push(MysqlParser.valueTypeOf(v));
    }
    return `(${items.join(', ')})`;
  }
}
