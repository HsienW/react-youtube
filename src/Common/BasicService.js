const formatData = {
    videoRespondData(data) {
        const newData = [];
        data.forEach((item) => {
            newData.push({
                id: item.id,
                title: item.snippet.title,
                description: item.snippet.description,
                imgURL: item.snippet.thumbnails.medium.url
            });
        });
        return newData;
    }
};

export {
    formatData
};
