import {z} from 'zod';

export const verifySchema = z.object({
identifier: z.string().min(3, 'Identifier must be at least 3 characters long').max(20, 'Identifier must be at most 20 characters long'),
password: z.string().min(6, 'Password must be at least 6 characters long'),
});    