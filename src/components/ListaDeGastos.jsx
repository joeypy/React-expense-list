import React from 'react'
import {Helmet} from "react-helmet"
import {Header, Titulo, ContenedorHeader} from '../elements/Header'
import BotonRegresar from "./../elements/BotonRegresar"
import BarraTotalGastado from './BarraTotalGastado'
import useObtenerGastos from './../hooks/useObtenerGastos'
import {
    Lista,
    ElementoLista,
    Categoria,
    Descripcion,
    Valor,
    Fecha,
    ContenedorBotones,
    BotonAccion,
    BotonCargarMas,
    ContenedorBotonCentral,
    ContenedorSubtitulo,
    Subtitulo
} from './../elements/ElementosDeLista'
import IconoCategoria from './../elements/IconoCategoria'
import convertirAMoneda from './../functions/convertirAMoneda'
import {ReactComponent as IconoEditar} from './../img/editar.svg'
import {ReactComponent as IconoBorrar} from './../img/borrar.svg'
import {Link} from 'react-router-dom'
import Boton from './../elements/Boton'
import {format, fromUnixTime} from 'date-fns'
import {es} from 'date-fns/locale'
import borrarGasto from './../firebase/borrarGasto'

export const ListaDeGastos = () => {
	const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos();

	const formartearFecha = (fecha) => {
		return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es})
	}

	const fechaEsIgual = (gastos, index, gasto) => {
		if(index !== 0) {
			let fechaActual = formartearFecha(gasto.fecha)
			let fechaGastosAnterior = formartearFecha(gastos[index - 1].fecha)

			if(fechaActual === fechaGastosAnterior){
				return true
			}else{
				return false
			}
		}
	}

	return (
        <>
		<Helmet>
			<title>Lista de Gastos</title>
		</Helmet>
		<Header>
			<ContenedorHeader>
                <BotonRegresar />
				<Titulo>Lista de Gastos</Titulo>
				
			</ContenedorHeader>
		</Header>

		<Lista>
			{gastos.map( (gasto, index) => {
				return (
					<div key={gasto.id}>
						{!fechaEsIgual(gastos, index, gasto) && 
							<Fecha>{formartearFecha(gasto.fecha)}</Fecha>
						}
						<ElementoLista key={gasto.id}>
							<Categoria>
								<IconoCategoria id={gasto.categoria}/> 
								{gasto.categoria}
							</Categoria>
							<Descripcion>
								{gasto.descripcion}
							</Descripcion>
							<Valor>
								{convertirAMoneda(gasto.cantidad)}
							</Valor>

							<ContenedorBotones>
								<BotonAccion  as={Link} to={`/editar/${gasto.id}`}>
									<IconoEditar/>
								</BotonAccion>
								<BotonAccion onClick={() => borrarGasto(gasto.id)}>
									<IconoBorrar/>	
								</BotonAccion>
							</ContenedorBotones>
						</ElementoLista>
					</div>
				)
			})}	
			{hayMasPorCargar && 
				<ContenedorBotonCentral>
					<BotonCargarMas onClick={() => obtenerMasGastos()}>Cargar Más</BotonCargarMas>
				</ContenedorBotonCentral>
			}

			{gastos.length === 0 &&
				<ContenedorSubtitulo>
					<Subtitulo>No hay gastos por mostrar</Subtitulo>
					<Boton as={Link} to="/">Agregar Gasto</Boton>
				</ContenedorSubtitulo>
			}
		</Lista>

		<BarraTotalGastado/>
    </>
    )
}
export default ListaDeGastos