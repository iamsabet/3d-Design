import { proxy } from "valtio";
import { HOST_NAME } from "../config/constants";
import axios from "axios";
const fetchCloset = async (): Promise<StoreType[]> => {
    return new Promise(async (resolve, _reject) => {
        try {
            const response = await axios.get(
                `${HOST_NAME}/api/v1/design/paginate?page=${closet.page}`,
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            closet.hasNextPage = response.data.hasNextPage;
            resolve(response.data.docs);
        } catch (e) {
            _reject(e);
        }
    });
}
const init = () => {
    closet.isLoading = true;
    fetchCloset()
        .then((response: any) => {
            closet.list = Array.prototype.concat(closet.list, response);
            closet.page = closet.page + 1;
            closet.isLoading = false;
        })
        .catch((e: any) => {
            console.error(e);
            closet.isLoading = false;
        });

}
const closet = proxy<closetType>({
    list: [],
    scrollStep: 0,
    page: 1,
    hasNextPage: true,
    isLoading: false,
    isScrolling: false,
    initialCloset: init,

});



export default closet