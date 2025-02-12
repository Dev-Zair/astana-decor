document.addEventListener('DOMContentLoaded', function() {

    const scrollTopBtn = document.getElementById("scrollTopBtn");

    window.addEventListener('scroll', function() {
        scrollTopBtn.style.display = 
            (document.documentElement.scrollTop > 100) ? "block" : "none";
    });

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    scrollTopBtn.addEventListener('click', scrollToTop);


    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();

        if (name === '' || phone === '') {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        // Ваши данные для отправки в Telegram
        const token = '8162674413:AAG1jVHXbqB2o9apTM-OHGPkEiOXTuOgGNo';
        const chatId = '-1002447076096';
        const message = `Новая заявка:\nИмя: ${name}\nТелефон: ${phone}`;

        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Заявка успешно отправлена!');
                contactForm.reset();
            } else {
                alert(`Ошибка: ${data.description}`);
            }
        })
        .catch(error => {
            console.error('Ошибка при отправке:', error);
            alert(`Ошибка при отправке: ${error}`);
        });
    });


    const toggleBtn = document.getElementById('toggleBtn');
    const projectGrid = document.getElementById('projectGrid');
    let projectsAdded = false;

    const newProjects = [
        { src: 'project1.jpeg', title: 'Минималистичный дизайн' },
        { src: 'project2.jpeg', title: 'Роскошная спальня' },
        { src: 'project3.jpeg', title: 'Офисное пространство' },
        { src: 'project4.jpeg', title: 'Кухонный интерьер' },
        { src: 'project5.jpeg', title: 'Балкон с видом' }
    ];

    toggleBtn.addEventListener('click', function() {
        if (!projectsAdded) {
            newProjects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card new-projects';
                projectCard.innerHTML = `
                    <img src="${project.src}" alt="${project.title}">
                    <h5>${project.title}</h5>
                `;
                projectGrid.appendChild(projectCard);
            });
            document.querySelectorAll('.new-projects')
                .forEach(item => item.style.display = 'block');
            toggleBtn.textContent = 'Скрыть';
            projectsAdded = true;
        } else {
            document.querySelectorAll('.new-projects')
                .forEach(item => item.style.display = 'none');
            toggleBtn.textContent = 'Еще';
            projectsAdded = false;
        }
    });
});
