import { useState } from "react"
import { useSearchParams } from "react-router-dom"

export default function Card({ from, to, transplants, arrivalTime, departureTime, day, prace }) {

    const [curency, setCurency] = useState({
        'RUB' : 103,
        'USD' : 1,
        'EUR' : 0.97,
    })

    const [searchParams, setSearcchParams] = useSearchParams()
    let searchParamsGetAndSet = new URLSearchParams(searchParams)

    
    let StartTime = new Date(departureTime)
    let EndTime = new Date(arrivalTime)
    let Day = new Date(day)
    let realPrice = Math.round(prace * (curency[searchParamsGetAndSet.get('curency') || 'RUB']))
    

    const options = {
        day: "numeric",
        month: "short",
        year: "numeric",
        weekday: "short",
    };


    const formattedDate = new Intl.DateTimeFormat("ru-RU", options).format(Day);

    return (
        <div className='flex px-[20px] pb-[20px] gap-[40px] border-[1px] border-[#abadae] rounded-[10px] mb-[20px]'>

            <div className='flex flex-col pt-[20px] items-center' >
                <div className='flex gap-[5px] mb-[20px] items-center'>
                    <h3 className='uppercase text-blue-900 font-[900] text-[16px] leading-[100%]'>turkish <br /> airlines</h3>
                    <img width={30} height={20} src="./Company_icon.png" alt="" />
                </div>
                <button className='bg-[#fa940e] p-[10px] text-white font-[600] rounded-[10px] w-[140px]'>Купить <br /> за : {realPrice}</button>
            </div>

            <div className='flex justify-between w-full gap-[20px]'>

                <div className='flex flex-col items-start'>
                    <h2 className='font-[400] text-[60px] flex h-[80px]'>{StartTime.getHours()}:{StartTime.getMinutes().toString().padStart(2, '0')}</h2>
                    <div>
                        <p className='font-[400] text-[18px]'>{from}</p>
                        <p className='font-[400] text-[18px] opacity-[0.7]'>{formattedDate}</p>
                    </div>
                </div>

                <div className='mt-[17px] text-center'>
                    <p className='font-[400] text-[18px] opacity-[0.9]'>{transplants} {transplants < 1 ? 'Пересадок' : null} {transplants >= 2 ? 'Пересадки' : null} {transplants == 1 ? 'Пересадка' : null}</p>
                    <div className='flex items-center'>
                        <div className='w-[160px] border-b-[1px] border-[#abadae] hrBefore'></div>
                        <img src="./airplane.svg" alt="" />
                    </div>
                </div>

                <div className='flex flex-col items-start'>
                    <h2 className='font-[400] text-[60px] h-[80px]'>{EndTime.getHours()}:{EndTime.getMinutes().toString().padStart(2, '0')}</h2>
                    <div>
                        <p className='font-[400] text-[18px]'>{to}</p>
                        <p className='font-[400] text-[18px] opacity-[0.7]'>{formattedDate}</p>
                    </div>

                </div>
            </div>

        </div>
    )
}
