import React, { ReactElement } from 'react'
import './App.css';
import { useFetch, IfetchArgs } from "react-custom-hooks"

const App = (): ReactElement => {
  const {state: {
    data,
    loading,
    status
  }, get: getPosts} = useFetch<any>({
    url: "https://jsonplaceholder.typicode.com/posts",
  } as IfetchArgs)

  console.log(data)
  console.log(loading)
  console.log(status)

  return (
    <div>
        <button onClick={ getPosts }>
          Click me to get data
        </button>
    </div>
  )
}

export default App;
