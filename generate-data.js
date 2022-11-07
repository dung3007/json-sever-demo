const faker = require('faker');
const fs = require('fs');

// Set locale to use Vietnamese
// faker.locale = 'vi'

const ramdomCityList = (n) => {
    if (n <= 0 ) return []
    const cityList = [];

    Array.from(new Array(n)).forEach(() => {
        const city = {
            id: faker.random.uuid(),
            name: faker.address.city()
        };
        cityList.push(city);
    });

    return cityList;
};

const ramdomStudentList = (n) => {
    if (n <= 0 ) return []
    const studentList = [];

    Array.from(new Array(n)).forEach(() => {
        const student = {
            id: faker.random.uuid(),
            name: faker.name.firstName()
        };
        studentList.push(student);
    });

    return studentList;
};

const ramdomCatalogyList = (n) => {

    if ( n <= 0 ) return []
    const catelogyList = [];

    // loop and push categogy
    Array.from(new Array(n)).forEach(() => {
        const catelogy = {
            id: faker.random.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        catelogyList.push(catelogy);
    });


    return catelogyList;
};

const ramdomProductList = (catelogyList, numberOfProducts) => {
    if (numberOfProducts <= 0 ) return [];

    const productList = [];

    for (const category of catelogyList) {
        Array.from(new Array(numberOfProducts)).forEach(() => {
            const product = {
                categoryId: category.id,
                id: faker.random.uuid(),
                name: faker.commerce.department(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl(400, 400)
            }
            productList.push(product);
        })
    }

    return productList;
}


// IFFE
(() => {

    // ramdom data

    const catelogyList = ramdomCatalogyList(4)
    const productList = ramdomProductList(catelogyList, 5)
    const cityList = ramdomCityList(5)
    const studentList = ramdomStudentList(10)

    // prepare db object
    const db = {
        catelogies: catelogyList,
        products: productList,
        cities: cityList,
        students: studentList,
        profile: {
            name: "Po"
        }
    };

    // write db object to db.json
    fs.writeFile("db.json", JSON.stringify(db), () => {
        console.log("Generate data successfully");
    });
})();