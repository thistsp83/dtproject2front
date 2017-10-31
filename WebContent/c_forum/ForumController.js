myApp.controller('ForumController', function($scope, $location, ForumService)
{
	console.log("Entering Forum Controller")
	var self = this;
	$scope.forum={id:'', forum_id:'', username:'', status:'', rejected:'', date_time:'', description:''};
	$scope.forums = [];
	$scope.forumjoin=[];
	$scope.forumReply= {reply_id:'', forum_id:'', reply:'', postedAt:'', rating:'', username:''};
	$scope.forumReplies = [];
	$scope.message;
	
	$scope.acceptRequest = function(joinid)
	{
		ForumService.acceptRequest(joinid)
		.then
		(
				function(response)
				{
					console.log("Entering Accepting Request "+joinid)
					console.log(response.status)
					alert('Join Accepted')
					$location.path("/ViewForums")
				}
		)
	}	
	
	listForum = function()
	{
		console.log("Entering List Forum Method")
		ForumService.listForum()
		.then
		(
			function(response)
			{
				console.log("Forum List Retrieved "+response.status)
				$scope.forums = response.data;
			}
	)}
	listForum();
	listJoinForum = function()
	{
		console.log("Entering List Forum Method")
		ForumService.listJoinForum()
		.then
		(
			function(response)
			{
				console.log("Forum List Retrieved "+response.status)
				$scope.forumjoin = response.data;
			}
	)}
	listJoinForum();
	
	self.addForum = function()
	{
		console.log("Entering Add Forum")
		ForumService.addForum($scope.forum)
		.then
		(
				function(response)
				{
					alert("Forum added. Wait for admin approval")
					console.log("Add Forum Success "+response.status)
					$location.path("/viewForums")
				}
		);
	}
	
	self.getForum = function(id)
	{
		console.log("Entering Get Forum "+id)
		ForumService.getForum(id)
		.then
		(
			function(response)
			{
				console.log("Forum Recieved"+response)
				$location.path("/viewForum")
			}
		)
		ForumService.getForumReply(id)
		.then
		(
			function(response)
			{
				console.log("Get Comments for "+id)
				console.log(response.data)
				$scope.forumReplies = response.data;
			}
		)
	}
	
	self.joinForum = function(id)
	{
		console.log("Entering Get Forum "+id)
		ForumService.joinForum(id)
		.then
		(
			function(response)
			{
				console.log("Forum Joined Request")
				$location.path("/viewForums")
			}
		)
		ForumService.getForumReply(id)
		.then
		(
			function(response)
			{
				console.log("Get Comments for "+id)
				console.log(response.data)
				$scope.forumReplies = response.data;
			}
		)
	}
	self.addReply = addReply
	function addReply(id)
	{
		console.log(id)
		$scope.forumReply.forum_id = id;
		ForumService.addForumReply(id, $scope.forumReply)
		.then
		(
			function(response)
			{
				console.log("Forum COmment added "+response.status)
			}
		)
		ForumService.getForum(id)
		.then
		(
			function(response)
			{
				console.log("Forum Recieved")
			}
		)
		ForumService.getForumReply(id)
		.then
		(
			function(response)
			{
				console.log("Get Comments for "+id)
				console.log(response.data)
			}
		)
		$location.path("/viewForums")
	}
})