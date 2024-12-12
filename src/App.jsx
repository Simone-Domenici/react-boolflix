import { useState } from 'react'
import GlobalContext from './contexts/GlobalContext'
import GlobalStateProvider from './components/GlobalStateProvider'
import SearchBar from './components/SearchBar'

function App() {
 
  return (
      <GlobalStateProvider>
        <SearchBar></SearchBar>
      </GlobalStateProvider>
  )
}

export default App
