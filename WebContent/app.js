/**
 * 
 */


var myApp = angular.module("myApp", ['ngRoute', 'ngCookies']);

myApp.config(["$routeProvider","$locationProvider", function ($routeProvider,$locationProvider) {
    $routeProvider

	.when('/',
{
	templateUrl : 'home.html',
	controller : 'UserController'
})
	.when('/login',
{
	templateUrl : 'c_user/login.html',
	controller : 'UserController'
})
	.when('/logout',
{
	templateUrl : 'home.html',
	controller : 'UserController'
})
	.when('/register',
{
	templateUrl : 'c_user/register.html',
	controller : 'UserController'
})
	.when('/viewUsers',
{
	templateUrl : 'c_user/userList.html',
	controller : 'UserListController'	
})
	.when('/viewBlogs',
{
	templateUrl : 'c_blog/blogs.html',
	controller : 'BlogController'	
})
.when('/viewBlog',
{
	templateUrl : 'c_blog/viewBlog.html',	
	controller : 'BlogController'	
	
})
.when('/addBlogs',
{
	templateUrl : 'c_blog/blogs.html',	
})
	.when('/viewJobs',
{
	templateUrl : 'c_job/jobs.html',
	controller : 'JobController'	
})
	.when('/viewForums',
{
	templateUrl : 'c_forum/forums.html',
	controller : 'ForumController'	
})
	.when('/addForum',
{
	templateUrl : 'c_forum/forums.html',
})	
.when('/viewForum',
{
	templateUrl : 'c_forum/viewForum.html',
})

	.when('/viewEvents',
		{
			templateUrl : 'c_event/viewEvents.html',
			controller : 'EventController'	
		})
	.when('/viewForums',
		{
			templateUrl : 'c_forum/forums.html',
			controller : 'ForumController'	
		})
	.when('/Chat',
		{
			templateUrl : 'c_chat/chat.html',
			controller : 'ChatController'	
		})
	.when('/upload',
		{
			templateUrl : 'c_user/fileUpload.html',
//			controller : 'ChatController'	
		})
	.when('/admin',
		{
			templateUrl : 'c_admin/aHome.html',	
		})	
	.when('/manageBlogs',
		{
			templateUrl : 'c_admin/manageBlogs.html',
			controller : 'AdminController'
		})
	.when('/manageEvents',
		{
			templateUrl : 'c_admin/manageEvents.html',	
			controller : 'AdminController'
		})
		.when('/addEvents',
		{
			templateUrl : 'C_admin/manageEvents.html',	
//			controller : 'AdminController'
		})
	.when('/manageForums',
		{
			templateUrl : 'c_admin/manageForums.html',
			controller : 'AdminController'
		})
	.when('/manageJobs',
		{
			templateUrl : 'c_admin/manageJobs.html',
			controller : 'AdminController'
		})
	.when('/addJobs',
		{
			templateUrl : 'c_admin/manageJobs.html',	
//			controller : 'AdminController'
		})
	.when('/manageUsers',
		{
			templateUrl : 'c_admin/mUsers.html',	
			controller : 'AdminController'
		})
	.when('/myProfile',
		{
			templateUrl : 'c_user/myProfile.html',	
			controller : 'FriendController'
		})		
	.when('/myFriends',
		{
			templateUrl : 'c_user/myProfile.html',	
			controller : 'FriendController'
		})	
	.when('/pendingRequests',
		{
			templateUrl : 'c_user/myProfile.html',	
			controller : 'FriendController'
		})
	.when('/sentRequests',
		{
			templateUrl : 'c_user/myProfile.html',	
			controller : 'FriendController'
		})
	.when('/cmred',
		{
			templateUrl : 'c_blog/comment-redirect.html',
		})	
		.when('/cmred',
		{
			templateUrl : 'c_blog/comment-redirect.html',
		})
		
		.when('/fmred',
		{
			templateUrl : 'c_forum/forum-redirect.html',
		})			
		.when('/jred',
		{
			templateUrl : 'c_admin/jred.html',
		})
		.when('/ered',
		{
			templateUrl : 'c_admin/ered.html',
		})
	.when('/appliedJobs',
	{
		templateUrl : 'c_admin/manageJobs.html',
		controller : 'AdminController'
	})
	.when('/myJobs',
	{
		templateUrl : 'c_user/myProfile.html',
		controller : 'UserController'
	})		
	.when('/viewProfile',
	{
		templateUrl : 'c_friend/viewProfile.html',
	})		


	.otherwise({redirectTo: '/'});
    $locationProvider.hashPrefix('');
}]);



