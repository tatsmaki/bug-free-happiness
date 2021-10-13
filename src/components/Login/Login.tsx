export const Login = () => {
  const handleLogin = (event: any) => {
    event.preventDefault()

    const user = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    fetch('http://localhost:4000/auth/signup', {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(user),
    })
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((e) => console.log(e))
  }

  const handleGetAllUsers = () => {
    fetch('http://localhost:4000/users/all', {
      mode: 'cors',
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      method: 'GET',
    })
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch((e) => console.log(e))
  }

  return (
    <div className="App">
      <form onSubmit={handleLogin}>
        <input name="username" />
        <input name="password" />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGetAllUsers}>get all users</button>
    </div>
  )
}
