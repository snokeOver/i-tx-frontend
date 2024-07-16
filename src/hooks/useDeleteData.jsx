import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSAxios from "./useSAxios";
import useData from "./useData";
import useSweetAlert from "./useSweetAlert";

const useDeleteData = () => {
  const queryClient = useQueryClient();
  const sAxios = useSAxios();
  const { setToastMsg, setActnBtnLoading } = useData();
  const makeAlert = useSweetAlert();

  const { mutateAsync } = useMutation({
    mutationFn: async ({ id, apiName }) => {
      const { data } = await sAxios.delete(`/api/${apiName}/${id}`);
      return data;
    },
    onSuccess: (data, variables) => {
      const { itemName } = variables;
      setToastMsg(`suc ${itemName} deleted successfully !`);
      setActnBtnLoading(false);

      // Invalidate queries or refetch data
      queryClient.invalidateQueries("my-surveys");
    },
    onError: (data, variables) => {
      const { itemName } = variables;
      setToastMsg(`err Failed to delete this ${itemName} !`);
      setActnBtnLoading(false);
    },
  });

  const handleDeleteData = async (id, itemName, apiName) => {
    // console.log("Receiced APIName:", apiName);
    setActnBtnLoading(true);
    try {
      const result = await makeAlert(`Yes, Delete this ${itemName}!`);
      if (result.isConfirmed) {
        await mutateAsync({ id, itemName, apiName });
      }
    } catch (err) {
      console.log(err.message);
      setActnBtnLoading(false);
    }
  };
  return handleDeleteData;
};

export default useDeleteData;
