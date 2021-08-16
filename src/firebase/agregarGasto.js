import {db} from './firebaseConfig'

const agregarGasto = ({id, descripcion, cantidad, categoria, fecha}) => {
    
    return db.collection('gastos').add({
        uidUsuario: id,
        descripcion: descripcion,
        cantidad: Number(cantidad),
        categoria: categoria,
        fecha: fecha
    })
}

export default agregarGasto