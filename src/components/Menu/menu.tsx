const menulist = 
[
    {
        Id: 1,
        Name: "System",
        Sub :
        [
            {
                CategoryId: 1,
                CategoryName: 'Security',
                MenuList: [
                    {
                        MenuID :1,
                        Name:"Menu 1 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :2,
                        Name:"Menu 2 ",
                       Link:"" ,
                       DocCd:0
                    },
                    {
                        MenuID :3,
                        Name:"Menu 3 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :4,
                        Name:"Menu 4 ",
                        Link:"",
                        DocCd:0
                    }
                ]

                
            },            {
                CategoryId: 2,
                CategoryName: 'Applicationn',
                MenuList: [
                    {
                        MenuID :1,
                        Name:"Menu 1 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :2,
                        Name:"Menu 2 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :3,
                        Name:"Menu 3 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :4,
                        Name:"Menu 4 ",
                        Link:"",
                        DocCd:0
                    }
                ]

                
            },            {
                CategoryId: 3,
                CategoryName: 'General',
                MenuList: [
                    {
                        MenuID :1,
                        Name:"Menu 1 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :2,
                        Name:"Menu 2 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :3,
                        Name:"Menu 3 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :4,
                        Name:"Menu 4 ",
                        Link:"",
                        DocCd:0
                    }
                ]

                
            }

        ]
    }
    ,
    {
        Id: 2,
        Name: "Master Setup",
        Sub :
        [
            {
                CategoryId: 1,
                CategoryName: 'Master',
                MenuList: [
                    {
                        MenuID :1,
                        Name:"EmployeeMaster",
                        Link:"/masterexplorer?docCd=10014",
                        DocCd:10014
                    },
                    {
                        MenuID :2,
                        Name:"Menu 2 ",
                        Link:"",
                        DocCd:0
                    }
                ]

                
            },            {
                CategoryId: 2,
                CategoryName: 'Other Master',
                MenuList: [
                    {
                        MenuID :1,
                        Name:"Menu 1 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :2,
                        Name:"Menu 2 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :3,
                        Name:"Menu 3 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :4,
                        Name:"Menu 4 ",
                        Link:"",
                        DocCd:0
                    }
                ]

                
            },            {
                CategoryId: 3,
                CategoryName: 'General',
                MenuList: [
                    {
                        MenuID :1,
                        Name:"Menu 1 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :2,
                        Name:"Menu 2 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :3,
                        Name:"Menu 3 ",
                        Link:"",
                        DocCd:0
                    },
                    {
                        MenuID :4,
                        Name:"Menu 4 ",
                        Link:"",
                        DocCd:0
                    }
                ]

                
            }

        ]
    },
    {
        Id: 3,
        Name: "Employee Self Service",
        Sub :[           {
            CategoryId: 1,
            CategoryName: 'My Profile',
            MenuList: [
                {
                    MenuID :1,
                    Name:"Menu 1 ",
                    Link:"",
                    DocCd:0
                },
                {
                    MenuID :2,
                    Name:"Menu 2 ",
                    Link:"",
                    DocCd:0
                }
            ]

            
        }]
        
    },
    {
        Id: 4,
        Name: "Employee Management",
        Sub :[           {
            CategoryId: 1,
            CategoryName: 'Pay Component',
            MenuList: [
                {
                    MenuID :1,
                    Name:"Variable Allowance & Deduction",
                    Link:"",
                    DocCd:0
                },
                {
                    MenuID :2,
                    Name:"Recurring Allowance & Deduction",
                    Link:"",
                    DocCd:0
                }
            ]

            
        }]
    }
    // ,
    // {
    //     Id: 5,
    //     Name: "Attendance"
    // },
    // {
    //     Id: 7,
    //     Name: "Payroll"
    // },
    // {
    //     Id: 8,
    //     Name: "Accounts"
    // },
    // {
    //     Id: 7,
    //     Name: "Reports"
    // }

]
export default menulist;

