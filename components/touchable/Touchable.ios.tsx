import React from 'react'
import { TouchableOpacity } from 'react-native'

type Iprops = {
    children: React.ReactNode
    style?: {},
    onPress: () => void
}

const Touchable = (props: Iprops) => {
    return (
        <TouchableOpacity {...props}>
            {props.children}
        </TouchableOpacity>
    )
}

export default Touchable
