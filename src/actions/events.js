import { types } from "../types/types"

export const eventAddNew = (event)=>{
    return (
        {
            type:types.eventAddNew,
            payload: event
        }
    )
}
export const eventSetActive = (event)=>{
    return (
        {
            type:types.eventSetActive,
            payload: event
        }
    )
}    
export const eventClearActiveNote = ()=>{
    return (
        {
           type:types.eventClearActiveEvent
        }
    )
}

export const eventUpdated = (e)=>{
    return ({
        type:types.eventUpdate,
        payload:e
    })
}

export const eventDeleted = ()=>{
    return ({
        type:types.eventDeleted
    })
}
