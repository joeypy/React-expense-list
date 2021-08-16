import React, {useState} from 'react'
import {Helmet} from "react-helmet"
import {Header, Titulo, ContenedorHeader} from '../elements/Header'
import Boton from './../elements/Boton'
import  {Formulario, Input, ContenedorBoton} from './../elements/ElementosDeFormularios'
import {ReactComponent as SvgLogin} from './../img/login.svg'
import styled from 'styled-components'
import {useHistory} from 'react-router-dom'
import {auth} from './../firebase/firebaseConfig'
import Alerta from './../elements/Alerta'

const InicioSesion = () => {
    const history = useHistory()
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [estadoAlerta, setEstadoAlerta] = useState(false)
    const [alerta, setAlerta] = useState({})

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setCorreo(e.target.value)
        }else if (e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setEstadoAlerta(false)
        setAlerta({})

        const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/
        if(!expresionRegular.test(correo)){
            setEstadoAlerta(true)
            setAlerta({
                tipo: "error",
                mensaje: "Por favor ingrese un correo electrónico válido."
            })
            return
        }

        if(correo === "" || password === ""){
            setEstadoAlerta(true)
            setAlerta({
                tipo: "error",
                mensaje: "Todos los campos son obligatorios."
            })
            return
        }

        try {
            await auth.signInWithEmailAndPassword(correo, password)
            history.push('/')
        } catch(error) {
            setEstadoAlerta(true)
            let mensaje
            switch(error.code){
                case 'auth/wrong-password':
                    mensaje = 'La contraseña no es correcta.'
                    break;
                case 'auth/user-not-found':
                    mensaje = 'No existe ninguna cuenta con el correo electrónico.'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
                    break;
            }
            setAlerta({
                tipo: "error",
                mensaje: mensaje
            }) 
        }
        
    }

    return (
        <>
            <Helmet>
                <title>Iniciar Sesión</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Iniciar Sesión</Titulo>
                    <div>
                        <Boton to='/crear-cuenta'>Registrarse</Boton>
                    </div>
                </ContenedorHeader>
		    </Header>
            <Formulario onSubmit={handleSubmit}>
                <Svg/>
                <Input 
                    type="email"
                    name="email"
                    placeholder="Correo Electrónico"
                    value={correo}
                    onChange={handleChange}
                />
                <Input 
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={handleChange}
                />
                <ContenedorBoton>
                    <Boton as="button" type="submit" primario>Iniciar Sesión</Boton>
                </ContenedorBoton>
            </Formulario>
            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                setEstadoAlerta={setEstadoAlerta}/>
        </>
    )
}

const Svg = styled(SvgLogin)`
    width: 100%;
    max-height: 12.5rem; /* 200 px */
    margin-bottom: 1.25rem; /* 20px */
    `

export default InicioSesion