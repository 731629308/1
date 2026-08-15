function buildMedias(inputURL) {
    var resp = $http.get(inputURL);
    var json = JSON.parse(resp.body);
    var list = [];
    if (json && json.data && json.data.list) {
        for (var i = 0; i < json.data.list.length; i++) {
            var item = json.data.list[i];
            list.push({
                id: item.vod_id,
                title: item.vod_name,
                cover: item.vod_pic || "",
                year: item.vod_year || "",
                desc: item.vod_remarks || ""
            });
        }
    }
    $next.toMedias(JSON.stringify(list));
}

function Episodes(inputURL) {
    var resp = $http.get(inputURL);
    var json = JSON.parse(resp.body);
    var episodes = [];
    if (json && json.data && json.data.list && json.data.list.length > 0) {
        var vod = json.data.list[0];
        var playList = vod.vod_play_list || [];
        for (var i = 0; i < playList.length; i++) {
            var urls = playList[i].urls || [];
            for (var j = 0; j < urls.length; j++) {
                episodes.push({
                    id: urls[j].url || urls[j].id,
                    title: urls[j].name || "第" + (j+1) + "集"
                });
            }
        }
    }
    $next.toEpisodes(JSON.stringify(episodes));
}

function Player(inputURL) {
    var resp = $http.get(inputURL);
    var json = JSON.parse(resp.body);
    var url = (json && json.data && json.data.url) ? json.data.url : "";
    $next.toPlayer(url);
}