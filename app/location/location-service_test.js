/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('Location', function () {
  var service;

  beforeEach(module('location'));

  beforeEach(inject(function (Location) {
    service = Location;
  }));

  it('should equal Location', function () {
    expect(service.get()).toEqual('Location');
  });
});
