// const html = document.getElementsByTagName("html");
const body = document.querySelector(".body");
const header = document.querySelector(".header-desktop");
const hamburgerBtn = document.getElementById("hamburger-btn");
const scrollingHeader = document.querySelector(".header");
const headerTop = document.querySelector(".header-top");


gsap.registerPlugin(ScrollTrigger);

// Lenis Imported
const lenis = new Lenis({
    duration: 1,
    smooth: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
})

ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scroll = value
      }
      return lenis.scroll
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
})
  
ScrollTrigger.defaults({ scroller: document.body })


// ====== Toggle Header On Scroll Start =======
let prevScrollPos = lenis.scroll;
function toggleHeader() {
    let scrollTop = lenis.scrollY || document.documentElement.scrollTop;
    if(scrollTop  > prevScrollPos){
        header.classList.add("sticky");
        scrollingHeader.classList.add("hidden");
    }else{
        scrollTop === 0 ?  header.classList.remove("sticky") : header.classList.add("sticky");
        scrollingHeader.classList.remove("hidden");
    }
    prevScrollPos = scrollTop <= 0 ? 0 : scrollTop;;
}
// ====== Toggle Header On Scroll End =======
const mql = window.matchMedia("(min-width: 1200px)");

function toggleTopHeader(){
    const scrollY = lenis.scroll;
    if(mql.matches){
        scrollY === 0 ?  headerTop.style.display = "block" : headerTop.style.display = "none";
    }
    // scrollY === 0 ?  headerTop.style.display = "block" : headerTop.style.display = "none";
}

function changeScreen(e){
    if(e.matches){
        headerTop.style.display = "block";
        lenis.on('scroll', () => {
            e.matches && toggleTopHeader();
        });     
    }else{
        headerTop.style.display = "none";
    }
}

mql.addEventListener("change", changeScreen);

//======= Sticky Header End ===========

lenis.on('scroll', (e) => {
    toggleHeader();
    mql.matches && toggleTopHeader();
});


function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);


let isOpened = false;
function stopLenisScroll(){
    isOpened = !isOpened;
    isOpened ? lenis.stop() : lenis.start();
}

// ----=== Loader Start ----=========
window.onload = function(){
    const tl = gsap.timeline({
        defaults:{
            opacity:0,
            duration:1,
            ease:"power3.out"
        }
    });

    const loader = document.querySelector(".loader-container");
    if(loader){
        loader.style.display = "none"; 
    }
    tl.fromTo(".header",
        { opacity:0, y:30 },
        { opacity:1, y:0, }
    )

    tl.from(".header__logo", {
        duration:1.25,
        delay:-1,
    })
    .from(".nav__link", {
        y:30,
        stagger:0.01,
        delay:-1.15,
    })
    // .fromTo(".action-btn", 
    //     { opacity:0, y:30 },
    //     { 
    //         opacity:1,
    //         y:0, 
    //         stagger:0.02, 
    //         delay:-1.2, 
    //         duration:1
    //     }
    // )
    .from(".header-btn", {
        y:30,
        delay:-1.25,
    })
    // .from(".hero-rating", {
    //     y:50,
    //     delay:-1.25,
    // })
    .from(".hero__title", {
        y:50,
        delay:-1.3,
    })
    .from(".hero__subTitle", {
        y:50,
        delay:-1.35,
    })

    const heroBtn = document.querySelector(".hero-btn");
    if(heroBtn){
        tl.from(heroBtn, {
            y:50,
            duration:1.2,
            delay:-1.4,
        });
    }
    // .from([".counter-title" , ".counter-subTitle"], {
    //     y:50,
    //     duration:1.25,
    //     delay:-1.45,
    //     stagger:0.10,
    //     ease:"power3.out"
    // })
    // .from(".ratings-item figure", { 
    //         opacity:0,
    //         y:20,
    //         stagger:0.1,
    //         delay:-1.45, 
    //         duration:1.5, 
    //         ease:"power3.out" 
    //     }
    // )
}
// ----=== Loader End ----=========


//====== Active Page Link Start ======
const windowPathname = window.location.pathname;
const navLinks = document.querySelectorAll(".nav__link");
const mobileNavLinks = document.querySelectorAll(".mobile-menu__link");

function activeLink(link) {
    // const linkPathname = new URL(link.href).pathname;
    const linkPathname = new URL(link.href, window.location.origin).pathname;
    if((windowPathname === linkPathname) || (windowPathname === "./index.html" && linkPathname === "/")){
        link.classList.add("active");
    }
}

navLinks && navLinks.forEach((navLink) => {
    activeLink(navLink);
});

mobileNavLinks && mobileNavLinks.forEach((navLink) => {
    activeLink(navLink);
});
//====== Active Page Link End ======


