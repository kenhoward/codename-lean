function danger() {
    const audio = document.createElement("audio");
    audio.src='./alien_danger.wav';
    audio.play();
}

function gameOverMan() {
    const audio = document.createElement("audio");
    audio.src='./aliens_game_over2.wav';
    audio.play();

    document.getElementById("gameOver").style.display = "block";
    document.getElementById("selfDestructButton").style.display = "none";
}

function fireModal() {
    let timerInterval

    danger();

    Swal.fire({
    title: 'SELF DESTRUCTION INITIATED!',
    html:
        'I will close in <strong></strong> seconds.<br/><br/>' +
        '<button id="increase" class="btn btn-warning">' +
        'I need 5 more seconds!' +
        '</button><br/><br/>' +
        '<button id="stop" class="btn btn-danger">' +
        'Cancel Self Destruct' +
        '</button><br/><br/>' +
        '<button id="resume" class="btn btn-success" disabled>' +
        'Don\'t click this!' +
        '</button><br/><br/>' +
        '<button id="toggle" class="btn btn-primary">' +
        'Toggle' +
        '</button>',
    timer: 9000,
    willOpen: () => {
        const content = Swal.getContent()
        const $ = content.querySelector.bind(content)

        const stop = $('#stop')
        const resume = $('#resume')
        const toggle = $('#toggle')
        const increase = $('#increase')

        Swal.showLoading()

        function toggleButtons () {
        stop.disabled = !Swal.isTimerRunning()
        resume.disabled = Swal.isTimerRunning()
        }

        stop.addEventListener('click', () => {
        Swal.stopTimer()
        toggleButtons()
        })

        resume.addEventListener('click', () => {
        Swal.resumeTimer()
        toggleButtons()
        })

        toggle.addEventListener('click', () => {
        Swal.toggleTimer()
        toggleButtons()
        })

        increase.addEventListener('click', () => {
        Swal.increaseTimer(5000)
        })

        timerInterval = setInterval(() => {
        Swal.getContent().querySelector('strong')
            .textContent = (Swal.getTimerLeft() / 1000)
            .toFixed(0)
        }, 100)
    },
    onClose: () => {
        gameOverMan()
        clearInterval(timerInterval)
    }
    })
}