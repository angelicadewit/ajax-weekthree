(function() {
"use strict";

var myButton = document.querySelector('.searchKey');
var mySearchInput = document.querySelector("[name='searchInput']");
var resultElement = document.querySelector(".results");
var $articles = document.querySelector(".articles")

function searchTimesApi() {
    event.preventDefault();
    axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
        params: {
            'api-key': "a69ca5656c084f9e851a1814923ea533",
            'q': mySearchInput.value
        }
        
    }).then(function (response) {
        console.log(response);
        console.table(response.data.response.docs)
        generateSuccessHTMLOutput(response);
    }).catch(function (error) {
        resultElement.innerHTML = generateErrorHTMLOutput(error);
        console.log("error");
    });

    
}


function generateSuccessHTMLOutput(response) {
    response.data.response.docs.forEach(article => {
        let $li = document.createElement("li")
        let $h2 = document.createElement("h2")
        let $p = document.createElement("p")
        let $img = document.createElement("img")
        // $h2.innerHTML = article.headline.main
        $h2.innerHTML = '<a href="' + article.web_url + '">' + article.headline.main + '</a>'
        $p.innerHTML = article.snippet;
        $img.innerHTML = '<img src="' + article.multimedia.thumbnail + '"></img>'
        $li.appendChild($h2);
        $li.appendChild($p);
        $articles.appendChild($li)
    })
}

function generateErrorHTMLOutput(error) {
    return '<h2>No Results Found</h2>';
}

myButton.addEventListener("click", searchTimesApi, false);


}());
//# sourceMappingURL=main.js.map
