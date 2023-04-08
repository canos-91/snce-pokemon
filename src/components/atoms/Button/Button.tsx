import type { ButtonHTMLAttributes } from 'react'
import style from './Button.module.scss'
import classNames from 'classnames'

type ButtonColor = 'default' | 'accent' | 'error' | 'primary' | 'success' | 'warning'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  action: string
  color?: ButtonColor
}

const Button = ({ action, disabled, color = 'default', ...attrs }: ButtonProps) => {
  return (
    <button className={classNames(style.btn, style[`btn-${color}`], disabled && style.disabled)} {...attrs}>
      <span>{action}</span>
    </button>
  )
}

export default Button
