import { useState, useEffect } from 'react'
import {db} from './../firebase/firebaseConfig'
import {useHistory} from 'react-router-dom'

const useObtenerGasto = (id) => {
    const history = useHistory()
    const [gasto, setGasto] = useState([])

    useEffect(() => {
        db.collection('gastos').doc(id).get()
        .then((doc) => {
            if(doc.exists){
                setGasto({
                    id: id,
                    cantidad: doc.data().cantidad, 
                    fecha: doc.data().fecha, 
                    uidUsuario: doc.data().uidUsuario, 
                    descripcion: doc.data().descripcion, 
                    categoria: doc.data().categoria}
                    )
            } else {
                history.push('/lista')
            }
        })

    }, [history, id])

    return gasto
}


export default useObtenerGasto
