import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveNote, eventUpdated } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,"hours");
const endX = moment(now.toDate()).add(1,"hours");
const initEvent = {
    title: 'Evento',
    notes: '',
    start:now.toDate(),
    end:endX.toDate()
};

export const CalendarModal = () => {
    const {modalOpen} = useSelector(state=>state.ui);
    const {activeEvent:activeNote} = useSelector(state=>state.calendar);
    const [startDate,setStartDate] = useState(now.toDate());
    const [endDate,setEndtDate] = useState(endX.toDate());
    const [titleValid,setTitleValid] = useState(true);
    const dispatch = useDispatch();

    const [formValues,setFormValues] = useState(initEvent);

    useEffect(() => {
        if (activeNote){
            setFormValues(activeNote);
        }else{
            setFormValues(initEvent);
        }
    }, [activeNote,setFormValues])
    

    const handleInputChange = ({target})=>{
        setFormValues({...formValues,
                   [target.name] : target.value
                 });
    }

    const {notes,title,start,end} = formValues;

    const closeModal = () => {
        dispatch( uiCloseModal() );
        setTimeout(() => {
            dispatch( eventClearActiveNote() );
        }, 200);
        setFormValues( initEvent ); 
    };

    const handleStartDateChange = (e)=>{
        setStartDate(e);
        setFormValues(
            {...formValues,
                start : e
            }
        );
    }

    const handleEndDateChange = (e)=>{
        setEndtDate(e);
        setFormValues(
                {...formValues,
                    end : e
                }
        );
    }

    const handleSubmitForm = (e)=>{
        e.preventDefault();
       
        const mS = moment(start);
        const mE = moment(end);

        if (mS.isSameOrAfter(mE)){
            Swal.fire('Error','La fecha de fin debe ser mayor a la fecha de inicio','error');
            return;
        }

        if (title.trim().length < 2 ){
            return setTitleValid(false);
        }

        setTitleValid(true);
        if(!activeNote){
            dispatch(eventAddNew({
                ...formValues,
                id:new Date().getTime(),
                user:{
                    _id:'1234',
                    name:'Ruben'
                }
            }));
        }else{
            dispatch(eventUpdated(formValues));
        }

        closeModal();
    }

    return (
        <Modal
            isOpen={modalOpen}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            {
                !activeNote?<h1> Nuevo evento </h1>
                           :<h1> Editar evento </h1>
            }
            
            <hr />
            <form className="container"
                  onSubmit={handleSubmitForm}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker onChange={handleStartDateChange}
                                    value={startDate}
                                    className='form-control ' />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker onChange={handleEndDateChange}
                                    value={endDate}                                    
                                    className='form-control ' />
                </div>

                <hr />
                <div className="form-group pb-4">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={(`form-control ${ !titleValid&&'is-invalid' }`)}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group pb-4">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary w-100"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
