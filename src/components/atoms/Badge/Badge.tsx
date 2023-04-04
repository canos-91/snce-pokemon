import style from './Badge.module.scss'
import classNames from 'classnames'
import type { PokemonType } from '@/types/models/Type'

export type BadgeProps = {
  label: string
  color?: PokemonType | 'default'
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
