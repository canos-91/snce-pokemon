import { useState, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  active?: boolean
}

export default function Input({ disabled, ...rest }: InputProps) {
  const [isFocused, setFocused] = useState<boolean>(false)
  return (
    <div className={classNames(styles.input, isFocused && styles.active, disabled && styles.disabled)}>
      <input
        {...rest}
        autoComplete="do-not-autofill"
        onFocus={() => setFocused(true)}
        onInput={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  )
}
