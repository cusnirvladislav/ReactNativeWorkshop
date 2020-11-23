import faker from 'faker'

const fakeCoffeeShops = (() => {
    let data = [];

    for(let i=0; i<=12; i++) {
        data.push({
            id: faker.random.uuid(),
            image_url: faker.image.imageUrl(),
            name: faker.company.companyName()
        });
    }

    return data;
})();

export default fakeCoffeeShops;