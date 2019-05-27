import moment from 'moment';

const formatData = {
    videoRespondData(data) {
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
    videoPlayerTime(seconds) {
        if(seconds > 3600) {
            return moment().startOf('day').seconds(seconds).format('H:mm:ss');
        }
        return moment().startOf('day').seconds(seconds).format('mm:ss');
    },
    isoTimeToSecondData(isoTime) {
        return moment.duration(isoTime, moment.ISO_8601).asSeconds();
    }
};

export {
    formatData
};
