'use strict'

var titleArray = new Array(5);
titleArray['kohl2015'] = "SVET Annual Family Event at KOHL CHILDREN’S MUSEUM";

module.exports = {
    url: 'https://svet.firebaseio.com/',
    defaultThumb: 'https://s3-us-west-2.amazonaws.com/svet.com/articles/picture-thumb.png',
    endorsedSvetTags: ['chicago', 'children'],
    onlySvetTags: ['svet'],
    personalityTags: ['personality'],
	youtubeBase:' https://www.youtube.com/embed/',
    titles: titleArray
};
