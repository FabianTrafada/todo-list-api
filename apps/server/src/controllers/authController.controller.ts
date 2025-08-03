import type { Request, Response } from "express";

import { comparePassword, hashPassword } from "@/services/hash.service";
import { db } from "@/db";
import { users } from "@/db/schema";
import { generateToken } from "@/services/token.service";
import { eq } from "drizzle-orm";

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await hashPassword(password);
        const [user] = await db.insert(users).values({
            name: name,
            email: email,
            password: hashedPassword
        }).returning()

        const token = generateToken(user);
        res.status(201).json({ token })
    } catch (error) {
        res.status(500).json({ error: "Failed to register user" })
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const [user] = await db.select().from(users).where(eq(users.email, email));
        if (!user) {
            res.status(404).json({ error: "User/Password incorrect." });
            return;
        }
        
        const passwordComparison = await comparePassword(password, user.password);
        if (!passwordComparison) { 
            res.status(401).json({ error: "User/Password incorrect." });
            return;
        }
            
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
}