//====== Toggle Mobile Menu Start ==========
function toggleMobileMenu(){
    const mobileMenu = document.querySelector(".mobile-menu");
    mobileMenu.classList.toggle("is-open");
    stopLenisScroll();
}

if(hamburgerBtn){
    hamburgerBtn.onclick = toggleMobileMenu;
    const closeMenuBtn = document.getElementById("close-menu-btn");
    closeMenuBtn.onclick = toggleMobileMenu;
}
//====== Toggle Mobile Menu End ==========



// ============ Swipers Start =================
var galleryTop = new Swiper(".gallery-top", {
    spaceBetween: 10,
    grabCursor: true,
    loop: true,
    loopedSlides: 4,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    keyboard: {
      enabled: true,
      onlyInViewport: false
    }
  });
  
// ========== single property gallery img slider ==========
var galleryThumbs = new Swiper(".gallery-thumbs", {
    spaceBetween: 10,
    centeredSlides: true,
    touchRatio: 0.4,
    slideToClickedSlide: true,
    loop: true,
    loopedSlides: 4,
    slidesPerView: 2,
    grabCursor: true,
    breakpoints: {
        576: {
            slidesPerView: 3,
        },
    },
    keyboard: {
        enabled: true,
        onlyInViewport: false
    }
});
  
/* set conteoller  */
if( galleryTop && galleryThumbs){
    galleryTop.controller.control = galleryThumbs;
    galleryThumbs.controller.control = galleryTop;
}

// ============ Swipers End =================


// ======== Accordian Toggle Start ========
function toggleAccordion(accordions){
    accordions.forEach((accordion)=>{
        accordion.addEventListener("click", function(){
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            // console.log(content.querySelector("p"))
            if (content) {
                content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
                gsap.from(content.querySelector("p"), 
                    {
                        opacity: 0,
                        y:50,
                        duration:1,
                        ease:"power3.out",
                    }
                )
            }
    
            accordions.forEach((acdnItem)=>{
                if(acdnItem !== accordion){
                    acdnItem.classList.remove("active");
                    acdnItem.nextElementSibling.style.maxHeight = null;
                }
            })
        });
    })
}

const accordions = document.querySelectorAll(".accordion__title-wrapper");
accordions && toggleAccordion(accordions);


// ---------- Mobile SubMenu Start --------
const mobileSubmenu = document.querySelectorAll(".mobile-submenu");
mobileSubmenu && mobileSubmenu.forEach((submenu)=>{
    submenu.addEventListener("click", function(){
        const menu = submenu.querySelector(".subMenu__list--mobile");
        submenu.classList.toggle("active");
        let content = menu;
        if (content) {
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";
        }

        mobileSubmenu.forEach((acdnItem)=>{
            if(acdnItem !== submenu){
                acdnItem.classList.remove("active");
                acdnItem.querySelector(".subMenu__list--mobile").style.maxHeight = null;
            }
        })
    })
})
// ---------- Mobile SubMenu End --------

// ======== Accordian Toggle End ========


// ============ Custom select box start ============
// const selectWrapper = document.querySelector('.custom-select-wrapper');
// const selectTrigger = document.querySelector('.custom-select-trigger');
// const options = document.querySelectorAll('.custom-option');

// selectTrigger && selectTrigger.addEventListener('click', () => {
//     selectWrapper && selectWrapper.classList.toggle('open');
// });

// options && options.forEach(option => {
//     option.addEventListener('click', () => {
//         const text = option.textContent;
//         document.querySelector('.custom-option.selected').classList.remove('selected');
//         option.classList.add('selected');
//         selectTrigger.querySelector('span').textContent = text;
//         selectWrapper.classList.remove('open');
//     });
// });

// if(selectWrapper){
//     document.addEventListener('click', (e) => {
//         if (!selectWrapper.contains(e.target)) {
//             selectWrapper && selectWrapper.classList.remove('open');
//         }
//     });
// }
// ============ Custom select box end ============



// ========== Counter script start ============
const counterSections = document.querySelectorAll(".counter-section");
counterSections && counterSections.forEach((counterSection)=>{
    const counters = counterSection.querySelectorAll(".count-value");
    if(counters.length > 0) {
        let CounterObserver = new IntersectionObserver(
            (entries, observer)=>{
                let [entry] = entries;
                if(!entry.isIntersecting) return;
        
                let speed = 200;
                counters.forEach((counter, index) => {
                    const updateCounter = () =>{
                        let targetNumber = +counter.dataset.target;
                        let initialNumber = +counter.innerText;
                        let incPerCount = targetNumber / speed;
                        if(initialNumber  < targetNumber ){
                            counter.innerText = Math.ceil(initialNumber + incPerCount);
                            setTimeout(updateCounter, 40);
                        }
                    }
                    updateCounter();
                })
                observer.unobserve(counterSection);
            },{
                root:null,
                threshold:0.4,
            }
        );
        CounterObserver.observe(counterSection);
    }
})
// ============ Counter script end ============


