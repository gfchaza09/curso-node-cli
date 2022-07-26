const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [{
            value: '1',
            name: `${'1.'.green} Crear tarea`,
        },
        {
            value: '2',
            name: `${'2.'.green} Listar tareas`,
        },
        {
            value: '3',
            name: `${'3.'.green} Listar tareas completadas`,
        },
        {
            value: '4',
            name: `${'4.'.green} Listar tareas pendientes`,
        },
        {
            value: '5',
            name: `${'5.'.green} Completar tarea(s)`,
        },
        {
            value: '6',
            name: `${'6.'.green} Borrar tarea`,
        },
        {
            value: '0',
            name: `${'0.'.red} Salir`,
        }],
    }
];

const inquirerMenu = async () => {
    
    console.clear();
    console.log('========================'.green);
    console.log(' Seleccione una opción '.white);
    console.log('========================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async () => {
    const question = [{
        type: 'input',
        name: 'pausa',
        message: `Presiones ${'ENTER'.green} para continuar`,
    }];

    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async ( message ) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate( value ) {
            if ( value.length === 0) {
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

const listadoTareasBorrar = async ( tareas = [] ) => {
    
    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
        }
    })

    choices.unshift({
        value: '',
        name: `${'0.'.red} Cancelar`
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: '¿Qué tarea desea borrar?',
            choices
        }
    ];

    console.clear();
    console.log('========================'.red);
    console.log(' Seleccione una tarea '.white);
    console.log('========================\n'.red);

    const { id } = await inquirer.prompt(questions);

    return id;
}

const confirmar = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message,
    }];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const listadoTareasChecklist = async ( tareas = [] ) => {
    
    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: tarea.completadoEn && true,
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selección',
            choices
        }
    ];

    console.clear();
    console.log('========================'.green);
    console.log(' Seleccione una o más tareas '.white);
    console.log('========================\n'.green);

    const { ids } = await inquirer.prompt(questions);

    return ids;
}

module.exports = {
    inquirerMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    listadoTareasChecklist
};