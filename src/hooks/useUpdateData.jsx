import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSAxios from "./useSAxios";
import useData from "./useData";
import useSweetAlert from "./useSweetAlert";
import useAuth from "./useAuth";

const useUpdateData = () => {
  const { setUserDetails } = useAuth();
  const queryClient = useQueryClient();
  const sAxios = useSAxios();
  const { setToastMsg, setActnBtnLoading } = useData();
  const makeAlert = useSweetAlert();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, apiName, payload }) => {
      const { data } = await sAxios.patch(`/api/${apiName}/${id}`, payload);
      return data;
    },
    onSuccess: (data, variables) => {
      const { itemName, querryToInvalid } = variables;
      setToastMsg(`suc ${itemName} updated successfully !`);
      if (data?.updatedUser) {
        setUserDetails(data.updatedUser);
      }

      setActnBtnLoading(false);

      // Invalidate queries to refetch data
      queryClient.invalidateQueries(querryToInvalid);
    },
    onError: (data, variables) => {
      const { itemName } = variables;
      setToastMsg(`err Failed to update this ${itemName} !`);
      setActnBtnLoading(false);
    },
  });

  const handleUpdateData = async (
    id,
    itemName,
    apiName,
    payload,
    direction = "",
    querryToInvalid = []
  ) => {
    // console.log("Receiced APIName:", apiName);
    try {
      if (direction === "noSkip") {
        const result = await makeAlert(`Yes, Update this ${itemName}!`);
        if (result.isConfirmed) {
          await mutateAsync({
            id,
            itemName,
            apiName,
            payload,
            querryToInvalid,
          });
        }
      } else {
        await mutateAsync({ id, itemName, apiName, payload, querryToInvalid });
      }
    } catch (err) {
      console.log(err.message);
      setActnBtnLoading(false);
    }
  };
  return handleUpdateData;
};

export default useUpdateData;
