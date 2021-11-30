import { useEffect } from "react"
import usePdfReader from './hooks/usePdfReader'
import pdfFile from './assets/example.pdf'
import Loading from './components/Loading'
import "./css/app.css"

function App() {

  const [ref, fileInfo, loading, setPdf] = usePdfReader()

  useEffect(() => {

    setPdf(pdfFile)
  }, [setPdf])

  return (
    <div className="App">
      <Loading show={loading} />
      <div ref={ref} />
      <div className="container-num">
        {
          !!fileInfo && (
            Array
              .from(Array(fileInfo?._pdfInfo?.numPages ?? 0).keys())
              .map(iterate => <a href={`#${iterate + 1}`} key={iterate}>{iterate + 1}</a>)
          )
        }
      </div>
    </div>
  )
}

export default App