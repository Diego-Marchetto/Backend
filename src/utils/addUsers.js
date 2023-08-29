import { faker } from "@faker-js/faker";
export async function addUsers() {
  const users = [];
  for (let i = 0; i < 5000; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
    });
  }
  try {
    await UserModel.insertMany(users);
    console.log("inserted", users.length, "users");
  } catch (error) {
    console.log(error);
  }
}
