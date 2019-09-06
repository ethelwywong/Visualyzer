const API_KEY = 'AIzaSyCOc-Nd9Z0mI_0f4FDM_bY0SDHrDhxYyVw';
const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search?';
var request = new XMLHttpRequest();
var searchResults;
var songDesc;


function myFunction()
{
    songDesc = document.getElementById("searchTxt").value;
    getSearchResults(songDesc);
    $('.item').remove();
}

function encodeQueryData(data) {
   const ret = [];
   for (let d in data)
     ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
   return ret.join('&');
}

function getSearchResults(songDesc) 
{
    const data = {"part": "snippet",
        "maxResults": 5,
        "q": songDesc,
        "key": API_KEY};
    queryString = encodeQueryData(data);
    console.log(SEARCH_URL+queryString);
    request.open('GET', SEARCH_URL+queryString);
    request.onload = function () 
    {
        var data = JSON.parse(this.response)

        listSearchResults(data);
    }
    request.send();
}

function listSearchResults(data)
{   
    // list the first video on the search as the main video
    var videoId = data.items[0].id.videoId;
    console.log(videoId);
    mainVid(videoId);
    resultsLoop(data);

    function mainVid(id) {
        $('#video').html(`
					<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }

	// list all the other search results underneath
    function resultsLoop(data) {

        $.each(data.items, function (i, item) { // iterator function

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 300);
            var vid = item.id.videoId;
            console.log(vid);


            $('main').append(`
							<article class="item" data-key="${vid}">

								<img src="${thumb}" alt="" class="thumb">
								<div class="details">
									<h4>${title}</h4>
									<p>${desc}</p>
								</div>

							</article>
						`);
        });
    }

		// CLICK EVENT
    $('main').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        console.log('new ID:',id);
        mainVid(id);

    });
}