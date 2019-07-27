import faker from 'faker';

export default {
  fetchData: (delay = 0) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(
          Array.from(
            { length: faker.random.number({ min: 2, max: 15 }) },
            () => ({
              id: faker.random.uuid(),
              title: faker.internet.domainName(),
              summary: faker.company.bs(),
              description: faker.lorem.paragraph(),
              tasks: Array.from({ length: 20 }, () => ({
                id: faker.random.uuid(),
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                status: faker.random.arrayElement(['todo', 'progress', 'done']),
              })),
            })
          )
        );
      }, delay);
    }),
};
