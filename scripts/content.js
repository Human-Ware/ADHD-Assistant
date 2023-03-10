class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.el = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__btn--control"),
            reset: root.querySelector(".timer__btn--reset")
        };

        this.interval = null;
        this.remainingSeconds = 0;

        this.el.control.addEventListener("click", () => {
            if (this.interval === null) {
                this.start();
            } else {
                this.stop();
            }
        });

        this.el.reset.addEventListener("click", () => {
            const inputMinutes = prompt("Enter number of minutes:");

            if (inputMinutes < 60) {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
            }
        });
    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;

        this.el.minutes.textContent = minutes.toString().padStart(2, "0");
        this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }

    updateInterfaceControls() {
        if (this.interval === null) {
            this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.el.control.classList.add("timer__btn--start");
            this.el.control.classList.remove("timer__btn--stop");
        } else {
            this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.el.control.classList.add("timer__btn--stop");
            this.el.control.classList.remove("timer__btn--start");
        }
    }

    start() {
        if (this.remainingSeconds === 0) return;

        this.interval = setInterval(() => {
            this.remainingSeconds--;
            this.updateInterfaceTime();

            if (this.remainingSeconds === 0) {
                this.stop();
            }
        }, 1000);

        this.updateInterfaceControls();
    }

    stop() {
        clearInterval(this.interval);

        this.interval = null;

        this.updateInterfaceControls();
    }

    static getHTML() {
        return `
			<span class="timer__part timer__part--minutes">00</span>
			<span class="timer__part">:</span>
			<span class="timer__part timer__part--seconds">00</span>
			<button type="button" class="timer__btn timer__btn--control timer__btn--start">
				<span class="material-icons">play_arrow</span>
			</button>
			<button type="button" class="timer__btn timer__btn--reset">
				<span class="material-icons">timer</span>
			</button>
		`;
    }
}

new Timer(
    document.querySelector(".timer")
);

var song = document.getElementById("mySong");

class Music_Note {
    constructor(root) {
        root.innerHTML = Music_Note.getHTML();

        this.el = {
            music: root.querySelector(".music__btn--control"),
            note: root.querySelector(".note__btn--control"),
            info: root.querySelector(".info__btn--control"),
            setting:root.querySelector(".setting__btn--control")
        };

        this.el.music.addEventListener("click", () => {
            if (song.paused) {
                song.play();
                this.el.music.innerHTML = `<span class="material-icons">music_note</span>`;
            } else {
                song.pause();
                this.el.music.innerHTML = `<span class="material-icons">music_off</span>`;
            }
        });

        this.el.note.addEventListener("click", () => {
            var win = window.open("", "Notes", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=500,height=500,top=200,left=900");
            win.document.body.innerHTML = `
                <title>Notes</title>
                <body>
                <textarea id="notes_place" placeholder="Type here" spellcheck="false" autofocus cols="56" rows="31"></textarea>
                </body>
            `
        });

        this.el.info.addEventListener("click", () => {
            var win = window.open("", "Notes", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=200,height=50,top=200,left=900");
            win.document.body.innerHTML = `
                <title>About</title>
                <body>
                <p>Built by HumanWare team.</p>
                </body>
            `;
        });

        this.el.setting.addEventListener("click", () => {
            var win = window.open("", "Notes", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=200,height=50,top=200,left=900");
            win.document.body.innerHTML = `
                <title>Setting</title>
                <body>
                <p>Comming soon.</p>
                </body>
            `;
        })
    }

    static getHTML() {
        return `
            <button type="button" class="music__btn music__btn--control">
            <span class="material-icons">music_off</span>
            </button>
            <button type="button" class="note__btn note__btn--control">
                <span class="material-icons">notes</span>
            </button>
            <button type="button" class="setting__btn setting__btn--control">
            <span class="material-icons">settings</span>
            </button>
            <button type="button" class="info__btn info__btn--control">
                <span class="material-icons">info</span>
            </button>
        `;
    }
}

new Music_Note(
    document.querySelector(".music_note")
);

