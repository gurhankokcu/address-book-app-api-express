'use strict'

const tableName = 'contact'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(tableName, [{
      name: 'Toby Thompson',
      company: 'Hughes-Cox',
      address: 'Flat 84 King Plains Leestad LE17 5PD',
      phone: '0566575825',
      email: 'tobyon@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Toby Morris',
      company: 'Jackson Inc',
      address: '53 Maisie Trail Port Elliottchester NG9 3FL',
      phone: '+44(0)3419 543124',
      email: 'tobymoris@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Freddie Campbell',
      company: 'Harris-Lewis',
      address: 'Flat 08 Harry Passage Robertsburgh BS27 3XD',
      phone: '(0706) 1705611',
      email: 'fredll@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Stephen Bennett',
      company: 'Murphy, Marshall and Miller',
      address: '36 Ray Stream Harrisonland TF4 2JW',
      phone: '(08670) 86687',
      email: 'stepett@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Isabel Palmer',
      company: 'Carter Ltd',
      address: 'Studio 21l Bell Camp Cookmouth SE19 2BG',
      phone: '(0706) 948 3307',
      email: 'isabemer@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Hollie Graham',
      company: 'Turner, Fox and Jones',
      address: 'Studio 54 Rogers Mills West Abigailton CH64 3TH',
      phone: '+44(0)2467 427810',
      email: 'holliham@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Max Smith',
      company: 'Patel-Shaw',
      address: '03 Bennett Trace New Dominicview LL12 9NR',
      phone: '+44(0)0516 26646',
      email: 'maxsmiith@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Patricia Lewis',
      company: 'Morgan, Butler and Bailey',
      address: 'Studio 99 Young Hollow Isaacberg TN11 8HT',
      phone: '+44(0)151405111',
      email: 'patrwis@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Charles Young',
      company: 'Hill and Sons',
      address: 'Flat 77 Ava Courts Keeleychester WF9 2JY',
      phone: '(04665) 93235',
      email: 'charung@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Heather Baker',
      company: 'Stewart and Sons',
      address: '603 Allen Plains Kellyton W1G 6JQ',
      phone: '0934 3180425',
      email: 'heather@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Lindsay Walker',
      company: 'Hall-Edwards',
      address: 'Studio 39s Scarlett Square Masonview HA3 7SF',
      phone: '06745783901',
      email: 'lindsker@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ashley Murray',
      company: 'Russell Inc',
      address: '68 Neil Extensions Miaborough TW4 7JP',
      phone: '+44(0)0465 311517',
      email: 'ashleray@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Dylan Carter',
      company: 'Collins-Lewis',
      address: 'Flat 24c Reynolds Ridges Lake Daleville LU3 1HQ',
      phone: '+44(0)8460 614093',
      email: 'dylanter@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Henry Morris',
      company: 'Rogers Group',
      address: 'Studio 96 Cox Divide New Carolinebury PE16 6RY',
      phone: '04400 885876',
      email: 'henris@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Grant Martin',
      company: 'Murray Inc',
      address: '535 Lloyd Gardens Karlside HA7 1HB',
      phone: '+44(0)0789817961',
      email: 'granin@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Lucy Campbell',
      company: 'Patel-Smith',
      address: 'Studio 84 Moore Harbours South Rileyshire S70 4DN',
      phone: '0178 400 7940',
      email: 'lucycll@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Adrian Hunter',
      company: 'Hughes, Shaw and Murray',
      address: '3 Thompson Common Daviesmouth PO4 8NU',
      phone: '(0156) 915 9849',
      email: 'adrianter@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Suzanne Hall',
      company: 'Thompson and Sons',
      address: '407 Bailey Plains Daveport BN12 6HW',
      phone: '0582379593',
      email: 'suzannall@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Emma Martin',
      company: 'Marshall Inc',
      address: '228 Maria Mill North Jordan PO35 5XS',
      phone: '+44(0)7395 440322',
      email: 'emmamain@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Frank Richards',
      company: 'Ward, Walsh and Russell',
      address: '72 Jordan Alley East Leah TF4 2JW',
      phone: '+44(0)4012 43134',
      email: 'frankrds@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Leah Kelly',
      company: 'Davis, Stevens and Bennett',
      address: '33 Scott Manors West Lucychester B27 6SF',
      phone: '06071028265',
      email: 'leahkelly@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sonia King',
      company: 'Mitchell Ltd',
      address: '9 Cook Curve North Alfiehaven PO6 4FH',
      phone: '08366047555',
      email: 'soning@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Dale Johnson',
      company: 'Richards Ltd',
      address: 'Flat 75 Isaac Crossroad East Thomas NP44 4PE',
      phone: '(02639) 59845',
      email: 'dalejoson@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Lucy Ward',
      company: 'Kennedy, Parker and Miller',
      address: 'Flat 49 Elliot Spur Jeremyport FK3 8EP',
      phone: '0955 2992572',
      email: 'lucyward@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Danielle Ross',
      company: 'Reid, Griffiths and Wilkinson',
      address: '540 Johnson Wells Martinview RH10 7RT',
      phone: '+44(0)5126586690',
      email: 'danioss@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Carmen Gray',
      company: 'Phillips-Graham',
      address: 'Studio 24f Natasha Light Wrightburgh BD9 4EF',
      phone: '+44(0)231009587',
      email: 'carmeray@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jane Brown',
      company: 'Edwards, Phillips and Evans',
      address: 'Flat 74j Jake Fork East Rob PE16 6RY',
      phone: '06004070520',
      email: 'janebown@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Karlie Ross',
      company: 'Roberts, Lee and Griffiths',
      address: '20 Arthur Road Priceberg RH9 8DR',
      phone: '08557 47656',
      email: 'karlioss@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Candice Cox',
      company: 'Baker-Cox',
      address: '23 Lee Lodge Chapmanmouth WR14 2YU',
      phone: '0242 709 4019',
      email: 'candiccox@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Selina Wood',
      company: 'Green and Sons',
      address: '6 Kelly Trail Griffithsburgh EX14 1QF',
      phone: '(03487) 954004',
      email: 'selinod@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'James Jones',
      company: 'King, Bell and Khan',
      address: '346 Danielle Vista Port Tim CR2 8EN',
      phone: '(03375) 769830',
      email: 'jamees@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Harrison Lee',
      company: 'Collins PLC',
      address: '4 Sally Rest South Adam SY11 4LB',
      phone: '03837 552200',
      email: 'harree@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Amanda Allen',
      company: 'Edwards-Ellis',
      address: '270 Allen Estates North Nathan KA1 3TU',
      phone: '09038 19369',
      email: 'amanen@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Nathan Jackson',
      company: 'Evans PLC',
      address: '4 Zachary Wall Lake Scottfort NR31 8NS',
      phone: '0994264965',
      email: 'nathon@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Philip Price',
      company: 'Stewart, Edwards and Cooper',
      address: '581 Saunders Harbours New Samantha BT15 3FB',
      phone: '0696 832 8075',
      email: 'philice@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Ashley Carter',
      company: 'Taylor, Powell and Lloyd',
      address: 'Flat 69 Fred Center South Fredville RM14 3PA',
      phone: '06836 00277',
      email: 'ashleter@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Grant Knight',
      company: 'Graham Ltd',
      address: '626 James Coves Murrayport TR10 8QN',
      phone: '0026 939 8346',
      email: 'granght@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Arthur Jackson',
      company: 'Wilson, Jones and Young',
      address: '7 Matthew Club West Joanne CB9 9EE',
      phone: '(01113) 58610',
      email: 'arthuon@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Karlie Gray',
      company: 'Walsh, Patel and Martin',
      address: '7 Emma Islands Freyahaven NW1 6AB',
      phone: '05873 53426',
      email: 'karlray@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Sebastian Collins',
      company: 'Smith-Butler',
      address: '883 Griffiths Glen New Elliotton IG10 3JT',
      phone: '(0618) 8317053',
      email: 'sebans@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Millie Green',
      company: 'Hall-Green',
      address: '772 Richardson Unions Watsonborough SW20 8JY',
      phone: '+44(0)4783 79412',
      email: 'millien@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Jake Moore',
      company: 'Davies, Holmes and Chapman',
      address: 'Studio 37w Oliver Parkway Lake Daisy CO1 1QR',
      phone: '+44(0)465784349',
      email: 'jakere@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Melissa Anderson',
      company: 'Hunter, Ward and Roberts',
      address: '466 Jeremy Grove Lake Suzanne MK3 7SA',
      phone: '(0881) 849 0462',
      email: 'melissson@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Kelly Powell',
      company: 'Richardson, Taylor and Scott',
      address: '317 Shaw Land Whiteburgh WS11 1ZY',
      phone: '(07083) 60649',
      email: 'kellell@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Scott Cook',
      company: 'Price and Sons',
      address: '450 Brown Ville New Henrybury LU2 7LJ',
      phone: '(03105) 287523',
      email: 'scottcook@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Martin Collins',
      company: 'Thomas-Powell',
      address: '755 Patrick Flat North Isaacshire IV2 5EG',
      phone: '09790190333',
      email: 'martinins@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'George Matthews',
      company: 'Bell-Fox',
      address: '8 Rowena Square New Ruthshire EH26 0LE',
      phone: '+44(0)530544253',
      email: 'georws@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Alex Johnson',
      company: 'Chapman, Scott and Holmes',
      address: 'Flat 73a Rogers Villages Lake Jade SW15 4AF',
      phone: '+44(0)3539 93373',
      email: 'alexjson@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Rowena King',
      company: 'Young LLC',
      address: '349 Isobel Squares Kingland DY5 3EH',
      phone: '08044951201',
      email: 'roweing@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Louis Smith',
      company: 'Wood, Brown and White',
      address: 'Studio 25 Johnson Garden North Jacksonfort PH6 2HW',
      phone: '09652 43782',
      email: 'louissth@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableName, null, {})
  }
}
