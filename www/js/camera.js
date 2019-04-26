/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

document.addEventListener("deviceready", function () {
    // Initialize the database after the Cordova is ready.
});


$(".openback").click(function () {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 90,
        destinationType: Camera.DestinationType.FILE_URI,
        cameraDirection: 1,
        correctOrientation: true,
        encodingType: Camera.EncodingType.JPEG
    });

    function onSuccess(imageData) {
        var image = document.getElementById('pic');
        image.src = imageData;
        $(".savetofile").css("display", "block");
    }

    function onFail(message) {
        //alert('Failed because: ' + message); 
    }

});


// A button will call this function
$(".savetofile").click(function () {
    //sessionStorage.removeItem('imagepath');
    //alert($("#pic").attr("src"));
    onPhotoDataSuccess($("#pic").attr("src"));
});


function onPhotoDataSuccess(imageURI) {
    // Uncomment to view the base64 encoded image data
    // console.log(imageData);

    var imgProfile = document.getElementById('pic');
    imgProfile.src = imageURI;
    movePic(imageURI);
}

function onFail(message) {
    alert('Failed because: ' + message);
}

function movePic(file) {
    window.resolveLocalFileSystemURI(file, resolveOnSuccess, resOnError);
}

//Callback function when the file system uri has been resolved
function resolveOnSuccess(entry) {
    var d = new Date();
    var n = d.getTime();
    //new file name
    var newFileName = n+ "-sametozden.jpg";
    var myFolderApp = "SametOzdenCordova";

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSys) {
        //The folder is created if doesn't exist
        fileSys.root.getDirectory(myFolderApp,
                {create: true, exclusive: false},
        function (directory) {
            entry.moveTo(directory, newFileName, successMove, resOnError);
        },
                resOnError);
    },
            resOnError);
}

//Callback function when the file has been moved successfully - inserting the complete path
function successMove(entry) {
    alert("Photo successfully saved in SametOzdenCordova folder");
    $("#pic").css("display", "none");
    //Store imagepath in session for future use
    // like to store it in database
    //sessionStorage.setItem('imagepath', entry.fullPath);
}

function resOnError(error) {
    alert(error.toString());
}