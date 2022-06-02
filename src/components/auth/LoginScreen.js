import React from 'react';
import { useForm } from '../../hooks/useForm';
import '../../styles/login.css';

export const LoginScreen = () => {

    const [formLogValues,handleInputChange] = useForm({logemail:'',logpassword:''});
    const [formRegValues,handleInputChangeReg] = useForm({regnombre:'',regemail:'',regpassword:'',regpassword2:''});
    
    const {logemail,logpassword} = formLogValues;
    const {regnombre,regemail,regpassword,regpassword2} = formRegValues;
    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='logemail'
                                value={logemail}
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
                    <form>
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