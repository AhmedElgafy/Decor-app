import prisma from "../prisma/queries";
import { faker } from "@faker-js/faker";
enum Gender {
  M,
  F,
}
const addFakeUsers = async () => {
  await prisma.user.create({
    data: {
      birthDate: faker.date.between({ from: "2000-01-01", to: Date.now() }),
      email: faker.internet.email(),
      gender: faker.helpers.arrayElement(["M", "F"]),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      phone: faker.phone.number(),
    },
  });
};
const addFakeProducts = async () => {
  try {
    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        image: faker.image.url(),
      },
    });
  } catch (error) {
    console.log("error in creating product");
  }
};
try {
  for (let i = 0; i < 11; i++) {
    addFakeProducts();
  }
} catch (error) {
  console.log(error);
} finally {
  console.log("inserting data is completed");
}
