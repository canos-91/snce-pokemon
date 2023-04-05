import style from './Badge.module.scss'
import classNames from 'classnames'

export type BadgeProps = {
  label: string
  color?: string
}

export default function Badge({ label, color = 'default' }: BadgeProps) {
  return (
    <>
      <span className={classNames(style.badge, style[`badge-${color}`])}>
        <small className="capital">{label}</small>
      </span>
    </>
  )
}
