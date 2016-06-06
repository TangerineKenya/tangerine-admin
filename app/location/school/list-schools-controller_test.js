/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('ListSchoolsCtrl', function () {
  var ctrl;

  beforeEach(module('location'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('ListSchoolsCtrl');
  }));

  it('should have ctrlName as ListSchoolsCtrl', function () {
    expect(ctrl.ctrlName).toEqual('ListSchoolsCtrl');
  });
});
