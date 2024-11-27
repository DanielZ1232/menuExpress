const inquirer = require('inquirer');
const { validate } = require('uuid');
require('colors');



const preguntas = [
    {
        type: 'list', 
        name: 'options',
        message: '¿Qué deseas hacer?',
        choices: [
            {
                value: '1',
                name: '1 Crear tarea',
            },
            {
                value: '2',
                name: '2 Listar tareas',
            },
            {
                value: '3',
                name: '3 Listar tarea completas',
            },
            {
                value: '4',
                name: '4 Listar tarea pendientes',
            },
            {
                value: '5',
                name: '5 Completar tareas',
            },
            {
                value: '6',
                name: '6 Borrar tarea',
            },
            {
                value: '0',
                name: '0 salir',
            }
        ]
    }
]

const menu = async () => {

    console.clear();
    console.log('····························································'.green);
    console.log('       First Application'.blue);
    console.log('····························································'.green);

    const { options } = await inquirer.default.prompt(preguntas);
    return options;
    
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${`enter`.green}`
        }
    ]

    await inquirer.default.prompt(question);
}

  
const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese una descripción';
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.default.prompt(question);
    return desc;
}

module.exports = {
    menu,
    pausa,
    leerInput
};