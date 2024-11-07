const { menu, pausa, leerInput} = require('./helpers/menu');
const Tareas = require('./models/tareas');


const principal = async () => {

    let opt = 0;
    const tareas = new Tareas();

    do {
        opt = await menu();
    
        switch (opt) {
          case '1': // Crear tarea
            const desc = await leerInput('Descripcion: ')
            tareas.crearTarea(desc);

            break;

          case '2': // Listar tareas
            console.log(tareas._listado);

            break;

          default:
            break;
        }
        if (opt !== '0') await pausa();
    } while (opt !== '0')
}

principal();