/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('UsersCtrl', function () {
  var ctrl;

  beforeEach(module('users'));

  beforeEach(inject(function ($rootScope, $controller) {
    ctrl = $controller('UsersCtrl');
  }));

  it('should have ctrlName as UsersCtrl', function () {
    expect(ctrl.ctrlName).toEqual('UsersCtrl');
  });
});
