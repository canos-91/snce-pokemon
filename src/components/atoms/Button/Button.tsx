import { ButtonHTMLAttributes } from 'react'
import style from './Button.module.scss'
import classNames from 'classnames'

type ButtonColor = 'default' | 'accent' | 'error' | 'error-alt' | 'primary' | 'secondary' | 'success' | 'warning'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  action?: string
  color?: ButtonColor
  onClick?: () => void
}

export default function Button({ action = '', color = 'default', disabled, ...attrs }: ButtonProps) {
  return (
    <button className={classNames(style.btn, style[`btn-${color}`], disabled && style.disabled)} {...attrs}>
      <span className="capital">{action}</span>
    </button>
  )
}
