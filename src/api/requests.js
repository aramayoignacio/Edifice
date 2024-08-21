import { get, patch, post } from "."

export const login = async ({ username, password }) => {
    return await post('auth/login', { username, password });
}


export const getBuildingsByUser = async (userExternalId) => {
    return await get('buildings/by-user/' + userExternalId);
}

export const getAllBuildings = async () => {
    return await get('buildings');
}

export const createUser = async (user) => {
    return await post('users', user)
}

export const createBuilding = async (building) => {
    return await post('buildings', building)
}

export const getAllUsers = async () => {
    return await get('users');
}

export const getBuildingByExternalId = async (externalId) => {
    return await get('buildings/' + externalId);
}

export const editBuilding = async (building) => {
    return await patch('buildings/' + building.id, building)
}

export const addSector = async (payload) => {
    return await post('sectors', payload)
}

export const addGarage = async (payload) => {
    return await post('garages', payload)
}

export const getAllUnitTypes = async () => {
    return await get('unit-types')
}

export const addUnit = async (payload) => {
    return await post('units',payload)
}

export const getUnit = async (id) => {
    return await get('units/'+id)
}

export const getSectors = async () => {
    return await get('sectors')
}

export const getSectorsByBuilding = async (id) => {
    return await get('sectors/by-building/'+id)
}

export const editUnit = async (payload) => {
    return await patch('sectors/by-building/'+payload.id, payload)
}