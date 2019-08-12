const UploadDropdown = {
    dropdownName: 'Upload',
    iconType: 'down',
    itemIconShow: true,
    item: [
        {
            key: 'on-upload',
            type: 'Upload',
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
            key: 'on-my-channel',
            type: 'Channel',
            itemName: 'My Channel',
            itemIcon: 'user'
        },
        {
            key: 'on-logout',
            type: 'Auth',
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
            type: 'Notice',
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
            type: 'Date',
            itemName: 'All',
        },
        {
            key: 'search-date-day',
            type: 'Date',
            itemName: '24 hour',
        },
        {
            key: 'search-date-week',
            type: 'Date',
            itemName: '7 day',
        },
        {
            key: 'search-date-month',
            type: 'Date',
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
            type: 'Type',
            itemName: 'All',
        },
        {
            key: 'search-type-video',
            type: 'Type',
            itemName: 'Video',
        },
        {
            key: 'search-type-playlist',
            type: 'Type',
            itemName: 'Play List',
        }
    ]
};

const VideoPlayerConfig = {
    basicURL: 'https://www.youtube.com/watch?v='
};

export {
    UploadDropdown,
    ProfileDropdown,
    NoticeDropdown,
    DateSearchDropdown,
    TypeSearchDropdown,
    VideoPlayerConfig
};
