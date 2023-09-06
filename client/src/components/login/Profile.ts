import config from "../../config/config"
import { resetUser, setUser } from "../../store/user"

const setCookie = (key: string, token: string) => {
    window.localStorage.setItem(key, token)
}
const removeCookie = (key: string) => {
    window.localStorage.removeItem(key)
}
const fetchCookie = (key: string): string | null => {
    return localStorage.getItem(key)
}
const fetchProfile = async (token: string) => {
    // fetch profile -> 
    const response = await fetch(
        config.development.backendUrl + "/api/v1/profile",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
        }
    );
    const data = await response.json();
    if (response.status === 200) {
        // setUser on valtio state
        setUser(data)
        return data;
    } else {
        console.log(response.status + " / " + data.message);
        removeCookie("Authorization")
        return null;
    }
}

const logout = () => {
    removeCookie("Authorization");
    resetUser()
}

export { setCookie, fetchCookie, removeCookie, fetchProfile, logout }