import { prisma } from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: "d310da63-4121-4c60-8476-ad10c67091cf",
      title: "Unit Summit",
      slug: "unit-summit",
      details: "Um evento para devs apaixonados por programação.",
      maximumAttendees: 100,
    },
  });
}

seed().then(() => console.log("database seeded"));
