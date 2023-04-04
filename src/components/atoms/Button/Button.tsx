import style from './Button.module.scss'
import classNames from 'classnames'

type ButtonColor = 'default' | 'accent' | 'error' | 'error-alt' | 'primary' | 'secondary' | 'success' | 'warning'

export type ButtonProps = {
  action?: string
  color?: ButtonColor
  disabled?: boolean
  onClick: () => void
}

export default function Button({ action = '', color = 'default', disabled = false, onClick }: ButtonProps) {
  return (
    <>
      <button className={classNames(style.btn, style[`btn-${color}`], disabled && style.disabled)} onClick={onClick}>
        <span className="capital">{action}</span>
      </button>
    </>
  )
}
