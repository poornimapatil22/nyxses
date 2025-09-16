import { authApi } from '../../../services/axios';

// get all and filtered customer 
export const getAllCustomer = (payload) =>
    authApi.post('/rest/private/customers/search', payload);

