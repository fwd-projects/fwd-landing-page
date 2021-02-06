// Define Global Variables
const navBar = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");


let observer = new IntersectionObserver((entries, observer) => { 
    entries.forEach(entry => {
        const navItem = document.querySelector(`li[data-nav='${entry.target.id}']`)
        
        if(entry.isIntersecting){
            entry.target.classList.add("active-section");
            navItem.classList.add("active");
        }else{
            entry.target.classList.remove("active-section");
            navItem.classList.remove("active");
        }
    });
}, { threshold: 0.65 });

  
// building the nav and registering event listeners
sections.forEach(section => {
    
    // creating the nav item
    const anchor = document.createElement("a")
    const navItem = document.createElement("li")
    
    navItem.classList.add("nav-item")
    anchor.classList.add("nav-link")
    anchor.textContent = section.dataset.nav;

    // will use it later in the intersection observer 
    navItem.dataset.nav = section.id

    navItem.appendChild(anchor)
    navBar.appendChild(navItem)

    // creating the event listener
    anchor.addEventListener('click', () => {
        section.scrollIntoView({behavior: "smooth"})
    })
    
    // to be observed by the intersection observer
    observer.observe(section)
});

// Go To Top button functionality
const goToTop = document.querySelector('#back_to_top');
goToTop.addEventListener("click", function(e){
    window.scroll({top: 0, left: 0, behavior: 'smooth'});
});

window.addEventListener("scroll", function(){

    if(window.scrollY < 300){
        // user is at the top of the page, no need to show the back to top button
        goToTop.classList.remove('show');
        
        // to highlight a default section at the top of the page 
        const section = sections[0]
        const navItem = document.querySelector(`li[data-nav='${section.id}']`)
        
        section.classList.add("active-section")
        navItem.classList.add("active") 
        
    } else {
        goToTop.classList.add('show');
    }
});