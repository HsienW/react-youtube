import is from 'is_js';
import moment from 'moment';

const formatData = {
    videoItemRespond(data) {
        const newData = [];
        data.forEach((item) => {
            newData.push({
                id: item.id,
                title: item.snippet.title,
                description: item.snippet.description,
                imgURL: item.snippet.thumbnails.medium.url,
                totalTime: this.isoTimeToSecondData(item.contentDetails.duration)
            });
        });
        return newData;
    },
    videoListItemRespond(data) {
        const newData = [];
        data.forEach((item) => {
            newData.push({
                id: item.id,
                title: item.snippet.title,
                description: item.snippet.description,
                imgURL: item.snippet.thumbnails.high.url,
            });
        });
        return newData;
    },
    videoListPlayItemRespond(data) {
        const newData = [];
        data.forEach((item) => {
            newData.push({
                id: item.id.videoId,
                tags: item.tags,
                channelId: item.snippet.channelId,
                channelTitle: item.snippet.channelTitle,
                title: item.snippet.title,
                description: item.snippet.description,
                publishedAt: item.snippet.publishedAt,
                imgURL: item.snippet.thumbnails.medium.url,
                playData: {
                    id: item.id,
                    totalTime: 100
                }
            });
        });
        return newData;
    },
    videoPlayerTime(seconds) {
        if (seconds > 3600) {
            return moment().startOf('day').seconds(seconds).format('H:mm:ss');
        }
        return moment().startOf('day').seconds(seconds).format('mm:ss');
    },
    isoTimeToSecondData(isoTime) {
        if (is.undefined(isoTime)) {
            return 0;
        }
        return moment.duration(isoTime, moment.ISO_8601).asSeconds();
    },
    searchResultIndex(searchResult, searchDataIndex) {
        searchResult.currentSearchDataIndex = searchDataIndex + 1;
        return searchResult;
    },
    advancedSearchTime(timeCondition) {
        switch (timeCondition) {
            case 'All':
                return ;
            case '24 hour':
                return moment.utc().subtract(1,'day').format('YYYY,MM-DD HH:mm:ss');
            case '7 day':
                return moment.utc().subtract(7,'day').format('YYYY,MM-DD HH:mm:ss');
            case '30 day':
                return moment.utc().subtract(30,'day').format('YYYY,MM-DD HH:mm:ss');
            default:
                return '';
        }
    },
    advancedSearchType(timeCondition) {
        switch (timeCondition) {
            case 'All':
                return ;
            case 'Video':
                return 'video';
            case 'Play List':
                return 'playlist';
            default:
                return 'video';
        }
    }
};

export {
    formatData,
};
