const inquirer = require('inquirer');

class Tareas {
    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = {
            id: new Date().toISOString(),
            descripcion: desc,
            completadoEn: null,
        };
        this._listado[tarea.id] = tarea;
    }

    listarTareas() {
        console.log();
        Object.values(this._listado).forEach((tarea, index) => {
            const idx = `${index + 1}.`.green;
            const { descripcion, completadoEn } = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red;
            console.log(`${idx} ${descripcion} :: ${estado}`);
        });
    }

    listarCompletadas() {
        console.log();
        Object.values(this._listado)
            .filter((tarea) => tarea.completadoEn)
            .forEach((tarea, index) => {
                const idx = `${index + 1}.`.green;
                console.log(`${idx} ${tarea.descripcion}`.green);
            });
    }

    listarPendientes() {
        console.log();
        Object.values(this._listado)
            .filter((tarea) => !tarea.completadoEn)
            .forEach((tarea, index) => {
                const idx = `${index + 1}.`.green;
                console.log(`${idx} ${tarea.descripcion}`.red);
            });
    }

    async seleccionarTareaParaBorrar(tareas) {
        const choices = Object.keys(tareas).map((id) => {
            const tarea = tareas[id];
            return {
                value: id,
                name: `${tarea.descripcion}`,
            };
        });
    
        choices.unshift({
            value: '0',
            name: '0 Cancelar',
        });
    
        const { id } = await inquirer.default.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Seleccione la tarea a borrar',
                choices,
            },
        ]);
    
        return id;
    }
    
    

    marcarCompletadas(ids = []) {
        ids.forEach((id) => {
            this._listado[id].completadoEn = new Date().toISOString();
        });

        Object.keys(this._listado).forEach((id) => {
            if (!ids.includes(id)) {
                this._listado[id].completadoEn = null;
            }
        });
    }

    async seleccionarTareas(tareas) {
        const choices = Object.keys(tareas).map((id) => {
            const tarea = tareas[id];
            return {
                value: id,
                name: `${tarea.descripcion} (${tarea.completadoEn ? 'Completada'.green : 'Pendiente'.red})`,
                checked: !!tarea.completadoEn, // Marca como seleccionada si ya está completada
            };
        });
    
        const { ids } = await inquirer.default.prompt([
            {
                type: 'checkbox',
                name: 'ids',
                message: 'Seleccione las tareas a completar',
                choices,
            },
        ]);
    
        return ids;
    }
    

    borrarTarea(id) {
        if (this._listado[id]) {
            delete this._listado[id];
        }
    }
}

module.exports = Tareas;
