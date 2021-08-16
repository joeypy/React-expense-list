import React from 'react'
import { Helmet } from "react-helmet"
import { Header, Titulo, ContenedorHeader } from '../elements/Header'
import BotonRegresar from "./../elements/BotonRegresar"
import BarraTotalGastado from './BarraTotalGastado'
import useObtenerGastosDelMesPorCategoria from './../hooks/useObtenerGastosDelMesPorCategoria'
import { ListaDeCategorias, ElementoListaCategorias, Categoria, Valor } from './../elements/ElementosDeLista'
import IconoCategoria from './../elements/IconoCategoria'
import convertirAMoneda from './../functions/convertirAMoneda'

const GastosPorCategorias = () => {
	const gastosPorCategorias = useObtenerGastosDelMesPorCategoria()

    return (
    <>
		<Helmet>
			<title>Gastos por Categoria</title>
		</Helmet>
		<Header>
			<ContenedorHeader>
                <BotonRegresar />
				<Titulo>Gastos por Categoria</Titulo>

			</ContenedorHeader>
		</Header>

		<ListaDeCategorias>
			{gastosPorCategorias.map( (elemento, index) => {
				return (
					<ElementoListaCategorias key={index}>
						<Categoria>
							<IconoCategoria id={elemento.categoria}/>
							{elemento.categoria}
						</Categoria>
						<Valor>{convertirAMoneda(elemento.cantidad)}</Valor>
					</ElementoListaCategorias>
				)
			})}
		</ListaDeCategorias>
			
		<BarraTotalGastado/>
    </>
    )
}

export default GastosPorCategorias