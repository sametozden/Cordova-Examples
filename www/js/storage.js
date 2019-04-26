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
    initDatabase();
});


function initDatabase() {
    var myDB = window.sqlitePlugin.openDatabase({name: "test.db", location: 'default'});
    myDB.transaction(function (transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS personal (id integer primary key, name varchar(50), age integer (3))', [],
                function (tx, result) {
                },
                function (error) {
                });
    });


    // add - edit

    $(".submitx").click(function () {
        var id = $("#id").val();
        var namex = $("#name").val();
        var agex = $("#age").val();

        if (id != "") { // update
            myDB.transaction(function (transaction) {
                var executeQuery = "UPDATE personal SET name=?, age=? WHERE id=?";
                transaction.executeSql(executeQuery, [namex, agex, id],
                        function (tx, result) {
                            location.reload();
                        },
                        function (error) {
                        });
            });
        }

        else { //add
            myDB.transaction(function (transaction) {
                var executeQuery = "INSERT INTO personal (name,age) VALUES (?,?)";
                transaction.executeSql(executeQuery, [namex, agex]
                        , function (tx, result) {
                            location.reload();
                        },
                        function (error) {
                        });
            });
        }

    });

// delete

    $('body').on('click', '.delete', function() {
        var id = $(this).attr("did");
        myDB.transaction(function (transaction) {
            var executeQuery = "DELETE FROM personal where id=?";
            transaction.executeSql(executeQuery, [id],
                    function (tx, result) {
                        location.reload();
                    },
                    function (error) {
                    });
        });
    });


// update 
    $('body').on('click', '.edit', function() {
        var did = $(this).attr("did");
        myDB.transaction(function (transaction) {
            transaction.executeSql('SELECT * FROM personal where id=?', [did], function (tx, results) {
                $("#id").val(results.rows.item(0).id);
                $("#name").val(results.rows.item(0).name);
                $("#age").val(results.rows.item(0).age);
            }, null);
        });
    });



    // list
    myDB.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM personal', [], function (tx, results) {
            var len = results.rows.length, i;
            //$("#rowCount").append(len);
            for (i = 0; i < len; i++) {
                $("#datax").append("<tr><td><span class=\"btn btn-info edit\" did=" + results.rows.item(i).id + ">EDIT</span> &nbsp;&nbsp; <span class=\"btn btn-danger delete\" did=" + results.rows.item(i).id + ">DELETE</span></td><td>" + results.rows.item(i).name + "</td><td>" + results.rows.item(i).age + "</td></tr>");
            }
        }, null);
    });

}