import React, { useState, useEffect} from 'react'
import {ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton} from './../elements/ElementosDeFormularios'
import Boton from './../elements/Boton'
import {ReactComponent as IconoPlus} from './../img/plus.svg'
import SelectCategorias from '../elements/SelectCategorias'
import DatePicker from './../elements/DataPicker'
import getUnixTime from 'date-fns/getUnixTime'
import {useAuth} from './../context/AuthContext'
import agregarGasto from './../firebase/agregarGasto'
import Alerta from './../elements/Alerta'
import {useHistory} from 'react-router-dom'
import fromUnixTime from 'date-fns/fromUnixTime'
import editarGasto from './../firebase/editarGasto'

const FormularioGasto = ({gasto}) => {
    const [descripcion, setDescripcion] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('hogar')
    const [fecha, setFecha] = useState(new Date())
    const {usuario} = useAuth()
    const [estadoAlerta, setEstadoAlerta] = useState(false)
    const [alerta, setAlerta] = useState({})
	const history = useHistory();

    useEffect(() => {
        if(gasto){
            console.log(gasto)
            if(gasto.uidUsuario === usuario.uid){
                setCategoria(gasto.categoria);
                setFecha(fromUnixTime(gasto.fecha));
                setDescripcion(gasto.descripcion);
                setCantidad(gasto.cantidad);
            }
		}
	}, [gasto, usuario.uid]);


    const handleChange = (e) => {
        if(e.target.name === 'descripcion') {
            setDescripcion(e.target.value)
        }else if (e.target.name === 'cantidad') {
            setCantidad(e.target.value.replace(/[^0-9.]/g, ''))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(descripcion !== "" && cantidad !== ""){
            if(cantidad){
                if(gasto){
					editarGasto({
						id: gasto.id,
						categoria: categoria,
						descripcion: descripcion,
						cantidad: cantidad,
						fecha: getUnixTime(fecha)
					}).then(() => {
						history.push('/lista');
					}).catch((error) => {
						console.log(error);
					})
				} else {
                    agregarGasto({
                        id: usuario.uid, 
                        descripcion: descripcion, 
                        cantidad: parseFloat(cantidad).toFixed(2), 
                        categoria: categoria, 
                        fecha: getUnixTime(fecha)
                    }).then( () => {
                        setCategoria('hogar')
                        setDescripcion('')
                        setCantidad('')
                        setFecha(new Date()) 
                        // Alerta
                        setEstadoAlerta(true)
                        setAlerta({tipo: 'exito', mensaje: 'El gasto fue agregado correctamente.'})
                    }).catch( (error) => {
                        setEstadoAlerta(true)
                        setAlerta({tipo: 'error', mensaje: 'Hubo un problema al intentar agregar tu gasto.'})
                    })
                }
                
            } else {
                setEstadoAlerta(true)
                setAlerta({tipo: 'error', mensaje: 'El valor que ingresaste no es correcto.'})
            }
        } else {
            setEstadoAlerta(true)
            setAlerta({tipo: 'error', mensaje: 'Por favor rellena todos los campos.'})
        }

    }

    return (
        <Formulario onSubmit={handleSubmit}>
            <ContenedorFiltros>
                <SelectCategorias 
                    categoria={categoria} 
                    setCategoria={setCategoria}/>
                <DatePicker fecha={fecha} setFecha={setFecha}/>
            </ContenedorFiltros>
            
            <div>
                <Input
                    type="text"
                    name="descripcion"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={handleChange}
                    />
                <InputGrande
                    type="text"
                    name="cantidad"
                    placeholder="$0.00"
                    value={cantidad}
                    onChange={handleChange}
                    />
            </div>
            <ContenedorBoton>
                <Boton as="button" primario conIcono type="submit">
                    Agregar Gasto <IconoPlus/>
                </Boton>
            </ContenedorBoton>
            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                setEstadoAlerta={setEstadoAlerta}/>  
        </Formulario>
    )
}

export default FormularioGasto