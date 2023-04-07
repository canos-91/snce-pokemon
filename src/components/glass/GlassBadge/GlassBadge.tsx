import { HTMLAttributes } from 'react'

import styles from './GlassBadge.module.scss'
import PokeBallColorSvg from '@public/assets/svg/pokeball_color.svg'
import BaseBallCapSvg from '@public/assets/svg/baseball-cap.svg'
import classNames from 'classnames'

interface GlassBadgeProps extends HTMLAttributes<HTMLDivElement> {
  attributes: { title: string; subtitle: string }
  clickable?: boolean
  type?: string
  transparent?: boolean
}

export default function GlassBadge({
  attributes,
  type = '',
  transparent = false,
  clickable = true,
  ...attrs
}: GlassBadgeProps) {
  return (
    <div
      className={classNames(styles['glass-badge'], clickable && styles.clickable, type && !transparent && styles[type])}
      {...attrs}
    >
      {type === 'trainer' ? <BaseBallCapSvg className={styles.icon} /> : <PokeBallColorSvg className={styles.icon} />}

      {/* Username */}
      <div className={styles.attributes}>
        <span className={styles.title}>{attributes.title}</span>
        <small className={styles.subtitle}>{attributes.subtitle}</small>
      </div>
    </div>
  )
}
