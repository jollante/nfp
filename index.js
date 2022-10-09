let newZyklusButton = document.getElementById('new-zyklus');
let forBtnZyklusDay = document.getElementById('for-btn-zyklus-data');
let backBtnZyklusDay = document.getElementById('back-btn-zyklus-data');
let editBtn = document.getElementById('edit-btn')
let homeBtn = document.getElementById('home-btn')
let saveZyklusData = document.getElementById('save-data');
let zyklusInputWrapper = document.getElementsByClassName('zyklus-input-wrapper')
let zyklusNumber = document.getElementById('zyklus-number');
let zyklusDay = document.getElementById('day');
let tempData = document.getElementById('temp');
let sexData = document.getElementById('sex');
let period = document.getElementById('period');
let zyklusDataApp = document.getElementById("zyklus-data-app");
let app = document.getElementById("app")

let savedFade = document.getElementById('fade');

let zyklusCounter = 1;
let zyklusDayCounter = 1;
let zyklusData = [];

class ZyklusDay {
    constructor(zyklus, day, period, temp, sex,) {
        this.zyklus = zyklus;
        this.day = day;
        this.period = period;
        this.temp = temp;
        this.sex = sex;
    }
}

newZyklusButton.onclick = function () {
    if (!zyklusData[zyklusDay.innerHTML - 1]) {
    zyklusNumber.innerHTML = zyklusCounter;
    tempData.value = '';
    sexData.checked = false;
    period.value = '';
    }
    zyklusDataApp.classList.toggle("hidden");
    app.classList.toggle("hidden");
}

homeBtn.onclick = function () {

    zyklusDataApp.classList.toggle("hidden");
    app.classList.toggle("hidden");
}


function savedFeedback() {
    savedFade.classList.toggle('visibility-hidden');
    savedFade.classList.toggle('visible')
}


function toggleSaveEditBtnsDisableInput() {
    if (tempData.disabled == true) {
        tempData.disabled = false;
        sexData.disabled = false;
        period.disabled = false;
        if (!editBtn.classList.contains('hidden')) {
            zyklusInputWrapper[0].classList.remove('disabled')
            editBtn.classList.add('hidden');
            saveZyklusData.classList.remove('hidden');
        }
    } else {
        tempData.disabled = true;
        sexData.disabled = true;
        period.disabled = true;
        if (editBtn.classList.contains('hidden')) {
            zyklusInputWrapper[0].classList.add('disabled')
            editBtn.classList.remove('hidden');
            saveZyklusData.classList.add('hidden');
        }
    }
}

function lookUpValues() {
    const areThereInputValues = tempData.value !== '' || sexData.checked !== false || period.value !== '';
    return areThereInputValues;
}

saveZyklusData.onclick = function (event) {
    event.preventDefault();
    lookUpValues();
    let zyklusDayData = new ZyklusDay(zyklusCounter, parseInt(zyklusDay.innerHTML), period.value, tempData.value, sexData.checked);
    if (!zyklusData[zyklusDay.innerHTML - 1]) {
        zyklusData.push(zyklusDayData);
    } else {
        zyklusData[zyklusDay.innerHTML - 1] = zyklusDayData;
    }
    savedFeedback();
    setTimeout(savedFeedback, 1200);
    setTimeout(toggleSaveEditBtnsDisableInput, 1300);
}

editBtn.onclick = function () {
    toggleSaveEditBtnsDisableInput();
}

forBtnZyklusDay.onclick = function () {
    let zyklusDayCounterUp = zyklusDayCounter + 1;
    let comparison = 0
    btnClickEvents(zyklusDayCounterUp, comparison);
}

backBtnZyklusDay.onclick = function () {
    let zyklusDayCounterDown = zyklusDayCounter - 1;
    let comparison = 1;
    btnClickEvents(zyklusDayCounterDown, comparison)
}

function setInputValues() {
    if (!zyklusData[zyklusDay.innerHTML - 1]) {
        tempData.value = '';
        sexData.checked = false;
        period.value = '';
        if (tempData.disabled == true) {
            toggleSaveEditBtnsDisableInput();
        }
    } else {
        tempData.value = zyklusData[zyklusDay.innerHTML - 1].temp;
        sexData.checked = zyklusData[zyklusDay.innerHTML - 1].sex;
        period.value = zyklusData[zyklusDay.innerHTML - 1].period;
        if (tempData.disabled == false && lookUpValues() == true) {
            toggleSaveEditBtnsDisableInput();
        } else if (tempData.disabled == true && lookUpValues() == false) {
            toggleSaveEditBtnsDisableInput();
        }
    }
}

function btnClickEvents(counterUpOrDown, comparison) {
    let zyklusDayData = new ZyklusDay(zyklusCounter, parseInt(zyklusDay.innerHTML), period.value, tempData.value, sexData.checked);
    if (!zyklusData[zyklusDay.innerHTML - 1]) {
        if (lookUpValues() == true) {
            if (confirm('Deine eingetragenen Werte sind noch nicht gespeichert. Falls du sie speichern möchtest drücke auf Abbrechen und dann auf Speichern.')) {
                if (zyklusDayCounter > comparison) {
                    zyklusData.push(new ZyklusDay(zyklusCounter, parseInt(zyklusDay.innerHTML), '', '', false));
                    zyklusDayCounter = counterUpOrDown;
                    zyklusDay.innerHTML = zyklusDayCounter;
                    setInputValues();
                }
            }
        } else {
            if (zyklusDayCounter > comparison) {
                zyklusData.push(new ZyklusDay(zyklusCounter, parseInt(zyklusDay.innerHTML), '', '', false));
                zyklusDayCounter = counterUpOrDown;
                zyklusDay.innerHTML = zyklusDayCounter;
                setInputValues();
            }

        }
    } else if (zyklusData[zyklusDay.innerHTML - 1]) {
        const isZyklusDataDifferent = JSON.stringify(zyklusDayData) !== JSON.stringify(zyklusData[zyklusDay.innerHTML - 1]);
        if (isZyklusDataDifferent) {
            if (lookUpValues() == true) {
                if (confirm('Deine eingetragenen Werte sind noch nicht gespeichert. Falls du sie speichern möchtest drücke auf Abbrechen und dann auf Speichern.')) {
                    if (zyklusDayCounter > comparison) {
                        zyklusData.push(new ZyklusDay(zyklusCounter, parseInt(zyklusDay.innerHTML), '', '', false));
                        zyklusDayCounter = counterUpOrDown;
                        zyklusDay.innerHTML = zyklusDayCounter;
                        setInputValues();
                    }
                }
            } else {
                if (zyklusDayCounter > comparison) {
                    zyklusData.push(new ZyklusDay(zyklusCounter, parseInt(zyklusDay.innerHTML), '', '', false));
                    zyklusDayCounter = counterUpOrDown;
                    zyklusDay.innerHTML = zyklusDayCounter;
                    setInputValues();
                }
            }
        } else {
            if (zyklusDayCounter > comparison) {
                zyklusDayCounter = counterUpOrDown;
                zyklusDay.innerHTML = zyklusDayCounter;
                setInputValues();
            }
        }
    }
}

