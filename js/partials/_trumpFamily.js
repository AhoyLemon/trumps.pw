// jshint -W117
var trumpFamily = [
  {
    name: 'Donald',
    class: 'donald',
    fileSrc: 'donald.jpg',
    fullName: "Donald J. Trump",
    rounds: [
      { 
        type: roundTypes.nuclearcodes,
        info: 'Now give us the nuclear codes for <b class="points" style="font-size:130%">300 points</b>!',
        points: 300
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
        type: roundTypes.twitter,
        username: '@IvankaTrump',
        points: 50
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
        type: 'voicemail',
        info: 'Now we need your voicemail password. This will get you 30 points!',
        loginType: 'phone',
        passwordType: 'PIN',
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
        type: roundTypes.twitter,
        username: '@DonaldJTrumpJr',
        points: 50
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
        type:roundTypes.fetlife
      },
      {
        type:roundTypes.furaffinity
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
        type:roundTypes.pornhub
      },
      {
        type:roundTypes.ashleymadison
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
        type:roundTypes.voicemail
      },
      {
        type:roundTypes.email
      }
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
      }
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
        type:roundTypes.ashleymadison
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
      }
    ]
  }
];