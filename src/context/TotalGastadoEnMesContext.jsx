import React, { useContext, useState, useEffect } from 'react'
// import {auth} from './../firebase/firebaseConfig'
import useObtenerGastosDelMes from './../hooks/useObtenerGastosDelMes'

//  Hook para acceder al contexto
const TotalGastadoContext = React.createContext()

export const useTotalDelMes = () => useContext(TotalGastadoContext)

export const TotalGastadoProvider = ({children}) => {
    const [total, setTotal] = useState(0)
    const gastos = useObtenerGastosDelMes()

    useEffect(() => {
        let acumulado = 0.00
        gastos.forEach( (gasto) => {acumulado += parseFloat(gasto.cantidad)})
        setTotal(acumulado)
    }, [gastos])

    return (
        <TotalGastadoContext.Provider value={{total: total}}>
            {children}
        </TotalGastadoContext.Provider>    
    )
}
