import { useState } from 'react'
import GlobalContext from './contexts/GlobalContext'
import GlobalStateProvider from './components/GlobalStateProvider'
import SearchBar from './components/SearchBar'
import ResultsList from './components/ResultsList'

function App() {
 
  return (
      <GlobalStateProvider>
        <div>
        <h1>BoolFlix</h1>
        <SearchBar />
        <ResultsList />
        </div>
      </GlobalStateProvider>
  )
}

export default App
