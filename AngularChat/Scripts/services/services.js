//Angular chat service
angular.module('AngularChat')
    .service('Chat', ['$rootScope', function ChatService($rootScope) {
        var proxy = null;

        var initialize = function () {
            //Getting the connection object
            connection = $.hubConnection();

            //Creating proxy
            this.proxy = connection.createHubProxy('chatHub');

            //Starting connection
            connection.start();

            //Publishing an event when server pushes a new message
            this.proxy.on('addNewMessageToPage', function (user,message) {
                $rootScope.$emit("addNewMessageToPage", user,message);
            });
        };

        var sendMessage = function (user, message) {
            //Invoking the send method defined in hub ( note in ChatHub.cs it's Send javacript signalr changes it to send.)
            this.proxy.invoke('send', user, message);
        };

        //return service object.
        return {
            initialize: initialize,
            sendMessage: sendMessage
        };
    }]);