import dayjs from 'dayjs';

export class EasyDate {
  static now() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  }
}
