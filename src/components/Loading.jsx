import { memo } from 'react'

import withTransition from '../HoC/withTransition'

import '../css/loading.css'

function Loading(props) {
    return (
        <div className="loading-container" { ...props }>
            <div className="loading-circle" />
        </div>
    )
}

export default memo(withTransition(Loading))