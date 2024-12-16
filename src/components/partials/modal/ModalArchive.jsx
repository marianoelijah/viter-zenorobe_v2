import { queryData } from "@/components/helpers/queryData";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FaArchive } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import ButtonSpinner from "../spinner/ButtonSpinner";
import { StoreContext } from "@/components/store/storeContext";
import ModalWrapper from "@/components/pages/backend/partials/modals/ModalWrapper";
import { Archive } from "lucide-react";

const ModalArchive = ({ setIsArchive, mysqlEndpoint, queryKey, item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const handleClose = () => {
    dispatch(setIsArchive(false));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) => queryData(mysqlEndpoint, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      // dispatch(setIsDelete(false));

      if (!data.success) {
        console.log("May error!");
      } else {
        dispatch(setIsArchive(false));
        console.log("Naysuu!");
      }
    },
  });

  const handleYes = async () => {
    // mutate data
    mutation.mutate({
      isActive: 0,
    });
  };
  return (
    <>
      <ModalWrapper>
        <div className="modal-main bg-primary absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2 max-w-[400px] w-full rounded-md border border-line">
          <div className="modal-header flex gap-2 p-2 items-center border-b border-line mb-2">
            <Archive size={16} stroke="yellow" />{" "}
            <span className="text-warning">Archive</span>
            <button className="ml-auto" onClick={handleClose}>
              <GrFormClose />{" "}
            </button>
          </div>
          <div className="modal-body p-2 py-4">
            <p className="mb-0 text-center">
              Are you sure you want to this archive category? {item}
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button className="btn btn-warning" onClick={handleYes}>
                Archive
              </button>
              <button className="btn btn-cancel" onClick={handleClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalArchive;