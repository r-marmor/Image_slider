const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const circleBtn = document.querySelectorAll('.circle-btn');

// Buttons
const prevButton = document.querySelector('#prevBtn');
const nextButton = document.querySelector('#nextBtn');

let counter = 1;
const size = carouselImages[0].clientWidth;
carouselSlide.style.transform = `translateX(${(-size * counter)}px)`;

let interval = setInterval(timeOut, 5000);


// Button listeners

nextButton.addEventListener('click', () => {
    emptyCircle();
    if (counter == carouselImages.length - 1) return;
    carouselSlide.style.transition = "transform 0.6s ease-in-out";
    counter++;
    slidingImg();  
    triggerCircle();
    clearInterval(interval);
    interval = setInterval(timeOut, 5000);
});

prevButton.addEventListener('click', () => {
    emptyCircle();
    if (counter <= 0) return;
    carouselSlide.style.transition = "transform 0.6s ease-in-out";
    counter--;
    slidingImg();  
    triggerCircle();
    clearInterval(interval);
    interval = setInterval(timeOut, 5000);
});

    carouselSlide.addEventListener('transitionend', () => {
        if (carouselImages[counter].id === 'lastClone') {
            transitionLess(); 
            counter = carouselImages.length - 2;
            slidingImg();   
        }
    });

    carouselSlide.addEventListener('transitionend', () => {
        if (carouselImages[counter].id === "firstClone") {
            transitionLess();
            counter = 1;
            slidingImg();  
        }
    });


function triggerCircle() {
        if (carouselImages[counter].id === "firstClone") {
            circleBtn[0].classList.add('disc');
        }
        if (carouselImages[counter].id === "lastClone") {
            circleBtn[3].classList.add('disc');
        }
        if (counter == 5 || counter <= 0 ) return;
        circleBtn[counter - 1].classList.add('disc');
    }


function emptyCircle() {
    circleBtn.forEach(circle => {
        circle.classList.remove('disc');
    });
}


(function linkCircleToSlide() {
    circleBtn.forEach(circle => {
        circle.addEventListener('click', () => {
            if (circle.id === "slide-1") {
                counter = 1;
                transitionLess();
                slidingImg();      
            } else if (circle.id === "slide-2") {
                counter = 2;
                transitionLess();
                slidingImg();      
            } else if (circle.id === "slide-3") {
                counter = 3;
                transitionLess();
                slidingImg();      
            } else if (circle.id === "slide-4") {
                counter = 4;
                transitionLess();
                slidingImg();      
            }
            emptyCircle();
            triggerCircle();
        });
    });
})();


function slidingImg() {
    carouselSlide.style.transform = `translateX(${(-size * counter)}px)`;
}


function transitionLess() {
    carouselSlide.style.transition = "none";
}


function timeOut() {
    counter++; 
    emptyCircle();
    triggerCircle();
    carouselSlide.style.transition = "transform 0.6s ease-in-out";  
    carouselSlide.style.transform = `translateX(${(-size * counter)}px)`;
    carouselSlide.addEventListener('transitionend', () => {
        if (carouselImages[counter].id === "firstClone") {
            transitionLess();
            counter = 1;
            slidingImg();  
        }
    });  
}

