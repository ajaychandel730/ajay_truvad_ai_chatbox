import z from "zod";


export const regulatorAccessmentJSONSchema = z.object({
   summary : z.string(),
   changes:z.array(z.string()),
   status:z.enum(["effective" , "upcoming" , "expired" , "unknown"]),
   effective_date:z.string(),
   impacted_teams:z.array(z.string()),
   actions:z.array(z.string()),
   citations:z.array(z.object({title:z.string(), url:z.url()}))
});


export type RegulatorAccessmentJSONSchemaType = z.infer<typeof regulatorAccessmentJSONSchema>;
