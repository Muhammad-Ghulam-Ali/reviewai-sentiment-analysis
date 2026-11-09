import React, { useEffect, useState } from 'react'
import Papa from 'papaparse'

// Icons
import { Search, Download, List, Trash2 } from 'lucide-react'

const Predictions = () => {

  const [quickPredictions, setQuickPredictions] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("QuickPrediction") || "[]")
    return Array.isArray(saved) ? saved : []
  })
  const [batch, setBatch] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("BatchPrediction") || "[]")
    return Array.isArray(saved) ? saved : []
  })

  const allPredictionsHistory = [...quickPredictions, ...batch]

  useEffect(() => {
    try {
      localStorage.setItem("allPredictionsHistory", JSON.stringify(allPredictionsHistory))
    } catch (e) {
      console.log("Too large to save")
    }
  }, [quickPredictions, batch])

  // Download CSV
  const downloadCSV = () => {
    const csv = Papa.unparse(allPredictionsHistory)
    const blob = new Blob([csv], {type: ['text/csv']})
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "result.csv"
    link.click()

    URL.revokeObjectURL(url)
  }

  // Delete history
  const deleteHistory = () => {
    localStorage.removeItem("QuickPrediction")
    localStorage.removeItem("BatchPrediction")
    localStorage.removeItem("allPredictionsHistory")
    setQuickPredictions([])
    setBatch([])

  }



  return (

    <div className='flex flex-col w-full min-w-0 min-h-screen bg-[#f3f5f9]'>
      {/* Header */}
      <header className='sticky top-0 z-10 flex items-center justify-between h-15 px-4 md:px-8 bg-white border-b border-[#e4e8ef]'>
        <h1 className='font-bold text-lg text-[#0f1a2e]'>Predictions</h1>
        <span className='text-[13px] text-[#6b778c]'>Workspace / Predictions</span>
      </header>

      {/* Main */}
      <main className='flex-1 px-4 md:px-8 pt-7 pb-12  flex flex-col gap-4.5'>

        {/* Empty state (use when there are no results at all) */}
        {allPredictionsHistory.length < 1 && (
          <div className='bg-white border border-[#e4e8ef] rounded-xl shadow-sm px-6 py-5.5'>
            <div className='flex items-center gap-2.5 mb-4.5 font-semibold text-[15px] text-[#0f1a2e]'>
              <List size={18} className='text-[#6b778c]' />
              <h2>Predictions</h2>
            </div>
            <div className='h-30 flex items-center justify-center text-[#a3adbd] text-sm'>
              <span>No results yet. Upload a file first.</span>
            </div>
          </div>
        )}

        {/* Table */}
        {allPredictionsHistory.length > 0 && (
          <div className='bg-white border border-[#e4e8ef] rounded-xl shadow-sm max-h-170 overflow-auto'>
            {/* Toolbar */}
            <div className='sticky top-0 bg-[#fafbfd] flex items-center justify-between px-5 py-4 border-b border-[#e4e8ef]'>
              <b>All Predictions</b>

              <div className="buttons flex items-center justify-center gap-2">

                <button
                onClick={downloadCSV}
                  type='button'
                  className='flex items-center justify-center gap-2 h-9.5 px-4 rounded-lg bg-white border border-[#e4e8ef] text-sm font-semibold text-[#0f1a2e] hover:bg-[#f3f5f9] cursor-pointer'>
                  <Download size={16} />
                  Download CSV
                </button>

                <button
                  onClick={deleteHistory}
                  type='button'
                  className='flex items-center justify-center gap-2 h-9.5 px-4 rounded-lg bg-white border border-[#e4e8ef] text-sm font-semibold text-[#b91c1c] hover:bg-[#fdf0f0] hover:border-[#f5d0d0] cursor-pointer'>
                  <Trash2 size={16} />
                  Clear
                </button>

              </div>
            </div>

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='w-full min-w-160 text-sm text-left'>
                <thead>
                  <tr className='bg-[#fafbfd] border-b border-[#e4e8ef] text-[12px] font-semibold text-[#6b778c]'>
                    <th className='w-16 px-5 py-3'>#</th>
                    <th className='px-5 py-3'>Review</th>
                    <th className='w-32 px-5 py-3'>Sentiment</th>
                    <th className='w-56 px-5 py-3'>Probability</th>
                  </tr>
                </thead>
                <tbody>
                  {allPredictionsHistory.map(function (elem, index) {
                    return (
                      <tr key={index} className='border-b border-[#eef1f6] hover:bg-[#fafbfd]'>
                        <td className='px-5 py-3.5 align-top text-[#6b778c]'>{index + 1}</td>
                        <td className='px-5 py-3.5 align-top text-[#0f1a2e]'>
                          <p className='line-clamp-2'>{elem.Review}</p>
                        </td>
                        <td className='px-5 py-3.5 align-top'>
                          <span className={`inline-block rounded-md px-2.5 py-0.5 text-[12.5px] font-semibold ${elem.Sentiment === "Uncertain" ? "bg-[#fef3c7] text-[#a16207]" : elem.Sentiment === "Positive" ? "bg-[#e5f4ea] text-[#15803d]" : "bg-[#fbe8e8] text-[#b91c1c]"}`}>{elem.Sentiment}</span>
                        </td>
                        <td className='px-5 py-3.5 align-top'>
                          <div className='flex items-center gap-3'>
                            <span className='w-12 font-mono text-[13px] text-[#0f1a2e]'>{(elem.Probability * 100).toFixed(2)}%</span>
                            <div className='flex-1 h-1.5 rounded-full bg-[#eceff5] overflow-hidden'>
                              <span style={{ width: `${(elem.Probability * 100).toFixed(2)}%` }} className={`block h-full rounded-full ${elem.Sentiment === "Uncertain" ? "bg-[#f8cd0b]" : elem.Sentiment === "Positive" ? "bg-[#15803d]" : "bg-[#b91c1c]"}`}></span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  })}

                </tbody>
              </table>
            </div>

            {/* Footer note */}
            <div className='sticky bottom-0 bg-white px-5 py-3.5 border-t border-[#e4e8ef] text-[13px] text-[#6b778c]'>
              Showing {allPredictionsHistory.length} reviews.
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Predictions