import is from 'is_js/';
import moment from 'moment/min/moment.min';

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
    videoItemDetailRespond(data) {
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
    videoItemCommentRespond(data) {
        const newData = {
            items: [],
            nextPageToken: data.nextPageToken
        };
        data.items.forEach((item) => {
            newData.items.push(item);
        });
        return newData;
    },
    subscribeNoticeDetailRespond(data) {
        const newData = [];
        data.forEach((item) => {
            newData.push({
                id: item.id,
                channelId: item.channelId,
                title: item.snippet.title,
                description: item.snippet.description,
                imgURL: item.snippet.thumbnails.medium.url,
                publishedAt: item.snippet.publishedAt
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
    isoTimeToVideoDisplayData(isoTime) {
        if (is.undefined(isoTime)) {
            return 0;
        }
        return moment(isoTime).format('YYYY-MM-DD');
    },
    searchResultIndex(searchResult, searchDataIndex) {
        searchResult.currentSearchDataIndex = searchDataIndex + 1;
        return searchResult;
    },
};

const formatComponentData = {
    advancedSearchDate(timeCondition) {
        switch (timeCondition) {
            case 'All':
                return '';
            case '24 hour':
                return moment.utc().subtract(1,'day').format();
            case '7 day':
                return moment.utc().subtract(7,'day').format();
            case '30 day':
                return moment.utc().subtract(30,'day').format();
            default:
                return '';
        }
    },
    advancedSearchType(timeCondition) {
        switch (timeCondition) {
            case 'All':
                return 'video';
            case 'Video':
                return 'video';
            case 'Play List':
                return 'playlist';
            default:
                return 'video';
        }
    }
};

const formatCurry = {
    objToStringify(objItem) {
        return JSON.stringify(objItem);
    },
    objToParse(stringItem) {
        return JSON.parse(stringItem);
    },
};

const formatItem = {
    selectVideoListItemInfo(item) {
        return {
            id: item.id.videoId,
            title: item.title,
            description: item.description,
            imgURL: item.imgURL,
        };
    },
    playVideoItemInfo(items) {
        return {
            id: items[0].id,
            title: items[0].snippet.title,
            description: items[0].snippet.description,
            imgURL: items[0].snippet.thumbnails.medium.url,
            totalTime: formatData.isoTimeToSecondData(items[0].contentDetails.duration)
        };
    },
};

export {
    formatData,
    formatComponentData,
    formatCurry,
    formatItem
};
