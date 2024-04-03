import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

import { generateSlug } from "../utils/generate-slug.js";
import { FastifyInstance } from "fastify";
import { BadRequest } from "./_errors/bad-request.js";

export async function createEvent(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/events",
    {
      schema: {
        summary: "Create an event",
        tags: ["events"],
        body: z.object({
          title: z.string().min(4),
          details: z.string().nullable(),
          maximumAttendees: z.number().int().positive().nullable(),
        }),
        response: {
          201: z.object({
            eventId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { title, details, maximumAttendees } = request.body;

      const slug = generateSlug(title);

      const eventWithSlug = await prisma.event.findUnique({
        where: {
          slug,
        },
      });

      if (eventWithSlug !== null) {
        throw new BadRequest("Another event with same title already exists.");
      }

      const event = await prisma.event.create({
        data: {
          title: title,
          details: details,
          maximumAttendees: maximumAttendees,
          slug,
        },
      });

      return reply.status(201).send({ eventId: event.id });
    }
  );
}
