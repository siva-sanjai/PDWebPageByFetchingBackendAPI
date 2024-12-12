let lastScrollTop = 0;
        const header = document.getElementById("header");

        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScroll > lastScrollTop) {
               
                header.style.transform = "translateY(-100%)";
            } else {
                
                header.style.transform = "translateY(0)";
            }

            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        });



//for changing backgrounds

document.addEventListener("DOMContentLoaded", () => {
    
    const images = document.querySelectorAll(".headd img");
    const imageSources = Array.from(images).map(img => img.src); 
    let currentIndex = 0;

   
    function changeBackground() {
        document.body.style.backgroundImage = `url('${imageSources[currentIndex]}')`;
        currentIndex = (currentIndex + 1) % imageSources.length; 
    }

   
    changeBackground(); 
    setInterval(changeBackground, 2000); 
});


//from api 

const apiUrl = "https://admin.processdrive.com/api/page/home"; // Your API URL

async function fetchAndGroupData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); 
        console.log("API Response:", data); 

        
        const subPages = data.sub_pages || []; 
        console.log("Sub Pages:", subPages); 

       
        let translations = [];
        subPages.forEach(subPage => {
            
            if (subPage.translations) {
                const filteredTranslations = subPage.translations.filter(translation => 
                    (translation.sub_page_id === 5 || translation.sub_page_id === 6) &&
                    translation.title && translation.description);
                translations = [...translations, ...filteredTranslations];
            }
        });

        console.log("Filtered Translations:", translations); 

       
        const outputDiv = document.getElementById('cache-world-output');
        if (translations.length > 0) {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card-container'); 
            
            translations.forEach((translation, index) => {
                const card = document.createElement('div');
                card.classList.add('card'); 

                
                if (translation.title && translation.description) {
                    card.innerHTML = `
                        <h3>${translation.title}</h3>
                        <p>${translation.description}</p>
                    `;
                    
                  
                    cardContainer.appendChild(card);
                }
                if (index === 1) return; 
            });

           
            outputDiv.appendChild(cardContainer);
        } else {
            outputDiv.innerHTML = `<p>No valid translations found for ID 5 or 6.</p>`;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchAndGroupData();





async function fetchAndDisplayWhyProcessDrive() {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json(); 
                console.log("API Response:", data); 
                //  sub_pages
                const subPages = data.sub_pages || [];
                const categorySlug = "why-processdrive";

                // category 'why-processdrive'
                const relevantSubPages = subPages.filter(subPage => subPage.category_slug === categorySlug);

                if (relevantSubPages.length > 0) {
                    const whySection = document.querySelector(".why");

                    relevantSubPages.forEach(subPage => {
                        // Fetch the translation data for each sub_page
                        const translation = subPage.translations.find(t => t.locale === "en");

                        if (translation && translation.title && translation.description) {
                            const card = document.createElement('div');
                            card.classList.add('whycard'); // Apply card style

                            card.innerHTML = `
                                <img src="${subPage.image}" alt="Image for ${translation.title}" />
                                <div class="content">
                                    <h3>${translation.title}</h3>
                                    <p>${translation.description}</p>
                                </div>
                            `;
                            whySection.appendChild(card);
                        }
                    });
                } else {
                    
                    const noItemsMessage = document.createElement('p');
                    noItemsMessage.textContent = "No items found for 'Why ProcessDrive'.";
                    document.querySelector('.why').appendChild(noItemsMessage);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchAndDisplayWhyProcessDrive();



        async function fetchAndDisplayOurServices() {
            try {
                const apiUrl = "https://admin.processdrive.com/api/page/home"; // Your API URL
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response:", data);

                const subPages = data.sub_pages || [];
                const categorySlug = "our-process"; 

                const relevantSubPages = subPages.filter(subPage => subPage.category_slug === categorySlug);

                if (relevantSubPages.length > 0) {
                    const servicesSection = document.querySelector(".circle-layout");

                   
                    relevantSubPages.slice(0, 6).forEach((subPage, index) => { 
                        const translation = subPage.translations.find(t => t.locale === "en");

                       
                        if (translation && translation.title && translation.description) {
                            const card = document.createElement('div');
                            card.classList.add('service-card');

                           
                            card.innerHTML = `
                                <h3 class="service-title">${translation.title}</h3>
                                <div class="service-description-box">${translation.description}</div>
                            `;

                            
                            servicesSection.appendChild(card);
                        }
                    });
                } else {
                    const noItemsMessage = document.createElement('p');
                    noItemsMessage.textContent = "No services found for 'Our Process'.";
                    document.querySelector('.circle-layout').appendChild(noItemsMessage);
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchAndDisplayOurServices();





        async function fetchAndDisplayClients() {
            try {
                const apiUrl = "https://admin.processdrive.com/api/page/home"; // Your API URL
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("API Response:", data);

               
                const clientsCategory = data.sub_pages.find(
                    (subPage) => subPage.category_slug === "our-clients"
                );

                if (clientsCategory) {
                    
                    document.querySelector(".section-title").textContent = clientsCategory.category.translations[0].title || "Our Clients";
                    document.querySelector(".section-description").textContent = clientsCategory.category.translations[0].description || "Description not available";

                   
                    const clientImages = data.sub_pages.filter(
                        (subPage) => subPage.category_slug === "our-clients" && subPage.image
                    );

                    const imageGrid = document.querySelector(".image-grid");

                    // Add each client image directly
                    clientImages.forEach((client) => {
                        const img = document.createElement("img");
                        img.src = client.image;
                        img.alt = client.title || "Client Image";
                        imageGrid.appendChild(img);
                    });
                } else {
                    console.error("No clients category found.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchAndDisplayClients();



        //blogs

// Fetch data from the API
fetch('https://admin.processdrive.com/api/blogs')
  .then(response => response.json())  
  .then(data => {
   
    const latestBlogs = data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 3);

    const postsContainer = document.getElementById('posts');

    // Loop through the latest 3 blogs and create a list of posts
    latestBlogs.forEach(post => {
      const postElement = document.createElement('div');
      postElement.innerHTML = `
      <div class="make-card">
        <div class="flex-container">
        
        <img class="dp" height="200px" width="330px"  src="${post.image}" alt="Blog Image"/>
        <h3 class="title-line">${post.title}</h3>
        <div class="profile">
          <img height="40px" width="40px" id="dp" src="${post.profile}" alt="Author Image">
          <h6><big><big>${post.published_date}</big></big></h6>
        </div>
        <div class="flex-container">
        <div>${post.short_content}</div>

        </div>
       
        <a href="blog-detail.html?slug=${post.slug}" class="read-more">Read More</a>

        </div>
          </div>
      `;
      postsContainer.appendChild(postElement); 
    });
  })
  .catch(error => {
    console.error('Error:', error);  
  });

  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");

    // Hide the preloader and show the main content
    preloader.style.display = "none";
    mainContent.style.display = "block";
});
