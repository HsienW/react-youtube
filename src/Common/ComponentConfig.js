const UploadDropdown = {
    dropdownName: 'Upload',
    iconType: 'down',
    itemIconShow: true,
    item: [
        {
            key: 'upload',
            itemName: 'Upload',
            itemIcon: 'plus-square'
        }
    ]
};

const ProfileDropdown = {
    dropdownName: 'Profile',
    iconType: 'down',
    itemIconShow: true,
    item: [
        {
            key: 'channel',
            itemName: 'My Channel',
            itemIcon: 'user'
        },
        {
            key: 'auth',
            itemName: 'Logout',
            itemIcon: 'logout'
        }
    ]
};

const NoticeDropdown = {
    dropdownName: 'Notice',
    iconType: 'down',
    itemTitle: 'Notification',
    contentLayoutType: 'horizontal',
    item: [
        {
            key: 'notice',
            itemName: 'Notification',
            itemIcon: 'user'
        },
    ]
};

const DateSearchDropdown = {
    dropdownName: 'Date',
    iconType: 'down',
    itemIconShow: false,
    item: [
        {
            key: 'search-date-all',
            itemName: 'All',
        },
        {
            key: 'search-date-day',
            itemName: '24 hour',
        },
        {
            key: 'search-date-week',
            itemName: '7 day',
        },
        {
            key: 'search-date-month',
            itemName: '30 day',
        }
    ]
};

const TypeSearchDropdown = {
    dropdownName: 'Type',
    iconType: 'down',
    itemIconShow: false,
    item: [
        {
            key: 'search-type-all',
            itemName: 'All',
        },
        {
            key: 'search-type-video',
            itemName: 'Video',
        },
        {
            key: 'search-type-playlist',
            itemName: 'Play List',
        }
    ]
};

const VideoPlayerItem = {
    basicURL: 'https://www.youtube.com/watch?v='
};

export {
    UploadDropdown,
    ProfileDropdown,
    NoticeDropdown,
    DateSearchDropdown,
    TypeSearchDropdown,
    VideoPlayerItem
};
