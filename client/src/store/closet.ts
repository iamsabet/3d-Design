import { proxy } from "valtio";

const closetState = proxy<ClosetStateType>({
  isLoadingCloset: false,

});
export default closetState;
