// Pollinations.AI

import express from 'express';
const router = express.Router();


// pollinations.ai wrapper
async function pollinations(prompt) {
    prompt = prompt.replace(/ /g, "+");
    const response = await fetch(`https://image.pollinations.ai/prompt/${prompt}`);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    return base64;
}

(async () => {
    console.log(await pollinations("Elephant standing on top of a table"));
})

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from Pollinations.AI' });
});

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;
        const image = await pollinations(prompt);
        res.status(200).json({ photo: image });
    } catch (error) {
        console.error(error);
        const errMsg =
            error?.response?.data?.error?.message ||
            error?.message ||
            'Something went wrong';
        res.status(500).json({ error: errMsg });
    }
});

export default router;