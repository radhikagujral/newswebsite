document.addEventListener("DOMContentLoaded", function() {
    const businessBtn = document.getElementById("business-btn");
    const technologyBtn = document.getElementById("technology-btn");
    const entertainmentBtn = document.getElementById("entertainment-btn");
    const  healthBtn= document.getElementById("health-btn");
    const generalBtn = document.getElementById("general-btn");
    




    businessBtn.addEventListener("click", function() {
        getNewsArticles("business");
    });

    technologyBtn.addEventListener("click", function() {
        getNewsArticles("technology");
    });
    entertainmentBtn.addEventListener("click", function() {
        getNewsArticles("entertainment");
    });
    healthBtn.addEventListener("click", function() {
        getNewsArticles("health");
    });
    generalBtn.addEventListener("click", function() {
        getNewsArticles("general");
    });

   

    

    getNewsArticles("general");


    function getNewsArticles(category) {
        const xhr = new XMLHttpRequest();
        // Construct the URL to filter by country only
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=4c00301fdaa242ee8d7290d50bc2ea36`;
        console.log("inside");
       
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const response = JSON.parse(xhr.responseText);
                
                console.log("Response from server:", response);
                displayArticles(response.articles);
            }
        };
        xhr.open("GET", url, true);
        xhr.send();
    }

    function displayArticles(articles) {
        console.log("hello");
        const articlesDiv = document.getElementById("articles");
        if (!articlesDiv) {
            console.log("Articles div not found.");
            return;
        }

        if (articles && Array.isArray(articles)) {
            articlesDiv.innerHTML = "";
    
            articles.forEach(article => {
                const articleElem = document.createElement("div");
                articleElem.classList.add("articles");
                const titleElem = document.createElement("h2");
                titleElem.textContent = article.title;
                const author=document.createElement("h3");
                author.textContent=article.author;

                const contentElem = document.createElement("p");
                contentElem.textContent = article.description;
                const urlelem= document.createElement("a");
                urlelem.href=article.url;
                urlelem.textContent = "Read More"; // Text to display for the link
                urlelem.target = "_blank";
                articleElem.appendChild(titleElem);
                articleElem.appendChild(author);
                articleElem.appendChild(contentElem);
                articleElem.appendChild(urlelem);


                // Append the article container to the articles container
                articlesDiv.appendChild(articleElem);
                
            });
        } else {
            console.log("No articles found or articles is not an array.");
        }
    }
});
