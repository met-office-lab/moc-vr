"use strict";

function genServerCode() {
    return Math.floor(100000 + Math.random() * 900000).toString().substring(0, 4);
}

AFRAME.registerComponent("websocket-server", {
    schema: {},
    init: function () {
        var self = this;
        self.code = genServerCode();
        self.socket = io();
        self.target = false;

        self.socket.emit("register", {type: "server", code: self.code});

        self.socket.on("display", function (msg) {
            self.photosphereData = msg;
            displayPhotosphere(msg);
            self.sendState();
        });

        document.getElementById("sid").innerHTML = self.code;

        document.getElementById("serve").addEventListener("click", function () {
            var pid = document.getElementById("pid").value;
            self.socket.emit("serve", {id: pid});
        });

        document.getElementById("t").addEventListener("click", function() {
            self.target = !self.target;
            if(self.target) {
                document.getElementById("target").setAttribute("visible","true");
            } else {
                document.getElementById("target").setAttribute("visible","false");
            }
        })
        
    },
    tick: function (time) {
        var self = this;
        self.sendState();
    },
    sendState: function () {
        var self = this;
        var target = document.getElementById("target");
        var vec = new THREE.Vector3();
        vec.setFromMatrixPosition(target.object3D.matrixWorld)
        self.socket.emit("sync-server", {
            targetActive: self.target,
            targetPosition: vec,
            photosphere: self.photosphereData
        });
    }
});
