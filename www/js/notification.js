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

document.addEventListener("deviceready", onDeviceReady, false);

$("a[target='_blank']").click(function(e){
  e.preventDefault();
  window.open($(e.currentTarget).attr('href'), '_system', '');
});

function onDeviceReady() {
    var push = PushNotification.init({"android": {"senderID": "39390188429"}});
    push.on('registration', function (data) {
        //alert(data.registrationId);
        document.getElementById("ntf").innerHTML = "<a href=\"http://www.sametozden.com/cordova/web-push.php?to=" + data.registrationId + "\" target=\"_blank\" class=\"btn btn-primary\">Please open this link in your web browser</a>";
    });

    push.on('notification', function (data) {
        alert("You read the notification");
        //alert(data.title + " Message: " + data.message);
    });

    push.on('error', function (e) {
        alert(e);
    });
}