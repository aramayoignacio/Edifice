import configureAxios from "../axios.config"
export const AxiosProvider = ({ children }) => {
    configureAxios();

    return <>
        {children}
    </>
}