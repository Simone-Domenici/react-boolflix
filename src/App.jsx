import { useState } from 'react'
import GlobalContext from './contexts/GlobalContext'
import GlobalStateProvider from './components/GlobalStateProvider'
import ResultsList from './components/ResultsList'
import Header from './components/Header'

function App() {

  return (
    <GlobalStateProvider>
      <div>
        <Header />
        <ResultsList />
      </div>
    </GlobalStateProvider>
  )
}

export default App
