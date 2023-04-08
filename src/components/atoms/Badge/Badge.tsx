import style from './Badge.module.scss'
import classNames from 'classnames'
import type { TypeName } from '@/types/models'

export type BadgeProps = {
  label: string
  color?: TypeName | 'default'
}

const Badge = ({ label, color = 'default' }: BadgeProps) => {
  return (
    <span className={classNames(style.badge, style[`badge-${color}`])}>
      <small>{label}</small>
    </span>
  )
}
export default Badge
