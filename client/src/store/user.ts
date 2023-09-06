import { proxy } from "valtio";

const user = proxy<UserStateType>({
    type: null,
    username: "",
    name: "",
    fullName: "",
    profilePic: "",
});

const setUser = (profile: UserStateType) => {
    user.type = profile.type;
    user.username = profile.username;
    user.name = profile.name;
    user.fullName = profile.fullName;
    user.profilePic = profile.profilePic;
}
const resetUser = () => {
    user.type = null;
    user.username = "";
    user.name = "";
    user.fullName = "";
    user.profilePic = "";
}



export { user, resetUser, setUser };
