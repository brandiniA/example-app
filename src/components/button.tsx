import type { ButtonHTMLAttributes, CSSProperties } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    className?: string
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
} 

const defaultStyles: CSSProperties = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
}

export const Button = ({
    children,
    className,
    disabled,
    type,
    ...props
}: ButtonProps) => {
    const styles = {
        ...defaultStyles,
        ...props.style,
    }
    console.log(styles)
    return <button  className={className} disabled={disabled} type={type} {...props} style={styles}>{children}</button>
}
