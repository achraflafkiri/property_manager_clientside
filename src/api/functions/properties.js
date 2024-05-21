import api from "../http-service";

export const getProperties = () => api.get(`properties`);

export const createProperty = (data) => api.post(`properties`, data);

export const updatePropertyGroup = (id, group) => api.patch(`properties/${id}`, { group });

