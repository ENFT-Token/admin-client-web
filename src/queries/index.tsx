import {QueryClient} from "react-query";
import {RequestAuth} from "../models/Request";

const queryClient = new QueryClient()

queryClient.setQueryDefaults("approveList", {
    queryFn: () => RequestAuth("GET", "/admin/approve/list"),
    select: (response) => {
        return response.data;
    }
});

queryClient.setQueryDefaults("memberList", {
    queryFn: () => RequestAuth("GET", "/admin/member"),
    select: (response) => {
        return response.data;
    }
});

queryClient.setQueryDefaults("check", {
    queryFn: () => RequestAuth("GET", "/check"),
    select: (response) => {
        return response.data;
    },
    refetchInterval: 3000,
});

export default queryClient;