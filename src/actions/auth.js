
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email,password) => {

    return async (dispatch) =>{
       const respuesta = await fetchSinToken('auth',{email,password},'POST');
       const body = await respuesta.json();

       if (body.ok){
            setToken(body.token);
           dispatch(login({uid:body.id,name:body.name} ));    
       }else{
              Swal.fire('Error',body.msg,'error');
       }
    }
}

export const startRegister = (nombre,email,password) => {
    
    return async (dispatch) =>{
        const respuesta = await fetchSinToken('auth/new',{name:nombre,email,password},'POST');
        const body = await respuesta.json();

        if (body.ok){
            setToken(body.token);
            dispatch(login({uid:body.id,name:body.name} ));    
            Swal.fire('Success',"Registro exitoso",'success');
        }else{
            if(body.msg){
                Swal.fire('Error',body.msg,'error');
            }else{
                console.log(body);
                Swal.fire('Error',"Error inesperado",'success');
            }
        }
    }
}

export const startChecking = ()=>{
    return async (dispatch) =>{
        const respuesta = await fetchConToken('auth/renew','POST');
        const body = await respuesta.json();
 
        if (body.ok){
            const uid =  body.id||body.uid;

             setToken(body.token);
            dispatch(login({uid,name:body.name} ));    
        }else{               
               dispatch(checkingFinished());
               // volver a loguear
        }
    }
}

export const startLogout = ()=>{
    return (dispatch)=>{
        localStorage.clear();
        dispatch(logout());
    }
}

const setToken = (token)=>{
    localStorage.setItem('token',token);
    localStorage.setItem('token-init-date',new Date().getTime());
}

const checkingFinished = ()=>({
    type:types.authCheckingFinished
});

const login = (user)=>({
    type:types.authLogin,
    payload:user
});

const logout = ()=>({
    type:types.authLogout});