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
                localStorage.setItem("timer_status", "start");
                const time_now = Math.floor(Date.now() / 1000);
                localStorage.setItem("start_time", String(time_now));
                this.start();
            } else {
                localStorage.setItem("remaining_time", String(this.remainingSeconds));
                localStorage.setItem("timer_status", "pause");
                this.stop();
            }
        });

        this.el.reset.addEventListener("click", () => {
            const inputMinutes = prompt("Enter number of minutes:");

            if (inputMinutes < 60) {
                localStorage.setItem("timer_duration", String(inputMinutes*60));
                localStorage.setItem("remaining_time", String(inputMinutes*60))
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();
            }
            else {
                localStorage.setItem("remaining_time", "0");
            }
        });

        if (localStorage.getItem("timer_status") == "start") {
            this.remainingSeconds = parseInt(localStorage.getItem("start_time")) + 
                                    parseInt(localStorage.getItem("timer_duration")) - 
                                    parseInt(localStorage.getItem("timer_exit_time"));
            if (this.remainingSeconds >= 2) {
                this.updateInterfaceTime();
                this.updateInterfaceControls();
                this.start();
            } else {
                localStorage.setItem("timer_status") = "stop";
                this.stop();
            }
        }
        else if (localStorage.getItem("timer_status") == "pause") {
            this.remainingSeconds = parseInt(localStorage.getItem("remaining_time"));
            if (this.remainingSeconds > 0) {
                this.updateInterfaceTime();
                this.updateInterfaceControls();
            }
        }
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
            const time_now = Math.floor(Date.now() / 1000);
            localStorage.setItem("timer_exit_time", String(time_now));

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

class Music_Note {
    constructor(root) {
        root.innerHTML = Music_Note.getHTML();

        if (localStorage.getItem("note_status") == "show") {
            showNote();
        }

        this.el = {
            music: root.querySelector(".music__btn--control"),
            note: root.querySelector(".note__btn--control"),
            info: root.querySelector(".info__btn--control"),
            setting:root.querySelector(".setting__btn--control")
        };

        this.el.music.addEventListener("click", () => {
            this.el.music.innerHTML = `<span class="material-icons">music_note</span>`;
            const window_content = {
                url: "player.html",
                type: "popup",
                focused: true,
                height: 150,
                width: 350
            }
            chrome.windows.create(window_content, () => {});
        });

        this.el.note.addEventListener("click", () => {
            var note = document.getElementById("notes");
            if (note == null) {
                showNote();
            }
            else {
                hideNote();
            }
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

function showNote() {
    localStorage.setItem("note_status", "show");
    var note_area = document.createElement("div");
    note_area.setAttribute("id", "notes")
    
    var notes = document.createElement("textarea");
    notes.setAttribute("id", "notes_text");
    notes.setAttribute("placeholder", "Type here");
    notes.setAttribute("spellcheck", false);
    notes.setAttribute("autofocus", true);
    notes.setAttribute("rows", 5);
    notes.setAttribute("cols", 22);
    if (localStorage.getItem("note") != null) {
        notes.value = localStorage.getItem("note");
    }
    note_area.appendChild(notes);

    var save_button = document.createElement("button");
    save_button.setAttribute("id", "save_notes");
    save_button.innerHTML = `<span class="material-icons">save</span>`
    note_area.appendChild(save_button);

    var clean_button = document.createElement("button");
    clean_button.setAttribute("id", "clean_button");
    clean_button.innerHTML = `<span class="material-icons">delete</span>`
    note_area.appendChild(clean_button);

    var new_button = document.createElement("button");
    new_button.setAttribute("id", "new_button");
    new_button.innerHTML = `<span class="material-icons">add_circle_outline</span>`
    note_area.appendChild(new_button);

    var close_button =  document.createElement("button");
    close_button.setAttribute("id", "close_button");
    close_button.innerHTML = `<span class="material-icons">clear</span>`
    note_area.appendChild(close_button);

    // listener
    close_button.addEventListener("click", () => {
        hideNote();
    });
    clean_button.addEventListener("click", () => {
        notes.value = "";
        localStorage.setItem("note", "");
    });
    save_button.addEventListener("click", () => {
        notes.focus();
        const file = {
			url:'data:application/txt,' +
				encodeURIComponent(notes.value.replace(/\r?\n/g, '\r\n')),
			filename: "notes.txt",
		};
		chrome.downloads.download(file);
    });
    notes.addEventListener("change", () => {
        localStorage.setItem("note", notes.value);
    })
    new_button.addEventListener("click", () => {
        localStorage.setItem("note", "");
        notes.value = "";
    })
    document.body.append(note_area);
}

function hideNote() {
    localStorage.setItem("note_status", "hide");
    var note_area = document.getElementById("notes");
    note_area.parentNode.removeChild(note_area);
}
