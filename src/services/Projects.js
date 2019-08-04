import faker from 'faker';

export default {
  fetchData: (delay = 0) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const projects = Array.from(
          { length: faker.random.number({ min: 2, max: 15 }) },
          () => ({
            id: faker.random.uuid(),
            title: faker.internet.domainName(),
            summary: faker.company.bs(),
            description: faker.lorem.paragraph(),
          })
        );
        const tasks = Array.from(
          {
            length: faker.random.number({
              min: projects.length * 5,
              max: projects.length * 10,
            }),
          },
          () => ({
            id: faker.random.uuid(),
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            status: faker.random.arrayElement(['todo', 'progress', 'done']),
            projectId: faker.random.arrayElement(projects.map(({ id }) => id)),
          })
        );
        resolve({ projects, tasks });
      }, delay);
    }),
};
