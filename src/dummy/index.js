// const data = [
//     ["Joe James", "Test Corp", "Yonkers", "NY"],
//     ["John Walsh", "Test Corp", "Hartford", "CT"],
//     ["Bob Herm", "Test Corp", "Tampa", "FL"],
//     ["James Houston", "Test Corp", "Dallas", "TX"],
// ];

// const data = [
//     { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
//     { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
//     { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
//     { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
//    ];




const data = [
    ["https://via.placeholder.com/150", "Product 1", "$100", "Category 1", "Yes", "Edit ID 1"],
    ["https://via.placeholder.com/150", "Product 2", "$200", "Category 2", "No", "Edit ID 2"],
    ["https://via.placeholder.com/150", "Product 3", "$300", "Category 3", "Yes", "Edit ID 3"],
    ["https://via.placeholder.com/150", "Product 4", "$400", "Category 4", "No", "Edit ID 4"],
    ["https://via.placeholder.com/150", "Product 5", "$500", "Category 5", "Yes", "Edit ID 5"],
    ["https://via.placeholder.com/150", "Product 6", "$600", "Category 6", "No", "Edit ID 15"],
    ["https://via.placeholder.com/150", "Product 7", "$700", "Category 7", "Yes", "Edit ID 14"],
    ["https://via.placeholder.com/150", "Product 8", "$800", "Category 8", "No", "Edit ID 14"],
    ["https://via.placeholder.com/150", "Product 9", "$900", "Category 9", "Yes", "Edit ID 11"],
    ["https://via.placeholder.com/150", "Product 10", "$1000", "Category 10", "No", "Edit ID 13"],
    ["https://via.placeholder.com/150", "Product 11", "$1100", "Category 11", "Yes", "Edit ID 15"],
    ["https://via.placeholder.com/150", "Product 12", "$1200", "Category 12", "No", "Edit ID 11"],
    ["https://via.placeholder.com/150", "Product 13", "$1300", "Category 13", "Yes", "Edit ID 111"],
    ["https://via.placeholder.com/150", "Product 14", "$1400", "Category 14", "No", "Edit ID 122"],
    ["https://via.placeholder.com/150", "Product 15", "$1500", "Category 15", "Yes", "Edit ID 122"],
    ["https://via.placeholder.com/150", "Product 16", "$1600", "Category 16", "No", "Edit ID 1221"],
    ["https://via.placeholder.com/150", "Product 17", "$1700", "Category 17", "Yes", "Edit ID 12221"],
    ["https://via.placeholder.com/150", "Product 18", "$1800", "Category 18", "No", "Edit ID 1456"],
    ["https://via.placeholder.com/150", "Product 19", "$1900", "Category 19", "Yes", "Edit ID 14785"],
    ["https://via.placeholder.com/150", "Product 20", "$2000", "Category 20", "No", "Edit ID 1147"],
]

export const productData = data.map((item) => ({
    productImage: item[0],
    productName: item[1],
    productPrice: item[2],
    productCategory: item[3],
    productInStock: item[4],
    action: item[5]
}));