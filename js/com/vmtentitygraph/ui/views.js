var vmtEntityGraphView = ( tcoz.vmtEntityGraphView = baseView ( ) );

vmtEntityGraphView.init = function ( ) {

    this.setScreenElement ( function ( ) {

        var element = '';

        jQuery.get ( 'js/com/vmtentitygraph/renderers/vmtEntityGraphRenderer.html',
            function ( data ) {
                element = jQuery ( data ).appendTo ( '#maincontentcontainer' );

                vmtEntityGraphView.drawChart ( );

                jQuery ( '#vmname').text ( StartupSingleton ( ).vmname );
                // jQuery ( '#rawdata').text ( vmtEntityGraphView.getData ( ) );
            }
        );
        return element;

    } ( ) );
};

vmtEntityGraphView.drawChart = function ( ) {

    var vcpuUtilizationValsArray = tcoz.parseXMLAttribute ( 'ServiceEntityHistory', 'VCPU_utilization', vmtEntityGraphView.getData ( ) ),
        vcpuUtilizationTimeArray = tcoz.parseXMLAttribute ( 'ServiceEntityHistory', 'time', vmtEntityGraphView.getData ( ) ),
        vmemUtilizatonArray = tcoz.parseXMLAttribute ( 'ServiceEntityHistory', 'VMem_utilization', vmtEntityGraphView.getData ( ) ),
        storageUtilizatonArray = tcoz.parseXMLAttribute ( 'ServiceEntityHistory', 'StorageAccess_utilization', vmtEntityGraphView.getData ( ) ),
        layer0Canvas = jQuery ( '#layer0').get ( 0 ),
        layer0CanvasContext =  layer0Canvas.getContext ( '2d'),
        layer1CanvasContext =  jQuery ( '#layer1').get ( 0 ).getContext ( '2d'),
        layer2CanvasContext =  jQuery ( '#layer2').get ( 0 ).getContext ( '2d'),
        originPoint = { 'x' : 50, 'y' : layer0Canvas.height - 25 },
        i = 0;


    // draw the border
    layer0CanvasContext.strokeStyle = '#000000';
    layer0CanvasContext.strokeRect ( 0, 0, layer0Canvas.width, layer0Canvas.height );
    layer0CanvasContext.stroke ( );

    // draw the axis lines
    layer0CanvasContext.beginPath ( );
    layer0CanvasContext.moveTo ( originPoint.x - 10, originPoint.y - 20 );
    layer0CanvasContext.lineTo ( layer0Canvas.width - 30, originPoint.y - 20 );
    layer0CanvasContext.stroke ( );

    layer0CanvasContext.beginPath ( );
    layer0CanvasContext.moveTo ( originPoint.x - 10, originPoint.y - 20 );
    layer0CanvasContext.lineTo ( originPoint.x - 10, 40 );
    layer0CanvasContext.stroke ( );

    // set the font style
    layer0CanvasContext.font = 'bold 10px sans-serif';

    // Draw X Axis labels (compute max val and normalize to integer above it )
    var getMaxArray = vcpuUtilizationValsArray;
    getMaxArray.sort( function ( a, b ) { return a-b } );

    var max = Math.ceil ( getMaxArray [ getMaxArray.length - 1 ] + 1 );
    layer0CanvasContext.fillStyle = "#000000";
    layer0CanvasContext.fillText ( '0', originPoint.x - 25, originPoint.y - 20 );
    layer0CanvasContext.fillText ( max.toString ( ), originPoint.x - 25, 50 );

    // Get times, draw Y axis labels, get values, draw indicators
    var lastXCoord = -1;
    var lastYCoord = -1;
    for ( i = 0; i < vcpuUtilizationValsArray.length; i += 1 ) {

        var date = new Date ( );
        date.setTime ( vcpuUtilizationTimeArray [ i ] );

        var xCoord = originPoint.x + ( i * 40 );
        var timeLabelVal = date.getHours ().toString ( ) + ":" + date.getMinutes ().toString ( );

        layer0CanvasContext.fillStyle = "#000000";
        layer0CanvasContext.fillText ( timeLabelVal, xCoord, originPoint.y );

        var yAxisLength = originPoint.y - 50;
        var pctOfMax = vcpuUtilizationValsArray [ i ] / max;
        var yCoord = ( originPoint.y - 20 ) - ( yAxisLength * pctOfMax );

        // draw the graph lines
        layer0CanvasContext.strokeStyle = '#FF0000';
        layer0CanvasContext.lineWidth = 3;
        if ( lastXCoord !== -1 ) {
            layer0CanvasContext.beginPath ( );
            layer0CanvasContext.moveTo ( lastXCoord, lastYCoord );
            layer0CanvasContext.lineTo ( xCoord, yCoord );
            layer0CanvasContext.stroke ( );
        }

        // draw circle indicators
        layer1CanvasContext.fillStyle = "#00FF00";
        layer1CanvasContext.beginPath ( );
        layer1CanvasContext.arc ( xCoord, yCoord, 5, 0, 2 * Math.PI, false );
        layer1CanvasContext.fill ( );
        layer1CanvasContext.lineWidth = 1;
        layer1CanvasContext.strokeStyle = '#000000';
        layer1CanvasContext.stroke ( );

        // preserve the last coords so we know the last location to a draw a line from (to this location).
        lastXCoord = xCoord;
        lastYCoord = yCoord;
    }
};