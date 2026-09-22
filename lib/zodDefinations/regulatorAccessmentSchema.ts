import z from "zod";


export const regulatorAccessmentJSONSchema = z.object({
   jurisdiction:z.string().min(3, "Jurisdiction must be 3 characters."),
   regulator:z.string().min(3, "Regulator must be 3 characters."),
   risk_level:z.enum(["High", "Medium", "Low"]),
   effective_date:z.string().min(3, "Effective_date must be valid date."),
   grace_period_deadline:z.string().min(3, "grace_period_deadline must be valid date."),
   status:z.string().min(3, "Status must be 3 characters."),
   timeline_notes:z.string().min(3, "timeline_notes must be 3 characters."),
   citations:z.string().min(3, "citations must be 3 characters.")
});


export type RegulatorAccessmentJSONSchemaType = z.infer<typeof regulatorAccessmentJSONSchema>;
