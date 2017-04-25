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

  ImportCtrl.$inject = ['LocationService','logger', '$scope','$q', 'hotRegisterer', '$rootScope'];

  function ImportCtrl(LocationService, logger, $scope, $q, hotRegisterer, $rootScope) {
    var vm = this;
    vm.locationList = {};
    vm.droppedData = {};
    vm.instance = 'tusome';
    vm.exportExcel = exportExcel;
    vm.locationTable = [];
    vm.locationTable.header = "";
    vm.locationTable.data = undefined;

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
            //console.log('Contents of Dropped File: ', result);
            vm.droppedData = result;
            //handle dropped data
            handleDrop();
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
         if(vm.instance == 'tayari'){
            //updateTayariQuota();
            flattenLocationListTayari();
          }
          else{
            //updateTusomeQuota();
            flattenLocationListTusome();
          }
         console.log('Locations have been loaded..');
      });
    }

    function handleDrop(){
        if(vm.instance == 'tayari'){
          handleTayariDrop();
        }
        else{
          handleTusomeDrop();
        }
    }

    function handleTayariDrop(){
      if (vm.droppedData != null) {
        toastr.info('Start processing dropped Tayari data');
        var locList = {};
        var locationFlatList = _.union([], vm.droppedData.School_List); //get data from sheet named School_List
        //loop through data and add new county, subcounty, zone & school id's
        locList = vm.locationList;
        _.forEach(locationFlatList, function(a){
          /*if (_.isUndefined(a.County_Id)) {
              //a.County_Id = LocationService.generateKey();
              var doc = {};
              doc[a.County_Id] = {
                                   id: a.County_Id,
                                   label: _.capitalize(a.County_Name),
                                   children: {}
                                 };
              locList = _.set(vm.locationList,vm.locationList.locations, doc);
          }
          if (_.isUndefined(a.SubCounty_Id)) {
              //a.SubCounty_Id = LocationService.generateKey();
              var path = 'locations.'+a.County_Id+'.children.';
              var subCounties = _.get(vm.locationList,path);
              var doc = {};
              doc[a.SubCounty_Id] = {
                                      id: a.SubCounty_Id,
                                      label: _.capitalize(a.SubCounty_Name),
                                      children: {}
                                    };
              var newDoc = _.merge(subCounties,doc);
              locList = _.set(vm.locationList,path, newDoc);
          }
          if (_.isUndefined(a.Zone_Id)) {
              //a.Zone_Id = LocationService.generateKey();
              var path = 'locations.'+a.County_Id+'.children.'+a.SubCounty_Id+'.children.';
              var zones = _.get(vm.locationList,path);
              var doc = {};
              doc[a.Zone_Id] = {
                                  id: a.Zone_Id,
                                  label: _.capitalize(a.Zone_Name),
                                  educationQuota: 0,
                                  healthQuota: 0,
                                  children: {}
                                }:
              var newDoc = _.merge(zones,doc);
              locList = _.set(vm.locationList,path, newDoc);
          }*/
          if (_.isUndefined(a.School_Id)) {
            var key = LocationService.generateKey();
            
            var path = 'locations.'+a.County_Id+'.children.'+a.SubCounty_Id+'.children.'+a.Zone_Id+'.children';
            var schools = _.get(vm.locationList,path);
            
            if(schools != "undefined"){
                var doc = {};
                doc[key]= {
                    id: key,
                    label: _.capitalize(a.School),
                    code: a.School_Code,
                    tayari: a.Tayari_Code,
                    idToBeUsed: "",
                    idAlpha: ""
                  };
              //console.log(doc);
              var newDoc = _.merge(schools,doc);
              //merge new schools object to location list & save
              locList = _.set(vm.locationList, path, newDoc);
            }
          }
        });
        //save new location list
        LocationService.save(locList);
        activate();
        //console.log('New List', locList);
      }
    }

    function handleTusomeDrop(){
      //handle Tusome data separately
      if (vm.droppedData != null) {
        toastr.info('Start processing dropped Tusome data');
        var locList = {};
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
            var key = LocationService.generateKey();
            
            var path = 'locations.'+a.County_Id+'.children.'+a.SubCounty_Id+'.children.'+a.Zone_Id+'.children';
            var schools = _.get(vm.locationList,path);
            
            if(schools != "undefined"){
              //console.log('gtg', schools);
                var doc = {};
                doc[key]= {
                    id: key,
                    label: a.School,
                    code: a.School_Code,
                    division: a.Division,
                    province: a.Province,
                    knecCode: a.Knec_Code,
                    tsc: a.Tsc_Code,
                    tusome: a.Tusome_Code,
                    address: a.Address,
                          };
              //console.log(doc);
              var newDoc = _.merge(schools,doc);
              //merge new schools object to location list & save
              locList = _.set(vm.locationList, path, newDoc);
            }
          }
        });
        //group county data & process
        var counties = _.groupBy(locationFlatList, function(obj) {
          return obj.County_Id.trim()
        });

        //save new location list
        LocationService.save(locList);
        activate();
      }
    }

    function updateTusomeQuota(){
      var workingList = _.merge({}, vm.locationList);

      _.forEach(workingList.counties, function(c, cKey) {
        _.forEach(c.subCounties, function(sc, scKey) {
          sc.quota = _.reduce(sc.zones, function(sum, obj) {
            return sum + obj.quota;
          }, 0);
        });
        c.quota = _.reduce(c.subCounties, function(sum, obj) {
          return sum + obj.quota;
        }, 0);
      });

      vm.locationList = workingList;
    }

    function updateTayariQuota(){
      var workingList = _.merge({}, vm.locationList);

      _.forEach(workingList.counties, function(c, cKey) {
        _.forEach(c.subCounties, function(sc, scKey) {
          sc.educationQuota = _.reduce(sc.zones, function(sum, obj) {
            return sum + obj.educationQuota;
          }, 0);
        });
        c.educationQuota = _.reduce(c.subCounties, function(sum, obj) {
          return sum + obj.educationQuota;
        }, 0);
      });

      vm.locationList = workingList;
    }

    function flattenLocationListTusome() {
      if (vm.locationList != null) {

        var workingList = _.merge({}, vm.locationList);
        var flatList = [];

        _.forEach(workingList.locations, function(c, cKey) {
          _.forEach(c.children, function(sc, scKey) {
            _.forEach(sc.children, function(z, zKey) {
              _.forEach(z.children, function(sch, schKey) {
                
                flatList.push([
                  cKey,
                  c.label,
                  c.code,
                  scKey,
                  sc.label,
                  sc.code,
                  zKey,
                  z.label,
                  z.code,
                  z.quota,
                  z.numTeachers,
                  schKey,
                  sch.label,
                  sch.code,
                  sch.tusome,
                  sch.tsc,
                  sch.knec,
                  sch.address,
                  sch.province,
                  sch.division,
                  sch.idToBeUsed,
                  sch.idAlpha
                ]);
              });
            });
          });
        });

        console.log(flatList);
        vm.flatList = flatList;


        var locationTable = hotRegisterer.getInstance('locationTable');
        vm.locationTable.header = "Complete School List";
        vm.locationTable.data = flatList;
        var cols = [{
          title: 'County_Id'
        }, {
          title: 'County'
        }, {
          title: 'County_Code'
        }, {
          title: 'SubCounty_Id'
        }, {
          title: 'SubCounty'
        }, {
          title: 'SubCounty_Code'
        }, {
          title: 'Zone_Id'
        }, {
          title: 'Zone'
        }, {
          title: 'Zone_Code'
        }, {
          title: 'Quota'
        }, {
          title: 'Num_Teachers'
        }, {
          title: 'School_Id'
        }, {
          title: 'School'
        }, {
          title: 'School_Code'
        }, {
          title: 'Tusome_Code'
        }, {
          title: 'TSC_Code'
        }, {
          title: 'KNEC_Code'
        }, {
          title: 'Address'
        }, {
          title: 'Province'
        }, {
          title: 'Division'
        }, {
          title: 'ID_toBeUsed'
        }, {
          title: 'ID_Alpha'
        }];
        locationTable.updateSettings({
          columns: cols,
          columnSorting: true
        });

        locationTable.loadData(vm.locationTable.data);
        locationTable.render();


      }
    }

    function flattenLocationListTayari() {
      if (vm.locationList != null) {

        var workingList = _.merge({}, vm.locationList);
        var flatList = [];

        _.forEach(workingList.locations, function(c, cKey) {
          _.forEach(c.children, function(sc, scKey) {
            _.forEach(sc.children, function(z, zKey) {
              _.forEach(z.children, function(sch, schKey) {
                flatList.push([
                  cKey,
                  c.label,
                  c.code,
                  scKey,
                  sc.label,
                  sc.code,
                  zKey,
                  z.label,
                  z.code,
                  z.educationQuota,
                  z.healthQuota,
                  schKey,
                  sch.label,
                  sch.code,
                  sch.tayari
                ]);
                //flatList.push([cKey,c.label,c.code,scKey,sc.label,sc.code,zKey,z.label,z.code,z.quota]);
              });
            });
          });
        });

        console.log(flatList);
        vm.flatList = flatList;


        var locationTable = hotRegisterer.getInstance('locationTable');
        vm.locationTable.header = "Complete School List";
        vm.locationTable.data = flatList;
        var cols = [{
          title: 'County_Id'
        }, {
          title: 'County'
        }, {
          title: 'County_Code'
        }, {
          title: 'SubCounty_Id'
        }, {
          title: 'SubCounty'
        }, {
          title: 'SubCounty_Code'
        }, {
          title: 'Zone_Id'
        }, {
          title: 'Zone'
        }, {
          title: 'Zone_Code'
        }, {
          title: 'educationQuota'
        }, {
          title: 'healthQuota'
        }, {
          title: 'School_Id'
        },{
          title: 'School'
        }, {
          title: 'School_Code'
        }, {
          title: 'Tayari_Code'
        }];
        locationTable.updateSettings({
          columns: cols,
          columnSorting: true
        });

        locationTable.loadData(vm.locationTable.data);
        locationTable.render();


      }
    }

    function exportExcel(tableId) {
      console.log("----1");
      var t = hotRegisterer.getInstance(tableId);
      var td = t.getData();
      console.log(td);
      var wb = new Workbook();
      var ws = sheet_from_array_of_data(td);
      console.log("---2");

      wb.addWorksheet("School_List", ws);
      console.log("---3");
      wb.download('SchoolList');
      console.log("---4");
    }

    /*Excel export functions*/
    function Workbook() {
      if (!(this instanceof Workbook)) return new Workbook();
      this.SheetNames = [];
      this.Sheets = {};
      this.addWorksheet = addWorksheet;
      this.download = forceDownload;

      function addWorksheet(name, data) {
        this.SheetNames.push(name);
        this.Sheets[name] = data;
      }

      function forceDownload(fileName) {
        console.log("---a");
        var outfile = XLSX.write(this, {
          bookType: 'xlsx',
          bookSST: false,
          type: 'binary'
        });
        console.log("---b");
        console.log(new Date());
        console.log("---c");
        saveAs(new Blob([s2ab(outfile)], {
          type: "application/octet-stream"
        }), fileName + ".xlsx");
        console.log("---d");
        console.log(new Date());
        console.log("---e");
      }
    }

    function sheet_from_array_of_data(data, opts) {
      if (data.length > 0) {
        if (_.isArray(data[0])) {
          return sheet_from_array_of_arrays(data, opts);
        } else if (_.isObject(data[0])) {
          return sheet_from_array_of_objects(data, opts);
        }
      } else {
        logger.error("There is no data to export");
        return {};
      }
    }

    function sheet_from_array_of_arrays(data, opts) {
      var ws = {};
      var range = {
        s: {
          c: 10000000,
          r: 10000000
        },
        e: {
          c: 0,
          r: 0
        }
      };
      for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != _.size(data[R]); ++C) {
          if (range.s.r > R) range.s.r = R;
          if (range.s.c > C) range.s.c = C;
          if (range.e.r < R) range.e.r = R;
          if (range.e.c < C) range.e.c = C;
          var cell = {
            v: data[R][C]
          };
          if (cell.v == null) continue;
          var cell_ref = XLSX.utils.encode_cell({
            c: C,
            r: R
          });

          if (typeof cell.v === 'number') cell.t = 'n';
          else if (typeof cell.v === 'boolean') cell.t = 'b';
          else if (cell.v instanceof Date) {
            cell.t = 'n';
            cell.z = XLSX.SSF._table[14];
            cell.v = datenum(cell.v);
          } else cell.t = 's';

          ws[cell_ref] = cell;
        }
      }
      if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
      return ws;
    }


    function sheet_from_array_of_objects(data, opts) {
      var ws = {};
      var range = {
        s: {
          c: 10000000,
          r: 10000000
        },
        e: {
          c: 0,
          r: 0
        }
      };
      for (var R = 0; R != data.length; ++R) {
        var keys = _.keys(data[R]);
        for (var C = 0; C != keys.length; ++C) {
          if (range.s.r > R) range.s.r = R;
          if (range.s.c > C) range.s.c = C;
          if (range.e.r < R) range.e.r = R;
          if (range.e.c < C) range.e.c = C;
          var cell = {
            v: data[R][keys[C]]
          };
          if (cell.v == null) continue;
          var cell_ref = XLSX.utils.encode_cell({
            c: C,
            r: R
          });

          if (typeof cell.v === 'number') cell.t = 'n';
          else if (typeof cell.v === 'boolean') cell.t = 'b';
          else if (cell.v instanceof Date) {
            cell.t = 'n';
            cell.z = XLSX.SSF._table[14];
            cell.v = datenum(cell.v);
          } else cell.t = 's';

          ws[cell_ref] = cell;
        }
      }
      if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
      return ws;
    }

    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
      return buf;
    }
  }
}());
