// jshint -W117
var trumpFamily = [
  {
    name: 'Donald',
    class: 'donald',
    fileSrc: 'donald.jpg',
    fullName: "Donald J. Trump",
    rounds: [
      { 
        type: roundTypes.maralago,
      },
      { 
        type: roundTypes.russianbrides,
      },
      { 
        type: roundTypes.twitter,
        username: '@realDonaldTrump',
        points: 100
      },
      { 
        type: roundTypes.stormfront
      },
      { 
        type: roundTypes.reddit,
        points: 30
      },
      { 
        type: roundTypes.bob,
      },
      { 
        type: roundTypes.nuclearcodes,
        info: 'Now give us the nuclear codes for <b class="points" style="font-size:130%">300 points</b>!',
        points: 300
      },
      {
        type: roundTypes.fis,
        info: "Now type in the codeword the Слу́жба вне́шней разве́дки gave you.",
      },
      { 
        type: roundTypes.captcha,
        img: 'resign.jpg',
        solve: 'i resign immediately',
        countLabel: "Times Resigned",
        pNotifyTitle: "That's legally binding!",
        pNotifyText: "Congratulations, Donald! You're officially no longer The President of The United States." 
      }
    ]
  },
  {
    name: 'Ivanka',
    class: 'ivanka',
    fileSrc: 'ivanka.jpg',
    fullName: "Ivanka Trump",
    rounds: [
      { 
        type: roundTypes.pinterest
      },
      {
        type: roundTypes.facebook,
        loginType: 'email',
        points: 50
      },
      {
        type: roundTypes.creditCard,
        info: "Time to take out your credit card! Which credit card? Your choice."
      },
      { 
        type: roundTypes.twitter,
        username: '@IvankaTrump',
        points: 50
      },
      { 
        type: roundTypes.ivanka
      },
      {
        type:roundTypes.apple
      },
      { 
        type: roundTypes.captcha,
        img: 'complicit.jpg',
        solve: 'i am complicit',
        countLabel: 'recognized complicity', 
        pNotifyTitle: "Yes you are!",
        pNotifyText: "Now repeat that to yourself at least a thousand times. <b>You are complicit.</b>" 
      },
      {
        type: roundTypes.voicemail,
        info: 'Now we need your voicemail password. This will get you 30 points!',
        points: 30
      }
    ]
  },
  {
    name: 'Don Jr.',
    class: 'donjr',
    fileSrc: 'don_jr.jpg',
    fullName: "Don Trump Jr",
    rounds: [
      { 
        type: roundTypes.africahunting,
      },
      { 
        type: roundTypes.twitter,
        username: '@DonaldJTrumpJr',
        points: 50
      },
      { 
        type: roundTypes.brazzers
      },
      { 
        type: roundTypes.stormfront
      },
      {
        type:roundTypes.pornhub
      },
      {
        type:roundTypes.question,
        info: 'Here\'s a question for <b class="points">40 points</strong>:',
        points: 40,
        safeName: "clitoris location",
        question: "Where is the clitoris?",
        passwordErrorMessage: "Come on, just guess!",
        pNotifyTitle: "Interesting theory!",
        pNotifyText: "We'll have to check on that." 
      },
      {
        type:roundTypes.uber
      }
    ]
  },
  {
    name: 'Eric',
    class: 'eric',
    fileSrc: 'eric.jpg',
    fullName: "Eric Trump",
    rounds: [
      
      {
        type:roundTypes.penguin
      },
      {
        type:roundTypes.kink
      },
      {
        type:roundTypes.fetlife
      },
      {
        type:roundTypes.shemalejapan
      },
      {
        type:roundTypes.dogfart
      },
      {
        type:roundTypes.furaffinity
      },
      {
        type:roundTypes.twitter,
        username: '@EricTrump'
      }
    ]
  },
  {
    name: 'Jared',
    class: 'jared',
    fileSrc: 'jared.jpg',
    fullName: "Jared Kushner",
    rounds: [
      {
        type:roundTypes.wikipedia
      },
      {
        type:roundTypes.furaffinity,
      },
      {
        type:roundTypes.google
      },
      {
        type:roundTypes.pornhub
      },
      {
        type:roundTypes.ashleymadison
      },
      {
        type:roundTypes.fis
      }
    ]
  },
  {
    name: 'Tiffany',
    class: 'tiffany',
    fileSrc: 'tiffany.jpg',
    fullName: "Tiffany Trump",
    rounds: [
      {
        type:roundTypes.uber
      },
      {
        type:roundTypes.instagram
      },
      {
        type:roundTypes.snapchat
      },
      {
        type:roundTypes.voicemail
      },
      {
        type:roundTypes.yesno,
        info: 'Here\'s a question for <strong class="points">30 points</strong>:',
        points: 30,
        question: "Are you aware that most people have to work for a living?",
        countLabel: "aware of jobs",
        pNotifyText: "Okay, just checking." 
      },
      {
        type:roundTypes.email
      },
      {
        type:roundTypes.twitter,
        username: '@TiffanyATrump'
      },
    ]
  },
  {
    name: 'Barron',
    class: 'barron',
    fileSrc: 'barron.jpg',
    fullName: "Barron Trump",
    rounds: [
      {
        type:roundTypes.deviantart
      },
      {
        type:roundTypes.penguin
      },
      {
        type:roundTypes.yesno,
        info: 'Hey, quick question for <strong class="points">50 points</strong>:',
        question: "Are you behind all of this? I mean, like is this some sort of Keyser Söze situation where everyone ends up getting indicted and then you disappear in an unmarked car and fly off to ruin some other country?",
        points: 50,
        countLabel: "Keyser Soze",
        pNotifyText: "Okay, just checking." 
      },
    ]
  },
  {
    name: 'Melania',
    class: 'melania',
    fileSrc: 'melania.jpg',
    fullName: 'Melania Trump',
    rounds: [
      {
        type: roundTypes.creditCard,
        info: "First, enter in your credit card information!"
      },
      {
        type:roundTypes.apple
      },
      {
        type:roundTypes.ashleymadison
      },
      {
        type: roundTypes.twitter,
        username: '@FLOTUS',
        info: "Ask one of your assistants what credentials they use for your Twitter account."
      },
      {
        type:roundTypes.yesno,
        info: 'Hey, speaking of assistants (<strong class="points">30 points</strong>):',
        points: 30,
        question: "So you know all the people that work for you? Like, drivers and maids and cooks and whatever? Are you aware that they're human beings?",
        countLabel: "aware of other humans",
        pNotifyText: "Okay, just checking." 
      }
    ]
  },
  {
    name: 'Ivana',
    class: 'ivana',
    fileSrc: 'ivana.jpg',
    fullName: 'Ivana Trump',
    rounds: [
      {
        type:roundTypes.aol
      },
      {
        type:roundTypes.maralago
      },
      { 
        type: roundTypes.stormfront
      },
      {
        type:roundTypes.yesno,
        info: 'Question for you (<strong class="points">30 points</strong>):',
        points: 30,
        question: "Don't you think it's weird that you still have the last name of “Trump”?",
        countLabel: "weird to be Trump",
        pNotifyText: "Okay... The divorce was 25 years ago." 
      },
    ]
  }
];