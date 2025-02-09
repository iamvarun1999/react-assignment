import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Router } from './Router'
import { Provider } from 'react-redux'
import { store } from './Store/store'

function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
