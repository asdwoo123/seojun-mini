const opcua = require('node-opcua');
const async = require('async');
const SocketIO = require('socket.io');
const express = require('express');

const client = new opcua.OPCUAClient();
const endpointUrl = `opc.tcp://192.168.1.11:4840`;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extends: false }));

let the_subscription, the_session, io;

async.series([
        function(callback) {
            client.connect(endpointUrl, (err) => {
                if (err) {
                    console.log('cannot connect to endpoint:', endpointUrl);
                } else {
                    console.log('connected !');
                }
                callback(err);
            });
        },
        function(callback) {
            client.createSession(null, (err, session) => {
                if (!err) {
                    the_session = session;
                    app.set('session', session);
                }
                callback(err);
            });
        },
        function(callback) {
            the_subscription = new opcua.ClientSubscription(the_session, {
                requestedPublishingInterval: 500,
                publishingEnabled: true,
                priority: 10
            });
            the_subscription.on('started', () => {
                console.log('subscription started');
            });

            const server = app.listen('3000', () => {
                console.log('web server started');
            });
            const router = express.Router();
            router.post('/setTotal', (req, res) => {
                const nodesToWrite = [{
                    nodeId: 'ns=3;s="BalluffSignalLightB1"',
                    attributeId: opcua.AttributeIds.Value,
                    value: {
                        dataType: opcua.DataType.Int32,
                        value: req.data
                    }}
                ];
                the_session.write(nodesToWrite);
            });

            app.use('/', router);
            io = SocketIO(server, { path: '/socket.io' });
            io.on('connection', (socket) => {
               getPLCData('C_Total');
               getPLCData('Cycle time');
               getPLCData('sPartnumber');
            });
            monitorWork('ns=3;s="As"."C_Total"', 'C_Total');
            monitorWork('ns=3;s="As"."Cycle time"', 'Cycle time');
            monitorWork('ns=3;s="DB_Recipes"."current"."sPartnumber"', 'sPartnumber');
        },

        function(callback) {
            the_session.close((err) => {
                if (err) {
                    console.log('session closed error');
                }
                callback();
            });
        }
    ], (err) => {
        if (err) {
            console.log('failure', err);
        } else {
            console.log('done!');
        }
        client.disconnect(() => {});
    }
);


function monitorWork(nodeId, browseName) {
    const monitoredItem = the_subscription.monitor({
        nodeId: `${nodeId}`,
        attributeId: 13
    }, {
        samplingInterval: 100,
        discardOldest: true,
        queueSize: 100
    });
    monitoredItem.on('changed', (dataValue) => {
        let dataV = dataValue.value.value;
        if (browseName === 'image_uri') {
            dataV = dataValue.value.value.toString('base64');
        }
        app.set(`${browseName}`, dataV);
        /*const value = app.get(`${browseName}`);*/
        /*console.log(value);*/
        io.sockets.emit(`${browseName}`, {
            value: dataV
        });
    });
}

function getPLCData(browseName) {
    const value = app.get(`${browseName}`);
    io.sockets.emit(`${browseName}`, {
        value
    });
}
