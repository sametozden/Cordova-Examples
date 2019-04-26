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

document.getElementById("readbarcode").addEventListener("click", barcode);

function barcode() {

    cordova.plugins.barcodeScanner.scan(
            function (result) {
                /*alert("We got a barcode\n" +
                 "Result: " + result.text + "\n" +
                 "Format: " + result.format + "\n" +
                 "Cancelled: " + result.cancelled);*/

                document.getElementById("openframe").innerHTML = "Result: " + result.text;

                /*var url2 = "http://www.sametozden.com/cordova/read-barcode.php?b=" + result.text;
                 var target2 = '_self';
                 var options2 = "location=no,toolbar=no"
                 var ref2 = cordova.InAppBrowser.open(url2, target2, options2);
                 ref2.addEventListener('loadstop', loadstopCallback2);
                 function loadstopCallback2(event) {
                 //console.log('Loading finished: ' + event.url)
                 if (event.url == "http://www.sametozden.com/cordova/?mobileread=1") {
                 barcode();
                 }
                 }*/


            },
            function (error) {
                //alert("Scanning failed: " + error);
            },
            {
                preferFrontCamera: true, // iOS and Android
                showFlipCameraButton: true, // iOS and Android
                showTorchButton: true, // iOS and Android
                torchOn: true, // Android, launch with the torch switched on (if available)
                saveHistory: true, // Android, save scan history (default false)
                prompt: "Place a barcode inside the scan area", // Android
                resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                orientation: "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
                disableAnimations: true, // iOS
                disableSuccessBeep: false // iOS and Android
            }
    );

}