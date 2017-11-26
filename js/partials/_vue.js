// jshint -W117
var app = new Vue({
  el: '#app',
  data: {
    device: '',
    browser: '',
    today: {
      year: new Date().getFullYear()
    },
    sidebarVisible: false,
    addToHomescreen: false,
    filePath: 'img/profiles/600/',
    phase: 'pickTrump',
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
      fullName: ''
    },
    roundNum: null,
    round: {},
    errors: {
      //password: '',
      //cardNumber: 'YES HELLO!'
    },
    rounds: [],
  },
  methods: {
    
    trumpPicked: function(t) {
      var self = this;
      self.my.name = t.name;
      self.my.avatar = self.filePath + t.fileSrc;
      self.my.fullName = t.fullName;
      self.phase = 'enterPassword';
      self.rounds = t.rounds;
      
      self.roundNum = -1;
      self.nextRound();
      
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

      if (self.roundNum >= (self.rounds.length)) {
        alert('end!!!!!');
      } else {
        self.round = self.rounds[self.roundNum];
      }
      
      if (!self.round.points) {
        self.round.points = self.round.type.points;
      }
      if (!self.round.name) {
        self.round.name = self.round.type.name;
      }
      
      if (self.round.type.loginType && !self.round.loginType) {
        self.round.loginType = self.round.type.loginType;
      }
      
      if (self.round.type.passwordType && !self.round.passwordType) {
        self.round.passwordType = self.round.type.passwordType;
      }
      
      
    },
    
    roundSubmit: function() {
      var self = this;
      self.errors = {};
      
      if (self.round.type.name == "credit card") {
        
        // Verify CC#
        if (!self.creditCard.number || self.creditCard.number.length < 2) {
          self.errors.cardNumber = "Ooops! We need your card number, "+self.my.name+".";
        } else if (self.creditCard.type === false) {
          self.errors.cardNumber = "Ooops! That isn't a credit card number, "+self.my.name+".";
        } else if (self.creditCard.number.length < 13 || self.creditCard.number.length > 16 ) {
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
        
      } else {
        
        if (self.round.loginType == "password only") {
          // no password
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
          self.errors.password = "Ooops! You forgot to enter your password";
        }
      }
      
      
      
      
      if (Object.keys(self.errors).length === 0) {
        self.roundSuccess();
      }
      
    },
    
    roundSuccess: function() {
      var self = this;
      
      var nTitle = "";
      if (self.round.points) {
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
      var nText = randomFrom(motivations);
      
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