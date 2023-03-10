import { useState, useEffect, createContext } from 'react'

import { fetchDataFromApi } from 'utils/api'

export const Context = createContext()

const AppContext = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [selectCategories, setSelectCategories] = useState('Inicio')

    useEffect(() => {
        fetchSelectedCategoryData(selectCategories)
    }, [selectCategories])

    const fetchSelectedCategoryData = query => {
        setIsLoading(true)
        fetchDataFromApi(`search/?q=${query}`).then(({ contents }) => {
            console.log(contents)
            setSearchResults(contents)
            setIsLoading(false)
        })
    }

    return <>
        <Context.Provider value={{
            isLoading,
            setIsLoading,
            searchResults,
            selectCategories,
            setSelectCategories,
            mobileMenu,
            setMobileMenu
        }}>
            {props.children}
        </Context.Provider>
    </>
}

export default AppContext