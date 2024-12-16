import React from "react";
import ModalWrapper from "../partials/modals/ModalWrapper";
import { ImagePlusIcon, X } from "lucide-react";
import SpinnerButton from "../partials/spinners/SpinnerButton";

import { Form, Formik } from "formik";
import {
  InputPhotoUpload,
  InputSelect,
  InputText,
  InputTextArea,
} from "@/components/helpers/FormInputs";
import * as Yup from "Yup";
import useUploadPhoto from "@/components/custom-hook/useUploadPhoto";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryData from "@/components/custom-hook/useQueryData";
import { queryData } from "@/components/helpers/queryData";
import { imgPath } from "@/components/helpers/functions-general";
import { StoreContext } from "@/components/store/storeContext";
import { setIsAdd, setMessage, setSuccess, setValidate } from "@/components/store/storeAction";

const ModalAddClothes = ({ itemEdit }) => {
  const { dispatch } = React.useContext(StoreContext);
  
  const { uploadPhoto, handleChangePhoto, photo } =
    useUploadPhoto("/v2/upload-photo");
  
  const { uploadImahe, handleChangeImahe, imahe } =
    useUploadPhoto("/v2/upload-photo");

  
  const [value, setValue] = React.useState("");

  const queryClient = useQueryClient();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClose = () => {
    dispatch(setIsAdd(false));
    setIsAdd(null);
  };

    const {
      Fetch,
      Load,
      myStatus,
      data: categ,
    } = useQueryData(
      `/v2/category`, // endpoint
      "get", // method
      "category" // key
    );

  const {
    isFetching,
    error,
    status,
    data: damit,
  } = useQueryData(
    `/v2/clothes`, // endpoint
    "get", // method
    "clothes" // key
  );

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        itemEdit ? `/v2/clothes/${itemEdit.clothes_aid}` : `/v2/clothes`,
        itemEdit ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: ["clothes"],
      });

      // show error box
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage("Record Successfully Updated"));
      } else {
        dispatch(setValidate(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  const initVal = {
    clothes_title: itemEdit ? itemEdit.clothes_title : "",
    clothes_price: itemEdit ? itemEdit.clothes_price : "",
    clothes_category_id: itemEdit ? itemEdit.clothes_category_id : "",
  };
  const yupSchema = Yup.object({
    clothes_title: Yup.string().required("Required"),
    clothes_price: Yup.string().required("Required"),
    clothes_category_id: Yup.string().required("Required"),
  });

  return (
    <>
      <ModalWrapper>
        <div className="modal-side absolute top-0 right-0 bg-primary h-[100dvh] w-[300px] border-l border-line">
          <div className="modal-header p-4 flex justify-between items-center">
            <h5 className="mb-0">Add Clothing</h5>
            <button onClick={handleClose}>
              <X />
            </button>
          </div>

          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values) => {
              mutation.mutate({
                ...values,
                clothes_image1:
                  (itemEdit?.clothes_image1 === "" && photo) ||
                  (!photo && "") ||
                  (photo === undefined && "") ||
                  (photo && itemEdit?.clothes_image1 !== photo?.name)
                    ? photo?.name || ""
                    : itemEdit?.clothes_image1 || "",
                clothes_image2:
                  (itemEdit?.clothes_image2 === "" && imahe) ||
                  (!imahe && "") ||
                  (imahe === undefined && "") ||
                  (imahe && itemEdit?.clothes_image2 !== imahe?.name)
                    ? imahe?.name || ""
                    : itemEdit?.clothes_image2 || "",
              });
              uploadPhoto();
              uploadImahe();
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="modal-form h-full max-h-[calc(100vh-56px)] grid grid-rows-[1fr_auto]">
                    <div className="form-wrapper p-4 max-h-[85vh] h-full overflow-y-auto custom-scroll">
                      <div className="input-wrap">
                        <InputText
                          label="Title"
                          type="text"
                          name="clothes_title"
                          onChange={handleChange}
                        />
                      </div>

                      <div className="input-wrap relative  group input-photo-wrap h-[150px] mb-5 ">
                        <label htmlFor="" className="py-3">
                          Image 1 (optional)
                        </label>
                        {itemEdit === null && photo === null ? (
                          <div className="w-full border border-line rounded-md flex justify-center items-center flex-col h-full">
                            <ImagePlusIcon
                              size={50}
                              strokeWidth={1}
                              className="opacity-20 group-hover:opacity-50 transition-opacity"
                            />
                            <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                              Upload Photo
                            </small>
                          </div>
                        ) : (
                          <img
                            src={
                              photo
                                ? URL.createObjectURL(photo) // preview
                                : imgPath + "/" + itemEdit?.clothes_image1 // check db
                            }
                            alt="employee photo"
                            className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto `}
                          />
                        )}

                        <InputPhotoUpload
                          name="photo"
                          type="file"
                          id="photo"
                          accept="image/*"
                          title="Upload photo"
                          onChange={(e) => handleChangePhoto(e)}
                          onDrop={(e) => handleChangePhoto(e)}
                          className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full`}
                        />
                      </div>

                      {/* ------------------------------------------------------------------------------ */}
                      <div className="input-wrap relative  group input-photo-wrap h-[150px] ">
                        <label htmlFor="" className="py-3">
                          Image 2 (optional)
                        </label>
                        {itemEdit === null && imahe === null ? (
                          <div className="w-full border border-line rounded-md flex justify-center items-center flex-col h-full">
                            <ImagePlusIcon
                              size={50}
                              strokeWidth={1}
                              className="opacity-20 group-hover:opacity-50 transition-opacity"
                            />
                            <small className="opacity-20 group-hover:opacity-50 transition-opacity">
                              Upload Photo
                            </small>
                          </div>
                        ) : (
                          <img
                            src={
                              imahe
                                ? URL.createObjectURL(imahe) // preview
                                : imgPath + "/" + itemEdit?.clothes_image2 // check db
                            }
                            alt="employee photo"
                            className={`group-hover:opacity-30 duration-200 relative object-cover h-full w-full  m-auto `}
                          />
                        )}

                        <InputPhotoUpload
                          name="imahe"
                          type="file"
                          id="imahe"
                          accept="image/*"
                          title="Upload photo"
                          onChange={(e) => handleChangeImahe(e)}
                          onDrop={(e) => handleChangeImahe(e)}
                          className={`opacity-0 absolute top-0 right-0 bottom-0 left-0 rounded-full  m-auto cursor-pointer w-full h-full`}
                        />
                      </div>

                      <div className="input-wrap mt-8">
                        <InputText
                          label="Price"
                          type="text"
                          name="clothes_price"
                        />
                      </div>

                      <div className="input-wrap">
                        <InputSelect
                          label="Clothes Category"
                          name="clothes_category_id"
                          
                        >
                          <option value="" hidden></option>
                          {categ?.data.map((item, key) => {
                            return (
                              <>
                                {item.category_is_active === 1 && (
                                  <option key={key} value={item.category_aid}>
                                    {item.category_title}
                                  </option>
                                )}
                              </>
                            );
                          })}
                        </InputSelect>
                      </div>
                    </div>
                    <div className="form-action flex p-4 justify-end gap-3">
                      <button className="btn btn-add" type="submit">
                        <SpinnerButton /> Save
                      </button>
                      <button
                        className="btn btn-cancel"
                        onClick={handleClose}
                        type="reset"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalWrapper>
    </>
  );
};

export default ModalAddClothes;