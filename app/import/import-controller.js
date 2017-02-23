(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name import.controller:ImportCtrl
   *
   * @description
   *
   */
  angular
    .module('import')
    .controller('ImportCtrl', ImportCtrl);

  ImportCtrl.$inject = ['LocationService','logger', '$scope','$q'];

  function ImportCtrl(LocationService, logger, $scope, $q) {
    var vm = this;
    vm.locationList = {};
    vm.droppedData = {};
    
    var X = XLSX;

    vm.dropzoneConfig = {
      url: '#',
      parallelUploads: 1,
      autoProcessQueue: false,
      init: function() {
        this.on("addedfile", function(file) {
          //alert("Added file."+file.name);
          console.log('Loaded file', file.name);

          var reader = new FileReader();
          
          reader.onloadend = function() {
            
            var wb = X.read(reader.result, { type: 'binary' });
            
            console.log(wb);

            var result = {};
            wb.SheetNames.forEach(function(sheetName) {
              var roa = X.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
              if (roa.length > 0) {
                result[sheetName] = roa;
              }
            });
            console.log('Contents of Dropped File: ', result);
            vm.droppedData = result;
            //handle dropped data
            handleTayariDrop();
          }
          reader.readAsBinaryString(file);
        });
      }
    };

    activate();
    //activate

    function activate(){
      var promises = [LocationService.getLocations()]; //[getMessageCount(), getSchools(), ];
      vm.p= promises;
      return $q.all(promises).then(function() {
         vm.locationList = LocationService.getLocations();
         console.log('Locations have been loaded..');
      });
    }

    function handleDrop(){
      
    }

    function handleTayariDrop(){
      if (vm.droppedData != null) {
        console.log('Start processing dropped Tayari data');
        var locationFlatList = _.union([], vm.droppedData.School_List); //get data from sheet named School_List
        //loop through data and add new county, subcounty, zone & school id's
        _.forEach(locationFlatList, function(a){
          /*if (_.isUndefined(a.County_Id)) {
              //a.County_Id = LocationService.generateKey();
          }
          if (_.isUndefined(a.SubCounty_Id)) {
              //a.SubCounty_Id = LocationService.generateKey();
          }
          if (_.isUndefined(a.Zone_Id)) {
              //a.Zone_Id = LocationService.generateKey();
          }*/
          if (_.isUndefined(a.School_Id)) {
            a.School_Id = LocationService.generateKey();
          }
        });
        //group county data & process
        var counties = _.groupBy(locationFlatList, function(obj) {
          return obj.County_Id.trim()
        });

        //log
        console.log(counties);
      }
    }

    function handleTusomeDrop(){
      //handle Tusome data separately
      if (vm.droppedData != null) {

      }
    }
  }
}());
