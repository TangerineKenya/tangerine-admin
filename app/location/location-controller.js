(function () {
	'use strict';

	/**
	 * @ngdoc object
	 * @name location.controller:LocationCtrl
	 *
	 * @description
	 *
	 */
	angular
		.module('location')
		.controller('LocationCtrl', LocationCtrl);
		LocationCtrl.$inject = ['LocationService','$q'];
	function LocationCtrl(LocationService,$q) {
		var vm = this;

		//vm.locationList = LocationService.locationList;
		vm.locationList = {};
		vm.treedata = [];
		vm.toggle = toggle;
		vm.addProperty = addProperty;
		//vm.ctrlName = 'LocationCtrl';
		//console.log("log 1: ",vm);
		
		activate();

		/**
		 * Activate the Locations Controller
		 */
		function activate() {
			var promises = [LocationService.getLocations()]; //[getMessageCount(), getSchools(), ];
			vm.p= promises;
			return $q.all(promises).then(function() {
				 vm.locationList = LocationService.getLocations();
				 //addTeachers();
				 console.log('Everything has been loaded..');
			});
		}
    	
		function getLocations(){
			return LocationService.getLocations()
				.then(success);

			function success(resp){
				vm.locationList = resp;

				return resp;
			}
		}
		
		function addTeachers(){
			
			_.forIn(vm.locationList.locations, function(county, ckey) {
				//add at county level
				//county['teachers'] = 0;
				
				_.forIn(county.children, function(subcounty, skey){
					//subcounty['teachers'] = 0;
					if(county['id']==ckey && subcounty['id']==skey)
					{
						county['teachers']+=subcounty['teachers'];
					}
					//subcounty['teachers'] = 0;
					_.forIn(subcounty.children, function(zone, zkey){
						if(zone['teachers']==null){
							//zone['teachers']=0;
							//console.log('Empty', zone['label']);
						}
						else{
							if(subcounty['id']==skey && zone['id']==zkey){

								subcounty['teachers'] += zone['teachers'];

								console.log('Subcounty', subcounty['label'], zone['teachers'],subcounty['teachers']);
							}
						}
					});
				});
			});
			LocationService.save(vm.locationList);
			vm.locationList = LocationService.getLocations();
			//console.log('Property added to location list...', vm.locationList);
		}

		function toggle(){
			
		}
		
		function addProperty(){
			console.log('Adding property to location list..');

			_.forIn(vm.locationList.locations, function(county, key) {
				//add at county level
				//county['teachers'] = 0;
				//add at subcounty level
				_.forIn(county.children, function(subcounty, key){
					//subcounty['teachers'] = 0;
					//add to zone 
					_.forIn(subcounty.children, function(zone, key){
						zone['healthQuota'] = 0;
						zone['educationQuota'] = 0;
					});
				});
			});
			LocationService.save(vm.locationList);
			vm.locationList = LocationService.getLocations();
			console.log('Property added to location list...', vm.locationList);
		}
		//tree uses array as model - convert object into array
		/*function buildTreeArray(){
			for (var x in vm.locationList) {
				vm.treedata.push(vm.locationList[x]);
			}
		}*/
	}
}());