// ========= Animation Starts =========
//  animation fade in 
const fadeIn = gsap.utils.toArray(".fade-in");
fadeIn.forEach((mainContent, i) => {
    const anim = gsap.fromTo(mainContent,
        { opacity: 0 },
        { opacity: 1, duration: 1, }
    );
    ScrollTrigger.create({
        trigger: mainContent,
        animation: anim,
        toggleActions: "play",
        once: true,
        duration: 1,
        stagger:0.1,
        ease: "power3.in"
    });
});

// animate fade in up
const fadeInUp = gsap.utils.toArray(".fade-in-up");
fadeInUp.forEach((item, i) => {
    const anim = gsap.fromTo(item,
        { opacity: 0, y: 60},
        { opacity: 1, y: 0, duration: 1.1, }
    );
    ScrollTrigger.create({
        trigger: item,
        animation: anim,
        toggleActions: "play",
        once: true,
        duration: 1.1,
        stagger:0.1,
        ease: "power3.out"
    });
});



// ANimate Dividers
function animateDividers(selector) {
    const dividers = gsap.utils.toArray(selector);
    dividers.forEach((divider) => {
        const anim = gsap.fromTo(divider,
            { opacity: 0, width:"0%"},
            { opacity: 1, width:"100%", duration: 1, ease:"power3.inOut" }
        );
        ScrollTrigger.create({
            trigger: divider,
            animation: anim,
            toggleActions:"play",
            once: true,
            duration:1,
            stagger:1,
            ease:"power3.inOut"
        });
    });
}

// Animate the different dividers
animateDividers(".divider");


// Navbar Items Animations
const menuHamburgerBtn = document.querySelector(".hamburger-wrapper");
const closeMenuBtn = document.getElementById("close-menu-btn");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu__link");
const mobileMenuLinksArr = Array.from(mobileMenuLinks);


menuHamburgerBtn.onclick = function(){
   gsap.fromTo(".mobile-menu", 
        {
            opacity:0,
            x:"-100%",
        },{
            opacity:1,
            x:0,
            duration:0.2,
            ease:"power4.inOut"
        }
    );

    mobileMenuLinksArr.forEach((mobileLink)=>{
        gsap.fromTo(mobileLink,
            {
                opacity:0,
                y:60,
                rotation:7,
            },{
                opacity:1,
                y:0,
                duration:1.25,
                stagger:0.75,
                rotation:0,
                ease:"power3.inOut"
            }
        )
    });

    gsap.fromTo(".caret-down-icon",
        {
            opacity:0,
            y:100,
        },{
            opacity:1,
            y:0,
            duration:1,
            stagger:0.15,
            ease:"power4.inOut"
        }
    );

    gsap.from(".footer__link-title",{
        opacity:0,
        y:50,
        duration:0.95,
        rotation:7,
        delay:0.25,
        ease:"power3.inOut"
    })
    gsap.fromTo(".footer__list-item", 
        {
            opacity:0,
            y:50, 
            rotation:7,       
        },{
            opacity:1,
            y:0,
            duration:1,
            stagger:0.25,
            delay:0.35,
            rotation:0,
            ease:"power3.inOut"
        }
    )
    gsap.fromTo(".socials-link", 
        {
            opacity:0,
            y:50,
        },{
            opacity:1,
            y:0,
            duration:1,
            stagger:0.1,
            delay:0.2,
            ease:"power3.inOut"
        }
    )

    stopLenisScroll();
}

closeMenuBtn.onclick = function(){
    gsap.fromTo(".caret-down-icon",
        {
            opacity:1,
            y:0,
        },
        {
            opacity:0,
            y:100,
            duration:1,
            stagger:0.15,
            ease:"power4.inOut"
        },
    )

    mobileMenuLinksArr.forEach((mobileLink)=>{
        gsap.fromTo(mobileLink,
            {
                opacity:1,
                y:0,  
            },{
                opacity:0,
                y:60,
                duration:1.25,
                stagger:0.75,
                rotation:7,
                ease:"power3.inOut"
            }
        )
    })
    gsap.fromTo(".mobile-menu", 
        {
            opacity:1,
            x:0,  
        },{
            opacity:0,
            x:"-100%",
            duration:0.2,
            ease:"power4.inOut"
        }
    );
    stopLenisScroll();  
}

const update = (time, deltaTime, frame) => {
    lenis.raf(time * 1000)
}

gsap.ticker.add(update);

// Update ScrollTrigger on Lenis scroll
lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
    ScrollTrigger.update()
});

//  gsap.ticker.lagSmoothing(0);