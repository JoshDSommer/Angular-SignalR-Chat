angular.module("AngularChat", [])
    .controller("ChatController", ['$scope', 'Chat', '$rootScope', function ($scope, Chat, $rootScope) {
        //message model for input 
        $scope.msg = {
            user: prompt('Enter your name:', ''),
            message: '',
        }
        //list of messages, default defined
        $scope.messages = [{
            user: 'Chat Bot',
            message: 'Welcome to Angular Chat ' + $scope.msg.user + ', go ahead and enter your message now'
        }]

        //when the send message button is clicked
        $scope.sendMessage = function (message, user) {
            if (message != '') {
                //call our Chat service sendMessage
                Chat.sendMessage(user, message);
                //updates the current message to blank and sets focus back
                $scope.msg.message = '';
                $("#message").focus();
            }
        }
        //set focus
        $("#message").focus();
        //initialize chat.
        Chat.initialize();

        //when the Chat Service broadcasts a addNewMessageToPage Line 11 ChatHub.cs 
        $scope.$parent.$on('addNewMessageToPage', function (e, user, message) {
            $scope.$apply(function () {
                //add this message to the current message list.
                return $scope.messages.push({
                    user: user,
                    message: message
                })
            });
        });
       
    }]);