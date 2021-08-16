import React, {useState} from 'react'
import {Helmet} from "react-helmet"
import {Header, Titulo, ContenedorHeader} from '../elements/Header'
import Boton from './../elements/Boton'
import  {Formulario, Input, ContenedorBoton} from './../elements/ElementosDeFormularios'
import {ReactComponent as SvgRegister} from './../img/registro.svg'
import styled from 'styled-components'
import {auth} from './../firebase/firebaseConfig'
import {useHistory} from 'react-router-dom'
import Alerta from './../elements/Alerta'


const RegistroUsuarios = () => {
    const history = useHistory()
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [estadoAlerta, setEstadoAlerta] = useState(false)
    const [alerta, setAlerta] = useState({})

    const handleChange = (e) => {
        switch(e.target.name){
            case 'email':
                setCorreo(e.target.value)
                break
            case 'password':
                setPassword(e.target.value)
                break
            case 'password2':
                setPassword2(e.target.value)
                break
            default:
                break
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
        if(correo === "" || password === "" || password2 === ""){
            setEstadoAlerta(true)
            setAlerta({
                tipo: "error",
                mensaje: "Todos los campos son obligatorios."
            })
            return
        }
        if(password !== password2){
            setEstadoAlerta(true)
            setAlerta({
                tipo: "error",
                mensaje: "Las contraseñas no son iguales."
            })       
            return
        }

        try {
            await auth.createUserWithEmailAndPassword(correo, password)
            history.push('/')
        } catch(error) {
            setEstadoAlerta(true)
            var mensaje = ""
            switch(error.code){
                case 'auth/invalid-password':
                    mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
                    break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
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
                <title>Crear Cuenta</title>
            </Helmet>
            <Header>
                <ContenedorHeader>
                    <Titulo>Crear Cuenta</Titulo>
                    <div>
                        <Boton to='/iniciar-sesion'>Iniciar Sesion</Boton>
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
                <Input 
                    type="password"
                    name="password2"
                    placeholder="Repetir Contraseña"
                   value={password2}
                   onChange={handleChange}                
                />
                <ContenedorBoton>
                    <Boton as="button" type="submit" primario>Crear Cuenta</Boton>
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

const Svg = styled(SvgRegister)`
    width: 100%;
    max-height: 6.25rem; /* 100 px */
    margin-bottom: 1.25rem; /* 20px */
    `


export default RegistroUsuarios