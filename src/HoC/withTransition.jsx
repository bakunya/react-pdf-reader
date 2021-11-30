import { useEffect, useState } from 'react'

const withTransition = Component => ({ show }) => {
    const [mount, setMount] = useState(show)
    const [opacity, setOpacity] = useState(show ? 1 : 0)

    const style = {
        transition: 'all 700ms',
        opacity: opacity
    }

    useEffect(() => {
        let timeout

        if(show) {
            setMount(true)
            timeout = setTimeout(() => {
                setOpacity(1)
            }, 10)
        } else {
            setOpacity(0)
            timeout = setTimeout(() => {
                setMount(false)
            }, 700);
        }

        return () => {
            if(!!timeout) {
                clearTimeout(timeout)
            }
        }
    }, [setMount, setOpacity, show])

    return (
        <>
            {
                mount && <Component style={style} />
            }
        </>
    )
}

export default withTransition