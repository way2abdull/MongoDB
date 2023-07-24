import { Users } from "../models";

const checkusername = async (req: any, res: any, next:any) => {
    const { recieverName } = req.body;
    if (!recieverName) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        const existingUser = await Users.findOne({ username: recieverName });
        if (existingUser) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    } catch (err) {
        return res.status(500).json({ error: 'cannot find username' });
    }
}

export {checkusername};