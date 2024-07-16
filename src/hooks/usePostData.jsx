import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSAxios from "./useSAxios";
import useData from "./useData";
import useSweetAlert from "./useSweetAlert";

const usePostData = () => {
  const queryClient = useQueryClient();
  const sAxios = useSAxios();
  const { setToastMsg, setActnBtnLoading } = useData();
  const makeAlert = useSweetAlert();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ apiName, payload }) => {
      const { data } = await sAxios.post(`/api/${apiName}`, payload);
      return data;
    },
    onSuccess: (data, variables) => {
      const { itemName, querryToInvalid, direction } = variables;
      if (direction !== "allSkip") {
        setToastMsg(`suc ${itemName} created successfully !`);
      }

      // change the bellow logic if needed

      setActnBtnLoading(false);

      // Invalidate queries to refetch data
      queryClient.invalidateQueries(querryToInvalid);
    },
    onError: (data, variables) => {
      const { itemName } = variables;
      setToastMsg(`err Failed to create this ${itemName} !`);
      setActnBtnLoading(false);
    },
  });

  const handleCreateData = async (
    itemName,
    apiName,
    payload,
    direction = "",
    querryToInvalid = []
  ) => {
    // console.log("Receiced APIName:", apiName);
    try {
      setActnBtnLoading(true);
      if (direction === "noSkip") {
        const result = await makeAlert(`Yes, Create this ${itemName}!`);
        if (result.isConfirmed) {
          return await mutateAsync({
            itemName,
            apiName,
            payload,
            querryToInvalid,
            direction,
          });
        }
      } else {
        return await mutateAsync({
          itemName,
          apiName,
          payload,
          querryToInvalid,
          direction,
        });
      }
    } catch (err) {
      console.log(err.message);
      setActnBtnLoading(false);
    }
  };
  return handleCreateData;
};

export default usePostData;
