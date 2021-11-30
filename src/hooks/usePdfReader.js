import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf'
import * as pdfWorkerEntry from 'pdfjs-dist/build/pdf.worker.entry'

function usePdfReader() {
    const containerRef = useRef()
    const [pdf, setPdf] = useState()
    const [fileInfo, setFileInfo] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const renderCanvas = (page) => {
            const scale = window.innerWidth > 600 ? 1.5 : 0.5
            const viewport = page.getViewport({ scale })
            const outputScale = window.devicePixelRatio || 1
    
            const canvas = document.createElement("canvas")
            const context = canvas.getContext("2d")
    
            canvas.width = Math.floor(viewport.width * outputScale);
            canvas.height = Math.floor(viewport.height * outputScale);
            canvas.style.width = Math.floor(viewport.width) + "px";
            canvas.style.height = Math.floor(viewport.height) + "px";
            canvas.style.margin = "auto";
            canvas.style.display = "block";
            canvas.id = page._pageIndex + 1
    
            const transform = outputScale !== 1  ? [outputScale, 0, 0, outputScale, 0, 0] : null;
    
            const renderContext = {
                canvasContext: context,
                transform,
                viewport
            };
    
            page.render(renderContext);
    
            containerRef.current?.appendChild(canvas)
        }

        if(!!pdf && !!containerRef.current) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerEntry
            const loadingTask = pdfjsLib.getDocument(pdf)
            setLoading(true)

            loadingTask
                .promise
                .then(async pdf => {
                    setFileInfo(pdf)
                    for (let i = 1; i <= pdf._pdfInfo.numPages; i++) {
                        const page = await pdf.getPage(i)
                        renderCanvas(page)
                        console.log(i)
                    }
                })
                .finally(() => setLoading(false))
        }

    }, [pdf, containerRef, setFileInfo, setLoading])

    return [containerRef, fileInfo, loading, setPdf]
}

export default usePdfReader