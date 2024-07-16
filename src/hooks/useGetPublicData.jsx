import { useQuery } from "@tanstack/react-query";
import useSAxios from "./useSAxios";

const useGetPublicData = ({ apiRoute, dataId = "", additionalQuerry = "" }) => {
  const sAxios = useSAxios();
  const {
    data = [],
    refetch,
    error,
    isPending,
  } = useQuery({
    queryKey: [apiRoute],
    queryFn: async () => {
      const { data } = await sAxios.get(
        `/api/${apiRoute}/?dataId=${dataId}&${additionalQuerry}`
      );
      // console.log(data.response);
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

export default useGetPublicData;
