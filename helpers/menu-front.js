//VAMOS A FILTRAR LA WEB POR ROLE

const getMenuFront = (role = 'USER_ROLE') => {

    const menu = [{
            titulo: 'Dashboard',
            icon: 'mdi mdi-gauge',
            submenu: [{
                titulo: 'Main',
                url: '/'
            }, {
                titulo: 'Progress Bar',
                url: 'progress'
            }, {
                titulo: 'Gráfica',
                url: 'grafica1'
            }, {
                titulo: 'Promesas',
                url: 'promesas'
            }, {
                titulo: 'Rxjs',
                url: 'rxjs'
            }],
        },
        {
            titulo: 'Mantenimiento',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                //{ titulo: 'Usuarios', url: 'usuarios' }, 
                { titulo: 'Empresas', url: 'empresas' }, {
                    titulo: 'Trabajadores',
                    url: 'trabajadores'
                }
            ],
        }
    ];

    //Filtramos si es admin, añadimos al principio del array del submenu
    //menu[1] es la parte del primero titulo

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
    }

    return menu;


}


module.exports = { getMenuFront }