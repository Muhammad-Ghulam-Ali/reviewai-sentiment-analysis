import React, { useState } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// Icons
import { MessageSquare, ThumbsUp, ThumbsDown, CircleHelp, Percent, Activity, ChartPie, ChartColumn } from 'lucide-react'
import { data } from 'react-router-dom'

const Dashboard = () => {

  const [quickPredictions, setQuickPredictions] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("QuickPrediction") || "[]")
    return Array.isArray(saved) ? saved : []
  })
  const [batch, setBatch] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("BatchPrediction") || "[]")
    return Array.isArray(saved) ? saved : []
  })

  const allPredictionsHistory = [...quickPredictions, ...batch]


  const postiveReviews = allPredictionsHistory?.length > 0 ? allPredictionsHistory.filter(item => item.Sentiment === "Positive").length  : "0.00"

  const negativeReviews = allPredictionsHistory?.length > 0 ? allPredictionsHistory.filter(item => item.Sentiment === "Negative").length  : "0.00"

  const uncertainReviews = allPredictionsHistory?.length > 0 ? allPredictionsHistory.filter(item => item.Sentiment === "Uncertain").length : "0.00"

  const postiveRate = allPredictionsHistory?.length > 0 ? ((allPredictionsHistory.filter(item => item.Sentiment === "Positive").length / allPredictionsHistory.length) * 100).toFixed(2) : "0.00"

  const avgProb = allPredictionsHistory?.length > 0 && (negativeReviews + postiveReviews) > 0 ? ((allPredictionsHistory.filter(item => item.Sentiment === "Positive" || item.Sentiment === "Negative").reduce((acc, item) => item.Probability + acc, 0) / (postiveReviews + negativeReviews)) * 100).toFixed(2) : "0.00"

  // Pie chart
  const pieChartData = {
    labels: ["Positive", "Negative", "Uncertain"],
    datasets: [{
      data: [postiveReviews/ allPredictionsHistory.length, negativeReviews/ allPredictionsHistory.length, uncertainReviews/ allPredictionsHistory.length],
      backgroundColor: ['#2f6fb0', '#e46a6a', '#9fb0c8']
    }]
  }

  // Barchart data
  const bucketCounts = new Array(10).fill(0)

allPredictionsHistory?.forEach((row) => {
  const index = Math.min(Math.floor(row.Probability * 10), 9)
  bucketCounts[index] += 1
})

