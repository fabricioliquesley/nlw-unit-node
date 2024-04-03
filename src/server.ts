import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createEvent } from "./routes/create-events.js";
import { registerForEvent } from "./routes/register-for-event.js";
import { getEvent } from "./routes/get-event.js";
import { getAttendeeBadge } from "./routes/get-attendee-badge.js";
import { checkIn } from "./routes/check-in.js";
import { getEventAttendees } from "./routes/get-event-attendees.js";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent);
app.register(registerForEvent);
app.register(getEvent);
app.register(getAttendeeBadge);
app.register(checkIn);
app.register(getEventAttendees)

app.listen({ port: 3333 }).then(() => {
  console.log("API listening on port 3333");
});
