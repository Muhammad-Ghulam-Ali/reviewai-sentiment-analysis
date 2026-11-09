import React from 'react'

// Icons
import { BrainCog, Info, Cpu, ArrowRight, Database, Trophy } from 'lucide-react'

const Model = () => {
  return (

    <div className='flex flex-col w-full min-w-0 min-h-screen bg-[#f3f5f9]'>
      {/* Header */}
      <header className='sticky top-0 z-10 flex items-center justify-between h-15 px-4 md:px-8 bg-white border-b border-[#e4e8ef]'>
        <h1 className='font-bold text-lg text-[#0f1a2e]'>Models</h1>
        <span className='text-[13px] text-[#6b778c]'>Workspace / Models</span>
      </header>

      {/* Main */}
      <main className='flex-1 px-4 md:px-8 pt-7 pb-12 flex flex-col gap-4.5'>
        {/* Hero */}
        <div className='relative overflow-hidden rounded-xl px-6 md:px-8 py-7 text-white bg-[linear-gradient(135deg,#0b1426,#16314f)]'>
          <span className='absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#3b8fd0]/20 blur-3xl'></span>
          <span className='absolute -left-10 -bottom-20 h-56 w-56 rounded-full bg-[#2a8a9a]/20 blur-3xl'></span>

          <div className='relative flex items-center flex-wrap gap-6'>
            <span className='relative flex items-center justify-center h-14 w-14 rounded-xl bg-[#3b8fd0]'>
              <span className='absolute inset-0 rounded-xl bg-[#3b8fd0]/40 animate-ping'></span>
              <BrainCog size={28} className='relative' />
            </span>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center flex-wrap gap-2.5'>
                <h2 className='text-xl font-semibold'>LSTM Sentiment Classifier</h2>
                <span className='flex items-center gap-1.5 rounded-full bg-[#15803d]/25 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-widest text-[#6ee7a0]'>
                  <span className='h-1.5 w-1.5 rounded-full bg-[#6ee7a0] animate-pulse'></span>
                  Deployed
                </span>
              </div>
              <p className='mt-1 text-[13px] text-[#9fb0c8]'>Binary sentiment classification trained on Yelp reviews.</p>
            </div>
          </div>

          <div className='relative grid grid-cols-2 md:grid-cols-4 gap-3 mt-6'>
            <div className='rounded-lg bg-white/5 border border-white/10 px-4 py-3'>
              <h3 className='font-mono text-2xl font-semibold'>0.9142</h3>
              <small className='text-[12px] text-[#9fb0c8]'>Test accuracy</small>
            </div>
            <div className='rounded-lg bg-white/5 border border-white/10 px-4 py-3'>
              <h3 className='font-mono text-2xl font-semibold'>0.9149</h3>
              <small className='text-[12px] text-[#9fb0c8]'>F1 score</small>
            </div>
            <div className='rounded-lg bg-white/5 border border-white/10 px-4 py-3'>
              <h3 className='font-mono text-2xl font-semibold'>20,002</h3>
              <small className='text-[12px] text-[#9fb0c8]'>Vocabulary tokens</small>
            </div>
            <div className='rounded-lg bg-white/5 border border-white/10 px-4 py-3'>
              <h3 className='font-mono text-2xl font-semibold'>63,871</h3>
              <small className='text-[12px] text-[#9fb0c8]'>Training reviews</small>
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className='bg-white border border-[#e4e8ef] rounded-xl shadow-sm px-6 py-5.5'>
          <div className='flex items-center gap-2.5 mb-4.5 font-semibold text-[15px] text-[#0f1a2e]'>
            <Cpu size={18} className='text-[#6b778c]' />
            <h2>How a Review Becomes a Prediction</h2>
          </div>

          <div className='flex flex-col md:flex-row md:items-stretch gap-2 md:gap-1'>
            <div className='flex-1 rounded-lg border border-[#e4e8ef] bg-[#fafbfd] px-4 py-3.5'>
              <small className='block text-[10px] uppercase tracking-[0.14em] font-semibold text-[#6b778c]'>Input</small>
              <b className='block mt-1 text-sm text-[#0f1a2e]'>Review text</b>
              <small className='block mt-0.5 text-[12px] text-[#6b778c]'>Max length 256</small>
            </div>
            <ArrowRight size={18} className='self-center shrink-0 rotate-90 md:rotate-0 text-[#a3adbd]' />
            <div className='flex-1 rounded-lg border border-[#e4e8ef] bg-[#fafbfd] px-4 py-3.5'>
              <small className='block text-[10px] uppercase tracking-[0.14em] font-semibold text-[#2f6fb0]'>Layer 1</small>
              <b className='block mt-1 text-sm text-[#0f1a2e]'>Embedding</b>
              <small className='block mt-0.5 text-[12px] text-[#6b778c]'>8 dimensions</small>
            </div>
            <ArrowRight size={18} className='self-center shrink-0 rotate-90 md:rotate-0 text-[#a3adbd]' />
            <div className='flex-1 rounded-lg border border-[#e4e8ef] bg-[#fafbfd] px-4 py-3.5'>
              <small className='block text-[10px] uppercase tracking-[0.14em] font-semibold text-[#2f6fb0]'>Layer 2</small>
              <b className='block mt-1 text-sm text-[#0f1a2e]'>LSTM</b>
              <small className='block mt-0.5 text-[12px] text-[#6b778c]'>16 units</small>
            </div>
            <ArrowRight size={18} className='self-center shrink-0 rotate-90 md:rotate-0 text-[#a3adbd]' />
            <div className='flex-1 rounded-lg border border-[#e4e8ef] bg-[#fafbfd] px-4 py-3.5'>
              <small className='block text-[10px] uppercase tracking-[0.14em] font-semibold text-[#2f6fb0]'>Layer 3</small>
              <b className='block mt-1 text-sm text-[#0f1a2e]'>Sigmoid</b>
              <small className='block mt-0.5 text-[12px] text-[#6b778c]'>Output 0 to 1</small>
            </div>
            <ArrowRight size={18} className='self-center shrink-0 rotate-90 md:rotate-0 text-[#a3adbd]' />
            <div className='flex-1 rounded-lg border border-[#2f6fb0] bg-[#e8f1fb] px-4 py-3.5'>
              <small className='block text-[10px] uppercase tracking-[0.14em] font-semibold text-[#2f6fb0]'>Output</small>
              <b className='block mt-1 text-sm text-[#0f1a2e]'>Label + probability</b>
              <small className='block mt-0.5 text-[12px] text-[#6b778c]'>Positive, Negative or Uncertain</small>
            </div>
          </div>

          {/* Decision bands */}
          <div className='mt-6'>
            <small className='block mb-2 text-[12.5px] font-semibold text-[#0f1a2e]'>Decision bands (probability of positive)</small>
            <div className='flex h-2.5 rounded-full overflow-hidden'>
              <span className='block w-[35%] bg-[#b91c1c]'></span>
              <span className='block w-[30%] bg-[#d98a1f]'></span>
              <span className='block w-[35%] bg-[#15803d]'></span>
            </div>
            <div className='relative mt-1.5 h-4 text-[11.5px] text-[#6b778c]'>
              <span className='absolute left-0'>0</span>
              <span className='absolute left-[35%] -translate-x-1/2'>0.35</span>
              <span className='absolute left-[65%] -translate-x-1/2'>0.65</span>
              <span className='absolute right-0'>1</span>
            </div>
            <div className='flex flex-wrap gap-x-5 gap-y-1 mt-2 text-[12.5px] text-[#6b778c]'>
              <span className='flex items-center gap-1.5'><span className='h-2 w-2 rounded-full bg-[#b91c1c]'></span>Negative</span>
              <span className='flex items-center gap-1.5'><span className='h-2 w-2 rounded-full bg-[#d98a1f]'></span>Uncertain (0.35 to 0.65)</span>
              <span className='flex items-center gap-1.5'><span className='h-2 w-2 rounded-full bg-[#15803d]'></span>Positive</span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className='bg-white border border-[#e4e8ef] rounded-xl shadow-sm px-6 py-5.5'>
          <div className='flex items-center gap-2.5 mb-2 font-semibold text-[15px] text-[#0f1a2e]'>
            <Info size={18} className='text-[#6b778c]' />
            <h2>Deployed Model</h2>
          </div>
          <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 border-b border-[#eceff5]'>
            <span className='sm:w-56 shrink-0 text-[13px] text-[#6b778c]'>Architecture</span>
            <b className='text-sm font-semibold text-[#0f1a2e]'>LSTM: Embedding (8 dimensions), one LSTM layer (16 units), sigmoid output</b>
          </div>
          <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 border-b border-[#eceff5]'>
            <span className='sm:w-56 shrink-0 text-[13px] text-[#6b778c]'>Task</span>
            <b className='text-sm font-semibold text-[#0f1a2e]'>Binary sentiment classification</b>
          </div>
          <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 border-b border-[#eceff5]'>
            <span className='sm:w-56 shrink-0 text-[13px] text-[#6b778c]'>Dataset</span>
            <b className='text-sm font-semibold text-[#0f1a2e]'>Yelp reviews. Ratings 1 and 2 are negative, 4 and 5 are positive, 3 star is dropped.</b>
          </div>
          <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 border-b border-[#eceff5]'>
            <span className='sm:w-56 shrink-0 text-[13px] text-[#6b778c]'>Vocabulary</span>
            <b className='text-sm font-semibold text-[#0f1a2e]'>20,002 tokens</b>
          </div>
          <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 border-b border-[#eceff5]'>
            <span className='sm:w-56 shrink-0 text-[13px] text-[#6b778c]'>Max sequence length</span>
            <b className='text-sm font-semibold text-[#0f1a2e]'>256</b>
          </div>
          <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 py-3 border-b border-[#eceff5]'>
            <span className='sm:w-56 shrink-0 text-[13px] text-[#6b778c]'>Train / validation / test rows</span>
            <b className='text-sm font-semibold text-[#0f1a2e]'>63,871 / 15,968 / 8,006</b>
          </div>
          <div className='flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6 pt-3'>
            <span className='sm:w-56 shrink-0 text-[13px] text-[#6b778c]'>Uncertain band</span>
            <b className='text-sm font-semibold text-[#0f1a2e]'>Probability between 0.35 and 0.65</b>
          </div>
        </div>

        {/* Comparison */}
        <div className='bg-white border border-[#e4e8ef] rounded-xl shadow-sm px-6 py-5.5'>
          <div className='flex items-center gap-2.5 mb-4.5 font-semibold text-[15px] text-[#0f1a2e]'>
            <Database size={18} className='text-[#6b778c]' />
            <h2>Test Set Comparison</h2>
          </div>

          <div className='overflow-x-auto'>
            <table className='w-full min-w-175 text-sm text-left'>
              <thead>
                <tr className='border-b border-[#e4e8ef] text-[12px] uppercase tracking-wider text-[#6b778c]'>
                  <th className='py-2.5 pr-4 font-semibold'>Model</th>
                  <th className='py-2.5 px-4 font-semibold'>Accuracy</th>
                  <th className='py-2.5 px-4 font-semibold'>Precision</th>
                  <th className='py-2.5 px-4 font-semibold'>Recall</th>
                  <th className='py-2.5 px-4 font-semibold'>F1</th>
                  <th className='py-2.5 px-4 font-semibold'>Train time per epoch</th>
                  <th className='py-2.5 pl-4 font-semibold'>Inference on 8,006 reviews</th>
                </tr>
              </thead>
              <tbody className='font-mono text-[#0f1a2e]'>
                <tr className='border-b border-[#eceff5]'>
                  <td className='py-3 pr-4 font-sans font-semibold'>Vanilla RNN</td>
                  <td className='py-3 px-4'>0.9044</td>
                  <td className='py-3 px-4'>0.9247</td>
                  <td className='py-3 px-4'>0.8788</td>
                  <td className='py-3 px-4'>0.9012</td>
                  <td className='py-3 px-4'>40s</td>
                  <td className='py-3 pl-4'>0.89s</td>
                </tr>
                <tr className='border-b border-[#eceff5] bg-[#e8f1fb]'>
                  <td className='py-3 pr-4 pl-2 font-sans font-semibold'>
                    <span className='flex items-center gap-2'>
                      <Trophy size={15} className='text-[#2f6fb0]' />
                      LSTM
                      <span className='rounded bg-[#2f6fb0] px-1.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-white'>Deployed</span>
                    </span>
                  </td>
                  <td className='py-3 px-4 font-semibold'>0.9142</td>
                  <td className='py-3 px-4'>0.8992</td>
                  <td className='py-3 px-4'>0.9312</td>
                  <td className='py-3 px-4 font-semibold'>0.9149</td>
                  <td className='py-3 px-4'>64s</td>
                  <td className='py-3 pl-4'>1.40s</td>
                </tr>
                <tr>
                  <td className='py-3 pr-4 font-sans font-semibold'>Transformer</td>
                  <td className='py-3 px-4'>0.9141</td>
                  <td className='py-3 px-4'>0.8998</td>
                  <td className='py-3 px-4'>0.9302</td>
                  <td className='py-3 px-4'>0.9147</td>
                  <td className='py-3 px-4'>50s</td>
                  <td className='py-3 pl-4'>2.12s</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className='mt-4 pt-4 border-t border-[#eceff5] text-[13px] leading-relaxed text-[#6b778c]'>
            The LSTM was chosen because it ties the Transformer on accuracy, runs faster at inference, and is about 1 point better than the RNN.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Model