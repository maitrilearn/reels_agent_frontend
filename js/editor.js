const generateButton =
    document.getElementById("generateButton");


generateButton.addEventListener(
    "click",
    async () => {

        const file =
            window.videoInput?.files?.[0] ||
            document.getElementById("videoInput")?.files?.[0];

        if (!file) {
            alert("Please upload a video first.");
            return;
        }

        const progressBox =
            document.getElementById("progressContainer");

        if (progressBox) {
            progressBox.classList.remove("hidden");
        }

        try {

            console.log("Creating Reel...");

            updateProgress(
                "Uploading video...",
                10
            );

            const formData = new FormData();

            formData.append("video", file);

            formData.append(
                "source_language",
                getSourceLanguage()
            );

            formData.append(
                "target_language",
                getTargetLanguage()
            );

            formData.append(
                "music_mode",
                getMusicMode()
            );

            formData.append(
                "music_volume",
                getMusicVolume()
            );


            const created =
                await createReel(formData);


            console.log(
                "CREATE RESPONSE:",
                created
            );


            if (!created.success) {
                throw new Error(
                    created.error ||
                    "Failed to create Reel"
                );
            }


            /*
             * Backend returns:
             *
             * {
             *   reel_id: "UUID",
             *   status: "uploaded"
             * }
             */

            const reelId =
                created.reel_id;


            if (!reelId) {
                throw new Error(
                    "Backend did not return reel_id"
                );
            }


            console.log(
                "REEL ID:",
                reelId
            );


            updateProgress(
                "Video uploaded. Processing...",
                35
            );


            await monitorJob(
                reelId
            );


        } catch (error) {

            console.error(
                "REEL ERROR:",
                error
            );

            updateProgress(
                error.message ||
                "Reel generation failed",
                0
            );
        }

    }
);


async function monitorJob(reelId) {

    console.log(
        "Monitoring Reel:",
        reelId
    );


    while (true) {

        const job =
            await getReelStatus(
                reelId
            );


        console.log(
            "STATUS:",
            job
        );


        updateProgress(
            job.step ||
            "Processing...",
            job.progress || 0
        );


        if (
            job.status ===
            "completed"
        ) {

            showResult(job);

            return;
        }


        if (
            job.status ===
            "failed"
        ) {

            throw new Error(
                job.error ||
                "Reel generation failed"
            );
        }


        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    5000
                )
        );
    }
}


function getSourceLanguage() {

    const element =
        document.getElementById(
            "sourceLanguage"
        );

    return element?.value || "auto";
}


function getTargetLanguage() {

    const element =
        document.getElementById(
            "targetLanguage"
        );

    return element?.value || "en";
}


function getMusicMode() {

    const element =
        document.getElementById(
            "musicMode"
        );

    return element?.value || "auto";
}


function getMusicVolume() {

    const element =
        document.getElementById(
            "musicVolume"
        );

    return element?.value || "0.20";
}


function updateProgress(
    text,
    percentage
) {

    const progressText =
        document.getElementById(
            "progressText"
        );

    const progressPercent =
        document.getElementById(
            "progressPercent"
        );

    const progressFill =
        document.getElementById(
            "progressFill"
        );


    if (progressText) {
        progressText.textContent = text;
    }


    if (progressPercent) {
        progressPercent.textContent =
            `${percentage}%`;
    }


    if (progressFill) {
        progressFill.style.width =
            `${percentage}%`;
    }
}


function showResult(job) {

    const section =
        document.getElementById(
            "resultSection"
        );

    if (!section) {
        return;
    }


    section.classList.remove(
        "hidden"
    );


    const hook =
        document.getElementById(
            "selectedHook"
        );

    if (hook) {
        hook.textContent =
            job.hook ||
            "AI hook generated.";
    }


    const caption =
        document.getElementById(
            "resultCaption"
        );

    if (caption) {
        caption.textContent =
            job.caption || "";
    }


    const hashtags =
        document.getElementById(
            "hashtags"
        );

    if (hashtags) {

        const tags =
            Array.isArray(job.hashtags)
                ? job.hashtags
                : [];

        hashtags.innerHTML =
            tags
                .map(
                    tag =>
                        `<span>${escapeHtml(tag)}</span>`
                )
                .join("");
    }


    const resultVideo =
        document.getElementById(
            "resultVideo"
        );


    if (
        resultVideo &&
        job.result_url
    ) {

        resultVideo.src =
            job.result_url;

        resultVideo.load();
    }


    section.scrollIntoView({
        behavior: "smooth"
    });
}


function escapeHtml(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function createAnother() {

    document
        .getElementById("resultSection")
        ?.classList.add("hidden");

    document
        .getElementById("creator")
        ?.scrollIntoView({
            behavior: "smooth"
        });
}
