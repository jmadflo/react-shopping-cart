import {useState} from 'react'

const useLocalStorage = (key, initialValue) => {
    const { localStorage } = window

    //getter method
    const [storedValue, setStoredValue] = useState(() => {
        const currentValue = localStorage.getItem(key)
        return currentValue ? JSON.parse(currentValue) : initialValue
    })

    //setter method
    const setValue = (value) => {
        setStoredValue(value)
        localStorage.setItem(key, JSON.stringify(value))
    }
    return [storedValue, setValue]
}

export default useLocalStorage