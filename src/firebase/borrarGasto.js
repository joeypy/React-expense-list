import {db} from './firebaseConfig';

const borrarGasto = (id) => {
	return db.collection('gastos').doc(id).delete();
}

export default borrarGasto;