myApp.run( function ($rootScope, $location, $cookieStore, $http) 
		{
			 $rootScope.$on('$locationChangeStart', function (event, next, current) 
			 {
				 console.log("$locationChangeStart")
				    
				 var userPages = ['/myProfile','myFriends','pendingRequests','sentRequests','/upload','/viewUsers','/addBlogs','/addForum','/viewProfile','/viewBlog','/viewForum','/viewForums'];
				 var adminPages = ['/admin','/manageUsers','/manageJobs','/manageEvents','/manageForums','/manageBlogs','/addEvents','/addJobs','/jred','/ered','/appliedJobs'];
				 
				 var currentPage = $location.path();
				 
				 var isUserPage = $.inArray(currentPage, userPages);
				 var isAdminPage = $.inArray(currentPage, adminPages);
				 
				 var isLoggedIn = $rootScope.currentUser.username;
			        
			     console.log("isLoggedIn:" +isLoggedIn)
			     console.log("isUserPage:" +isUserPage)
			     console.log("isAdminPage:" +isAdminPage)
			        
			        if(!isLoggedIn)
			        	{
			        	
			        		if(isUserPage!=-1 || isAdminPage!=-1)  
			        	 	{
				        	  console.log("Navigating to login page:")
				        	  alert("You need to Login first!")
				        	  $location.path('/login');
				         	}
			        	}
			        
					 else //logged in
			        	{
			        	
						 var role = $rootScope.currentUser.role;
						 if(isAdminPage!=-1 && role!='ADMIN' )
							 {
							  alert("You cannot view this page as a " + role )
							  $location.path('/');
							 }
			        	}
			 });
			 
			 // to keep the user logged in after page refresh
		    $rootScope.currentUser = $cookieStore.get('currentUser') || {};
		    if ($rootScope.currentUser)
		    {
		        $http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.currentUser; 
		    }
		});

myApp.controller("UserController", function(UserService,$scope,$location,$rootScope,$http,$cookieStore)
		{
    var self = this;
	
    self.newUser = {};
    self.message = "";
  
    
	
    self.register = function(){
		
		var promise = UserService.register(self.newUser);
		
	}
    
    self.authenticate = function(user)
	{
		console.log("Authenticate Function");
		console.log(user);
		UserService.authenticate(user)
		.then 
		(
			function(d)
			{
				console.log("Login Successfull...")
				console.log(d)
				$scope.user = d;
				console.log("User ErrorCode - "+$scope.user.errorCode)
				if($scope.user.status == 'R')
					{
						alert("Your Registeration is Rejected. Please Contact ADMIN");
					}
				else if($scope.user.status == 'N')
				{
					alert("Your Registeration is Not Yet Approved. Please wait for some time.");
			    }
				else if($scope.user.username == null)
				{
					alert("Invalid Username or Password");
					console.log("Invalid Username or Password")
					$location.path("/login");
				}
				
				else
				{
					console.log("Valid Credentials, Navigating to home page "+$scope.user.status)
					$scope.message1="Successfully Logged in as ";
					$rootScope.currentUser = 
						{
							username: $scope.user.username,
							first_name: $scope.user.f_name,
							last_name: $scope.user.l_name,
							gender: $scope.user.gender,
							mail_id: $scope.user.mail,
							status: $scope.user.status,
							role: $scope.user.role,
							isOnline: $scope.user.isOnline,
							last_seen: $scope.user.last_seen
						};
					$http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.currentUser;
					$cookieStore.put('currentUser', $rootScope.currentUser)
					$location.path("/");
				}
			}, 	function(errResponse)
			{
				console.error("Error Authenticating User");
				/*$scope.message = "Invalid username or password.";
				$location.path("/login");*/
			}
		);
	};
    
    self.login= function()
	{
		console.log("Validating Login ");
		console.log(self.newUser);
		self.authenticate(self.newUser);
	};
	self.logout= function()
	{
		
		console.log("Entering Logout Function");
		$rootScope.currentUser = {};
		$cookieStore.remove('currentUser');
		
		console.log("Calling Session Logout");
		UserService.logout()
		$location.path('/login');
	};

	self.friendRequest= function(username)
	{
		console.log("Entering Send Friend Request");
		UserService.friendRequest(username)
		.then 
		(
			function(response)
			{
				console.log(response.status);
				alert('FriendRequest is Sent');
				listUser();
				$location.path("/viewUsers");
			}, function(errResponse)
			{
				console.error("Error sending Friend Request");
				$location.path("/viewUsers");
			}
		)
	};
	
	self.applyJob= function(job)
	{
		console.log("Entering Job Apply")
		UserService.applyJob(job)
		.then
		(
			function(response)
			{
				console.log("Job Applied")
				alert("You applied for the Job")
				$location.path("/viewJobs")
			}
		)
	};
	$scope.getProfile = function(username)
	{
		console.log("Entering View Friend")
		UserService.getProfile(username)
		.then
		(
			function(response)
			{
				console.log("Friend Retrieved")
				$location.path("/viewProfile")	
			}
		)
	};
	
	

});


