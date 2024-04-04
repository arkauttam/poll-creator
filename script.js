
let optionCount = 1;
let pollCreated = false;

function openModal() {
    $('#pollModal').modal('show');
}

function closeModal() {
    $('#pollModal').modal('hide');

}

function addNewOption(input) {
    const inputValue = input.value.trim();
    if (inputValue !== '' && input.id === `option${optionCount}`) {
        optionCount++;
        const optionContainer = document.getElementById('optionContainer');
        const newOptionLabel = document.createElement('label');
        newOptionLabel.setAttribute('for', `option${optionCount}`);
        newOptionLabel.textContent = `Option ${optionCount}:`;
        const newOptionInput = document.createElement('input');
        newOptionInput.setAttribute('type', 'text');
        newOptionInput.setAttribute('id', `option${optionCount}`);
        newOptionInput.setAttribute('name', `option${optionCount}`);
        newOptionInput.classList.add('form-control', 'option-input');
        newOptionInput.oninput = function () { addNewOption(this); };
        optionContainer.appendChild(newOptionLabel);
        optionContainer.appendChild(newOptionInput);
        optionContainer.appendChild(document.createElement('br'));
    }
    checkFormValidity();
}

function checkFormValidity() {
    const pollQuestionInput = document.getElementById('pollQuestion');
    const option1Input = document.getElementById('option1');
    const createPollButton = document.getElementById('createPollButton');

    if (pollQuestionInput.value.trim() !== '' && option1Input.value.trim() !== '') {
        createPollButton.disabled = false;
    } else {
        createPollButton.disabled = true;
    }
}

document.getElementById('pollForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const pollQuestion = document.getElementById('pollQuestion').value;
    const options = document.querySelectorAll('.option-input');
    const pollResult = document.getElementById('pollResult');

    pollResult.innerHTML = '';
    let optionsFilled = false;
    options.forEach(option => {
        if (option.value.trim() !== '') {
            optionsFilled = true;
        }
    });

    if (optionsFilled) {
        const pollFormHTML = document.createElement('form');
        pollFormHTML.className = 'mt-3';
        pollFormHTML.innerHTML = `<h3>${pollQuestion}</h3>`;
        options.forEach(option => {
            if (option.value.trim() !== '') {
                const optionLabel = document.createElement('label');
                optionLabel.className = 'd-block';
                optionLabel.innerHTML = `<input type="radio" name="pollOption" value="${option.value}" onclick="updateProgressBar(this)">${option.value}<br>`;
                const progressDiv = document.createElement('div');
                progressDiv.className = 'progress';
                const progressBar = document.createElement('div');
                progressBar.className = 'progress-bar';
                progressBar.setAttribute('role', 'progressbar');
                progressBar.setAttribute('aria-valuenow', '0');
                progressBar.setAttribute('aria-valuemin', '0');
                progressBar.setAttribute('aria-valuemax', '100');
                progressDiv.appendChild(progressBar);
                pollFormHTML.appendChild(optionLabel);
                pollFormHTML.appendChild(progressDiv);
            }
        });

        const viewPollButton = document.createElement('button');
        viewPollButton.className = 'btn btn-primary view-poll-button';
        viewPollButton.textContent = 'View Poll';
        viewPollButton.onclick = function () { showPoll(pollFormHTML.outerHTML); };
        pollResult.appendChild(pollFormHTML);
        pollResult.appendChild(viewPollButton);
        pollCreated = true;
        closeModal();
        togglePollButton();
    } else {
        alert('Please fill in at least one option.');
    }
});

function updateProgressBar(selectedOption) {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(progressBar => {
        progressBar.style.width = '0%';
    });
    selectedOption.parentElement.nextElementSibling.querySelector('.progress-bar').style.width = '100%';
}

function showPoll(pollHTML) {
    const pollResult = document.getElementById('pollResult');
    pollResult.innerHTML = pollHTML;
}

function togglePollButton() {
    const pollButton = document.getElementById('pollButton');
    const pollResult = document.getElementById('pollResult');
    pollButton.style.display = pollCreated ? 'none' : 'block';
    pollResult.style.display = pollCreated ? 'block' : 'none';
}
checkFormValidity();
