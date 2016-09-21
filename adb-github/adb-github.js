Polymer(
  {
    is: 'adb-github',

    properties: {
      _feed: Object,

      contribution: {
        computed: '_computeContribution(_feed)',
        notify: true,
        type: Object,
        value: {}
      }
    },

    _computeContribution(_feed) {
      let contributions;
      try {
        contributions = this._feed
          .getElementsByTagName('feed')[0]
          .getElementsByTagName('entry');
      }
      catch (e) {
        contributions = []
      }

      const contribution = Array.prototype.slice.call(contributions).shift();
      const author = contribution
        .getElementsByTagName('author')[0]
        .getElementsByTagName('name')[0].textContent;
      const date = moment(contribution.getElementsByTagName('published')[0].textContent);
      const content = contribution.getElementsByTagName('content')[0].textContent;

      let display = document.createElement('textarea');
      display.innerHTML = content;

      return {
        author,
        date: date.fromNow(),
        link: contribution.getElementsByTagName('link')[0].href,
        text: display.textContent
      };
    }
  }
)
