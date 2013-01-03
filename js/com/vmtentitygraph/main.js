var tcoz = { };

function startApp ( ) {

   // register commands
    CommandSingleton ( ).setCommand ( { 'GET_ENTITY_DATA' : getEntityDataCommand } );

    // init whatever controllers and views you need at the outset
    vmtEntityGraphController.init ( vmtEntityGraphView );
}