const barChartData = {
  labels: ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'],
  datasets: [{
    label: 'Reviews',
    data: bucketCounts,
    backgroundColor: '#2f6fb0'
  }]
}

  return (

    <div className='flex flex-col min-w-0 w-full min-h-screen bg-[#f3f5f9]'>
      {/* Header */}
      <header className='sticky top-0 z-10 flex items-center justify-between h-15 px-4 md:px-8 bg-white border-b border-[#e4e8ef]'>
        <h1 className='font-bold text-lg text-[#0f1a2e]'>Dashboard</h1>
        <span className='text-[13px] text-[#6b778c]'>Workspace / Dashboard</span>
      </header>

      {/* Main */}
      <main className='flex-1 justify-around px-4 md:px-8 pt-7 pb-12  flex flex-col gap-4.5'>
        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4.5'>
          <div className='flex items-center gap-4 p-5 bg-white border border-[#e4e8ef] rounded-xl shadow-sm'>
            <span className='flex items-center justify-center shrink-0 h-11.5 w-11.5 rounded-[10px] bg-[#e8f1fb] text-[#2f6fb0]'>
              <MessageSquare size={22} />
            </span>
            <div>
              <h2 className='text-xl font-semibold leading-tight text-[#0f1a2e]'>{allPredictionsHistory?.length > 0 ? allPredictionsHistory?.length : "0.00"}</h2>
              <small className='text-[12.5px] text-[#6b778c]'>Total Reviews</small>
            </div>
          </div>

          <div className='flex items-center gap-4 p-5 bg-white border border-[#e4e8ef] rounded-xl shadow-sm'>
            <span className='flex items-center justify-center shrink-0 h-11.5 w-11.5 rounded-[10px] bg-[#e5f4ea] text-[#15803d]'>
              <ThumbsUp size={22} />
            </span>
            <div>
              <h2 className='text-xl font-semibold leading-tight text-[#0f1a2e]'>{postiveReviews}</h2>
              <small className='text-[12.5px] text-[#6b778c]'>Positive</small>
            </div>
          </div>

          <div className='flex items-center gap-4 p-5 bg-white border border-[#e4e8ef] rounded-xl shadow-sm'>
            <span className='flex items-center justify-center shrink-0 h-11.5 w-11.5 rounded-[10px] bg-[#fbe8e8] text-[#b91c1c]'>
              <ThumbsDown size={22} />
            </span>
            <div>
              <h2 className='text-xl font-semibold leading-tight text-[#0f1a2e]'>{negativeReviews}</h2>
              <small className='text-[12.5px] text-[#6b778c]'>Negative</small>
            </div>
          </div>

          <div className='flex items-center gap-4 p-5 bg-white border border-[#e4e8ef] rounded-xl shadow-sm'>
            <span className='flex items-center justify-center shrink-0 h-11.5 w-11.5 rounded-[10px] bg-[#fdf0db] text-[#b45309]'>
              <CircleHelp size={22} />
            </span>
            <div>
              <h2 className='text-xl font-semibold leading-tight text-[#0f1a2e]'>{uncertainReviews}</h2>
              <small className='text-[12.5px] text-[#6b778c]'>Uncertain</small>
            </div>
          </div>

          <div className='flex items-center gap-4 p-5 bg-white border border-[#e4e8ef] rounded-xl shadow-sm'>
            <span className='flex items-center justify-center shrink-0 h-11.5 w-11.5 rounded-[10px] bg-[#e0f3f6] text-[#2a8a9a]'>
              <Percent size={22} />
            </span>
            <div>
              <h2 className='text-xl font-semibold leading-tight text-[#0f1a2e]'>{postiveRate}%</h2>
              <small className='text-[12.5px] text-[#6b778c]'>Positive Rate</small>
            </div>
          </div>

          <div className='flex items-center gap-4 p-5 bg-white border border-[#e4e8ef] rounded-xl shadow-sm'>
            <span className='flex items-center justify-center shrink-0 h-11.5 w-11.5 rounded-[10px] bg-[#e8f1fb] text-[#2f6fb0]'>
              <Activity size={22} />
            </span>
            <div>
              <h2 className='text-xl font-semibold leading-tight text-[#0f1a2e]'>{avgProb}%</h2>
              <small className='text-[12.5px] text-[#6b778c]'>Avg Confidence</small>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4.5'>
          <div className='flex flex-col bg-white border border-[#e4e8ef] rounded-xl shadow-sm px-6 py-5.5'>
            <div className='flex items-center gap-2.5 mb-4.5 font-semibold text-[15px] text-[#0f1a2e]'>
              <ChartPie size={18} className='text-[#6b778c]' />
              <h2>Sentiment Distribution</h2>
            </div>
            {allPredictionsHistory < 1 && (
                <div className='h-60 flex flex-col items-center justify-center gap-2.5 text-[#a3adbd]'>
                <ChartPie size={44} strokeWidth={1.3} />
                <span className='text-sm'>No data yet. Upload a file first.</span>
              </div>
              )}

              {allPredictionsHistory.length > 1 && (
                <div className='flex-1 '>
                  <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
                </div>
              )}

          </div>

          <div className='flex flex-col bg-white border border-[#e4e8ef] rounded-xl shadow-sm px-6 py-5.5'>
            <div className='flex items-center gap-2.5 mb-4.5 font-semibold text-[15px] text-[#0f1a2e]'>
              <ChartColumn size={18} className='text-[#6b778c]' />
              <h2>Confidence Distribution</h2>
            </div>
            <div className='relative h-70'>
              {allPredictionsHistory < 1 && (
                <div className='h-60 flex flex-col items-center justify-center gap-2.5 text-[#a3adbd]'>
                <ChartColumn size={44} strokeWidth={1.3} />
                <span className='text-sm'>No data yet. Upload a file first.</span>
              </div>
              )}
              {allPredictionsHistory.length > 0 && (
                <div className='h-full'>
                  <Bar data={barChartData} />
                </div>
              )}
            </div>
          </div>
        </div>
        
      </main>
    </div>
  )
}

export default Dashboard
