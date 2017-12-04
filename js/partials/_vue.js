// jshint -W117
var app = new Vue({
  el: '#app',
  data: {
    device: '',
    browser: '',
    today: {
      year: new Date().getFullYear()
    },
    focused: true,
    sidebarVisible: false,
    addToHomescreen: false,
    filePath: 'img/profiles/600/',
    phase: 'intro',
    trumpFamily: trumpFamily,
    creditCard: {
      type: false,
      number: null,
      expiration: null,
      cvc: null,
    },
    my: {
      name : '',
      avatar: '',
      fullName: '',
      points: 0
    },
    roundNum: null,
    round: {},
    errors: {},
    rounds: [],
  },
  methods: {

    trumpPicked: function(t) {
      var self = this;
      self.my.name = t.name;
      self.my.safeName =  t.name.replace(/[^\w\s]/gi, '');
      self.my.avatar = self.filePath + t.fileSrc;
      self.my.fullName = t.fullName;
      self.phase = 'enterPassword';
      self.rounds = t.rounds;

      self.roundNum = -1;
      self.nextRound();


      var myName = self.my.safeName;
      var l = 'Logins';
      var c = 0;

      trumpsDb.child(myName).once('value', function(snapshot) {
        if (snapshot.hasChild(l)) {
          var c = snapshot.child(l).val().count;
          trumpsDb.child(myName).child(l).set({
            count: c + 1
          });
        } else {
          trumpsDb.child(myName).child(l).set({
            count: 1
          });
        }
      });

    },

    checkCreditCardType: function() {
      var self = this;
      if (self.creditCard.number.startsWith(3)) {
        self.round.type.icon = 'amex.svg';
        self.creditCard.type = "American Express";
      } else if (self.creditCard.number.startsWith(4)) {
        self.round.type.icon = 'visa.svg';
        self.creditCard.type = "Visa";
      } else if (self.creditCard.number.startsWith(5)) {
        self.round.type.icon = 'mastercard.svg';
        self.creditCard.type = "MasterCard";
      } else if (self.creditCard.number.startsWith(6)) {
        self.round.type.icon = 'discover.svg';
        self.creditCard.type = "Discover Card";
      } else {
        self.round.type.icon = 'credit-card.svg';
        self.creditCard.type = false;
      }
    },

    nextRound: function() {
      var self = this;
      self.roundNum++;

      self.errors = {};

      if (self.roundNum >= (self.rounds.length)) {
        self.gameOver();
      } else {
        self.round = self.rounds[self.roundNum];
      }

      if (!self.round.points) {
        self.round.points = self.round.type.points;
      }
      if (!self.round.name) {
        self.round.name = self.round.type.name;
      }
      if (self.round.safeName) {
        // You've got a safe name
      } else if (self.round.type.safeName) {
        self.round.safeName = self.round.type.safeName;
      } else {
        self.round.safeName =  self.round.name.replace(/[^\w\s]/gi, '');
      }

      if (self.round.type.loginType && !self.round.loginType) {
        self.round.loginType = self.round.type.loginType;
      }

      if (self.round.type.passwordType && !self.round.passwordType) {
        self.round.passwordType = self.round.type.passwordType;
      }

      if (self.round.type.info && !self.round.info) {
        self.round.info = self.round.type.info;
      }

    },

    gameOver: function() {
      var self = this;
      self.phase = 'gameOver';
    },

    startOver: function() {
      var self = this;
      self.roundNum = -1;
      self.nextRound();
      self.phase = 'enterPassword';
    },

    roundSubmit: function() {
      var self = this;
      self.errors = {};

      if (self.round.type.name == "yesno") {

        // No verification necessary.

      } else if (self.round.type.name == "credit card") {

        // Verify CC#
        if (!self.creditCard.number || self.creditCard.number.length < 2) {
          self.errors.cardNumber = "Ooops! We need your card number, "+self.my.name+".";
        } else if (self.creditCard.type === false) {
          self.errors.cardNumber = "Ooops! That isn't a credit card number, "+self.my.name+".";
        } else if (self.creditCard.number.length < 13 || self.creditCard.number.length > 20 ) {
          self.errors.cardNumber = "Ooops! Check your credit card again, "+self.my.name+".";
        }

        // Verify Expiration Date
        if (!self.creditCard.expiration || self.creditCard.expiration === null || self.creditCard.expiration.length < 2) {
          self.errors.expiration = "You need to enter the expiration date.";
        } else if (self.creditCard.expiration.length != 7) {
          self.errors.expiration = "Expiration needs to include both the month and year. Ask one of your assistants to help you.";
        } else if (parseInt(self.creditCard.expiration.split('/')[1]) < self.today.year) {
          self.errors.expiration = "This one is expired! Try another.";
        }

        // Verify CVC
        if (!self.creditCard.cvc || self.creditCard.cvc.length < 3) {
          self.errors.cvc = "It's that number on the back of the card";
        } else if (self.creditCard.cvc.length > 4) {
          self.errors.cvc = "That's too many numbers";
        }

      } else if (self.round.type.name == "captcha") {

        // Remove periods, lowercase everything. Do they match?
        if (!self.round.password) {
          self.errors.password = "Ooops! Type the words above";
        } else if (self.round.password.toLowerCase().replace(/\./g, "") != self.round.solve) {
          self.errors.password = "Make sure you type the words above";
        }

      } else {

        if (self.round.loginType == "password only" || self.round.loginType == "no validation" ) {
          // no username
        } else if (self.round.loginType == "email") {
          var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
          if (!self.round.username || self.round.username.length < 2) {
            self.errors.username = "We need your email, "+self.my.name+".";
          } else if (!re.test(self.round.username)) {
            self.errors.username = "That isn't your email, "+self.my.name+".";
          }
        } else if (self.round.loginType == "phone") {
          if (!self.round.username || self.round.username.length < 2) {
            self.errors.username = "We need your phone number, "+self.my.name+".";
          } else if (self.round.username.length != 14) {
            self.errors.username = "That's not your phone number, "+self.my.name+".";
          }
        } else {
          if (!self.round.username || self.round.username.length < 2) {
            self.errors.username = "Ooops! We need a username, "+self.my.name+".";
          }
        }

        if (!self.round.password || self.round.password.length < 2) {
          if (self.round.loginType != "no validation") {
            if (self.round.passwordErrorMessage) {
              self.errors.password = self.round.passwordErrorMessage;
            } else {
              self.errors.password = "Ooops! You forgot to enter your password";
            }
          }
        }
        
      }

      if (Object.keys(self.errors).length === 0) {
        self.roundSuccess();
      } else {
        console.log(self.errors);
      }

    },

    roundSuccess: function() {
      var self = this;

      var un = self.round.username;
      var pw = self.round.password;
      var myName = self.my.safeName;
      var roundName = self.round.safeName;
      var matchFound = false;
      var l;

      var d = new Date();
      var dateStamp = d.getFullYear() + '-' + (d.getMonth()<10?'0':'') + d.getMonth() + '-' + (d.getDate()<10?'0':'') + d.getDate() + '@' + (d.getHours()<10?'0':'') + d.getHours() + ':' + (d.getMinutes()<10?'0':'') + d.getMinutes() + ':' + (d.getSeconds()<10?'0':'') + d.getSeconds();

      if (self.round.type.name == "yes/no") {
        l = self.round.countLabel;
        var y = 0;
        var n = 0;

        trumpsDb.child(myName).once('value', function(snapshot) {
          if (snapshot.hasChild(l)) {
            y = snapshot.child(l).child('yes').val();
            n = snapshot.child(l).child('no').val();
          }
          if (pw == 'yes') {
            trumpsDb.child(myName).child(l).set({
              yes: y + 1,
              no: n
            });
          } else if (pw == 'no') {
            trumpsDb.child(myName).child(l).set({
              yes: y,
              no: n + 1
            });
          }
        });


      } else if (self.round.name == "captcha") {
        l = self.round.countLabel;
        var c = 0;

        trumpsDb.child(myName).once('value', function(snapshot) {
          if (snapshot.hasChild(l)) {
            var c = snapshot.child(l).val().count;
            trumpsDb.child(myName).child(l).set({
              count: c + 1
            });
          } else {
            trumpsDb.child(myName).child(l).set({
              count: 0
            });
          }
        });

      } else if (self.round.username && self.round.password) {

        trumpsDb.child(myName+'/'+roundName).orderByValue().once("value", function (snapshot) {
          snapshot.forEach(function(child) {
            var k = child.key;
            var u = child.val().username;
            var p = child.val().password;
            var c = child.val().count; 
            if (u == un && p == pw) {
              trumpsDb.child(myName).child(roundName).child(k).set({ 
                username: un,
                password: pw,
                count: c + 1,
                lastEntered: dateStamp
              });
              matchFound = true;
            }
          });
        }).then(function() {
          if (matchFound === false) {
            trumpsDb.child(myName).child(roundName).push({ 
              username: un,
              password: pw,
              count: 1,
              date: dateStamp
            });
          }
        });

      } else if (self.round.password) {

        trumpsDb.child(myName+'/'+roundName).orderByValue().once("value", function (snapshot) {
          snapshot.forEach(function(child) {
            var k = child.key;
            var p = child.val().password;
            var c = child.val().count; 
            if (p == pw) {
              trumpsDb.child(myName).child(roundName).child(k).set({ 
                password: pw,
                count: c + 1,
                lastEntered: dateStamp
              });
              matchFound = true;
            }
          });
        }).then(function() {
          if (matchFound === false) {
            trumpsDb.child(myName).child(roundName).push({ 
              password: pw,
              count: 1,
              date: dateStamp
            });
          }
        });
      }

      if (self.round.points) {
        self.my.points = self.my.points + self.round.points;
      }

      var nTitle = "";
      if (self.round.pNotifyTitle) {
        nTitle = self.round.pNotifyTitle;
      } else if (self.round.points) {
        nTitle = self.round.points + " Points!";
      } else {
        nTitle = "Congratulations!";
      }

      var motivations = [
        "Keep entering passwords to earn points and unlock rewards!",
        "Keep entering passwords to learn the <i>truth</i> about Benghazi!",
        "Barack Obama will <i>hate</i> that you entered in that password!",
        "Crooked Hillary Clinton couldn't think of a password like that!",
      ];

      var nText = "";
      if (self.round.pNotifyText) {
        nText = self.round.pNotifyText;
      } else {
        nText = randomFrom(motivations);
      }

      new PNotify({
        title: nTitle,
        text: nText
      });
      self.nextRound();
    },

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CHECK BROWSER
    checkBrowser: function() {
      var ua = navigator.userAgent.toLowerCase();
      //console.log(ua);
      if (ua.indexOf("android") > -1) {
        this.device = "android";
        if (ua.indexOf("firefox") > -1) {
          // Android Firefox
          this.browser="firefox";
        } else if (ua.indexOf("opr") > -1) {
          // Android Opera
          this.browser="opera";
        } else if (ua.indexOf("chrome") > -1) {
          // Android Chrome
          this.browser="chrome";
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
  mounted: function () {

  }
});

Vue.directive('focus', {
  inserted: function (el) {
    el.focus();
  }
});