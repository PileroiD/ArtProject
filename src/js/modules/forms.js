import { postData } from '../services/requests';
import calc from './calc';

const forms = () => {
    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        textAreas = document.querySelectorAll('textarea'),
        upload = document.querySelectorAll('[name="upload"]'),
        select = document.querySelectorAll('select'),
        endPriceForPicture = document.querySelector('.calc-price');

    // checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так...",
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    // Function that helps clear inputs after form was sent
    const clearInputs = (input) => {
        input.forEach(item => {
            item.value = "";
        });
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.style.cssText = "text-align: center;";
            item.parentNode.appendChild(statusMessage);

            item.classList.add('animated', 'fadeOutUp');
            setTimeout(() => {
                item.style.display = 'none';
            }, 500);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.append(statusImg);

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.append(textMessage);

            const formData = new FormData(item);

            let api;
            item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;
            console.log(api);

            select.forEach(item => {
                if (item.value == '') {
                    calc('#size', '#material', '#options', '.promocode', '.calc-price');
                } else {
                    formData.append(item.getAttribute('id'), item.value);
                }
            });

            if (endPriceForPicture) {
                formData.append('endPrice', endPriceForPicture.innerHTML);
            }

            // const json = {};
            // for (const [key, value] of formData) {
            //     json[key] = value;
            // }

            // const jsonString = JSON.stringify(json);
            // console.log(jsonString);

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessage.textContent = message.success;
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs(inputs);
                    clearInputs(textAreas);
                    upload.forEach(item => {
                        item.previousElementSibling.textContent = "Файл не выбран";
                    });
                    setTimeout(() => {
                        statusMessage.remove();
                        item.style.display = 'block';
                        item.classList.remove('fadeOutUp');
                        item.classList.add('fadeInUp');
                    }, 5000);
                });
        });
    });
};

export default forms;