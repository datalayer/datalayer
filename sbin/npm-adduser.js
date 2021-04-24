/**
 * @license BSD-3-Clause
 *
 * Taken from https://raw.githubusercontent.com/jupyterlab/jupyterlab-data-studio/master/scripts/registry.adduser.js
 *
 * Copyright (c) 2020 Project Jupyter Contributors.
 * Distributed under the terms of the 3-Clause BSD License.
 */

'use strict';

var RegistryClient = require('npm-registry-client');

var client = new RegistryClient({
  scope: '@jupyterlab'
});

var params = {
  timeout: 1000,
  auth: {
    username: 'foo',
    password: 'bar',
    email: 'foo@bar.com',
    alwaysAuth: false
  }
};

client.adduser('http://localhost:4873', params, done);

function done(error, data, raw, res) {
  if (error) {
    console.error(error);
    return;
  }
  console.log('User added.');
  console.log('data: %s', JSON.stringify(data, null, 2));
  console.log('NPM access token: %s', data.token);
}
