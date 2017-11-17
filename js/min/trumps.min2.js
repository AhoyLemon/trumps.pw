"use strict";

var roundTypes = {
  twitter: {
    name: "Twitter",
    icon: 'twitter.svg',
    points: 50
  },
  facebook: {
    name: "Facebook",
    icon: 'facebook.svg',
    loginType: 'phone or email',
    points: 50
  },
  creditCard: {
    name: "credit card",
    icon: 'credit-card.svg',
    points: 120
  }
};
var trumpFamily = [{
  name: 'Donald',
  class: 'donald',
  fileSrc: 'donald.jpg',
  fullName: "Donald J. Trump",
  rounds: [{
    type: roundTypes.twitter,
    username: '@realDonaldTrump',
    points: 50
  }]
}, {
  name: 'Ivanka',
  class: 'ivanka',
  fileSrc: 'ivanka.jpg',
  fullName: "Ivanka Trump",
  rounds: [{
    type: roundTypes.twitter,
    username: '@IvankaTrump',
    points: 50
  }, {
    type: roundTypes.facebook,
    loginType: 'email',
    points: 50
  }, {
    type: roundTypes.creditCard,
    info: "Time to take out your credit card! Which credit card? Your choice."
  }, {
    type: 'voicemail',
    info: 'Now we need your voicemail password. This will get you 30 points!',
    loginType: 'phone',
    passwordType: 'PIN',
    points: 30
  }]
}, {
  name: 'Don Jr.',
  class: 'donjr',
  fileSrc: 'don_jr.jpg',
  fullName: "Don Trump Jr."
}, {
  name: 'Eric',
  class: 'eric',
  fileSrc: 'eric.jpg',
  fullName: "Eric Trump"
}, {
  name: 'Jared',
  class: 'jared',
  fileSrc: 'jared.jpg',
  fullName: "Jared Kushner"
}, {
  name: 'Tiffany',
  class: 'tiffany',
  fileSrc: 'tiffany.jpg',
  fullName: "Tiffany Trump"
}, {
  name: 'Barron',
  class: 'barron',
  fileSrc: 'barron.jpg',
  fullName: "Barron Trump"
}, {
  name: 'Melania',
  class: 'melania',
  fileSrc: 'melania.jpg',
  fullName: 'Melania Trump',
  rounds: [{
    type: roundTypes.creditCard,
    info: "First, enter in your credit card information!"
  }]
}, {
  name: 'Ivana',
  class: 'ivana',
  fileSrc: 'ivana.jpg',
  fullName: 'Ivana Trump'
}];
// jshint -W117

function addCommas(intNum) {
  return (intNum + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

function randomFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function sendEvent(c, a, l, v) {
  if (v) {
    ga('send', 'event', { eventCategory: c, eventAction: a, eventLabel: l, eventValue: v });
    //console.log('CATEGORY: '+c+', ACTION:'+a+', LABEL:'+l+', VALUE:'+v);
  } else if (l) {
    ga('send', 'event', { eventCategory: c, eventAction: a, eventLabel: l });
    //console.log('CATEGORY: '+c+', ACTION:'+a+', LABEL:'+l);
  } else {
    ga('send', 'event', { eventCategory: c, eventAction: a });
    //console.log('CATEGORY: '+c+', ACTION:'+a);
  }
}
//@prepros-prepend partials/_roundTypes.js
//@prepros-prepend partials/_trumpFamily.js
//@prepros-prepend partials/_functions.js

Vue.use(VueMask.VueMaskPlugin);

//@prepros-append partials/_vue.js
// jshint -W117
var app = new Vue({
  el: '#app',
  data: {
    device: '',
    browser: '',
    sidebarVisible: false,
    addToHomescreen: false,
    filePath: 'img/profiles/600/',
    phase: 'pickTrump',
    trumpFamily: trumpFamily,
    creditCard: {
      number: '',
      expiration: '',
      cvc: ''
    },
    my: {
      name: '',
      avatar: '',
      fullName: ''
    },
    roundNum: null,
    round: {},
    errors: {
      password: ''
    },
    rounds: []
  },
  methods: {

    trumpPicked: function trumpPicked(t) {
      var self = this;
      self.my.name = t.name;
      self.my.avatar = self.filePath + t.fileSrc;
      self.my.fullName = t.fullName;
      self.phase = 'enterPassword';
      self.rounds = t.rounds;

      self.roundNum = -1;
      self.nextRound();
    },

    nextRound: function nextRound() {
      var self = this;
      self.roundNum++;
      self.round = self.rounds[self.roundNum];
      if (!self.round.points) {
        self.round.points = self.round.type.points;
      }
      if (!self.round.name) {
        self.round.name = self.round.type.name;
      }
    },

    roundSubmit: function roundSubmit() {
      var self = this;
      self.errors = {};
      //self.errors.password = "Ooops! You forgot to enter your password";

      if (!self.round.username || self.round.username.length < 2) {
        self.errors.username = "Ooops! We need a username, " + self.my.name + ".";
      }

      if (!self.round.password || self.round.password.length < 2) {
        self.errors.password = "Ooops! You forgot to enter your password";
      }

      if (Object.keys(self.errors).length == 0) {
        self.roundSuccess();
      }
    },

    roundSuccess: function roundSuccess() {
      var self = this;

      var nTitle = "";
      if (self.round.points) {
        nTitle = self.round.points + " Points!";
      } else {
        nTitle = "Congratulations!";
      }

      var motivations = ["Keep entering passwords to earn points and unlock rewards!", "Keep entering passwords to learn the <i>truth</i> about Benghazi!", "Barack Obama will <i>hate</i> that you entered in that password!", "Crooked Hillary Clinton couldn't think of a password like that!"];

      new PNotify({
        title: nTitle
      });
      self.nextRound();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CHECK BROWSER
    checkBrowser: function checkBrowser() {
      var ua = navigator.userAgent.toLowerCase();
      //console.log(ua);
      if (ua.indexOf("android") > -1) {
        this.device = "android";
        if (ua.indexOf("firefox") > -1) {
          // Android Firefox
          this.browser = "firefox";
        } else if (ua.indexOf("opr") > -1) {
          // Android Opera
          this.browser = "opera";
        } else if (ua.indexOf("chrome") > -1) {
          // Android Chrome
          this.browser = "chrome";
        }
      } else if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1) {
        this.device = "ios";
      } else if (ua.indexOf('windows') > -1) {
        this.device = "windows";
        if (ua.indexOf("edge") > -1) {
          this.browser = "edge";
        } else if (ua.indexOf("trident") > -1) {
          this.browser = "ie";
        } else if (ua.indexOf('firefox') > -1) {
          this.browser = "firefox";
        } else if (ua.indexOf('opr') > -1) {
          this.browser = "opera";
        } else if (ua.indexOf('vivaldi') > -1) {
          this.browser = "vivaldi";
        } else if (ua.indexOf('chrome') > -1) {
          this.browser = "chrome";
        }
      } else if (ua.indexOf('mac') > -1) {
        this.device = "mac";

        if (ua.indexOf('chrome') > -1) {
          this.browser = "chrome";
        } else if (ua.indexOf('safari') > -1) {
          this.browser = "safari";
        } else if (ua.indexOf('firefox') > -1) {
          this.browser = "firefox";
        }
      } else if (ua.indexOf('cros') > -1) {
        this.device = "chrome";
        this.browser = "chrome";
      }
    }

  },
  mounted: function mounted() {}
});
//# sourceMappingURL=trumps.min2.js.map