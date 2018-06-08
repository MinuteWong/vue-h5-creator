import { md5 } from 'vux'
export function create_id() {
  const date = new Date()
  return `wrapper-${md5(date.getTime())}`
}
