/* Declare controller aliases so you don't have to type whole namespace every time */
var vmtEntityGraphController = ( tcoz.vmtEntityGraphController = baseController ( ) );

/* Enable notifications for whatever controllers want them */
ControllerSingleton ( ).setController ( vmtEntityGraphController );

/* --- Add your controllers --- */

vmtEntityGraphController.init = function ( view ) {

    this.setView ( view );

    // Make this controller listen a given notification
    vmtEntityGraphController.setNotificationListener ( getEntityDataCommand.DATA_AVAILABLE );
    // Fire the command by the key registered in main.js, and send some data
    vmtEntityGraphController.dispatchCommandNotification ( 'GET_ENTITY_DATA' );

    return this;
};

// handle the notification
vmtEntityGraphController.notify = function ( notification ) {
    if ( notification.type === getEntityDataCommand.DATA_AVAILABLE ) {
        // set the returned data onto the controller's view, and init it.
        vmtEntityGraphController.getView ().setData ( notification.data );
        vmtEntityGraphController.getView ().init ( );
    }
};