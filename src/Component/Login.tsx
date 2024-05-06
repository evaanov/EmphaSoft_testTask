import React, { FC, useState } from "react";
import './Login.css'
import { User } from "../lib/types";
import axios from "axios";

export interface PageProps { 
    token: string
}

export interface Validation { 
    username: boolean,
    password: boolean,
}

const Create: FC<PageProps> = ({ token }) => {
    const [creation, setCreation] = useState<User | {}>({
        id: null,
        username: '',
        first_name: '',
        last_name: '',
        is_active: true,
        last_login: null,
        is_superuser: false,
        password: '',
    })
    const [err, setErr] = useState<string>('')
    const [val, setVal] = useState<Validation>({
        username: false,
        password: false
    })




    return (
        <div className="container">
            <div className="header">
                <div className="text">Создание пользователя</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" onChange={(e) => {
                        let input = e.target.value;
                        setCreation({...creation, first_name: input})
                    }} placeholder="Имя"></input>
                </div>
                <div className="input">
                    <input type="text" onChange={(e) => {
                        let input = e.target.value;
                        setCreation({...creation, last_name: input})
                    }} placeholder="Фамилия"></input>
                </div>
                <div className="input">
                    <input type="text" onChange={(e) => {
                        let input = e.target.value;
                        input.replace(/^[\w.@+-]+$/g, '')
                        setVal({...val, username: /^[\w.@+-]+$/g.test(input)})
                        setCreation({...creation, username: input})
                    }} placeholder="Имя пользователя"></input>
                </div>
                <div className="input">
                    <input type="text" minLength={8} onChange={(e) => {
                        let input = e.target.value;
                        input.replace(/^(?=.*[A-Z])(?=.*\d).{8,}$/, '')
                        setVal({...val, password: /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(input)})
                        setCreation({...creation, password: input})
                    }} placeholder="Пароль"></input>
                </div>
            </div>
            <div className="submit-container">
                    <button className="submit" disabled={!(val.username && val.password)} onClick={async (e) => { 
                        setCreation({...creation, last_login: new Date().toDateString()}) //сори тут не тот формат :D
                        try {
                            const userObj = {...creation};
                            const {id, username, password, first_name, last_name, last_login, is_active, is_superuser} = userObj
                            const res = await axios.post('https://test-assignment.emphasoft.com/api/v1/users/', {
                                username: username,
                                first_name: first_name,
                                last_name: last_name,
                                password: password,
                                is_active: is_active
                            }, {
                                headers: { 
                                    Authorization: `Token ${token}`
                                }
                            })
                        } catch (e: any) { 
                            setErr(e)
                        }
                    }}>Создать</button>
            </div>
            <div className="err">
                {err === '' ? '' : 'Че то ты неправильно заполнил'}
            </div>
        </div>
    )
}


export default Create