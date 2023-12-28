import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])


  const handleAddUser = event => {
    // handle refresh website
    event.preventDefault()
    // get data from input field 
    const from = event.target;
    const name = from.name.value;
    const email = from.email.value;
    console.log(name, email);
    // convert name and email in a object format
    const user = { name, email }
    console.log(user)
    // hitting the server site
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      console.log('inside post response:', data)
      const newUser = [...users, data]
      setUsers(newUser)
      from.reset();
    })

  }


  return (
    <>
      <h1>User Management System</h1>
      <p><small>Total Users Count: {users.length} </small></p>

      <form onSubmit={handleAddUser}>
        <input type="name" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="add user" />
      </form>


      {/* use data form server */}
      <div>
        {
          users.map(user => <p
            key={user.id}
          >
            {user.id} : {user.name} : {user.age}  {user.email}

          </p>)
        }
      </div>
    </>
  )
}

export default App
