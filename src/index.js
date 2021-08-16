import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import WebFont from 'webfontloader'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {Helmet} from "react-helmet"
import favicon from './img/logo.png'
// Components
import InicioSesion from './components/InicioSesion'
import EditarGastos from './components/EditarGastos'
import GastosPorCategoria from './components/GastosPorCategoria'
import RegistroUsuarios from './components/RegistroUsuarios'
import ListaDeGastos from './components/ListaDeGastos'
import RutaPrivada from './components/RutaPrivada'
// Elements
import Contenedor from './elements/Container'
import Fondo from './elements/Fondo'
import { AuthProvider } from './context/AuthContext'
import { TotalGastadoProvider } from './context/TotalGastadoEnMesContext'

WebFont.load({
    google: {
      families: ['Work Sans:400,500,700', 'sans-serif']
    }
})

const Index = () => {
	return (
		<>
			<Helmet>
				<link rel="shortcut icon" href={favicon} type="image/x-icon"/>
				<title>Mis Gastos</title>
			</Helmet>
			<AuthProvider>
				<TotalGastadoProvider>	
					
					<BrowserRouter>
						<Contenedor>
							<Switch>
								<Route path='/iniciar-sesion' component={InicioSesion}/>
								<Route path='/crear-cuenta' component={RegistroUsuarios}/>

								<RutaPrivada path='/lista'>
									<ListaDeGastos/>
								</RutaPrivada>
								<RutaPrivada path='/editar/:id'>
									<EditarGastos/>
								</RutaPrivada>
								<RutaPrivada path='/categorias'>
									<GastosPorCategoria/>
								</RutaPrivada>
								<RutaPrivada path='/'>
									<App/>
								</RutaPrivada>

							</Switch>
						</Contenedor>
					</BrowserRouter>
					
				</TotalGastadoProvider>
			</AuthProvider>

			<Fondo />
		</>
	)
}

ReactDOM.render(<Index/>, document.getElementById('root'))