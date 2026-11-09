import React from 'react'
import { useState, useEffect } from 'react'

// Icons
import { Activity, CircleAlert } from 'lucide-react'

// APIs
import { quickReview } from '../api/quickReview'

const QuickReview = () => {

  // States
  const [reviewText, setReviewText] = useState("");
  const [prediction, setPrediction] = useState([]);
  const [quickPredictHistory, setQuickPredictHistory] = useState(
    () => JSON.parse(localStorage.getItem("QuickPrediction") || "[]")
  );
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [server, setServer] = useState(false);

  // API
  const predictReview = async () => {
    setErrorMessage("")
    setLoader(true)
    const timer = setTimeout(() => {
      setServer(true)
    }, 6000)
    const review = { review: reviewText }

    const result = await quickReview(review)

    if (!result.success) {
      setErrorMessage(result.message)
      setLoader(false)
      clearTimeout(timer)
      setServer(false)
      return
    }
    setPrediction(result.message)
    setQuickPredictHistory([result.message, ...quickPredictHistory])

    setLoader(false)
    clearTimeout(timer)
    setServer(false)

  }

  // Local storage
  useEffect(() => {
    localStorage.setItem("QuickPrediction", JSON.stringify(quickPredictHistory))
  }, [quickPredictHistory])

  // console.log(errorMessage, quickPredictHistory);
  console.log(prediction);


  return (

    <div className='flex flex-col w-full min-w-0 min-h-screen bg-[#f3f5f9]'>
      {/* Header */}
      <header className='sticky top-0 z-10 flex items-center justify-between h-15 px-4 md:px-8 bg-white border-b border-[#e4e8ef]'>
        <h1 className='font-bold text-lg text-[#0f1a2e]'>Quick Review</h1>
        <span className='text-[13px] text-[#6b778c]'>Workspace / Quick Review</span>
      </header>

      {/* Main */}
      <main className='flex-1 px-4 md:px-8 pt-7 pb-12 flex flex-col gap-4.5'>
        {/* Input */}
        <div className='bg-white border border-[#e4e8ef] rounded-xl shadow-sm px-6 py-5.5'>
          <label htmlFor='review' className='block mb-2 font-semibold text-[13px] text-[#0f1a2e]'>Review text</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id='review'
            maxLength={5000}
            placeholder='Paste or type a customer review'
            className='w-full min-h-50 resize-y border border-[#e4e8ef] rounded-lg p-3.5 leading-relaxed text-sm focus:outline-none focus:border-[#2f6fb0]'></textarea>

          <div className='flex items-center flex-wrap gap-3 mt-3.5'>
            <span className='text-[13px] text-[#6b778c]'>{reviewText.length} / 5,000 characters</span>
            <span className='flex-1'></span>
            <button
              type='button'
              onClick={() => setReviewText("")}
              className='flex items-center justify-center h-10 px-4.5 rounded-lg bg-white border border-[#e4e8ef] text-sm font-semibold text-[#0f1a2e] hover:bg-[#f3f5f9] cursor-pointer'>
              Clear
            </button>
            <button
              type='button'
              disabled={reviewText.length < 1 || loader === true}
              onClick={predictReview}
              className='flex items-center justify-center gap-2 h-10 px-4.5 rounded-lg bg-[#2f6fb0] text-sm font-semibold text-white hover:bg-[#285f99] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
              {!loader ?
                "Analyze" :
                <div className='flex items-center justify-center gap-2'>
                  <span className='h-4 w-4 rounded-full bg-transparent border-2 border-white border-t-transparent animate-spin'></span>
                  <span>Analyzing</span>
                </div>
              }
            </button>
          </div>
          {loader && server && (
            <div className='flex justify-end'>
              <small className='text-gray-400'>Server is waking up. This can take up to 60 seconds.</small>
            </div>
          )}
        </div>

        {/* Error (show when validation or the API fails) */}
        {errorMessage && (
          <section role='alert' className='flex items-center flex-wrap gap-4 bg-white border border-[#f5d0d0] rounded-xl shadow-sm px-6 py-5.5'>
            <span className='flex items-center justify-center shrink-0 h-11.5 w-11.5 rounded-[10px] bg-[#fbe8e8] text-[#b91c1c]'>
              <CircleAlert size={22} />
            </span>
            <div className='flex-1 min-w-0'>
              <h2 className='font-semibold text-[15px] text-[#0f1a2e]'>Analysis failed</h2>
              <small className='block text-[12.5px] text-[#b91c1c]'>{errorMessage}</small>
            </div>
          </section>
        )}

        {/* Result */}
        {!errorMessage && (
          <div className='bg-white border border-[#e4e8ef] rounded-xl shadow-sm px-6 py-5.5'>
            <div className='flex items-center gap-2.5 mb-4.5 font-semibold text-[15px] text-[#0f1a2e]'>
              <Activity size={18} className='text-[#6b778c]' />
              <h2>Result</h2>
            </div>
            {/* Empty state */}
            {prediction.length < 1 && (
              <div className='h-30 flex items-center justify-center text-[#a3adbd] text-sm'>
                <span>Analyze a review to see its sentiment.</span>
              </div>
            )}

            {/* Positive */}
            {prediction && prediction.Sentiment === 'Positive' && (
              <div>
                <div className='flex items-center flex-wrap gap-7'>
                  <span className='inline-block rounded-lg px-4.5 py-1.5 text-xl font-semibold bg-[#e5f4ea] text-[#15803d]'>Positive</span>
                  <div>
                    <h2 className='text-[34px] font-semibold text-[#0f1a2e]'>{(prediction.Probability * 100).toFixed(1)}%</h2>
                    <small className='block text-[12.5px] text-[#6b778c]'>Probability of positive</small>
                  </div>
                </div>
                <div className='mt-4.5 h-2 rounded-full bg-[#eceff5] overflow-hidden'>
                  <span style={{ width: `${prediction.Probability * 100}%` }} className='block h-full rounded-full bg-[#15803d]'></span>
                </div>
                <p className='mt-4.5 pt-4 border-t border-[#e4e8ef] text-[#6b778c] whitespace-pre-wrap break-words'>{prediction?.Review}</p>
              </div>
            )}

            {/* Negative */}
            {prediction && prediction.Sentiment === 'Negative' && (
              <div>
                <div className='flex items-center flex-wrap gap-7'>
                  <span className='inline-block rounded-lg px-4.5 py-1.5 text-xl font-semibold bg-[#fbe8e8] text-[#b91c1c]'>Negative</span>
                  <div>
                    <h2 className='text-[34px] font-semibold text-[#0f1a2e]'>{(prediction.Probability * 100).toFixed(1)}%</h2>
                    <small className='block text-[12.5px] text-[#6b778c]'>Probability of negative</small>
                  </div>
                </div>
                <div className='mt-4.5 h-2 rounded-full bg-[#eceff5] overflow-hidden'>
                  <span style={{ width: `${prediction.Probability * 100}%` }} className='block h-full rounded-full bg-[#b91c1c]'></span>
                </div>
                <p className='mt-4.5 pt-4 border-t border-[#e4e8ef] text-[#6b778c] whitespace-pre-wrap break-words'>{prediction?.Review}</p>
              </div>
            )}

            {/* Uncertain */}
            {prediction && prediction.Sentiment === 'Uncertain' && (
              <div>
                <div className='flex items-center flex-wrap gap-7'>
                  <span className='inline-block rounded-lg px-4.5 py-1.5 text-xl font-semibold bg-[#fdf0db] text-[#b45309]'>Uncertain</span>
                  <div>
                    <h2 className='text-[34px] font-semibold text-[#0f1a2e]'>{(prediction.Probability * 100).toFixed(1)}%</h2>
                    <small className='block text-[12.5px] text-[#6b778c]'>Probability of positive</small>
                  </div>
                </div>
                <div className='mt-4.5 h-2 rounded-full bg-[#eceff5] overflow-hidden'>
                  <span style={{ width: `${prediction.Probability * 100}%` }} className='block h-full rounded-full bg-[#d98a1f]'></span>
                </div>
                <p className='mt-4.5 pt-4 border-t border-[#e4e8ef] text-[#6b778c] whitespace-pre-wrap break-words'>{prediction?.Review}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default QuickReview