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
        type: Object,
        value: {}
      },

      user: String,
    },

    _computeTweet(_feed) {
      let tweets;
      try {
        tweets = this._feed
          .querySelector('rss')
          .querySelector('channel')
          .querySelectorAll('item');
      }
      catch (e) {
        tweets = []
      }

      const tweet = Array.prototype.slice.call(tweets).shift();
      const author = tweet.querySelector('creator').textContent;
      const date = moment(tweet.querySelector('pubDate').textContent);

      return {
        author: {
          name: author.match(/.*?(?= \()/),
          username: author.match(/(?=\().*?(?=\))/),
        },
        content: {
          html: tweet.querySelector('description').textContent,
          plain: tweet.querySelector('title').textContent
        },
        date: date.fromNow(),
        link: tweet.querySelector('link').textContent,
      };
    },

    _computeParams(user) {
      return {user};
    }
  }
)
