import { Plus } from "lucide-react";
import React from "react";
import Footer from "../partials/Footer";
import Header from "../partials/Header";
import ModalError from "../partials/modals/ModalError";
import SearchBar from "../partials/SearchBar";
import SideNavigation from "../partials/SideNavigation";

import FoodTable from "./ClothesTable";
import ModalAddClothes from "./ModalAddClothes";
import { setIsAdd } from "@/components/store/storeAction";
import { StoreContext } from "@/components/store/storeContext";

const Clothes = () => {
  const { dispatch, store } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };
  return (
    <>
      <section className="layout-main">
        <div className="layout-division">
          <SideNavigation menu="clothes" />
          <main>
            <Header title="Clothes" subtitle="Manage Clothing" />
            <div className="p-8">
              <div className="flex justify-between items-center ">
                <SearchBar />

                <button className="btn btn-add" onClick={handleAdd}>
                  <Plus size={16} />
                  Add New
                </button>
              </div>
              <FoodTable setItemEdit={setItemEdit} itemEdit={itemEdit} />
            </div>
            <Footer />
          </main>
        </div>
      </section>

      {store.validate && <ModalValidation />}
      {store.error && <ModalError />}
      {store.setSuccess && <ToastSuccess />}
      {store.isAdd && (
        <ModalAddClothes itemEdit={itemEdit} setItemEdit={setItemEdit} />
      )}
    </>
  );
};

export default Clothes;