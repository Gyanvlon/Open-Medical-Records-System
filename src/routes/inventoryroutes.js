import ManageDrugs from "../pages/SystemAdministration/Inventory/ManageDrugs";
import ManageItem from "../pages/SystemAdministration/Inventory/ManageItem";
import ManageStore from "../pages/SystemAdministration/Inventory/ManageStore";

  
  /**
   * list of available routes for the entire application.
   */
  export const inventoryRoutes = [
    {
      path: "/manage_drugs",
      title: "Manage Drugs",
      roles: ["*"],
      component: ManageDrugs,
      layout: "/app",
    },
    {
      path: "/manage_item",
      title: "Manage Item",
      roles: ["*"],
      visibleOnSidebar: false,
      icon: "",
      component: ManageItem,
      layout: "/app",
    },
    {
      path: "/manage_store",
      title: "Manage Store",
      roles: ["*"],
      visibleOnSidebar: false,
      icon: "",
      component: ManageStore,
      layout: "/app",
    },
  ];
  