const https = require('https');
const fs = require('fs');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("No API Key found");
    process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.error) {
                console.error("API Error:", json.error);
                fs.writeFileSync('models.json', JSON.stringify({ error: json.error }, null, 2));
            } else {
                console.log("Writing models to models.json...");
                const names = json.models.map(m => m.name.replace('models/', ''));
                fs.writeFileSync('models.json', JSON.stringify(names, null, 2));
                console.log("Done.");
            }
        } catch (e) {
            console.error(e.message);
        }
    });
}).on('error', (e) => {
    console.error(e);
});
