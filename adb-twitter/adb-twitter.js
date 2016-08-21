Polymer(
  {
    is: 'adb-twitter',

    properties: {
      _feed: Object,

      _params: {
        computed: '_computeParams(user)',
        type: Object,
        value: {}
      },

      tweet: {
        computed: '_computeTweet(_feed)',
        notify: true,
        type: Array,
        value: []
      },

      user: String,
    },

    _computeTweet(_feed) {
      let tweets;
      try {
        tweets = this._feed
          .getElementsByTagName('rss')[0]
          .getElementsByTagName('channel')[0]
          .getElementsByTagName('item');
      }
      catch (e) {
        tweets = []
      }

      const tweet = Array.prototype.slice.call(tweets).shift();
      const author = tweet.getElementsByTagName('creator')[0].textContent;
      const date = moment(tweet.getElementsByTagName('pubDate')[0].textContent);

      return {
        author: {
          name: author.match(/(.*?) \(/)[1],
          username: author.match(/\((.*?)\)/)[1],
        },
        date: date.fromNow(),
        link: tweet.getElementsByTagName('link')[0].textContent,
        text: tweet.getElementsByTagName('title')[0].textContent
      };
    },

    _computeParams(user) {
      return {user};
    }
  }
)
