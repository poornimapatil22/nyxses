import {authApi } from '../../../../services/axios';

// dashboard data

//get all customers
export const fetchallcustomers = async() =>
  await authApi.get('/rest/private/customers/search');

// search customer by name
export const searchCustomerByName = async(name) =>
  await authApi.get(`/rest/private/customers/search/${name}`);

// search and filter customer
export const filterCustomer = async(payload) =>
  await authApi.post(`/rest/private/customers/search`, payload);

// add new customer
export const addNewCustomer = async(payload) =>
  await authApi.post('/rest/private/customers', payload);

// update customer
export const updateCustomer = async(payload) =>
  await authApi.put('/rest/private/customers', payload);

// get customer by id
export const getCustomerById = async(id) =>
  await authApi.get(`/rest/private/users/superadmin/all/${id}`);

// customer password reset 
export const resetCustomerPassword = async(payload) =>
  await authApi.put('/rest/private/users/superadmin/password', payload);

// delete customer
export const deleteCustomer = async(id) =>
  await authApi.delete(`/rest/private/customers/${id}`);


