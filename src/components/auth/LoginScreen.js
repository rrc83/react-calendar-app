import React from 'react';
import { useDispatch } from 'react-redux';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import Swal from 'sweetalert2';
import '../../styles/login.css';


export const LoginScreen = () => {

    const [formLogValues,handleInputChange] = useForm({logemail:'',logpassword:''});
    const [formRegValues,handleInputChangeReg,reset] = useForm({regnombre:'',regemail:'',regpassword:'',regpassword2:''});
    
    const {logemail,logpassword} = formLogValues;
    const {regnombre,regemail,regpassword,regpassword2} = formRegValues;
    const dispatch = useDispatch();

    const handleLogSubmit = (e)=>{
        e.preventDefault();

        if(isValidLogin()){
            dispatch(startLogin(logemail,logpassword));
        }
    }

    const isValidLogin = ()=>{

        if ( !validator.isEmail(logemail.trim())){
            Swal.fire('Error',"El email no es válido",'error');
            return false;
        }else if (validator.isEmpty(logpassword.trim()) ){
            Swal.fire('Error',"La password no puede estar vacia",'error');
            return false;
        }
    
        return true;
    }

    const handleRegSubmit = (e)=>{
        e.preventDefault();
        if(isValidReg()){
            dispatch(startRegister(regnombre,regemail,regpassword));
            reset();
        }

    }

    const isValidReg = ()=>{
        if ( !validator.isEmail(regemail.trim())){
            Swal.fire('Error',"El email no es válido",'error');
            return false;
        }else if (validator.isEmpty(regnombre.trim()) ){
            Swal.fire('Error',"El nombre no puede estar vacio",'error');
            return false;
        }else if (validator.isEmpty(regpassword.trim()) ){
            Swal.fire('Error',"La password no puede estar vacia",'error');
            return false;
        }else if (regpassword.trim() !== regpassword2.trim()){
            Swal.fire('Error',"Las passwords no coinciden",'error');
            return false;
        }

        return true;
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='logemail'
                                value={logemail}
                                autoComplete='on'
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='logpassword'
                                value={logpassword}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='regnombre'
                                onChange={handleInputChangeReg}
                                value={regnombre}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='regemail'
                                onChange={handleInputChangeReg}
                                value={regemail}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='regpassword' 
                                onChange={handleInputChangeReg}
                                value={regpassword}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='regpassword2' 
                                onChange={handleInputChangeReg}
                                value={regpassword2}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}