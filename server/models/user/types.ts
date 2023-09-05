interface IUser {
    id: string,
    type: "google" | "github",
    accessToken: string,
    username: string,
    name: string,
    fullName: string,
    profilePic: string,
    email: string | null
}

export default IUser