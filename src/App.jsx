import { useState } from 'react'

function App(props) {
  const { state, dispatch } = props;
  return (
    <div>
      <h1>SPOTIFY API</h1>
      <p>{state.toString()}</p>
    </div>
  )
}

export default App
