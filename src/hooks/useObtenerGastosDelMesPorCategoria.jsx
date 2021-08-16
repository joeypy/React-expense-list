import { useState, useEffect } from 'react';
import useObtenerGastosDelMes from './useObtenerGastosDelMes'

const useObtenerGastosDelMesPorCategoria = () => {
    const [gastosPorCategoria, setGastosPorCaterogia] = useState([])
    const gastos = useObtenerGastosDelMes()

    useEffect( () => {
        const sumaDeGastos = gastos.reduce( (objetoResultante, objectoActual) => {
            const caterogiaActual = objectoActual.categoria
            const cantidadActual = parseFloat(objectoActual.cantidad)
    
            objetoResultante[caterogiaActual] += cantidadActual
            return objetoResultante
        }, {
            'comida': 0,
            'cuentas y pagos': 0,
            'hogar': 0,
            'transporte': 0,
            'ropa': 0,
            'salud e higiene': 0,
            'compras': 0,
            'diversion': 0
        })
    
        setGastosPorCaterogia(Object.keys(sumaDeGastos).map( (elemento) => {
            return {categoria: elemento, cantidad: sumaDeGastos[elemento]}
        }))
    
    }, [gastos, setGastosPorCaterogia])
    
    return gastosPorCategoria
}
 
export default useObtenerGastosDelMesPorCategoria;