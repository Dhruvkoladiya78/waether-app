import { PageOptions } from '@graphcommerce/framer-next-pages'

import LeftSection from '../../components/LeftSection'
import RightSection from '../../components/RightSection'
import React, { useEffect, useState } from 'react'
import { getTodayForecastWeather, getWeekForecastWeather } from '@/utils/index'
import { GetServerSideProps } from 'next'
import { ALL_DESCRIPTIONS } from '@/utils/DateConstants'
import { LayoutDocument, LayoutNavigation, LayoutNavigationProps } from '@/components'
import Search from '@/assets/Search'
import { useRouter } from 'next/navigation'
import { graphqlSharedClient, graphqlSsrClient } from '@/lib/graphql/graphqlSsrClient'
import { hygraphPageContent } from '@graphcommerce/graphcms-ui'
import { StoreConfigDocument } from '@graphcommerce/magento-store'

type RouteProps = { url: string }

type GetPageServerSideProps = GetServerSideProps<LayoutNavigationProps, RouteProps>

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
const WEATHER_API_KEY = '28dada34bd59b34fc0e3e3522d5883fd'

const CmsPage = (props) => {
  const { data, place } = props
  const [search, setSearch] = useState(place)
  const router = useRouter()
  const weekData = getWeekForecastWeather(data[1], ALL_DESCRIPTIONS)

  const fullDayData = getTodayForecastWeather(data[1])

  useEffect(() => {
    setSearch(place)
  }, [place])
  return (
    <div>
      <div>
        <div className='flex justify-center'>
          <div className='w-1/2 flex space-x-2 xl:space-x-4 items-center justify-center bg-gray-100 p-2 pl-4 rounded-full mt-3 md:mt-0'>
            <input
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='outline-none bg-transparent flex-1 md:w-full !text-black'
              placeholder='Search for place'
            />
            <button onClick={() => router.push(`/weather?place=${search}`)}>
              {' '}
              <Search />
            </button>
          </div>
        </div>
      </div>
      {place && (
        <div className='xl:flex !text-black max-w-screen-2xl mx-auto overflow-x-hidden gap-12 xl:gap-8 py-14 xl:px-14 lg:px-10 px-4 pt-10'>
          {/* left section */}
          <LeftSection currentData={data[0]} place={place} />
          {/* right section */}
          <RightSection weekData={weekData} fullDayData={fullDayData} />
        </div>
      )}
    </div>
  )
}

CmsPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions
export default CmsPage

// export const getServerSideProps: GetServerSideProps<any> = async ({ query }) => {
//

//   return {
//     props: {
//
//     },
//   }
// }

export const getServerSideProps: GetPageServerSideProps = async ({ locale, query }: any) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const page = hygraphPageContent(staticClient, 'page/home')
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })
  const place = query?.place || ''
  let weatherResponse: any = null
  let forecastResponse: any = null
  try {
    let [weatherPromise, forecastPromise] = await Promise.all([
      fetch(`${WEATHER_API_URL}/weather?q=${place}&appid=${WEATHER_API_KEY}&units=metric`),
      fetch(`${WEATHER_API_URL}/forecast?q=${place}&appid=${WEATHER_API_KEY}&units=metric`),
    ])

    weatherResponse = await weatherPromise.json()
    forecastResponse = await forecastPromise.json()
  } catch (error) {
    console.error('Error fetching weather data:', error)
  }
  if (!(await page).data.pages?.[0]) return { notFound: true }

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      data: [weatherResponse, forecastResponse],
      place: place,
    },
  }
}
