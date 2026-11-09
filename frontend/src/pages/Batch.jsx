import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Icons
import { Upload, FileText, CircleCheck, CircleAlert, BrainCog, Check, Clock, Server } from 'lucide-react'

// APIs
import { batchPredict } from '../api/batchReview'

const Batch = () => {

  // States
  const [file, setFile] = useState(false);
  const [loader, setLoader] = useState(false);
  const [dragIsActive, setDragIsActive] = useState(false);

  const [analyzeLoader, setAnalyzeLoader] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [filePredictions, setFilePredictions] = useState(
    () => JSON.parse(localStorage.getItem("BatchPrediction") || "[]")
  );

  const [server, setServer] = useState(false)

  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!analyzeLoader) {
      setSeconds(0)
      return
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [analyzeLoader])


  // Batch predict api

  const predictFile = async () => {
    setError("")
    setAnalyzeLoader(true)
    const timer = setTimeout(() => {
      setServer(true)
    }, 12000)

    const result = await batchPredict(file)

    if (!result.success) {
      setError(result.message)
      setAnalyzeLoader(false)
      clearTimeout(timer)
      setServer(false)
      return;
    }

    setSuccess("File analyzed successfully.")
    localStorage.removeItem("QuickPrediction")
    localStorage.removeItem("BatchPrediction")
    setFilePredictions(result.message)
    setAnalyzeLoader(false)

    clearTimeout(timer)
    setServer(false)

  }

  // Local storage
  useEffect(() => {
    localStorage.setItem("BatchPrediction", JSON.stringify(filePredictions))
  }, [filePredictions])

  console.log(filePredictions);


  //
  useEffect(() => {
    const stop = (e) => e.preventDefault()
    window.addEventListener('dragover', stop)
    window.addEventListener('drop', stop)
    return () => {
      window.removeEventListener('dragover', stop)
      window.removeEventListener('drop', stop)
    }
  }, [])

  return (

    <div className='relative flex flex-col w-full min-w-0 min-h-screen bg-[#f3f5f9]'>
      {/* Header */}
      <header className='sticky top-0 z-10 flex items-center justify-between h-15 px-4 md:px-8 bg-white border-b border-[#e4e8ef]'>
        <h1 className='font-bold text-lg text-[#0f1a2e]'>Batch Upload</h1>
        <span className='text-[13px] text-[#6b778c]'>Workspace / Batch Upload</span>
      </header>

      {/* Main */}
      <main className='flex-col gap-12 px-4 md:px-8 pt-7 pb-12'>
        {/* Upload section */}
        <section className='flex flex-col gap-4.5'>
          <div className='bg-white border border-[#e4e8ef] rounded-xl shadow-sm px-6 py-5.5'>
            {/* Drop zone */}
            {!file && (
              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setDragIsActive(true)
                }}
                onDrop={(e) => {
                  e.preventDefault()
                  setFile(e.dataTransfer.files[0])
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  setDragIsActive(false)
                }}
                tabIndex={0}
                role='button'
                className={`flex flex-col items-center gap-2.5 px-5 py-11.5 text-center rounded-xl border-[1.5px] border-dashed  ${dragIsActive ? "border-[#2f6fb0] bg-[#f1f6fc]" : "border-[#c5cedc] bg-[#fafbfd]"}`}>
                <Upload size={38} strokeWidth={1.4} className='text-[#8a97ab]' />
                <p className='font-semibold text-[#0f1a2e]'>Drag and drop a CSV file here</p>
                <p className='text-[13px] text-[#6b778c]'>or</p>

                <label
                  htmlFor='csvFile'
                  type='button'
                  className='flex items-center justify-center h-10 px-4.5 rounded-lg bg-white border border-[#e4e8ef] text-sm font-semibold text-[#0f1a2e] hover:bg-[#f3f5f9] cursor-pointer'>
                  {!loader ?
                    "Browse" :
                    <div className='flex items-center justify-center gap-2'>
                      <span className='block h-5 w-5 rounded-full bg-transparent border-2 border-[#222] border-t-transparent animate-spin'></span>
                      <b>Uploading</b>
                    </div>
                  }
                </label>
                <input
                  onChange={(e) => {
                    setLoader(true)
                    setFile(e.target.files[0])
                    setLoader(false)
                  }}
                  id='csvFile' type="file" accept='.csv' className='hidden' />
                <p className='text-[13px] text-[#6b778c]'>CSV with a single column named Review.</p>
              </div>
            )}


            {/* Selected file (use when a file is picked) */}
            {file && (
              <div className='flex items-center gap-3 mt-4 px-3.5 py-3 border border-[#e4e8ef] rounded-lg'>
                <FileText size={22} className='text-[#6b778c] shrink-0' />
                <div>
                  <span className='block font-semibold text-[#0f1a2e] break-all'>{file.name}</span>
                  <small className='block text-[12.5px] text-[#6b778c]'>{(file.size / 1024).toFixed(1)} KB</small>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className='flex items-center justify-between mt-4.5'>
              <small className='text-gray-400'>Analyzing a new file replaces your previous batch results.</small>
              <span className='flex-1'></span>
              <button
                onClick={predictFile}
                type='button'
                disabled={!file || analyzeLoader}
                className='flex items-center justify-center gap-2 h-10 px-4.5 rounded-lg bg-[#2f6fb0] text-sm font-semibold text-white hover:bg-[#285f99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
                Analyze
              </button>
            </div>
          </div>
        </section>

        {/* Success result section */}
        {success && (
          <section className='flex items-center flex-wrap gap-4 bg-white border border-[#e4e8ef] rounded-xl shadow-sm px-6 py-5.5'>
            <span className='flex items-center justify-center shrink-0 h-11.5 w-11.5 rounded-[10px] bg-[#e5f4ea] text-[#15803d]'>
              <CircleCheck size={22} />
            </span>
            <div className='flex-1 min-w-0'>
              <h2 className='font-semibold text-[15px] text-[#0f1a2e]'>Analysis complete</h2>
              <small className='block text-[12.5px] text-[#6b778c]'>{filePredictions.length}reviews analyzed</small>
            </div>
            <Link
              to='/predictions'
              className='flex items-center justify-center h-10 px-4.5 rounded-lg bg-[#2f6fb0] text-sm font-semibold text-white hover:bg-[#285f99] cursor-pointer'>
              View results
            </Link>
          </section>
        )}

        {/* Error (show when validation or the API fails) */}
        {error && (
          <section role='alert' className='mt-4 flex items-center flex-wrap gap-4 bg-white border border-[#f5d0d0] rounded-xl shadow-sm px-6 py-5.5'>
            <span className='flex items-center justify-center shrink-0 h-11.5 w-11.5 rounded-[10px] bg-[#fbe8e8] text-[#b91c1c]'>
              <CircleAlert size={22} />
            </span>
            <div className='flex-1 min-w-0'>
              <h2 className='font-semibold text-[15px] text-[#0f1a2e]'>Analysis failed</h2>
              <small className='block text-[12.5px] text-[#b91c1c]'>{error}</small>
            </div>
          </section>
        )}
      </main>
      {/* Loading state */}
      {analyzeLoader && (
        <>
          {/* Loader overlay (show while loader is true) */}
          <div className='absolute inset-0 z-20 flex items-center justify-center px-4 bg-[#0f1a2e]/30 backdrop-blur-sm'>
            <div className='w-full max-w-md bg-white border border-[#e4e8ef] rounded-2xl shadow-xl px-7 py-8 flex flex-col items-center gap-5'>
              {/* AI core */}
              <div className='relative flex items-center justify-center h-24 w-24'>
                <span className='absolute inset-0 rounded-full bg-[#2f6fb0]/20 animate-ping'></span>
                <span className='absolute inset-2 rounded-full bg-[#2f6fb0]/20 animate-ping [animation-delay:400ms]'></span>
                <span className='absolute inset-0 rounded-full border-2 border-dashed border-[#2f6fb0]/50 animate-spin [animation-duration:4s]'></span>
                <span className='relative flex items-center justify-center h-16 w-16 rounded-full bg-[#2f6fb0] text-white'>
                  <BrainCog size={32} className='animate-pulse' />
                </span>
              </div>

              {/* Title */}
              <div className='text-center'>
                <h2 className='flex items-center justify-center gap-2 font-semibold text-lg text-[#0f1a2e]'>
                  AI is analyzing
                  <span className='flex items-end gap-1 pb-1'>
                    <span className='h-1.5 w-1.5 rounded-full bg-[#2f6fb0] animate-bounce'></span>
                    <span className='h-1.5 w-1.5 rounded-full bg-[#2f6fb0] animate-bounce [animation-delay:150ms]'></span>
                    <span className='h-1.5 w-1.5 rounded-full bg-[#2f6fb0] animate-bounce [animation-delay:300ms]'></span>
                  </span>
                </h2>
                <small className='block mt-1 text-[12.5px] text-[#6b778c]'>The model is scoring every review in your file.</small>
              </div>

              {/* Real info */}
              <div className='w-full flex items-center justify-between gap-3 rounded-lg border border-[#e4e8ef] bg-[#fafbfd] px-4 py-3'>
                <div className='flex items-center gap-2 min-w-0'>
                  <FileText size={18} className='shrink-0 text-[#6b778c]' />
                  <div className='min-w-0'>
                    <span className='block text-sm font-semibold text-[#0f1a2e] truncate'>reviews.csv</span>
                    <small className='block text-[12px] text-[#6b778c]'>24.5 KB</small>
                  </div>
                </div>
                <div className='flex items-center gap-1.5 shrink-0 text-[#6b778c]'>
                  <Clock size={16} />
                  <span className='font-mono text-sm text-[#0f1a2e]'>{seconds}s</span>
                </div>
              </div>

              {/* Slow server message */}
              {server && (
                <div className='w-full flex items-start gap-3 rounded-lg border border-[#f3dfb8] bg-[#fdf0db] px-4 py-3'>
                  <Server size={18} className='shrink-0 mt-0.5 text-[#b45309]' />
                  <div>
                    <b className='block text-sm font-semibold text-[#b45309]'>Taking longer than usual</b>
                    <small className='block mt-0.5 text-[12.5px] leading-relaxed text-[#8a5a14]'>The server may be waking up, which can take up to a minute. Please keep this page open.</small>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Batch