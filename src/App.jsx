import { HomePage, ComicPage } from "./pages"
import GlobalStyle from './theme/globalStyle'
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <div className="App">
      <>

        <GlobalStyle />
        <Routes basename="/brisa-marvel">
          <Route path="/brisa-marvel" element={<HomePage /> }>
            <Route path="comic/:id" element={<ComicPage />} />
          </Route>
        </Routes>

      </>
    </div>
  )
}

export default App
