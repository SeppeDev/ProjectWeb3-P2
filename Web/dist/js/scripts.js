app.config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/"),e.state("home",{url:"/",templateUrl:"app/pages/home.html",controller:"homeController as home"}).state("test",{url:"/test",templateUrl:"app/pages/test.html",controller:"testController as test"})}]),app.service("testService",function(){var e=this;e.testValue="This value is from a service!",e.testFunction=function(){alert("Test function called from inside service!")}}),app.directive("dcbHeader",function(){return{restrict:"E",templateUrl:"app/directives/dcb-header/dcb-header.html",replace:!0,scope:{},controllerAs:"head",controller:function(){function e(){t.value="This is a directive test value!"}var t=this;e()}}});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyIsInRlc3RTZXJ2aWNlLmpzIiwiZGNiLWhlYWRlci9kY2ItaGVhZGVyLmpzIl0sIm5hbWVzIjpbImFwcCIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwib3RoZXJ3aXNlIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXIiLCJzZXJ2aWNlIiwic3ZjIiwidGhpcyIsInRlc3RWYWx1ZSIsInRlc3RGdW5jdGlvbiIsImFsZXJ0IiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiLCJyZXBsYWNlIiwic2NvcGUiLCJjb250cm9sbGVyQXMiLCJfaW5pdCIsInZtIiwidmFsdWUiXSwibWFwcGluZ3MiOiJBQUFBQSxJQUFJQyxRQUFBLGlCQUFBLHFCQUFPLFNBQVNDLEVBQWdCQyxHQUNsQ0EsRUFBbUJDLFVBQVUsS0FFN0JGLEVBQ0dHLE1BQU0sUUFDTEMsSUFBSyxJQUNMQyxZQUFhLHNCQUNiQyxXQUFZLDJCQUVkSCxNQUFNLFFBQ0pDLElBQUssUUFDTEMsWUFBYSxzQkFDYkMsV0FBWSw4QkNabEJSLElBQUlTLFFBQVEsY0FBZSxXQUMxQixHQUFJQyxHQUFNQyxJQUNWRCxHQUFJRSxVQUFZLGdDQUVoQkYsRUFBSUcsYUFBZSxXQUNsQkMsTUFBTSxnRENMUmQsSUFBSWUsVUFBVSxZQUFhLFdBQzFCLE9BQ0NDLFNBQVUsSUFDVlQsWUFBYSw0Q0FDYlUsU0FBUyxFQUNUQyxTQUNBQyxhQUFjLE9BQ2RYLFdBQVksV0FHWCxRQUFTWSxLQUNSQyxFQUFHQyxNQUFRLGtDQUhaLEdBQUlELEdBQUtWLElBTVRTIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZShcIi9cIik7XG5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICB1cmw6IFwiL1wiLFxuICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhZ2VzL2hvbWUuaHRtbFwiLFxuICAgICAgY29udHJvbGxlcjogXCJob21lQ29udHJvbGxlciBhcyBob21lXCJcbiAgICB9KVxuICBcdC5zdGF0ZSgndGVzdCcsIHtcbiAgICAgIHVybDogXCIvdGVzdFwiLFxuICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhZ2VzL3Rlc3QuaHRtbFwiLFxuICAgICAgY29udHJvbGxlcjogXCJ0ZXN0Q29udHJvbGxlciBhcyB0ZXN0XCJcbiAgICB9KVxufSk7IiwiYXBwLnNlcnZpY2UoXCJ0ZXN0U2VydmljZVwiLCBmdW5jdGlvbigpIHtcblx0dmFyIHN2YyA9IHRoaXM7XG5cdHN2Yy50ZXN0VmFsdWUgPSBcIlRoaXMgdmFsdWUgaXMgZnJvbSBhIHNlcnZpY2UhXCI7XG5cblx0c3ZjLnRlc3RGdW5jdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRcdGFsZXJ0KFwiVGVzdCBmdW5jdGlvbiBjYWxsZWQgZnJvbSBpbnNpZGUgc2VydmljZSFcIik7XG5cdH1cbn0pIiwiYXBwLmRpcmVjdGl2ZShcImRjYkhlYWRlclwiLCBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogXCJFXCIsXG5cdFx0dGVtcGxhdGVVcmw6IFwiYXBwL2RpcmVjdGl2ZXMvZGNiLWhlYWRlci9kY2ItaGVhZGVyLmh0bWxcIixcblx0XHRyZXBsYWNlOiB0cnVlLFxuXHRcdHNjb3BlOiB7fSxcblx0XHRjb250cm9sbGVyQXM6IFwiaGVhZFwiLFxuXHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHZtID0gdGhpcztcblxuXHRcdFx0ZnVuY3Rpb24gX2luaXQoKSB7XG5cdFx0XHRcdHZtLnZhbHVlID0gXCJUaGlzIGlzIGEgZGlyZWN0aXZlIHRlc3QgdmFsdWUhXCI7XG5cdFx0XHR9XG5cblx0XHRcdF9pbml0KCk7XG5cdFx0fVxuXHR9XG59KSJdfQ==