(function(window) {
    'use strict';
    var FORM_SELECTOR = '[post-a-topic="form"]';
    var TOPICSLIST_SELECTOR = '[post-topic="topiclist"]';
    var SERVER_URL = 'http://localhost:3002/TopicSubmissions';
    var App = window.App;
    //var CS = App.CS;
    var RemoteDB = App.RemoteDB;
    var FormHandler = App.FormHandler;
    var TopicsList = App.TopicsList;
    var remoteDB = new RemoteDB(SERVER_URL);
    //var csCourses = new CS(remoteDB);
    //window.csCourses = csCourses;
    var topicsList = new TopicsList(TOPICSLIST_SELECTOR, remoteDB);
    var formHandler = new FormHandler(FORM_SELECTOR);

    //Project 1 -LOAD UP THE PAGE WITH TOPICS
    var $ = window.jQuery;
    $.get(SERVER_URL, function(data) {
        $(data).each(function(key, value) {
            topicsList.addRow(value);
        });
    });

    //On topic submit button
    formHandler.addSubmitHandler(function(data) {
        data.id = data.topic;
        data.likes = 0;
        data.dislikes = 0;
        return remoteDB.add.call(remoteDB, data)
            .then(function() {
                topicsList.addRow.call(topicsList, data);
            });
    });
})(window);
