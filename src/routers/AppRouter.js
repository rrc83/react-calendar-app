import React from 'react'
import { LoginScreen } from '../components/auth/LoginScreen'
import { CalendarScreen } from '../components/calendar/CalendarScreen'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route exact path='/login' element={ <LoginScreen /> } />

                <Route path='/' element={ <CalendarScreen /> } />

            </Routes>
        </BrowserRouter>
    )
}
