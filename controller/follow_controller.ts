import { Users } from "../models";

const update_follower = async (req: any, res: any) => {
    try {
        const recieverName = req.body.recieverName;
        const senderName = req.body.senderName;

        const checkusername = async (req: any, res: any) => {
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

        const filter = { username: recieverName };
        const update = { $inc: { follower_count: 1 } };
        await Users.updateOne(filter, update);

        const filter1 = { username: senderName };
        const update1 = { $inc: { following_count: 1 } };
        await Users.updateOne(filter1, update1);

        res.status(200).json({ status: "updated successfully" });

    } catch (error) {
        console.log(error);
    }
}

export { update_follower }; 