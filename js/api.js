const API_BASE_URL =
    "http://localhost:5000/api";


async function analyzeReel(data) {

    const response = await fetch(
        `${API_BASE_URL}/analyze`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {

        const error =
            await response.json();

        throw new Error(
            error.error ||
            "AI analysis failed"
        );
    }

    return response.json();
}


async function translateContent(data) {

    const response = await fetch(
        `${API_BASE_URL}/translate`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {

        throw new Error(
            "Translation failed"
        );
    }

    return response.json();
}


async function generateVoice(data) {

    const response = await fetch(
        `${API_BASE_URL}/tts`,
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(data)
        }
    );

    if (!response.ok) {

        throw new Error(
            "Voice generation failed"
        );
    }

    return response.json();
}
