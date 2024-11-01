import d from 'dayjs';
import isYesterday from 'dayjs/plugin/isYesterday';
import isToday from 'dayjs/plugin/isToday';
import isTomorrow from 'dayjs/plugin/isTomorrow';

d.extend(isToday);
d.extend(isYesterday);
d.extend(isTomorrow);

export const dayjs = d;
