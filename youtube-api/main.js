$(document).ready(function(){
    $('form').submit(handleFormSubmission)

    function handleFormSubmission(event) {
        event.preventDefault()
        var $searchInput = $('#search')
        var searchInputValue = $searchInput.val()
        search(searchInputValue)
    }

    function search(str) {
        const API_KEY = 'YOUR_API_KEY'
        const API_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search'
        const API_VIDEO_URL = 'https://www.googleapis.com/youtube/v3/videos'
        const MAX_RESULTS = 5

        $.ajax({
            url: API_SEARCH_URL,
            method: 'GET',
            data: {
                part: 'snippet',
                q: str,
                type: 'video',
                maxResults: MAX_RESULTS,
                key: API_KEY
            },
            success: function(data) {
                var videoIds = data.items.map(function(item){
                    return item.id.videoId
                }).join(',')

                $.ajax({
                    url: API_VIDEO_URL,
                    method: 'GET',
                    data: {
                        part: 'snippet,statistics',
                        id: videoIds,
                        key: API_KEY
                    },
                    success: function(data) {
                        var $main = $('main')
                        var html = ''
                        data.items.forEach(function(item, index){
                            var isLastItem = index == data.items.length - 1
                            html += `
                                <div class="video">
                                    <h3 class="video__title">${item.snippet.title}</h3>
                                    <p class="video__publishedAt"><small>${formatDate(item.snippet.publishedAt)}</small></p>
                                    <iframe class="video__iframe" src="https://www.youtube.com/embed/${item.id}?si=l-IYZ12UvWWVhDzr&amp;controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                                    <p class="video__views"><strong>${item.statistics.viewCount}</strong> views</p>
                                </div>`
                            if (!isLastItem) {
                                html += '<hr>'
                            }
                        })
                        $main.html(html)
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        console.error('Error fetching video details:', textStatus, errorThrown)
                    }
                })
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.error('Error fetching search results:', textStatus, errorThrown);
            }
        })
    }

    function formatDate(isoString) {
        var date = new Date(isoString)

        var monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]

        var day = date.getUTCDate()
        var month = monthNames[date.getUTCMonth()]
        var year = date.getUTCFullYear()

        return `${day} ${month} ${year}`
    }
})


