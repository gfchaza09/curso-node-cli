const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    get listadoArr() {
        const listado = [];

        // Otro modo de convertir un objeto a un array
        // Object.keys(this._listado).forEach(key => {
        //     const tarea = this._listado[key];
        //     listado.push(tarea);
        // });

        for (const key in this._listado) {
            const tarea = this._listado[key];
            listado.push(tarea);
        }
        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea( id = '') {
        this._listado[id] && delete this._listado[id];
    }

    cargarTareasFromArr(info = []) {
        for (const tarea of info) {
            this._listado[tarea.id] = tarea;
        }
    }

    crearTarea(desc='') {
        const tarea = new Tarea(desc);

        this._listado[tarea.id] = tarea;
    }

    listadoCompleto () {
        let i = 1;

        for (const tarea of this.listadoArr) {
            console.log(`${(i+ '.').green} ${tarea.desc} :: ${tarea.completadoEn ? `${tarea.completadoEn}`.green : 'Pendiente'.red}`);
            i++;
        }

        // Otra forma de mostrar el listado de tareas
        // this.listadoArr.forEach((tarea, i) => {
        //     const idx = `${i + 1}`.green;
        //     const { desc, completadoEn } = tarea;
        //     const estado = completadoEn ? 'Compleado'.green : 'Pendiente'.red;
        //     console.log(`${idx}. ${desc} :: ${estado}`)
        // });
    }

    listarCompletadasPendientes(completadas = true) {
        let i = 1;

        if (completadas) {
            const tareasCompletadas = this.listadoArr.filter(tarea => tarea.completadoEn !== null);
            for (const tarea of tareasCompletadas) {
                console.log(`${(i+ '.').green} ${tarea.desc} :: ${`${tarea.completadoEn}`.green}`);
                i++;
            }
        } else {
            const tareasPendientes = this.listadoArr.filter(tarea => tarea.completadoEn === null);
            for (const tarea of tareasPendientes) {
                console.log(`${(i+ '.').green} ${tarea.desc} :: ${'Pendiente'.red}`);
                i++;
            }
        }
    }

    toggleCompletadas = (ids = []) => {
        ids.forEach(id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;