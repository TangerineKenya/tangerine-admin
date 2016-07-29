/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Core', function () {
  var service;

  beforeEach(module('core'));

  beforeEach(inject(function (Core) {
    service = Core;
  }));

  it('should equal Core', function () {
    expect(service.get()).toEqual('Core');
  });
});
