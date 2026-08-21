const API_BASE_URL = "http://localhost:5000/api";

async function createReel(formData) {
    const response = await fetch(
        `${API_BASE_URL}/reels/create`,
        {
            method: "POST",
            body: formData
        }
    );

    const text = await response.text();

    let data;

    try {
        data = JSON.parse(text);
    } catch (error) {
        throw new Error(
            `Server returned invalid JSON: ${text.substring(0, 200)}`
        );
    }

    if (!response.ok) {
        throw new Error(
            data.error || "Failed to create Reel"
        );
    }

    return data;
}

async function getReelStatus(reelId) {

    const response = await fetch(
        `${API_BASE_URL}/reels/status/${reelId}`
    );

    const text = await response.text();

    let data;

    try {
        data = JSON.parse(text);
    } catch (error) {
        throw new Error(
            `Status API returned invalid JSON: ${text.substring(0, 200)}`
        );
    }

    if (!response.ok) {
        throw new Error(
            data.error ||
            "Failed to get Reel status"
        );
    }

    return data.data || data.job;
}
