import { createFetch } from "@vueuse/core";
import { authService } from "../services/authService";
import { globalState, isAuth } from "../store";

export const useApi = createFetch({
    baseUrl: 'https://vara.onrender.com/api',
    options: {
        beforeFetch({ options }) {

            if (isAuth.value) {
                options.headers = {
                    Authorization: `Bearer ${globalState.accessToken}`
                }
            }

            return { options }

        },
        onFetchError({data, error}){

            /*
                {
                    "msg": [
                        "Unauthorized"
                    ]
                }
            */
           
            if(data?.msg && data.msg instanceof Array && data.msg.includes('Unauthorized')){
                authService.useLogout()
            }

            return {data, error}
        }
    }
})
