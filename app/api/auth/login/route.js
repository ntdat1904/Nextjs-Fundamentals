import { z } from "zod";

const dummyUser = {
    email: "admin@yopmail.com",
    password: "admin"
}

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(5).max(100),
});

export const POST = async (req) => {
    try {
        const parsedBody = schema.parse(await req.json());
        if (parsedBody.email !== dummyUser.email || parsedBody.password !== dummyUser.password) {
            return Response.json({
                message: "POST /api/contact",
                error: "Invalid credentials"
            }, { status: 401 });
        }

        return Response.json({
            message: "POST /api/contact",
            data: {
                "user": {
                    "email": parsedBody.email
                }
            }
        }, {status: 200});
    } catch (error) {
        return Response.json({
            message: "POST /api/contact",
            error: error.errors
        }, { status: 422 });
    }
}