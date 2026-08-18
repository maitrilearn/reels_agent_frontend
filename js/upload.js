const videoInput =
    document.getElementById(
        "videoInput"
    );

const dropZone =
    document.getElementById(
        "dropZone"
    );

const chooseVideo =
    document.getElementById(
        "chooseVideo"
    );

const changeVideo =
    document.getElementById(
        "changeVideo"
    );


chooseVideo.addEventListener(
    "click",
    () => {

        videoInput.click();

    }
);


dropZone.addEventListener(
    "click",
    (event) => {

        if (
            event.target !==
            chooseVideo
        ) {

            videoInput.click();

        }

    }
);


videoInput.addEventListener(
    "change",
    () => {

        if (
            videoInput.files.length
        ) {

            loadVideo(
                videoInput.files[0]
            );

        }

    }
);


function loadVideo(file) {

    const video =
        document.getElementById(
            "videoPreview"
        );

    const url =
        URL.createObjectURL(file);

    video.src = url;

    video.onloadedmetadata =
        function () {

            document
                .getElementById(
                    "videoDuration"
                )
                .textContent =
                formatDuration(
                    video.duration
                );

            document
                .getElementById(
                    "videoResolution"
                )
                .textContent =
                `${video.videoWidth} × ${video.videoHeight}`;

        };


    document
        .getElementById(
            "fileName"
        )
        .textContent =
        file.name;


    document
        .getElementById(
            "fileSize"
        )
        .textContent =
        `${(
            file.size /
            1024 /
            1024
        ).toFixed(2)} MB`;


    dropZone.classList.add(
        "hidden"
    );


    document
        .getElementById(
            "videoInfo"
        )
        .classList.remove(
            "hidden"
        );

}


changeVideo.addEventListener(
    "click",
    () => {

        videoInput.value = "";

        document
            .getElementById(
                "videoInfo"
            )
            .classList.add(
                "hidden"
            );

        dropZone.classList.remove(
            "hidden"
        );

    }
);


function formatDuration(seconds) {

    const minutes =
        Math.floor(
            seconds / 60
        );

    const secs =
        Math.floor(
            seconds % 60
        );

    return `${minutes}:${secs
        .toString()
        .padStart(2, "0")}`;

}
