import { get, post } from "."

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

export const getAllUsers = async ()=>{
    return await get('users');
}