/**
 * MySlider
 * @author ArtHouse379
 * version v1.0
 * 
 */

; class Slider {
    constructor(options) {
        this.parent = document.querySelector(options.parent || 'body');
        this.photos = options.photos || [''];
        this.btnNav = options.btnNav || [''];
        this.dots = options.dots;
        this.btnPlay = options.btnPlay;
        this.btnStartEnd = options.btnStartEnd;
        this.current = options.current;
        this.autoplay = options.autoplay;
    }

    showSlider() {
        let content = `
        <div class="mySlider">
            <div class="slider-media">
                <div class="prev-arrow">&lt</div>
                <div class="photos"></div>
                <div class="next-arrow">&gt</div>
            </div>
            <div class="slider-nav">
                <hr>
                <div class="dots"></div>
                <hr>
            </div>
        </div>`;

        this.parent.innerHTML = content;

        this.photos.forEach(photo => {
            let image = document.createElement('img');
            image.setAttribute('src', photo);
            document.querySelector('.photos').append(image);

            if (this.dots) {
                let dot = document.createElement('a');
                document.querySelector('.dots').append(dot);
            }

        });

        if (this.autoplay) {
            let navPanel = document.createElement('div');
            navPanel.classList.add('nav-panel');
            let navPanelBtns = `
                <div id="first-image-btn"><img src="img/icons/last.png" alt="alt"></div>
                <div class="prev-arrow" id="prev-image-btn"><img src="img/icons/next.png" alt="alt"></div>
                <div id="pause-btn"><img src="img/icons/pause.png" alt="alt"></div>
                <div id="autoplay-btn"><img src="img/icons/play.png" alt="alt"></div>
                <div class="next-arrow" id="next-image-btn"><img src="img/icons/next.png" alt="alt"></div>
                <div id="last-image-btn"><img src="img/icons/last.png" alt="alt"></div>
            `;
            navPanel.innerHTML = navPanelBtns;
            document.querySelector('.slider-nav').append(navPanel);

        }
    };

    showImage(count) {
        let images = this.parent.querySelectorAll('.photos img');
        let dots = this.parent.querySelectorAll('.dots a');

        images.forEach(item => item.style.opacity = 0);
        images[count].style.opacity = 1;
        dots.forEach(item => item.style.backgroundColor = '');
        dots[count].style.backgroundColor = 'blue';
        this.current = count;
    }

    prevPhoto() {
        this.current--;
        let images = this.parent.querySelectorAll('.photos img');
        let dots = this.parent.querySelectorAll('.dots a');

        images.forEach(item => item.style.opacity = 0);
        dots.forEach(item => item.style.backgroundColor = '');
        if (this.current < 0) {
            this.current = images.length - 1;
        }
        images[this.current].style.opacity = 1;
        dots[this.current].style.backgroundColor = 'blue';
    }

    nextPhoto() {
        this.current++;
        let images = this.parent.querySelectorAll('.photos img');
        let dots = this.parent.querySelectorAll('.dots a');

        images.forEach(item => item.style.opacity = 0);
        dots.forEach(item => item.style.backgroundColor = '');
        if (this.current >= images.length) {
            this.current = 0;
        }
        images[this.current].style.opacity = 1;
        dots[this.current].style.backgroundColor = 'blue';

    }

    playPhotos() {
        this.stopPhotos();
        this.autoplay = setInterval(() => {
            this.nextPhoto();
        }, 500);
    }

    stopPhotos() {
        if (this.autoplay) {
            clearInterval(this.autoplay);
        }
    }

    init() {
        this.showSlider();
        this.showImage(0);
        let images = this.parent.querySelectorAll('.photos img');
        let dots = this.parent.querySelectorAll('.dots a');

        this.parent.querySelectorAll('.prev-arrow').forEach(item => {
            item.addEventListener('click', () => {
                this.prevPhoto()
            });
        })
        this.parent.querySelectorAll('.next-arrow').forEach(item => {
            item.addEventListener('click', () => {
                this.nextPhoto()
            });
        })
        for (let i = 0; i < dots.length; i++) {
            dots[i].addEventListener('click', () => {
                this.showImage(i)
            });
        };
        this.parent.querySelector('#autoplay-btn').addEventListener('click', () => {
            this.playPhotos();
        });
        this.parent.querySelector('#pause-btn').addEventListener('click', () => {
            this.stopPhotos();
        });
        this.parent.querySelector('#first-image-btn').addEventListener('click', () => {
            this.showImage(0);
        });
        this.parent.querySelector('#last-image-btn').addEventListener('click', () => {
            this.showImage(images.length-1);
        });
    }
}


let newSlider = new Slider({
    // parent: '#wrap-slider',
    photos: ['img/gallery_img1.jpg',
        'img/gallery_img2.jpg',
        'img/gallery_img3.jpg',
        'img/gallery_img4.jpg',
        'img/gallery_img5.jpg',
        'img/gallery_img6.jpg'],
    btnNav: ['.prev-arrow', '.next-arrow'],
    dots: true,
    btnPlay: ['#autoplay-btn', '#pause-btn'],
    btnStartEnd: ['#first-image-btn', '#last-image-btn'],
    current: 0,
    autoplay: true,
});

newSlider.init();