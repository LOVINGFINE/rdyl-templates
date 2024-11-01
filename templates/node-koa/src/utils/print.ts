import dayjs from 'dayjs';
import ora from 'ora';

async function onProcessTimer(fn: Function, name: string, group: string) {
  const spin = ora(name).start();
  const start = dayjs().unix();
  try {
    await fn();
    const m = start - dayjs().unix();
    spin.succeed(`[${group}]: ${name}完成✅ 耗时${m}ms`);
  } catch (e) {
    const m = start - dayjs().unix();
    spin.fail(`[${group}]: ${name}失败❌ 耗时${m}ms`);
  }
}

export function PrintGroup(group: string) {
  return {
    onProcessTimer(fn: Function, name: string) {
      return onProcessTimer(fn, name, group);
    },
  };
}
