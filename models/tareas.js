const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    crearTarea(desc = "") {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    eliminarTarea( id = "") {
        if(this._listado[id]) {
            delete this._listado[id];
        }
    }

    get listadoArr() {
        const tareas = [];
        Object.keys(this._listado).forEach(key => {
            tareas.push(this._listado[key]);
        })
        return tareas;
    }        
    
    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })
    }

    listadoCompleto() {
        console.log();
        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index + 1}.`.green;
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        })
    }

    listarPendientesCompletadas(completadas = true) {
        const tareas = this.listadoArr;
        let i = 1;
        console.log();
        tareas.forEach(tarea => {
            if(completadas) {
                if(tarea.completadoEn) {
                    console.log(`${(i + ".").green} ${tarea.desc} :: ${tarea.completadoEn}`);
                    i++;
                }
            } else {
                if(!tarea.completadoEn) {
                    console.log(`${(i + ".").green} ${tarea.desc} :: ${'Pendiente'.red}`);          
                    i++;         
                }
            }
        })
    }

    toggleCompletadas = (ids = []) => {

        ids.forEach(id => {
            const tarea = this._listado[id];
            if(!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }

        })

        this.listadoArr.forEach(tarea => {
            if(!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        })
    }
}



module.exports = Tareas;