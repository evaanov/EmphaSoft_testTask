import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { User } from './lib/types';
import Create from './Component/Login';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Edit from './Component/Edit';
import List from './Component/List';

const fetchedData = async () => {
  const login = await axios.post("https://test-assignment.emphasoft.com/api/v1/login/", {
      username: 'test_super',
      password: 'Nf<U4f<rDbtDxAPn'
    }, { 
      headers: { 
        Authorization: 'Nf<U4f<rDbtDxAPn'
      }
    } 
  )

  const t = login.data.token
  const res = await axios.get("https://test-assignment.emphasoft.com/api/v1/users/", { 
    headers: { 
      Authorization: `Token ${t}`
    }
  })
  // console.log(res.data)
  const data = res.data
  return {
    data,
    t
  }
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [params, setParams] = useState({})
  const [token, setToken] = useState<string>('')

  useEffect(() => {
    fetchedData()
      .then(({ data, t }) => { 
        setUsers(data);
        setToken(t)
      })
  }, [])


  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/Creation' element={<Create token={token} />}/>
        <Route path='/Edit' element={<Edit token={token} />}/>
        <Route path='/List' element={<List users={users} />} />
      </Routes>
    </div>
  );
}

export default App;
