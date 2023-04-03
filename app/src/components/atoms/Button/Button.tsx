import Image from 'next/image'
import { useEffect, useState } from 'react'
import style from './Button.module.scss'
import classNames from 'classnames'
type ButtonColor =
  | 'default'
  | 'accent'
  | 'error'
  | 'error-alt'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'

export type ButtonProps = {
  action?: string
  color?: ButtonColor
  disabled?: boolean
  onClick: () => void
}

export default function PokemonCard({
  action = '',
  color = 'default',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <>
      <button
        className={classNames(style.btn, style[`btn-${color}`], {
          disabled: disabled,
        })}
        onClick={onClick}
      >
        {/* <VIconSvg v-if="icon" :icon="icon" :width="iconSize" :height="iconSize" /> */}
        <span className="capital">{action}</span>
      </button>
    </>
  )
}
