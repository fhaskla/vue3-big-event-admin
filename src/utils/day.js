import { dayjs } from 'element-plus'

export function formatDate(date) {
  // 东八区的时间会比 utc 时间多8小时，dayjs(date) 会把东八区的时间减去8小时
  // 但是 format 的时候会按照东八区时间来进行格式化
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
