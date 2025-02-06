import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export default function Settings() {

    const [searchParams, setSearcchParams] = useSearchParams()

    let searchParamsGetAndSet = new URLSearchParams(searchParams)
    let filterItemsCurency = searchParamsGetAndSet.get('curency')

    const [buttonForUSD, setButtonForUSD] = useState({
        RUB: filterItemsCurency === "RUB",
        USD: filterItemsCurency === "USD",
        EUR: filterItemsCurency === "EUR",
    })
    let navigate = useNavigate()

    useEffect(() => {
        let filteredItem = searchParamsGetAndSet.get('curency') || 'RUB'

        setButtonForUSD({
            RUB: filteredItem === "RUB",
            USD: filteredItem === "USD",
            EUR: filteredItem === "EUR",
        });

    },[searchParams])

    useEffect(() => {
        if (!searchParamsGetAndSet.get('curency')) {
            searchParamsGetAndSet.set('curency', "RUB")
            searchParamsGetAndSet.set('filters', "")
        }

        navigate(`/?${searchParamsGetAndSet}`)
    }, [])



    function onClickButtonForUSD(currency) {
        searchParamsGetAndSet.set('curency', currency)
        filterItemsCurency = searchParamsGetAndSet.get('curency')

        setButtonForUSD({
            RUB: filterItemsCurency === "RUB",
            USD: filterItemsCurency === "USD",
            EUR: filterItemsCurency === "EUR",
        });

        navigate(`/?${searchParamsGetAndSet}`)
    }

    function setSortToCard(filter) {
        let filterItems = new Set(searchParamsGetAndSet.get('filters')?.split(',') || [])
        filterItems.has(filter) ? filterItems.delete(filter) : (filterItems.add(filter))
        searchParamsGetAndSet.set('filters', Array.from(filterItems).join(','))
        navigate(`/?${searchParamsGetAndSet}`)
    }

    function inputChecked(type) {
        let filterItems = searchParamsGetAndSet.get('filters')?.split(',') || []
        filterItems = filterItems.filter(item => item != '')

        if (filterItems.length == 0 && type == 'All') return true

        return filterItems.some(item => item == type)
    }


    let styleButton = 'border-[4395ED] border-[1px] text-[#4395ED] font-[500] text-[15px] py-[15px] px-[25px]'
    let stylesLableForForm = 'font-[500] text-[14px] flex align-center gap-[10px] py-[10px] px-[15px] hoverFormItem'

    return (
        <div className="bg-[#FBFBFB] rounded-[10px]">
            <h3 className="font-[500] text-[14px] uppercase mb-[10px] px-[15px] py-[15px]">Валюта</h3>
            <div className="mb-[30px] px-[15px]">
                <button onClick={() => onClickButtonForUSD("RUB")} className={buttonForUSD.RUB ? styleButton + " rounded-l-[10px] ButtonForUSD" : styleButton + " rounded-l-[10px] hoverButton"}>RUB</button>
                <button onClick={() => onClickButtonForUSD('USD')} className={buttonForUSD.USD ? styleButton + ' ButtonForUSD' : styleButton + " hoverButton"}>USD</button>
                <button onClick={() => onClickButtonForUSD('EUR')} className={buttonForUSD.EUR ? styleButton + " rounded-r-[10px] ButtonForUSD" : styleButton + " rounded-r-[10px] hoverButton"}>EUR</button>
            </div>
            <h3 className="font-[500] text-[14px] uppercase mb-[10px] px-[15px]">Количество пересадок</h3>
            <div>
                <form className="flex flex-col pb-[15px]">
                    <label className={stylesLableForForm}><input onChange={() => setSortToCard('All')} checked={inputChecked('All')} type="checkBox"></input> Все </label>
                    <label className={stylesLableForForm}><input onChange={() => setSortToCard('noTransplants')} checked={inputChecked('noTransplants')} type="checkBox"></input> Без пересадок</label>
                    <label className={stylesLableForForm}><input onChange={() => setSortToCard('oneTransplants')} checked={inputChecked('oneTransplants')} type="checkBox"></input> 1 пересадка</label>
                    <label className={stylesLableForForm}><input onChange={() => setSortToCard('twoTransplants')} checked={inputChecked('twoTransplants')} type="checkBox"></input> 2 пресадки</label>
                    <label className={stylesLableForForm}><input onChange={() => setSortToCard('threeTransplants')} checked={inputChecked('threeTransplants')} type='checkBox'></input> 3 пресадки</label>
                </form>
            </div>

        </div>
    )
}
