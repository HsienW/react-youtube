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
                title: item.snippet.title,
                description: item.snippet.description,
                imgURL: item.snippet.thumbnails.medium.url,
                playData: {
                    id: item.id.videoId,
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
    }
};

export {
    formatData
};
