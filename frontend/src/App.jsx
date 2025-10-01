import { useState } from 'react'

import './App.css'
import Nav from './components/Nav'
import TodayWeatherCard from './components/TodayWeatherCard'
import AlertCard from './components/AlertCard'


function App() {

  return (
    <div className='w-screen h-screen bg-amber-50'>
      <div className='pb-10'>
        <Nav />
      </div>
      <div className='flex col-grid-2'>
        <div className='col-span-2'>
          <div className='px-20 pb-10'>
            <p className='text-4xl font-bold'>São Paulo</p>
            <p className='text-xl'>São Paulo, Brasil</p>
          </div>
          <div className='flex px-16 gap-5'>
            <div className=''>
              <TodayWeatherCard />
            </div>
            <div>
              <AlertCard/>
            </div>
          </div>
          <div className='col-span-1'>
            menu
          </div>
      </div>
      </div>
      
      
      
    </div>
  )
}

export default App
