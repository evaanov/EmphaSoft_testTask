import { FC, useEffect, useState } from "react";
import { User } from "../lib/types";

import './List.css';

interface listProp { 
    users: User[]
}

const List: FC<listProp> = ({ users }) => {
    const [params, setParams] = useState<string>('');
    const [check, setCheck] = useState<boolean>(false)

    useEffect(() => { 
    }, [params, users, check])

    const newUsers = users.sort(() => Math.random() - 0.5)
    console.log(users)


    return (
        <div className="listContainer">
            <div className="listInputs">
                <input type="text" onChange={(e) => setParams(e.target.value)} placeholder="Enter username"/>
                <div className="checkbox">
                    <input type="checkbox" onClick={(e) => setCheck(!check)} checked={check}/>
                    <label>Sort by ID</label>
                </div>
            </div>
            {
            (check ? newUsers.sort((a, b) => a.id > b.id ? 1 : -1) : newUsers)
            .map((u) => {
                    if (u.username.includes(params)) { 
                        return (
                            <div className="userBox">
                                <h3>{u.first_name}, {u.last_name}</h3>
                                <h3>@{u.username}</h3>
                            </div>
                        )
                    }   
            })}
        </div>
    )
}


export default List;
