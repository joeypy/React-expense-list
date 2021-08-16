import React from 'react'
import {Helmet} from "react-helmet"
import {Header, Titulo, ContenedorHeader} from '../elements/Header'
import BotonRegresar from "./../elements/BotonRegresar"
import BarraTotalGastado from './BarraTotalGastado'
import FormularioGasto from './FormularioGasto'
import {useParams} from 'react-router-dom'
import useObtenerGasto from './../hooks/useObtenerGasto'

const EditarGastos = () => {
    const {id} = useParams()
    const gasto = useObtenerGasto(id)

    return (
        <>
            <Helmet>
                <title>Editar Gasto</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <BotonRegresar />
                    <Titulo>Editar Gasto</Titulo>

                </ContenedorHeader>
            </Header>

            <FormularioGasto gasto={gasto}/>

            <BarraTotalGastado/>
        </>
    )
}

export default EditarGastos
