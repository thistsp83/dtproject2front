   myApp.controller('UserListController', function($scope, $location, UserService,FriendService, $rootScope, $cookieStore, $http)
{
		console.log("Entering User Controller")
		var self = this;
		$scope.users=[];
		
		
		listUser=function()
		{
			console.log("Entering List Users Method")
			UserService.listUsers()
			.then
			(
				function(response)
				{
					console.log("List Users Successful")
					$scope.users=response
				}
			)
		}
		listUser();
})