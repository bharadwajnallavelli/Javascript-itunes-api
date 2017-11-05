(function musicdb() {
    this.init = function() {
        this.search();
    };

    this.search = function() {
        var form = document.querySelector('#form');
        form.addEventListener('submit',function(e){
            e.preventDefault();
            var value = document.querySelector('#input_search').value;
            form.reset();
            getdata(value.split(' ').join('+'));
        });
    };
    this.getdata = function(artist) {
        var http = new XMLHttpRequest();
        var url = 'https://itunes.apple.com/search?term='+artist+'&entity=album';
        var method = 'GET';
        var container = document.querySelector('#album_list_container');
        container.innerHTML = '';
        http.open(method,url);
        http.onreadystatechange = function() {
            if(http.readyState === XMLHttpRequest.DONE && http.status === 200) {
                show_artistsearch(JSON.parse(http.response));
            }
            else if(http.readyState === XMLHttpRequest.DONE && http.status !== 200) {}
        };
        http.send();
    };
    this.show_artistsearch = function(obj) {
        var container = document.querySelector('#album_list_container');
        var template = '';
        if(obj.results.length > 0){
            document.querySelector('#notmatch').style.display = 'none';
            for(var i=0; i<obj.results.length; i++) {
                template += '<div class="col-sm-3 col-md-4 album_item">';
                template += '<div class="item_thumb" style="background:url('+obj.results[i].artworkUrl100
                     +')"></div>';
                template += '<div class="item_title">'+ obj.results[i].collectionName
                +'</div>';
                template += '<div class="item_price">';
                template += '<span>price: </span>'+obj.results[i].collectionPrice
                +'USD';
                template += '</div>';
                template += '<a href="'+obj.results[i].collectionViewUrl
                +'" target="_blank">Buy Now</a>';
                template += '</div>';

            }
            container.innerHTML ='';
            container.insertAdjacentHTML('afterbegin',template);
        } else {
                document.querySelector('#notmatch').style.display = 'block';
        }
    }

    this.init();
})();