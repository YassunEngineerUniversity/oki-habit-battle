const HomePage = async () => {
  console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
  
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const users = await data.json()
  console.log(users)
 


  return (
    <div>
      <h1>Home Page</h1>
    </div>

  )
}

export default HomePage;