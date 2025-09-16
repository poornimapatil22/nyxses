import { authApi } from "../../../services/axios";

export const getallsharedapplications = () => 
    authApi.get('/rest/private/applications/admin/search');

export const searchapplication = (payload) => 
    authApi.get(`/rest/private/applications/admin/search/${encodeURIComponent(payload)}`);