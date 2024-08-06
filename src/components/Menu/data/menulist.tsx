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
          { MenuID: 1, Name: "Menu 1", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 2, Name: "Menu 2", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 3, Name: "Menu 3", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 4, Name: "Menu 4", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      },
      {
        CategoryId: 3,
        CategoryName: 'General',
        MenuList: [
          { MenuID: 1, Name: "Menu 1", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 2, Name: "Menu 2", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 3, Name: "Menu 3", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 4, Name: "Menu 4", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      }
    ]
  },
  {
    Id: 2,
    Name: "Master Setup",
    Sub: [
      {
        CategoryId: 1,
        CategoryName: 'Master',
        MenuList: [
          { MenuID: 1, Name: "EmployeeMaster", Link: "/masterexplorer?docCd=10014", DocCd: 10014, icon: ICON_URL },
          { MenuID: 2, Name: "Accomodation Master", Link: "/masters/accomodationmaster", DocCd: 0, icon: ICON_URL }
        ]
      },
      {
        CategoryId: 2,
        CategoryName: 'Other Master',
        MenuList: [
          { MenuID: 1, Name: "Menu 1", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 2, Name: "Menu 2", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 3, Name: "Menu 3", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 4, Name: "Menu 4", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      },
      {
        CategoryId: 3,
        CategoryName: 'General',
        MenuList: [
          { MenuID: 1, Name: "Menu 1", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 2, Name: "Menu 2", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 3, Name: "Menu 3", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 4, Name: "Menu 4", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      }
    ]
  },
  {
    Id: 3,
    Name: "Employee Self Service",
    Sub: [
      {
        CategoryId: 1,
        CategoryName: 'My Profile',
        MenuList: [
          { MenuID: 1, Name: "Menu 1", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 2, Name: "Menu 2", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      }
    ]
  },
  {
    Id: 4,
    Name: "Employee Management",
    Sub: [
      {
        CategoryId: 1,
        CategoryName: 'Pay Component',
        MenuList: [
          { MenuID: 1, Name: "Variable Allowance & Deduction", Link: "", DocCd: 0, icon: ICON_URL },
          { MenuID: 2, Name: "Recurring Allowance & Deduction", Link: "", DocCd: 0, icon: ICON_URL }
        ]
      }
    ]
  }
];

interface MenuItemTransformed {
  id: string;
  title: string;
  href: string;
  icon: string;
}

interface TransformedCategory {
  category: string;
  items: MenuItemTransformed[];
}

function transformMenuList(menuList: Category[]): TransformedCategory[] {
  return menuList.map(category => ({
    category: category.CategoryName,
    items: category.MenuList.map(menu => ({
      id: menu.MenuID.toString(),
      title: menu.Name.trim(),
      href: menu.Link,
      icon: menu.icon || ICON_URL
    }))
  }));
}

const DROPDOWN_ITEM_DATA_SYSTEM = transformMenuList(menulist.find(menu => menu.Name === "System")?.Sub || []);
const DROPDOWN_ITEM_DATA_MASTER_SETUP = transformMenuList(menulist.find(menu => menu.Name === "Master Setup")?.Sub || []);
const DROPDOWN_ITEM_DATA_EXPLOYEE_SELF_SERVICE = transformMenuList(menulist.find(menu => menu.Name === "Employee Self Service")?.Sub || []);
const DROPDOWN_ITEM_DATA_EMPLOYEE_MANAGEMENT = transformMenuList(menulist.find(menu => menu.Name === "Employee Management")?.Sub || []);

export { menulist, DROPDOWN_ITEM_DATA_SYSTEM, DROPDOWN_ITEM_DATA_MASTER_SETUP, DROPDOWN_ITEM_DATA_EXPLOYEE_SELF_SERVICE, DROPDOWN_ITEM_DATA_EMPLOYEE_MANAGEMENT };
