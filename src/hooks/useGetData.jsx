import { useQuery } from "@tanstack/react-query";
import useSAxios from "./useSAxios";
import useAuth from "./useAuth";

const useGetData = ({ apiRoute, dataId = "", additionalQuerry = "" }) => {
  const sAxios = useSAxios();
  const { user } = useAuth();

  const {
    data = [],
    refetch,
    error,
    isPending,
  } = useQuery({
    queryKey: [apiRoute, dataId],
    enabled: !!user && !!user.uid,
    retry: 3,

    queryFn: async () => {
      const { data } = await sAxios.get(
        `/api/${apiRoute}/${user.uid}/?dataId=${dataId}&${additionalQuerry}`
      );
      return data.response;
    },
  });
  return {
    data,
    refetch,
    isPending,
    error,
  };
};

export default useGetData;
