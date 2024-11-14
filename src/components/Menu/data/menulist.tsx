const ICON_URL = "https://joinditto.in/static/c70e382f2f74355e2e2aa92e4c7d532d/893f7/know_insurance.webp";

interface MenuItem {
  MenuID: number;
  Name: string;
  Link: string;
  DocCd: number;
  icon?: string;
}

interface Category {
  CategoryId: number;
  CategoryName: string;
  MenuList: MenuItem[];
}

interface Menu {
  Id: number;
  Name: string;
  Sub: Category[];
}

interface MenuItemTransformed {
  id: string;
  title: string;
  name: string;
  href: string;
  icon: string;
}

interface TransformedCategory {
  parentName: string; // Added parentName here
  category: string;
  items: MenuItemTransformed[];
}
function transformMenuList(menuList: Category[], parentName: string): TransformedCategory[] {
  return menuList.map(category => ({
    parentName: parentName, // Include parentName at the category level
    category: category.CategoryName,
    items: category.MenuList.map(menu => ({
      id: menu.MenuID.toString(),
      title: menu.Name.trim(),
      name: menu.Name,
      href: menu.Link,
      icon: menu.icon || ICON_URL
    }))
  }));
}


const menulist: Menu[] = [
  {
    Id: 1,
    Name: "System",
    Sub: [
      {
        CategoryId: 1,
        CategoryName: 'Security',
        MenuList: [
          { MenuID: 1, Name: "Menu 1", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 2, Name: "Menu 2", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 3, Name: "Menu 3", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 4, Name: "Menu 4", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      },
      {
        CategoryId: 2,
        CategoryName: 'Application',
        MenuList: [
          { MenuID: 5, Name: "Menu 1", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 6, Name: "Menu 2", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 7, Name: "Menu 3", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 8, Name: "Menu 4", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      },
      {
        CategoryId: 3,
        CategoryName: 'General',
        MenuList: [
          { MenuID: 9, Name: "Menu 1", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 10, Name: "Menu 2", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 11, Name: "Menu 3", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 12, Name: "Menu 4", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      }
    ]
  },
  {
    Id: 2,
    Name: "Master Setup",
    Sub: [
      {
        CategoryId: 4,
        CategoryName: 'Master',
        MenuList: [
          { MenuID: 13, Name: "EmployeeMaster", Link: "/masterexplorer?docCd=10014", DocCd: 10014, icon: ICON_URL },
          { MenuID: 14, Name: "Accomodation Master", Link: "/masters/accomodationmaster", DocCd: 0, icon: ICON_URL }
        ]
      },
      {
        CategoryId: 5,
        CategoryName: 'Other Master',
        MenuList: [
          { MenuID: 15, Name: "Menu 1", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 16, Name: "Menu 2", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 17, Name: "Menu 3", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 18, Name: "Menu 4", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      },
      {
        CategoryId: 6,
        CategoryName: 'General',
        MenuList: [
          { MenuID: 19, Name: "Menu 1", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 20, Name: "Menu 2", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 21, Name: "Menu 3", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 22, Name: "Menu 4", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      }
    ]
  },
  {
    Id: 3,
    Name: "Employee Self Service",
    Sub: [
      {
        CategoryId: 7,
        CategoryName: 'My Profile',
        MenuList: [
          { MenuID: 23, Name: "Menu 1", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 24, Name: "Menu 2", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      }
    ]
  },
  {
    Id: 4,
    Name: "Employee Management",
    Sub: [
      {
        CategoryId: 8,
        CategoryName: 'Pay Component',
        MenuList: [
          { MenuID: 25, Name: "Variable Allowance & Deduction", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 26, Name: "Recurring Allowance & Deduction", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      }
    ]
  }
];

// Generate dropdown data with parent menu name
const DROPDOWN_ITEM_DATA_SYSTEM = transformMenuList(menulist.find(menu => menu.Name === "System")?.Sub || [], "System");
const DROPDOWN_ITEM_DATA_MASTER_SETUP = transformMenuList(menulist.find(menu => menu.Name === "Master Setup")?.Sub || [], "Master Setup");
const DROPDOWN_ITEM_DATA_EMPLOYEE_SELF_SERVICE = transformMenuList(menulist.find(menu => menu.Name === "Employee Self Service")?.Sub || [], "Employee Self Service");
const DROPDOWN_ITEM_DATA_EMPLOYEE_MANAGEMENT = transformMenuList(menulist.find(menu => menu.Name === "Employee Management")?.Sub || [], "Employee Management");

export {
  menulist,
  DROPDOWN_ITEM_DATA_SYSTEM,
  DROPDOWN_ITEM_DATA_MASTER_SETUP,
  DROPDOWN_ITEM_DATA_EMPLOYEE_SELF_SERVICE,
  DROPDOWN_ITEM_DATA_EMPLOYEE_MANAGEMENT,
  type MenuItem
};
