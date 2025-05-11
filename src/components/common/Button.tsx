import { ReactNode } from 'react';

import Icon from '@/components/common/Icon';
import '@/assets/scss/components/common/button.scss';

interface Props {
    clickHandler?: () => void
    size?: 'sm' | 'md' | 'lg'
    theme?: 'default' | 'primary' | 'outline-primary' | 'secondary' | 'danger' | 'success'
    customClassName?: string
    children?: ReactNode
    hasLoading?: boolean
    isLoading?: boolean
};

function Button({
        size = 'md',
        theme = 'default',
        customClassName,
        clickHandler,
        children,
        hasLoading,
        isLoading,
    }: Props) {

    return(
        <button
            className={`rps-button btn-${size} btn-${theme} ${customClassName || ''} ${hasLoading ? 'loading-btn' : ''}`}
            onClick={clickHandler}
        >
            {children}
            {
                hasLoading && isLoading &&
                <span className="loading-icon">
                    <Icon type="spinner" />
                </span>
            }
        </button>
    )
};

export default Button