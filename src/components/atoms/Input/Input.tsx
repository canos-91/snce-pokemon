import { useState, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  active?: boolean
}

const Input = ({ disabled, ...attrs }: InputProps) => {
  const [isFocused, setFocused] = useState<boolean>(false)
  return (
    <div className={classNames('glass-box', styles.input, isFocused && styles.active, disabled && styles.disabled)}>
      <input
        {...attrs}
        autoComplete="do-not-autofill"
        onFocus={() => setFocused(true)}
        onInput={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}

export default Input
