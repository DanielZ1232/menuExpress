const { menu, pausa, leerInput} = require('./helpers/menu');
const Tareas = require('./models/tareas');
const guardarDB = require('./helpers/guardarArchivo');


const principal = async () => {

    let opt = 0;
    const tareas = new Tareas();

    do {
        opt = await menu();
    
        switch (opt) {
          case '1': // Crear tarea
            const desc = await leerInput('Descripcion: ')
            tareas.crearTarea(desc);
            guardarDB(tareas._listado);

            break;

          case '2': // Listar tareas
          console.log('\n');
                tareas.listarTareas();

            break;
          case '3': // Listar tareas completadas
            console.log('\n');
            tareas.listarCompletadas();
            break;

          case '4': // Listar tareas pendientes
            console.log('\n');
            tareas.listarPendientes();
            break;

          case '5': // Completar tareas
            const ids = await tareas.seleccionarTareas(tareas._listado);
            tareas.marcarCompletadas(ids);
            guardarDB(tareas._listado);
            console.log('\nTareas actualizadas:');
            tareas.listarTareas(); // Mostrar todas las tareas actualizadas en forma de tabla
            break;

            case '6': // Borrar tarea
            const id = await tareas.seleccionarTareaParaBorrar(tareas._listado);
            if (id !== '0') {
                tareas.borrarTarea(id);
                console.log(`\nTarea borrada correctamente`.green);
                guardarDB(tareas._listado);
            }
            break;
        


          default:
            break;
        }
        if (opt !== '0') await pausa();
    } while (opt !== '0')
}

principal();