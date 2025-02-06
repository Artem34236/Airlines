import { useEffect, useState } from "react"
import dataJson from './value.json'
import Card from "./components/Card"
import './App.scss'
import Settings from "./components/Settings"
import { useSearchParams } from "react-router-dom"

export default function App() {

  const [airlines, setAirlines] = useState(dataJson)
  const [filteredAirlines, setFilteredAirlines] = useState(dataJson)
  const [searchParams, setSearcchParams] = useSearchParams()

  let filters = searchParams.get('filters')?.split(',') || []
  filters.length > 0 ? filters = filters.filter(item => item != '') : null


  useEffect(() => {

    let filtered = airlines.filter((item) => {

      return (
        (filters.includes('All') || filters.length == 0) ||
        (filters.includes('noTransplants') && item['Пересадки'] == 0) ||
        (filters.includes('oneTransplants') && item['Пересадки'] == 1) ||
        (filters.includes('twoTransplants') && item['Пересадки'] == 2) ||
        (filters.includes('threeTransplants') && item['Пересадки'] == 3) ||
        (false)
      )
    })

    setFilteredAirlines(filtered)

  }, [searchParams])


  return (
    <div className="flex justify-center gap-[30px]">

      <Settings></Settings>

      <div className="pt-[15px]">
        {filteredAirlines.map((item) => {
          return <Card key={item['Код']} from={item["Откуда"]} to={item['Куда']} transplants={item['Пересадки']} departureTime={item['Время_x0020_вылета']} arrivalTime={item['Время_x0020_прилета']} day={item['Дата_x0020_вылета']} prace={item['Цена_x0020_в_x0020_дол']} ></Card>
        })}
      </div>

    </div >
  )
}
