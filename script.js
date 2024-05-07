// HERO SECTION ~ nav-link
const navLinks = document.querySelector(".nav-links")
const navLinks2 = document.querySelector(".nav-links--2")
const navbtn = document.querySelector(".nav-btn")
const search = document.querySelector('.search')
const navigation = document.querySelector('.navigation')
const sectionHero = document.querySelector('.section-hero')
const navBar = document.querySelector('.nav-bar')
const mainSection = document.querySelector('.main')

const openNav = document.querySelector('.mdq--540'); // small phone <= 600
const showNav3 = document.querySelector('.nav-links--3');
const overlay = document.querySelector('.overlay');
const removeNavbtn = document.querySelector('.rremove-nav-btn');
const removalCTA = document.querySelector('.removal-cta')
const removalCTA2 = document.querySelector('.removal-cta-2')

const tabBtnCon = document.querySelector('.tab-btns') // tabbed component
const btnTabs= document.querySelectorAll('.tab-btn')
const photos = document.querySelectorAll('.image-slide')
const tabContent = document.querySelectorAll('.tab-con')
const tabContentBG = document.querySelector('.tab-contents')

const anoyingNav = document.querySelector('.anoying-nav') // remove anoying nav
const stickyNavbtn = document.querySelector('.rm-sticy-nav')
const lapNav = document.querySelector('.lap-nav')


// handle class update
class UpdateClasses {
    constructor(element, className){
        this.element = element
        this.className = className
    }

   classAdd(){
        this.element.classList.add(this.className)
    }
    classRemove(){
        this.element.classList.remove(this.className)
    }
    checkClass(){
        return this.element.classList.contains(this.className)
    }
}

// update classes in general
function initiateClasses(el, classes, add=true){
    const anyObj = new UpdateClasses(el, classes)

    if(add){
        anyObj.classAdd()
    }
    else{
        anyObj.classRemove()
    }
}

// inspect a class
function inspectClasses(el, classes){
    const anyObj = new UpdateClasses(el, classes)
    return anyObj.checkClass()
}


const handleEvent = (...[arg, _]) => arg[0].style.display = arg[1]

function partial(fn, arg){ // the partial function application
    return function(){                
        return fn.call(this, arg)
    }
}

navbtn.addEventListener("mouseover", partial(handleEvent, [navLinks, "flex"]))

search.addEventListener("mouseover", partial(handleEvent, [navLinks2, "flex"]))

navigation.addEventListener("mouseleave", partial(handleEvent, [navigation, "none"]))

document.body.addEventListener("click", function(e){
    handleEvent([navigation, "none"])
})

let timeOut;
// STICKY NAVIGATION
const navWidth = getComputedStyle(navBar)
if(parseFloat(navWidth.width) <= 600){initiateClasses(navBar, 'sticky', false)}

function callback(entries){
    const [entry] = entries;
    const viewportWidth = entry.boundingClientRect.width
    
    
    if(!entry.isIntersecting){
        if(parseFloat(navWidth.width) > 600) initiateClasses(navBar, 'sticky')

        // remove anoying sticky nav
        navBar.addEventListener("mouseover", function(e){
            if(inspectClasses(navBar, 'sticky')){

                anoyingNav.style.display = "flex";
                if(inspectClasses(e.target, 'nav-bar')) lapNav.style.visibility = 'visible';


                clearTimeout(timeOut)
                 timeOut = setTimeout(() => lapNav.style.visibility = 'hidden', 1500)
                
                stickyNavbtn.addEventListener('click', function(){
                    navBar.style.visibility = 'hidden'
                })
            }
        })
    }
    else if(viewportWidth <= 600){ // small phone nav
        openNav.addEventListener('click', function(){
            initiateClasses(showNav3, 'show-nav-link-3')
            initiateClasses(overlay, 'hidden')

            // onclicking a link remove nav
            document.querySelector('.nav--540').addEventListener('click', function(e){
                const linktag = inspectClasses(e.target, 'link--540')

                if(linktag) {
                    initiateClasses(showNav3, 'show-nav-link-3', false)
                    initiateClasses(overlay, 'hidden', false)
                } 
            })
        })

        // onclicking the disable btn remove nav
        removeNavbtn.addEventListener('click', function(){
            initiateClasses(showNav3, 'show-nav-link-3', false)
            initiateClasses(overlay, 'hidden', false)
        })
    }
    else{
        initiateClasses(navBar, 'sticky', false)
        navBar.style.visibility = 'visible'
    }
}

const options = {
    root: null,
    threshold: 0,
}
const observer = new IntersectionObserver(callback, options);
observer.observe(sectionHero)

navBar.addEventListener('mouseleave', function(){ // remove btn
    document.querySelector('.anoying-nav').style.display = "none";   
})



// ======================= TABBED-COUROUSEL COMPONENT ===================

function tabFunctionality(e, counter){
    btnTabs.forEach(btn => initiateClasses(btn,'active-tab', false))
    tabContent.forEach(content => initiateClasses(content, 'active-content', false))

    if(!click){
        initiateClasses(document.querySelector(`.tab--${counter}`), 'active-tab')
    }
    else{
        initiateClasses(e.target, 'active-tab', false)
    }

    // display corresponding photos
    const currentTab = click ? e.target.dataset.tabBtn : counter;
    photos.forEach((photo, i) => photo.style.transform = `translateX(${100 * (i - currentTab)}%)`)

    // display corresponding content
    initiateClasses(document.querySelector(`.tab-con--${currentTab}`), 'active-content')

    // change corresponding background color
    const getEl = getComputedStyle(document.querySelector(`.tab--${currentTab}`)) 
    const getColor = getEl.color

    tabContentBG.style.backgroundColor = `${getColor}`


    //  reset click
    click = false
}


let Interval;
let counter = 0;
let click = false;
clearInterval(Interval);
setInterval(() =>{
    click = false;
    counter === 3 ? counter = 0 : counter++;
    tabFunctionality(0, counter)
}, 5000)

tabBtnCon.addEventListener('click', function(e){
    const btnTab = inspectClasses(e.target, 'tab-btn');
    click = true;
    if(btnTab) tabFunctionality(e)
})
