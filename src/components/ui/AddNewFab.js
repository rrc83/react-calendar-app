import React from 'react'
import { useDispatch } from 'react-redux'
import { eventClearActiveNote } from '../../actions/events';
import { uiOpenModal } from '../../actions/ui';

export const AddNewFab = () => {
    const dispatch = useDispatch();

    const handleClickButton = ()=>{
        dispatch(eventClearActiveNote());
        dispatch(uiOpenModal());

    }


  return (
    <button onClick={handleClickButton}
            className='btnn btn-primary fab'
    >
        <i className='fas fa-plus'></i>
        
    </button>
  )
}
