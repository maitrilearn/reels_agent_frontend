const generateButton =
    document.getElementById(
        "generateButton"
    );


generateButton.addEventListener(
    "click",
    async () => {

        const file =
            videoInput.files[0];


        if (!file) {

            alert(
                "Please upload a video first."
            );

            return;

        }


        const status =
            document.getElementById(
                "progressText"
            );

        const progress =
            document.getElementById(
                "progressFill"
            );

        const progressBox =
            document.getElementById(
                "progressContainer"
            );


        progressBox.classList.remove(
            "hidden"
        );


        try {

            updateProgress(
                "Preparing video...",
                10
            );


            /*
             * STEP 1
             *
             * Upload video to
             * Cloudinary.
             *
             * This will be connected
             * to the backend upload
             * endpoint.
             */


            updateProgress(
                "Transcribing video...",
                25
            );


            /*
             * STEP 2
             *
             * Backend → Groq Whisper
             */


            updateProgress(
                "AI is finding the best moments...",
                40
            );


            /*
             * STEP 3
             *
             * Backend → Gemini
             */


            updateProgress(
                "Creating hooks...",
                55
            );


            /*
             * STEP 4
             *
             * Hook generation
             */


            updateProgress(
                "Preparing voice and music...",
                70
            );


            /*
             * STEP 5
             *
             * Azure TTS + music
             */


            updateProgress(
                "Rendering your Reel...",
                85
            );


            /*
             * STEP 6
             *
             * Shotstack / cloud renderer
             */


            updateProgress(
                "Almost ready...",
                95
            );


            /*
             * TEMPORARY RESULT
             *
             * Replace this section
             * after backend integration.
             */


            setTimeout(
                () => {

                    updateProgress(
                        "Reel ready!",
                        100
                    );

                    showDemoResult();

                },
                1000
            );


        } catch (error) {

            status.textContent =
                error.message;

        }

    }
);


function updateProgress(
    text,
    percentage
) {

    document
        .getElementById(
            "progressText"
        )
        .textContent =
        text;


    document
        .getElementById(
            "progressPercent"
        )
        .textContent =
        `${percentage}%`;


    document
        .getElementById(
            "progressFill"
        )
        .style.width =
        `${percentage}%`;

}


function showDemoResult() {

    const section =
        document.getElementById(
            "resultSection"
        );


    section.classList.remove(
        "hidden"
    );


    document
        .getElementById(
            "selectedHook"
        )
        .textContent =
        "Your AI-generated hook will appear here.";


    document
        .getElementById(
            "resultCaption"
        )
        .textContent =
        "Your AI-generated Instagram caption will appear here.";


    document
        .getElementById(
            "hashtags"
        )
        .innerHTML = `
            <span>#reels</span>
            <span>#ai</span>
            <span>#contentcreator</span>
        `;


    section.scrollIntoView({
        behavior: "smooth"
    });

}


function createAnother() {

    document
        .getElementById(
            "resultSection"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "creator"
        )
        .scrollIntoView({
            behavior: "smooth"
        });

}
