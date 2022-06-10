import React, { useEffect } from 'react'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startChecking } from '../actions/auth';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

export const AppRouter = () => {
    const dispatch = useDispatch();
    const {checking} = useSelector(state => state.auth);

    useEffect(() => {
      dispatch(startChecking());
    }, [dispatch])
    
    if(checking){
        return <div>Cargando...</div>
    }else{
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={
                        <PublicRoutes>
                            <LoginScreen />
                        </PublicRoutes>} 
                    />

                    <Route path="/" element={
                        <PrivateRoutes>
                            <CalendarScreen/>
                        </PrivateRoutes>}
                    />                  

                </Routes>
            </BrowserRouter>
        )
    }
}
