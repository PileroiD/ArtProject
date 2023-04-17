const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
        items = menu.querySelectorAll('li'),
        wrapper = document.querySelector('.portfolio-wrapper'),
        no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        wrapper.querySelectorAll('.all').forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated', 'fadeIn');
        });

        no.style.display = 'none';
        no.classList.remove('animated', 'fadeIn');

        if (markType.length === 0) {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        } else {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated', 'fadeIn');
            });
        }
    };

    items.forEach(item => {
        item.addEventListener('click', () => {
            const filterName = item.getAttribute('class').split(' ')[0];
            typeFilter(wrapper.querySelectorAll(`.${filterName}`));
        });
    });

    menu.addEventListener('click', (e) => {
        let target = e.target;

        if (target && target.tagName == "LI") {
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        }
    });
};

export default filter;