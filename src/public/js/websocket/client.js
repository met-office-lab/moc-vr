"use strict";

AFRAME.registerComponent('websocket-client', {
    schema: {},
    init: function () {
        var self = this;
        var code;

        if (!code) {
            code = prompt("Enter session code:");
            console.log(code);
        }

        var socket = io();
        socket.emit("register", {type: "client", code: code});

        socket.on("display", displayPhotosphere);

        socket.on("sync-client", function (msg) {
            //do something with rotation info here
            console.log(msg);
            var pos3DVec = msg.targetPosition;
            var posString = pos3DVec.x +" " + pos3DVec.y + " " + pos3DVec.z;

            var target = document.getElementById('target');
            var cam = document.getElementById('camera');

            target.setAttribute('position', posString);
            target.object3D.lookAt(cam.object3D.position);
        });

    }
});
