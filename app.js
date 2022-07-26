require('colors');

// const { mostrarMenu, pausa } = require('./helpers/mensajes')
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, listadoTareasChecklist } = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tareas = require('./models/tareas');

console.clear();

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = readDB();

    if (tareasDB) {
        tareas.cargarTareasFromArr(tareasDB);
    }

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1': // Crear tarea
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
                break;
            case '2': // Listar tareas
                tareas.listadoCompleto();
                break;
            case '3': // Listar tareas completadas
                tareas.listarCompletadasPendientes();
                break;
            case '4': // Listar tareas pendientes
                tareas.listarCompletadasPendientes(false);
                break;
            case '5': // Completar tarea(s)
                const ids = await listadoTareasChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6': //Borrar
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if (id) {
                    const ok = await confirmar("¿Está seguro que desea borrar esta tarea?");
                    
                    if ( ok ) {
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada");
                    }
                }

                break;
        };

        if (opt !== '0') {
            saveDB(tareas.listadoArr);
            await pausa();
        }

    } while(opt !== '0');

}

main();