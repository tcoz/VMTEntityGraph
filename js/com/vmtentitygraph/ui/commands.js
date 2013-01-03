/* RETURN ALL ENTITIES FROM A GIVEN GROUP */

var getEntityDataCommand = ( tcoz.getEntityDataCommand = baseCommand ( ) );

getEntityDataCommand.DATA_AVAILABLE = "getEntityDataCommand_data_available";
getEntityDataCommand.execute = function ( dataObj ) {

    var destinationURL = StartupSingleton ().vmEntityTwoHourSnapshots;

    getEntityDataCommand.dispatchCommandNotification ( 'AJAX_CALL',
        { 'destination' : destinationURL, 'callback' : getEntityDataCommand.onAjaxReturn }
    );
};

getEntityDataCommand.onAjaxReturn = function ( dataObj ) {
    getEntityDataCommand.dispatchControllerNotification ( getEntityDataCommand.DATA_AVAILABLE, dataObj.ajaxReturn );
};

/* REST CALL FOR VM ENTITY FORMAT

 http://10.10.172.180/vmturbo/api?inv.c&ServiceEntityHistoryService&getByNameOrUuid&vm-9029&VMem/utilization|VMem/peakUtilization|VCPU/utilization|VMem/units|VCPU/units|VCPU/peakUtilization|VStorage/utilization|VStorage/peakUtilization|StorageAccess/utilization|StorageAccess/peakUtilization|StorageLatency/utilization|StorageLatency/peakUtilization|StorageAccess/used|StorageLatency/used|VMem/used|VCPU/used|VStorage/used||StorageAccess/peak|StorageLatency/peak|VMem/peak|VCPU/peak|VStorage/peak|priceIndex&1357225233000&1357232433000&Snapshots

 http://<opsmgr ip>
 /vmturbo/api?inv.c&ServiceEntityHistoryService&getByNameOrUuid&
 <internal name or uuid>
 &VMem/utilization|VMem/peakUtilization|VCPU/utilization|VMem/units|VCPU/units|VCPU/peakUtilization|VStorage/utilization|VStorage/peakUtilization|StorageAccess/utilization|StorageAccess/peakUtilization|StorageLatency/utilization|StorageLatency/peakUtilization|StorageAccess/used|StorageLatency/used|VMem/used|VCPU/used|VStorage/used||StorageAccess/peak|StorageLatency/peak|VMem/peak|VCPU/peak|VStorage/peak|priceIndex&
 __starttime__
 &
 __endtime__
 &Snapshots

*/