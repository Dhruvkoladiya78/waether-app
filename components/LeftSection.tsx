import React from 'react'
import Cloud from '@/assets/Cloud'

import Wind from '@/assets/Wind'
import Humidity from '@/assets/Humidity'
import { getDayMonthFromDate } from '@/utils/date'

interface WeatherData {
  weather: {
    icon: string
  }[]
  main: {
    temp: number
    humidity: number
  }
  clouds: {
    all: number
  }
  wind: {
    speed: number
  }
}

interface LeftSectionProps {
  currentData: WeatherData | null
  place: string
}

const LeftSection: React.FC<LeftSectionProps> = ({ currentData, place }) => {
  return (
    <div className='xl:w-1/3 p-3 xl:py-5 xl:px-10 xl:rounded-r-3xl md:rounded-s-3xl bg-white w-full h-full'>
      <div className='flex flex-col py-2 xl:py-8 space-y-4 px-4 xl:px-12'>
        <div className='flex xl:flex-col justify-between mt-5 md:mt-0'>
          <img
            src={`/icons/${currentData?.weather?.[0]?.icon}.png`}
            alt='icon'
            className='invert'
          />
          <div className='flex text-[4rem] md:text-[6rem] font-extralight'>
            <h2>{currentData?.main?.temp?.toFixed(1)}</h2>
            <p className='text-[3rem] md:text-[4rem] md:leading-normal'>°C</p>
          </div>
        </div>
        <div className='flex justify-between'>
          <h1 className='text-xl font-bold'>{place}</h1>
          <div className='flex'>
            <h2 className='text-lg font-medium'>Today {getDayMonthFromDate()}</h2>
            {/* <p className="text-lg font-thin">May 3</p> */}
          </div>
        </div>
        <hr />
        <div className='flex flex-col gap-4'>
          <div className='flex items-center space-x-2'>
            <Cloud />
            <h3 className='flex-1'>Clouds</h3>
            <h4 className='font-semibold'>{currentData?.clouds?.all}%</h4>
          </div>
          <div className='flex items-center space-x-2'>
            <Wind />
            <h3 className='flex-1'>Wind</h3>
            <h4 className='font-semibold'>{currentData?.wind?.speed} m/s</h4>
          </div>
          <div className='flex items-center space-x-2'>
            <Humidity />
            <h3 className='flex-1'>Humidity</h3>
            <h4 className='font-semibold'>{currentData?.main?.humidity} %</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeftSection
