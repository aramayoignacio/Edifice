import { get, post } from "."

export const login = async ({ username, password }) => {
    return await post('login', { username, password });
}


export const getBuildingsByUser = async ()=>{
    return await get('buildings-by-user');
}