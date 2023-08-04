import { proxy } from "valtio";

const formState = proxy<FormStateType>({
    title: "",
    isUploading: false,
    status: undefined

});
export default formState;
