import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

// Icons
import { Layers, LayoutGrid, SquarePen, Upload, List, Cpu, ChevronsLeft, ChevronsRight } from 'lucide-react'

const Sidebar = ({ elem }) => {

  const [show, setShow] = useState(elem)
  const [sidebarClosed, setSidebarClosed] = useState(false);

  return (

    <div className={`sticky top-0 self-start shrink-0 flex flex-col h-screen bg-[#0b1426] text-[#c7d0de] px-2.5 md:px-3.5 py-4 transition-all duration-200 ${sidebarClosed ? "w-17 gap-10" : "w-17 md:w-59 gap-5"}`}>
      {/* Brand */}
      <div className='flex items-center justify-center md:justify-start gap-3 md:px-1.5 pb-4 md:border-b border-[#15233d]'>
        <span className='flex items-center justify-center h-9.5 w-9.5 shrink-0 rounded-[10px] bg-[#3b8fd0] text-white'>
          <Layers size={20} />
        </span>
        <div className='hidden md:block'>
          <b className='block text-[15px] text-white leading-tight'>ReviewAI</b>
          <small className='text-[9.5px] uppercase tracking-[0.14em] font-semibold text-[#4a9bd0]'>Sentiment</small>
        </div>
      </div>

      {/* Nav */}
      <nav className='flex-1 overflow-y-auto pt-1.5 flex flex-col items-center md:items-stretch'>
        {/* Overview */}
        <span className={`${sidebarClosed ? "hidden" : "hidden md:block"} text-[10px] uppercase tracking-[0.14em] font-semibold text-[#5d6b83] px-2.5 pt-4.5 pb-2`}>Overview</span>
        <NavLink title="Dashboard" to={'/'} className={({isActive}) =>`flex items-center justify-center md:justify-start gap-3 w-full h-10 px-0 md:px-3 mb-0.5 rounded-lg text-[#aeb9cb] hover:bg-[#15233d] hover:text-white cursor-pointer ${isActive ? "bg-[#2f6fb0] text-white" : ""}`}>
          <LayoutGrid size={18} className='shrink-0' />
          <span className='hidden md:block text-sm'>Dashboard</span>
        </NavLink>

        {/* Analyze */}
        <span className={`${sidebarClosed ? "hidden" : "hidden md:block"} text-[10px] uppercase tracking-[0.14em] font-semibold text-[#5d6b83] px-2.5 pt-4.5 pb-2`}>Analyze</span>
        <NavLink title='Quick Reivew'  to={'/quick-review'} className={({isActive}) => `flex items-center justify-center md:justify-start gap-3 w-full h-10 px-0 md:px-3 mb-0.5 rounded-lg text-[#aeb9cb] hover:bg-[#15233d] hover:text-white cursor-pointer ${isActive ? "bg-[#2f6fb0] text-white" : ""}`}>
          <SquarePen size={18} className='shrink-0' />
          <span className='hidden md:block text-sm'>Quick Review</span>
        </NavLink>
        <NavLink title='Batch Review' to={'/batch-prediction'} className={({isActive}) => `flex items-center justify-center md:justify-start gap-3 w-full h-10 px-0 md:px-3 mb-0.5 rounded-lg text-[#aeb9cb] hover:bg-[#15233d] hover:text-white cursor-pointer ${isActive ? "bg-[#2f6fb0] text-white" : ""}`}>
          <Upload size={18} className='shrink-0' />
          <span className='hidden md:block text-sm'>Batch Upload</span>
        </NavLink>

        {/* Results */}
        <span className={`${sidebarClosed ? "hidden" : "hidden md:block"} text-[10px] uppercase tracking-[0.14em] font-semibold text-[#5d6b83] px-2.5 pt-4.5 pb-2`}>Results</span>
        <NavLink title='Predictions' to={'/predictions'} className={({isActive}) => `flex items-center justify-center md:justify-start gap-3 w-full h-10 px-0 md:px-3 mb-0.5 rounded-lg text-[#aeb9cb] hover:bg-[#15233d] hover:text-white cursor-pointer ${isActive ? "bg-[#2f6fb0] text-white" : ""}`}>
          <List size={18} className='shrink-0' />
          <span className='hidden md:block text-sm'>Predictions</span>
        </NavLink>

        {/* Models */}
        <span className={`${sidebarClosed ? "hidden" : "hidden md:block"} text-[10px] uppercase tracking-[0.14em] font-semibold text-[#5d6b83] px-2.5 pt-4.5 pb-2`}>Models</span>
        <NavLink title='Models' to={'/models'} className={({isActive}) => `flex items-center justify-center md:justify-start gap-3 w-full h-10 px-0 md:px-3 mb-0.5 rounded-lg text-[#aeb9cb] hover:bg-[#15233d] hover:text-white cursor-pointer ${isActive ? "bg-[#2f6fb0] text-white" : ""}`}>
          <Cpu size={18} className='shrink-0' />
          <span className='hidden md:block text-sm'>Models</span>
        </NavLink>
      </nav>


      {/* Footer */}
      <div className={`${sidebarClosed ? "hidden" : "hidden md:block"} mt-2.5 pt-3.5 px-2.5 border-t border-[#15233d] text-[11px] text-[#5d6b83]`}>
        Developed by
        <a href="https://www.linkedin.com/in/muhammad-ghulam-ali/" target='_blank'>
        <b className='block text-[12.5px] font-semibold text-[#c7d0de]'>Muhammad Ghulam Ali</b>
        </a>
      </div>

      <button 
      onClick={() => setSidebarClosed(!sidebarClosed)}
      title={sidebarClosed ? "Expand" : "Collapse"}
      className='hidden md:block absolute z-0 top-20 right-0 cursor-pointer'>
      {!sidebarClosed ?
      <ChevronsLeft size={22} className='text-[#aeb9cb]'/> :
      <ChevronsRight size={22} className='text-[#aeb9cb]'/>  
    }
      </button>
    </div>
  )
}

export default Sidebar
