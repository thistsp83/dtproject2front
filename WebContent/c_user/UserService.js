angular.module("myApp")
.service("UserService", function($http,$rootScope){
	
	var serviceData = this;
	
	serviceData.authUser = {};
	
	
	console.log("Entering UserService")
	var BASE_URL = "http://localhost:8080/discussionB/"
		return{
		
		register: function(user)
		{
			console.log("Entering Function Register User")
			console.log(user)
		/*	return $http.post(BASE_URL + "user", "Hia...")*/
			return $http.post(BASE_URL + "user", user)
			.then(function(response)
				{
					alert("Regesteration Succcess. Wait for admin aproval")
					console.log(response.status)
					return response.status
				},function(errResponse)
				{					
					console.log(errResponse.status)
					return errResponse.status
				});
		},
		authenticate: function(user)
		{
			console.log("Entering Function Validate User")
			console.log(user)
			return $http.post(BASE_URL + "login", user)
			.then(
					function(response)
					{
						
						if(response.data.errorMessage == "Success")
							{
							console.log("Validation Success")
								/*$rootScope.currentUser = 
									{
										username: response.data.username,
										first_name: response.data.first_name,
										last_name: response.data.last_name,
										dob: response.data.user.dob,
										gender: response.data.gender,
										mail_id: response.data.mail_id,
										status: response.data.status,
										role: response.data.role,
										birthdate: response.data.birthdate,
										isOnline: response.data.isOnline,
										last_seen: response.data.last_seen
									};*/
							}
						else
							{
							console.log("Invalid User name or password")
							}
						
						return response.data;
					},
					function(errResponse)
					{
						/*$rootScope.userLoggedIn = false;
						console.error(errResponse.status);*/
						console.error("Error while validating");
						/*return $q.reject(errResponse);*/
					});
		},
		listUser: function()
		{
			console.log("Entering Function List User")
			return $http.get(BASE_URL + "getUserList")
			.then(function(response)
				{
//					console.log(response.data)
					console.log("Recieved List Users "+response.status)
					return response.data
		
				})
		},
		listUsers: function()
		{
			console.log("Entering Function List User")
			return $http.get(BASE_URL + "viewUsers")
			.then(function(response)
				{
//					console.log(response.data)
					console.log("Recieved List Users "+response.status)
					return response.data
		
				})
		},
		friendRequest: function(username)
		{
			console.log("Entering Service - Friend Request")
			return $http.get(BASE_URL + "sendRequest-"+username)
			.then
			(
				function(response)
				{
					return response.data;
				},
				function(errResponse)
				{
					console.log("Error Adding Friend");
					return $q.reject(errResponse);
				}
			);
		},
		
		applyJob: function(job)
		{
			console.log("Applying Job")
			return $http.post(BASE_URL + "applyJob", job)
			.then
			(
				function(response)
				{
					console.log("Job has been applied")
					return response;
				}
			)
		},
		
		getProfile: function(username)
		{
			console.log("Entering Get Friend")
			return $http.get(BASE_URL + "getUser-"+username)
			.then
			(
				function(response)
				{
					console.log("Friend Retrived")
					$rootScope.friend = response.data;
					return response;
				}
			)
		},
		getAppliedJobs: function()
		{
			console.log("Get Jobs in Service")
			return $http.get(BASE_URL + "viewMyJobs")
			.then(function(response)
				{
					console.log("Job List Retrived")
					return response;
				}
			)
		},
		
		logout: function()
		{
			console.log("Entering Logout")
			return $http.get(BASE_URL + "logout")
			.then
			(
				function(response)
				{
					return response.data;
				},
				function (errResponse)
				{
					console.log("Error Logging out");
					return /*$q.reject(errResponse)*/"logout Successfull";
				}
			);
		}
	}
		

	
});
	