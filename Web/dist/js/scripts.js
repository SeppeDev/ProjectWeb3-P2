var app=angular.module("app",["ui.router"]),CONSTANTS=function(){var e={};return e.API_BASE_URL="http://discoverbandapi.int/public/api",e}();app.config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/"),e.state("home",{url:"/",templateUrl:"app/pages/home.html",controller:"homeController as home"}).state("solo",{url:"/solo",templateUrl:"app/pages/solo.html",controller:"soloController as solo"}).state("merged",{url:"/merged",templateUrl:"app/pages/merged.html",controller:"mergedController as merged"}).state("band",{url:"/band",templateUrl:"app/pages/band.html",controller:"bandController as band"}).state("merge",{url:"/merge",templateUrl:"app/pages/merge.html",controller:"mergeController as merge"})}]),app.controller("bandController",["bandService",function(e){function t(){r.gg=a.testValue}var r=this,a=e;t()}]),app.controller("homeController",["instrumentService","filterService",function(e,t){function r(){a.filterData=n.filterData}var a=this,n=t;r()}]),app.controller("mergeController",function(){function e(){}e()}),app.controller("mergedController",function(){function e(){t.test="Merged"}var t=this;e()}),app.controller("soloController",["$scope","bandService","soloService","instrumentService","filterService",function(e,t,r,a,n){function o(){u.getTracks().then(function(e){c.soloTracks=e.data,c.filteredTracks=c.soloTracks,i()},function(e){console.log(e)})}function i(){c.filteredTracks=[],angular.forEach(c.soloTracks,function(e,t){goodSearch=!0,""!=!c.filterData.artist||e.artist.name.match(new RegExp(c.filterData.artist,"i"))||(goodSearch=!1),""!=!c.filterData.title||e.songname.match(new RegExp(c.filterData.title,"i"))||(goodSearch=!1),c.filterData[e.instrument_id]||(goodSearch=!1),goodSearch&&c.filteredTracks.push(e)})}function l(){o(),c.instruments=p.instruments,c.filterData=d.filterData}var c=this,s=t,u=r,p=a,d=n;c.addToBand=function(e){s.trackArray.push(e)},e.$watch(function(){return c.filterData},function(){c.filterData&&i()},!0),c.track1=new Audio("dist/audio/Behemoth - Conquer All - Drum.mp3"),c.track2=new Audio("dist/audio/Behemoth - Conquer All - Guitar.mp3"),l()}]),app.service("bandService",function(){var e=this;e.testValue="This value is from a service!",e.trackArray=[],e.testFunction=function(){alert("Test function called from inside service!")}}),app.service("filterService",["instrumentService",function(e){function t(){r.createFilterData(),console.log(r.filterData)}var r=this,a=e;r.createFilterData=function(){r.filterData={artist:"",title:""},angular.forEach(a.instruments,function(e,t){r.filterData[e.id]=!0})},t()}]),app.service("instrumentService",["$http",function(e){function t(t,r){return r?"":r={},e.get(t,r)}var r=this;r.getInstruments=function(){var e=CONSTANTS.API_BASE_URL+"/instruments";r.instruments=t(e)},r.instruments=[{name:"Lead-guitar",id:1},{name:"Drum",id:2},{name:"Bass",id:3},{name:"Keys",id:4}]}]),app.service("soloService",["$http",function(e){function t(t,r){return r?"":r={},e.get(t,r)}var r=this;r.getTracks=function(){var e=CONSTANTS.API_BASE_URL+"/tracks";return t(e)},r.getTrackById=function(e){var r=CONSTANTS.API_BASE_URL+"/tracks/"+e;return t(r)}}]),app.directive("dcbBand",["bandService",function(e){return{restrict:"E",templateUrl:"app/directives/dcb-band/dcb-band.html",replace:!0,scope:{},controllerAs:"band",controller:function(){function e(){t.value="NewBand"}var t=this;e()}}}]),app.directive("dcbHeader",function(){return{restrict:"E",templateUrl:"app/directives/dcb-header/dcb-header.html",replace:!0,scope:{},controllerAs:"head",controller:function(){function e(){t.value="This is a directive test value!"}var t=this;e()}}});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbmZpZy5qcyIsInJvdXRlcy5qcyIsImJhbmRDb250cm9sbGVyLmpzIiwiaG9tZUNvbnRyb2xsZXIuanMiLCJtZXJnZUNvbnRyb2xsZXIuanMiLCJtZXJnZWRDb250cm9sbGVyLmpzIiwic29sb0NvbnRyb2xsZXIuanMiLCJiYW5kU2VydmljZS5qcyIsImZpbHRlclNlcnZpY2UuanMiLCJpbnN0cnVtZW50U2VydmljZS5qcyIsInNvbG9TZXJ2aWNlLmpzIiwiZGNiLWJhbmQvZGNiLWJhbmQuanMiLCJkY2ItaGVhZGVyL2RjYi1oZWFkZXIuanMiXSwibmFtZXMiOlsiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsIkNPTlNUQU5UUyIsIkFQSV9CQVNFX1VSTCIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwiJHVybFJvdXRlclByb3ZpZGVyIiwib3RoZXJ3aXNlIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImNvbnRyb2xsZXIiLCJiYW5kU2VydmljZSIsIl9pbml0Iiwidm0iLCJnZyIsImJhbmRTdmMiLCJ0ZXN0VmFsdWUiLCJ0aGlzIiwiaW5zdHJ1bWVudFNlcnZpY2UiLCJmaWx0ZXJTZXJ2aWNlIiwiZmlsdGVyRGF0YSIsImZsdFN2YyIsInRlc3QiLCIkc2NvcGUiLCJzb2xvU2VydmljZSIsImdldFNvbG9UcmFja3MiLCJzb2xvU3ZjIiwiZ2V0VHJhY2tzIiwidGhlbiIsImRhdGEiLCJzb2xvVHJhY2tzIiwiZmlsdGVyZWRUcmFja3MiLCJmaWx0ZXIiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJmb3JFYWNoIiwidHJhY2siLCJrZXkiLCJnb29kU2VhcmNoIiwiYXJ0aXN0IiwibmFtZSIsIm1hdGNoIiwiUmVnRXhwIiwidGl0bGUiLCJzb25nbmFtZSIsImluc3RydW1lbnRfaWQiLCJwdXNoIiwiaW5zdHJ1bWVudHMiLCJpbnN0U3ZjIiwiYWRkVG9CYW5kIiwidHJhY2tBcnJheSIsIiR3YXRjaCIsInRyYWNrMSIsIkF1ZGlvIiwidHJhY2syIiwic2VydmljZSIsInN2YyIsInRlc3RGdW5jdGlvbiIsImFsZXJ0IiwiY3JlYXRlRmlsdGVyRGF0YSIsInZhbHVlIiwiaWQiLCIkaHR0cCIsImdldERhdGEiLCJvcHRpb25zIiwiZ2V0IiwiZ2V0SW5zdHJ1bWVudHMiLCJnZXRUcmFja0J5SWQiLCJkaXJlY3RpdmUiLCJyZXN0cmljdCIsInJlcGxhY2UiLCJzY29wZSIsImNvbnRyb2xsZXJBcyJdLCJtYXBwaW5ncyI6IkFBQUEsR0FBSUEsS0FBTUMsUUFBUUMsT0FBTyxPQUFRLGNDQTdCQyxVQUFhLFdBRWhCLEdBQUlELEtBSUosT0FGQUEsR0FBT0UsYUFBZSx3Q0FFZkYsSUNOUkYsS0FBSUssUUFBQSxpQkFBQSxxQkFBTyxTQUFTQyxFQUFnQkMsR0FDbENBLEVBQW1CQyxVQUFVLEtBRTdCRixFQUNHRyxNQUFNLFFBQ0xDLElBQUssSUFDTEMsWUFBYSxzQkFDYkMsV0FBWSwyQkFFZEgsTUFBTSxRQUNKQyxJQUFLLFFBQ0xDLFlBQWEsc0JBQ2JDLFdBQVksMkJBRWJILE1BQU0sVUFDTEMsSUFBSyxVQUNMQyxZQUFhLHdCQUNiQyxXQUFZLCtCQUViSCxNQUFNLFFBQ0xDLElBQUssUUFDTEMsWUFBYSxzQkFDYkMsV0FBWSwyQkFFYkgsTUFBTSxTQUNMQyxJQUFLLFNBQ0xDLFlBQWEsdUJBQ2JDLFdBQVksZ0NDM0JsQlosSUFBSVksV0FBVyxrQkFBQSxjQUFrQixTQUFTQyxHQUt6QyxRQUFTQyxLQUNSQyxFQUFHQyxHQUFLQyxFQUFRQyxVQUpqQixHQUFJSCxHQUFLSSxLQUNMRixFQUFVSixDQU1kQyxRQ1REZCxJQUFJWSxXQUFXLGtCQUFBLG9CQUFBLGdCQUFrQixTQUFTUSxFQUFtQkMsR0FNNUQsUUFBU1AsS0FHUkMsRUFBR08sV0FBYUMsRUFBT0QsV0FQeEIsR0FBSVAsR0FBS0ksS0FFTEksRUFBU0YsQ0FRYlAsUUNaRGQsSUFBSVksV0FBVyxrQkFBbUIsV0FHakMsUUFBU0UsTUFJVEEsTUNQRGQsSUFBSVksV0FBVyxtQkFBb0IsV0FHbEMs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VUFBVUMsYUFBZSxTQUVuQyxPQUFPOEQsR0FBUXhELElBR2hCaUQsRUFBSVcsYUFBZSxTQUFVTixHQUU1QixHQUFJdEQsR0FBTVAsVUFBVUMsYUFBZSxXQUFhNEQsQ0FFaEQsT0FBT0UsR0FBUXhELE9DekJqQlYsSUFBSXVFLFVBQVUsV0FBQSxjQUFXLFNBQVMxRCxHQUNqQyxPQUNDMkQsU0FBVSxJQUNWN0QsWUFBYSx3Q0FDYjhELFNBQVMsRUFDVEMsU0FDQUMsYUFBYyxPQUNkL0QsV0FBWSxXQUlYLFFBQVNFLEtBQ1JDLEVBQUdnRCxNQUFRLFVBSlosR0FBSWhELEdBQUtJLElBT1RMLFVDZkhkLElBQUl1RSxVQUFVLFlBQWEsV0FDMUIsT0FDQ0MsU0FBVSxJQUNWN0QsWUFBYSw0Q0FDYjhELFNBQVMsRUFDVEMsU0FDQUMsYUFBYyxPQUNkL0QsV0FBWSxXQUdYLFFBQVNFLEtBQ1JDLEVBQUdnRCxNQUFRLGtDQUhaLEdBQUloRCxHQUFLSSxJQU1UTCIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKFwiYXBwXCIsIFtcInVpLnJvdXRlclwiXSk7IiwidmFyIENPTlNUQU5UUyA9IChmdW5jdGlvbiAoKSB7XG5cdFxuXHR2YXIgbW9kdWxlID0ge307XG5cblx0bW9kdWxlLkFQSV9CQVNFX1VSTCA9IFwiaHR0cDovL2Rpc2NvdmVyYmFuZGFwaS5pbnQvcHVibGljL2FwaVwiO1xuXG5cdHJldHVybiBtb2R1bGU7XG59KCkpOyIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL1wiKTtcblxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgIHVybDogXCIvXCIsXG4gICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvcGFnZXMvaG9tZS5odG1sXCIsXG4gICAgICBjb250cm9sbGVyOiBcImhvbWVDb250cm9sbGVyIGFzIGhvbWVcIlxuICAgIH0pXG4gIFx0LnN0YXRlKCdzb2xvJywge1xuICAgICAgdXJsOiBcIi9zb2xvXCIsXG4gICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvcGFnZXMvc29sby5odG1sXCIsXG4gICAgICBjb250cm9sbGVyOiBcInNvbG9Db250cm9sbGVyIGFzIHNvbG9cIlxuICAgIH0pXG4gICAgLnN0YXRlKCdtZXJnZWQnLCB7XG4gICAgICB1cmw6IFwiL21lcmdlZFwiLFxuICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhZ2VzL21lcmdlZC5odG1sXCIsXG4gICAgICBjb250cm9sbGVyOiBcIm1lcmdlZENvbnRyb2xsZXIgYXMgbWVyZ2VkXCJcbiAgICB9KVxuICAgIC5zdGF0ZSgnYmFuZCcsIHtcbiAgICAgIHVybDogXCIvYmFuZFwiLFxuICAgICAgdGVtcGxhdGVVcmw6IFwiYXBwL3BhZ2VzL2JhbmQuaHRtbFwiLFxuICAgICAgY29udHJvbGxlcjogXCJiYW5kQ29udHJvbGxlciBhcyBiYW5kXCJcbiAgICB9KVxuICAgIC5zdGF0ZSgnbWVyZ2UnLCB7XG4gICAgICB1cmw6IFwiL21lcmdlXCIsXG4gICAgICB0ZW1wbGF0ZVVybDogXCJhcHAvcGFnZXMvbWVyZ2UuaHRtbFwiLFxuICAgICAgY29udHJvbGxlcjogXCJtZXJnZUNvbnRyb2xsZXIgYXMgbWVyZ2VcIlxuICAgIH0pXG59KTsiLCJhcHAuY29udHJvbGxlcihcImJhbmRDb250cm9sbGVyXCIsIGZ1bmN0aW9uKGJhbmRTZXJ2aWNlKSB7XG5cdFxuXHR2YXIgdm0gPSB0aGlzO1xuXHR2YXIgYmFuZFN2YyA9IGJhbmRTZXJ2aWNlO1xuXG5cdGZ1bmN0aW9uIF9pbml0KCkge1xuXHRcdHZtLmdnID0gYmFuZFN2Yy50ZXN0VmFsdWU7XG5cdH1cblxuXHRfaW5pdCgpO1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoXCJob21lQ29udHJvbGxlclwiLCBmdW5jdGlvbihpbnN0cnVtZW50U2VydmljZSwgZmlsdGVyU2VydmljZSkge1xuXHRcblx0dmFyIHZtID0gdGhpcztcblx0dmFyIGluc3RTdmMgPSBpbnN0cnVtZW50U2VydmljZTtcblx0dmFyIGZsdFN2YyA9IGZpbHRlclNlcnZpY2U7XG5cblx0ZnVuY3Rpb24gX2luaXQoKSB7XG5cdFx0Ly9pbnN0U3ZjLmdldEluc3RydW1lbnRzKCk7XG5cblx0XHR2bS5maWx0ZXJEYXRhID0gZmx0U3ZjLmZpbHRlckRhdGE7XG5cdH1cblxuXHRfaW5pdCgpO1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoXCJtZXJnZUNvbnRyb2xsZXJcIiwgZnVuY3Rpb24oKSB7XG5cdHZhciB2bSA9IHRoaXM7XG5cblx0ZnVuY3Rpb24gX2luaXQoKSB7XG5cdFx0XG5cdH1cblxuXHRfaW5pdCgpO1xufSk7IiwiYXBwLmNvbnRyb2xsZXIoXCJtZXJnZWRDb250cm9sbGVyXCIsIGZ1bmN0aW9uKCkge1xuXHR2YXIgdm0gPSB0aGlzO1xuXG5cdGZ1bmN0aW9uIF9pbml0KCkge1xuXHRcdHZtLnRlc3QgPSBcIk1lcmdlZFwiO1xuXHR9XG5cblx0X2luaXQoKTtcbn0pOyIsImFwcC5jb250cm9sbGVyKFwic29sb0NvbnRyb2xsZXJcIiwgZnVuY3Rpb24oJHNjb3BlLCBiYW5kU2VydmljZSwgc29sb1NlcnZpY2UsIGluc3RydW1lbnRTZXJ2aWNlLCBmaWx0ZXJTZXJ2aWNlKSB7XG5cdFxuXHR2YXIgdm0gPSB0aGlzO1xuXHR2YXIgYmFuZFN2YyA9IGJhbmRTZXJ2aWNlO1xuXHR2YXIgc29sb1N2YyA9IHNvbG9TZXJ2aWNlO1xuXHR2YXIgaW5zdFN2YyA9IGluc3RydW1lbnRTZXJ2aWNlO1xuXHR2YXIgZmx0U3ZjID0gZmlsdGVyU2VydmljZTtcblxuXHQvL1ByaXZhdGUgZnVuY3Rpb25zXG5cdGZ1bmN0aW9uIHBsYXlBdWRpb0ZpbGUodHJhY2spXG5cdHtcblx0XHR0cmFjay5wbGF5KCk7XG5cdH1cblxuXHRmdW5jdGlvbiBnZXRTb2xvVHJhY2tzKClcblx0e1xuXHRcdHNvbG9TdmMuZ2V0VHJhY2tzKClcblx0XHRcdC50aGVuKGZ1bmN0aW9uKGRhdGEpXG5cdFx0XHR7XG5cdFx0XHRcdHZtLnNvbG9UcmFja3MgPSBkYXRhLmRhdGE7XG5cdFx0XHRcdHZtLmZpbHRlcmVkVHJhY2tzID0gdm0uc29sb1RyYWNrcztcblx0XHRcdFx0ZmlsdGVyKCk7XG5cdFx0XHRcblx0XHRcdH0sIGZ1bmN0aW9uKGVycm9yKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnJvcik7XG5cdFx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIGZpbHRlcigpXG5cdHtcblx0XHR2bS5maWx0ZXJlZFRyYWNrcyA9IFtdO1xuXG5cdFx0YW5ndWxhci5mb3JFYWNoKHZtLnNvbG9UcmFja3MsIGZ1bmN0aW9uKHRyYWNrLCBrZXkpXG5cdFx0e1xuXHRcdFx0Ly9jb25zb2xlLmxvZyh0cmFjayk7XG5cdFx0XHRnb29kU2VhcmNoID0gdHJ1ZTtcblxuXHRcdFx0aWYoIXZtLmZpbHRlckRhdGEuYXJ0aXN0ID09IFwiXCIgJiYgIXRyYWNrLmFydGlzdC5uYW1lLm1hdGNoKG5ldyBSZWdFeHAodm0uZmlsdGVyRGF0YS5hcnRpc3QsIFwiaVwiKSkpXG5cdFx0XHR7XG5cdFx0XHRcdGdvb2RTZWFyY2ggPSBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYoIXZtLmZpbHRlckRhdGEudGl0bGUgPT0gXCJcIiAmJiAhdHJhY2suc29uZ25hbWUubWF0Y2gobmV3IFJlZ0V4cCh2bS5maWx0ZXJEYXRhLnRpdGxlLCBcImlcIikpKVxuXHRcdFx0e1xuXHRcdFx0XHRnb29kU2VhcmNoID0gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmKCF2bS5maWx0ZXJEYXRhW3RyYWNrLmluc3RydW1lbnRfaWRdKVxuXHRcdFx0e1xuXHRcdFx0XHRnb29kU2VhcmNoID0gZmFsc2U7XG5cdFx0XHR9XG5cblxuXHRcdFx0aWYoZ29vZFNlYXJjaClcblx0XHRcdHtcblx0XHRcdFx0dm0uZmlsdGVyZWRUcmFja3MucHVzaCh0cmFjayk7XG5cdFx0XHR9XG5cdFx0XHQvL2NvbnNvbGUubG9nKHZtLmZpbHRlcmVkVHJhY2tzKTtcblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIF9pbml0KCkge1xuXHRcdGdldFNvbG9UcmFja3MoKTtcblx0XHR2bS5pbnN0cnVtZW50cyA9IGluc3RTdmMuaW5zdHJ1bWVudHM7XG5cdFx0dm0uZmlsdGVyRGF0YSA9IGZsdFN2Yy5maWx0ZXJEYXRhO1xuXG5cdFx0Ly92bS50cmFjazEucGxheSgpO1xuXHRcdC8vc2V0VGltZW91dChmdW5jdGlvbigpe3BsYXlBdWRpb0ZpbGUodm0udHJhY2syKX0sIDQwMCk7XG5cdH1cblxuXHQvL1ZtIGZ1bmN0aW9uc1xuXHR2bS5hZGRUb0JhbmQgPSBmdW5jdGlvbih0cmFjaykge1xuXHRcdFxuXHRcdGJhbmRTdmMudHJhY2tBcnJheS5wdXNoKHRyYWNrKTtcblx0fVxuXG5cdC8vV2F0Y2hlc1xuXHQkc2NvcGUuJHdhdGNoKFxuXHRcdGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZtLmZpbHRlckRhdGEgfSwgXG5cdFx0ZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRpZih2bS5maWx0ZXJEYXRhKSBcblx0XHRcdHtcblx0XHRcdFx0ZmlsdGVyKCk7XG5cdFx0XHR9XG5cdFx0fSwgdHJ1ZSk7XG5cblxuXG5cdHZtLnRyYWNrMSA9IG5ldyBBdWRpbyhcImRpc3QvYXVkaW8vQmVoZW1vdGggLSBDb25xdWVyIEFsbCAtIERydW0ubXAzXCIpO1xuXHR2bS50cmFjazIgPSBuZXcgQXVkaW8oXCJkaXN0L2F1ZGlvL0JlaGVtb3RoIC0gQ29ucXVlciBBbGwgLSBHdWl0YXIubXAzXCIpO1xuXG5cblx0X2luaXQoKTtcbn0pOyIsImFwcC5zZXJ2aWNlKFwiYmFuZFNlcnZpY2VcIiwgZnVuY3Rpb24oKSB7XG5cdHZhciBzdmMgPSB0aGlzO1xuXHRzdmMudGVzdFZhbHVlID0gXCJUaGlzIHZhbHVlIGlzIGZyb20gYSBzZXJ2aWNlIVwiO1xuXG5cdHN2Yy50cmFja0FycmF5ID0gW107XG5cblx0XG5cblxuXG5cblx0c3ZjLnRlc3RGdW5jdGlvbiA9IGZ1bmN0aW9uKCkge1xuXHRcdGFsZXJ0KFwiVGVzdCBmdW5jdGlvbiBjYWxsZWQgZnJvbSBpbnNpZGUgc2VydmljZSFcIik7XG5cdH1cbn0pIiwiYXBwLnNlcnZpY2UoXCJmaWx0ZXJTZXJ2aWNlXCIsIGZ1bmN0aW9uKGluc3RydW1lbnRTZXJ2aWNlKSB7XG5cdFxuXHR2YXIgc3ZjID0gdGhpcztcblx0dmFyIGluc3RTdmMgPSBpbnN0cnVtZW50U2VydmljZTtcblxuXG5cdHN2Yy5jcmVhdGVGaWx0ZXJEYXRhID0gZnVuY3Rpb24oKVxuXHR7XG5cdFx0c3ZjLmZpbHRlckRhdGEgPSB7XHRcImFydGlzdFwiOiBcIlwiLFxuXHRcdFx0XHRcdFx0XHRcInRpdGxlXCI6IFwiXCIsXG5cdFx0XHRcdFx0XHRcdH07XG5cblx0XHRhbmd1bGFyLmZvckVhY2goaW5zdFN2Yy5pbnN0cnVtZW50cywgZnVuY3Rpb24odmFsdWUsIGtleSlcblx0XHR7XG5cdFx0XHRzdmMuZmlsdGVyRGF0YVt2YWx1ZS5pZF0gPSB0cnVlO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gX2luaXQoKSB7XG5cdFx0c3ZjLmNyZWF0ZUZpbHRlckRhdGEoKTtcblx0XHRjb25zb2xlLmxvZyhzdmMuZmlsdGVyRGF0YSk7XG5cdH1cblxuXHRfaW5pdCgpO1xufSkiLCJhcHAuc2VydmljZShcImluc3RydW1lbnRTZXJ2aWNlXCIsIGZ1bmN0aW9uKCRodHRwKSB7XG5cdFxuXHQvL0dsb2JhbHNcblx0dmFyIHN2YyA9IHRoaXM7XG5cblx0Ly9Qcml2YXRlIGZ1bmN0aW9uc1xuXHRmdW5jdGlvbiBnZXREYXRhICh1cmwsIG9wdGlvbnMpIHtcblxuXHRcdCFvcHRpb25zID8gb3B0aW9ucyA9IHt9IDogXCJcIjtcblxuXHRcdHJldHVybiAkaHR0cC5nZXQodXJsLCBvcHRpb25zKVxuXHR9XG5cblx0Ly9TdmMgZnVuY3Rpb25zXG5cdHN2Yy5nZXRJbnN0cnVtZW50cyA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB1cmwgPSBDT05TVEFOVFMuQVBJX0JBU0VfVVJMICsgXCIvaW5zdHJ1bWVudHNcIjtcblx0XHRcblx0c3ZjLmluc3RydW1lbnRzID0gZ2V0RGF0YSh1cmwpO1xuXHR9XG5cblx0c3ZjLmluc3RydW1lbnRzID0gW3tcblx0XHRcdFx0XHRcdFx0XCJuYW1lXCI6XCJMZWFkLWd1aXRhclwiLFxuXHRcdFx0XHRcdFx0XHRcImlkXCI6MVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0XCJuYW1lXCI6XCJEcnVtXCIsXG5cdFx0XHRcdFx0XHRcdFwiaWRcIjoyXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcIm5hbWVcIjpcIkJhc3NcIixcblx0XHRcdFx0XHRcdFx0XCJpZFwiOjNcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFwibmFtZVwiOlwiS2V5c1wiLFxuXHRcdFx0XHRcdFx0XHRcImlkXCI6NFxuXHRcdFx0XHRcdFx0fV07XG59KSIsImFwcC5zZXJ2aWNlKFwic29sb1NlcnZpY2VcIiwgZnVuY3Rpb24oJGh0dHApIHtcblx0XG5cdC8vR2xvYmFsc1xuXHR2YXIgc3ZjID0gdGhpcztcblxuXHQvL1ByaXZhdGUgZnVuY3Rpb25zXG5cdGZ1bmN0aW9uIGdldERhdGEgKHVybCwgb3B0aW9ucykge1xuXG5cdFx0IW9wdGlvbnMgPyBvcHRpb25zID0ge30gOiBcIlwiO1xuXG5cdFx0cmV0dXJuICRodHRwLmdldCh1cmwsIG9wdGlvbnMpXG5cdH1cblxuXHQvL1N2YyBmdW5jdGlvbnNcblx0c3ZjLmdldFRyYWNrcyA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdHZhciB1cmwgPSBDT05TVEFOVFMuQVBJX0JBU0VfVVJMICsgXCIvdHJhY2tzXCI7XG5cdFx0XG5cdFx0cmV0dXJuIGdldERhdGEodXJsKTtcblx0fVxuXG5cdHN2Yy5nZXRUcmFja0J5SWQgPSBmdW5jdGlvbiAoaWQpIHtcblxuXHRcdHZhciB1cmwgPSBDT05TVEFOVFMuQVBJX0JBU0VfVVJMICsgXCIvdHJhY2tzL1wiICsgaWQ7XG5cblx0XHRyZXR1cm4gZ2V0RGF0YSh1cmwpO1xuXHR9XG59KSIsImFwcC5kaXJlY3RpdmUoXCJkY2JCYW5kXCIsIGZ1bmN0aW9uKGJhbmRTZXJ2aWNlKSB7XG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3Q6IFwiRVwiLFxuXHRcdHRlbXBsYXRlVXJsOiBcImFwcC9kaXJlY3RpdmVzL2RjYi1iYW5kL2RjYi1iYW5kLmh0bWxcIixcblx0XHRyZXBsYWNlOiB0cnVlLFxuXHRcdHNjb3BlOiB7fSxcblx0XHRjb250cm9sbGVyQXM6IFwiYmFuZFwiLFxuXHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHZtID0gdGhpcztcblx0XHRcdHZhciBiYW5kU3ZjID0gYmFuZFNlcnZpY2U7XG5cblx0XHRcdGZ1bmN0aW9uIF9pbml0KCkge1xuXHRcdFx0XHR2bS52YWx1ZSA9IFwiTmV3QmFuZFwiO1xuXHRcdFx0fVxuXG5cdFx0XHRfaW5pdCgpO1xuXHRcdH1cblx0fVxufSkiLCJhcHAuZGlyZWN0aXZlKFwiZGNiSGVhZGVyXCIsIGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiBcIkVcIixcblx0XHR0ZW1wbGF0ZVVybDogXCJhcHAvZGlyZWN0aXZlcy9kY2ItaGVhZGVyL2RjYi1oZWFkZXIuaHRtbFwiLFxuXHRcdHJlcGxhY2U6IHRydWUsXG5cdFx0c2NvcGU6IHt9LFxuXHRcdGNvbnRyb2xsZXJBczogXCJoZWFkXCIsXG5cdFx0Y29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgdm0gPSB0aGlzO1xuXG5cdFx0XHRmdW5jdGlvbiBfaW5pdCgpIHtcblx0XHRcdFx0dm0udmFsdWUgPSBcIlRoaXMgaXMgYSBkaXJlY3RpdmUgdGVzdCB2YWx1ZSFcIjtcblx0XHRcdH1cblxuXHRcdFx0X2luaXQoKTtcblx0XHR9XG5cdH1cbn0pIl19
