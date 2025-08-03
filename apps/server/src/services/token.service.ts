import Jwt from "jsonwebtoken";

import type { User } from "@/types/user.type";
import type { NextFunction, Request, Response } from "express";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const generateToken = (user: User): string => {
    return Jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: "3h" });
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as { id: number }
        const user = await db.select().from(users).where(eq(users.id, decoded.id));

        if(!user) return res.status(404).json({ message: 'User not found' });

        req.user = user[0]
        next();
    } catch (error) {
        res.status(403).json({ error: 'Invalid token' });
    }
}