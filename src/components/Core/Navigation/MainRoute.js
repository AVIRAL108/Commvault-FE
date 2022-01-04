import React from 'react'
import { Route } from 'react-router-dom'

export const MainRoute = ({data}) => {
    return (
        <Route path={`/${data.name}`} component={() => <data.comp
            {...data}
        />} />
    )
}
