import { LocalPlace, Accommodation, LocalFood } from './types';

export const mockPlaces: LocalPlace[] = [
  {
    id: 'mae-kampong',
    name: { th: 'แม่กำปอง เชียงใหม่', en: 'Mae Kampong, Chiang Mai' },
    region: 'north',
    type: 'hidden-gem',
    description: {
      th: 'หมู่บ้านเล็กๆ ท่ามกลางหุบเขาและป่าไม้เขียวขจี อากาศเย็นสบายตลอดปี มีน้ำตกไหลผ่านและวิถีชีวิตชาวล้านนาแท้ๆ ที่เรียบง่ายและเป็นกันเอง',
      en: 'A peaceful small village nestled deep in the valleys and lush forests of Chiang Mai. Cooler weather year-round with a beautiful waterfalls flowing through town, preserving authentic Lanna community living.'
    },
    location: { th: 'อ.แม่ออน จ.เชียงใหม่', en: 'Mae On District, Chiang Mai' },
    bannerUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', // Beautiful nature
    images: [
      'https://images.unsplash.com/photo-1598977123418-45f04b016823?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80'
    ],
    videos: [
      {
        title: { th: 'ตะลุยร้านกาแฟลับบ้านต้นไม้ แม่กำปอง', en: 'Exploring Hidden Treehouse Coffee in Mae Kampong' },
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        duration: '5:24',
        author: 'LocalGuide_ChiangMai'
      },
      {
        title: { th: 'วิถีชีวิตคนทำชาเมี่ยงดั้งเดิม', en: 'The Art of Traditional Pickled Tea Leaves' },
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '8:15',
        author: 'MaeKampong_Life'
      }
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Sarah Jenkins',
        rating: 5,
        comment: {
          th: 'อากาศดีมาก! ได้ชิมชาและเดินชมน้ำตกชุมชน ผู้คนน่ารักและเป็นกันเองสุดๆ แนะนำป้าต้อยโฮมสเตย์ค่ะ',
          en: 'Incredible atmosphere! Tasted traditional local tea and enjoyed the community walk. Highly recommended!'
        },
        date: '2026-05-12',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
      },
      {
        id: 'r2',
        author: 'สมชาย รักดี',
        rating: 5,
        comment: {
          th: 'เป็นหมู่บ้านที่เงียบสงบ ไปหน้าร้อนก็ยังร่มรื่น ข้าวซอยร้านป้าดาและยำใบเมี่ยงอร่อยมากครับ กระจายรายได้สู่ชุมชนจริงๆ',
          en: 'A very peaceful village. Cool even in summer. The Khao Soi and tea leaf salad were outstanding!'
        },
        date: '2026-06-02',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
      }
    ]
  },
  {
    id: 'chanthaboon',
    name: { th: 'ชุมชนริมน้ำจันทบูร จันทบุรี', en: 'Chanthaboon Riverside, Chanthaburi' },
    region: 'central',
    type: 'culture',
    description: {
      th: 'ชุมชนเก่าแก่กว่า 100 ปีริมแม่น้ำจันทบุรี แหล่งผสมผสานอารยธรรมไทย จีน และญวน มีสถาปัตยกรรมตึกแถวโบราณลวดลายฉลุไม้อันโดดเด่นและโบสถ์คริสต์ที่ใหญ่ที่สุดในไทย',
      en: 'A historic riverfront community over 100 years old. An exceptional melting pot of Thai, Chinese, and Vietnamese heritage, featuring ornate old wooden shophouses and the majestic Catholic Cathedral.'
    },
    location: { th: 'อ.เมือง จ.จันทบุรี', en: 'Mueang District, Chanthaburi' },
    bannerUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=1200&q=80', // Vibrant city/river
    images: [
      'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80'
    ],
    videos: [
      {
        title: { th: 'เดินชุมชนเก่า ชิมบัวลอยโบราณริมนํ้า', en: 'Heritage Walk and Tasting Ancient Rivers Dessert' },
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '6:40',
        author: 'JellyTravels'
      }
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Andre Moreau',
        rating: 4,
        comment: {
          th: 'สถาปัตยกรรมสวยสะกดสายตามาก อาหารว่างและขนมไข่สูตรโบราณกินร้อนๆ อร่อยมาก บรรยากาศสบายติดแม่น้ำ',
          en: 'Fascinating architecture. The hot local egg cakes were delicious, and walking by the historic houses felt relaxing.'
        },
        date: '2026-04-18',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
      }
    ]
  },
  {
    id: 'chiang-khan',
    name: { th: 'ชุมชนโบราณเชียงคาน เลย', en: 'Chiang Khan Wooden Town, Loei' },
    region: 'isan',
    type: 'recommended',
    description: {
      th: 'เมืองริมฝั่งแม่น้ำโขงที่นักท่องเที่ยวหลงรัก โดดเด่นด้วยบ้านไม้เก่าสองข้างถนนชายโขง มีพิธีตักบาตรข้าวเหนียวในยามเช้า และทัศนียภาพทะเลหมอกภูทอกที่สวยงาม',
      en: 'A pristine riverside town along the Mekong River. Famous for its traditional wooden shophouses lining the walking street, tranquil morning sticky rice alms giving, and the fog sweeping across Phu Thok mountain.'
    },
    location: { th: 'อ.เชียงคาน จ.เลย', en: 'Chiang Khan District, Loei' },
    bannerUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80', // Calm river
    images: [
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80'
    ],
    videos: [
      {
        title: { th: 'รีวิวใส่บาตรข้าวเหนียวเช้ามืดและเที่ยวภูทอก', en: 'Morning Sticky Rice Alms Giving & Phu Thok Sea Fog' },
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '10:12',
        author: 'IsanExplorer'
      }
    ],
    reviews: [
      {
        id: 'r4',
        author: 'Yuki Sato',
        rating: 5,
        comment: {
          th: 'บรรยากาศยามเย็นตอนดวงอาทิตย์ตกดินข้ามฝั่งโขงไปลาวประทับใจมาก เช่าจักรยานปั่นเลียบแม่น้ำสนุกดีค่ะ',
          en: 'Stunning sunset over Mekong river looking at Laos. Renting a bicycle to ride along the riverfront was fantastic.'
        },
        date: '2026-05-29',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80'
      }
    ]
  },
  {
    id: 'koh-yao-noi',
    name: { th: 'ชุมชนเกาะยาวน้อย พังงา', en: 'Koh Yao Noi Community, Phang Nga' },
    region: 'south',
    type: 'hidden-gem',
    description: {
      th: 'ปอดอันอุดมสมบูรณ์กลางอ่าวพังงา มีวิถีชีวิตทำนาและประมงพื้นบ้านที่อนุรักษ์ธรรมชาติอย่างเหนียวแน่น ชายหาดเงียบสงบ ชมวิวป่าเกาะนับร้อยอย่างไร้ความพลุกพล่าน',
      en: 'A pristine oasis in Phang Nga Bay preservation. Home to traditional fishers and rice farmers. It offers quiet, uncrowded beaches with majestic views of limestone islands and mangroves.'
    },
    location: { th: 'อ.เกาะยาว จ.พังงา', en: 'Koh Yao District, Phang Nga' },
    bannerUrl: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', // Tropical island ocean
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&q=80'
    ],
    videos: [
      {
        title: { th: 'สัมผัสชีวิตประมงพายเรือคายัคหาหอยนางรม', en: 'Catching Wild Oysters & Kayaking with Gen-Z Villagers' },
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '11:45',
        author: 'EcoIslanders_TH'
      }
    ],
    reviews: [
      {
        id: 'r5',
        author: 'Oliver Hansen',
        rating: 5,
        comment: {
          th: 'ที่นี่คือสรวงสวรรค์ที่แท้จริง ไม่พลุกพล่านเหมือนภูเก็ต ชุมชนน่ารักและดูแลสิ่งแวดล้อมได้ดีเยี่ยม',
          en: 'A true paradise. Free from the commercial crowd. Local food and activities represent real sustainable ecotourism!'
        },
        date: '2026-06-01',
        avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80'
      }
    ]
  },
  {
    id: 'baankiriwong',
    name: { th: 'หมู่บ้านคีรีวง นครศรีธรรมราช', en: 'Kiriwong Village, Nakhon Si Thammarat' },
    region: 'south',
    type: 'recommended',
    description: {
      th: 'หมู่บ้านที่ได้ชื่อว่ามี อากาศดีที่สุดในประเทศไทย ซ่อนตัวอยู่ท่ามกลางเทือกเขาหลวง แหล่งธรรมชาติบริสุทธิ์ แม่น้ำใส ไหลผ่านโขดหิน มีมรดกงานฝีมือผ้ามัดย้อมธรรมชาติ',
      en: 'Acclaimed for having the purest and freshest air in Thailand, hidden under the foothills of Khao Luang mountain. Known for crystal-clear running streams, giant boulders, and famous plant-dyed handmade fabrics.'
    },
    location: { th: 'อ.ลานสกา จ.นครศรีธรรมราช', en: 'Lan Saka District, Nakhon Si Thammarat' },
    bannerUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80', // Mountain stream forest
    images: [
      'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80'
    ],
    videos: [
      {
        title: { th: 'ทดลองทำย้อมผ้าธรรมชาติคีรีวง', en: 'Crafting Plant-Dyed Fabrics in Kiriwong' },
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        duration: '7:55',
        author: 'CraftEnthusiast'
      }
    ],
    reviews: [
      {
        id: 'r6',
        author: 'มุกดา รัตนกุล',
        rating: 5,
        comment: {
          th: 'น้ำใสมาก เห็นปลาว่ายน้ำเต็มไปหมด ชุมชนมีกลุ่มแม่บ้านทำผ้าบาติกกลุ่มแปรรูปผลไม้ น่ารักมากค่ะ',
          en: 'The river was so clear you can see schools of fish. Community workshops for natural dye are super educational.'
        },
        date: '2026-05-15',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      }
    ]
  }
];

export const mockAccommodations: Accommodation[] = [
  {
    id: 'homestay-mae-kp',
    name: { th: 'บ้านป้าหนู โฮมสเตย์ แม่กำปอง', en: 'Yai Noo Homestay, Mae Kampong' },
    region: 'north',
    priceRange: '฿500 - ฿800 / คืน (Person)',
    rating: 4.8,
    bannerUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', // Boutique homestay style
    description: {
      th: 'สัมผัสวิถีชีวิตแบบบ้านๆ นอนเรือนไม้ดั้งเดิม ฟังเสียงน้ำห้วยเกลี้ยงไหลผ่านหน้าบ้าน รับประทานอาหารเช้าท้องถิ่นแสนอร่อยฝีมือชาวบ้าน',
      en: 'Immerse yourself into authentic lifestyle. Stay inside a native wooden house, wake up to running mountain creeks, and taste real home-cooked Lanna dishes prepared with local love.'
    },
    amenities: {
      th: ['อาหารเช้าชุมชน', 'พัดลมไอเย็น', 'น้ำอุ่น', 'เครื่องซักผ้าสวนกลาง'],
      en: ['Community Breakfast', 'Cooling Fan', 'Hot Shower', 'Shared Laundry Room']
    },
    contact: '081-234-5678 (ป้าหนู)'
  },
  {
    id: 'kiriwong-riverside',
    name: { th: 'คีรีวง ริเวอร์วิว รีสอร์ทชุมชน', en: 'Kiriwong Riverview Community Lodge' },
    region: 'south',
    priceRange: '฿1,200 - ฿2,000 / คืน (Room)',
    rating: 4.7,
    bannerUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1200&q=80', // River cabin
    description: {
      th: 'ที่พักโดยวิสาหกิจชุมชนคีรีวง ติดธารน้ำตกใสสะอาด มีระเบียงให้ออกไปนั่งสูดอากาศบริสุทธิ์ได้เต็มปอด สนับสนุนรายได้คนในท้องถิ่นโดยตรง',
      en: 'A lodge run by the local Kiriwong Eco-Community network. Placed right next to the crystal-clear waterfalls, with spacious decks to breathe in pristine mountain air and directly fund local families.'
    },
    amenities: {
      th: ['แอร์คอนดิชัน', 'WiFi ฟรี', 'ที่จอดรถจักรยาน', 'บุฟเฟต์ผลไม้สวน'],
      en: ['Air Conditioning', 'Free WiFi', 'Bicycle Rentals', 'Organic Fruit Buffet']
    },
    contact: '089-876-5432'
  },
  {
    id: 'river-shophouse-chan',
    name: { th: 'ท่าน้ำจันทบูร โฮสเทลประวัติศาสตร์', en: 'Tha Nam Chanthaboon Heritage Hostel' },
    region: 'central',
    priceRange: '฿800 - ฿1,500 / คืน',
    rating: 4.9,
    bannerUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80', // Cozy classic interior
    description: {
      th: 'ตึกแถวโบราณอายุกว่าร้อยปีที่ดัดแปลงเป็นโฮสเทลติดริมน้ำอย่างประณีต ตกแต่งด้วยภาพเก่าแก่และสิ่งของท้องถิ่น เดินหน้าประตูเข้าตลาดจันทบูรได้เลย',
      en: 'A century-old historic shophouse lovingly converted into a charming waterfront hostel. Adorned with antique photographs and vintage Thai collectibles, step right into the riverside market area.'
    },
    amenities: {
      th: ['WiFi ความเร็วสูง', 'จักรยานฟรี', 'เครื่องฟอกอากาศ', 'ชาร้อนสูตรเมืองจันท์ฟรี'],
      en: ['High Speed WiFi', 'Complimentary Bicycles', 'Air Purifiers', 'Free Chanthaburi Herbal Tea']
    },
    contact: '039-111-222'
  }
];

export const mockFoods: LocalFood[] = [
  {
    id: 'khao-soi-pada',
    name: { th: 'ข้าวซอยป้าดา (ต้นตำรับแม่กำปอง)', en: 'Khao Soi Pada (Original Mae Kampong)' },
    shopName: { th: 'ร้านข้าวซอยใต้ต้นสน', en: 'Pada Khao Soi Restaurant' },
    region: 'north',
    price: '฿50 - ฿80',
    bannerUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', // Delicious curry bowl
    description: {
      th: 'ข้าวซอยไก่และเนื้อรสชาติเข้มข้น หอมเครื่องพริกแกงที่ป้าดาต้มเองในเตาถ่านโบราณ บีบมะนาวสด กินคู่กับหอมแดงและผักกาดดองชาวเขา',
      en: 'Rich and cream-loaded northern chicken and beef curry noodle soup. Features Pada’s secret homemade spice paste simmered slowly on charcoal pots, served with organic pickled cabbage.'
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoAuthor: 'LocalFoodTaster'
  },
  {
    id: 'senchan-pad-poo',
    name: { th: 'เส้นจันท์ผัดปู (สูตรครอบครัวร้อยปี)', en: 'Chanthaboon Crab Rice Noodles' },
    shopName: { th: 'ร้านก๋วยเตี๋ยวเจ๊จุก ริมน้ำ', en: 'Jay Jook Riverfront Shophouse' },
    region: 'central',
    price: '฿60 - ฿120',
    bannerUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80', // Crab/Seafood stir-fry
    description: {
      th: 'เส้นก๋วยเตี๋ยวเมืองจันท์เหนียวนุ่มผัดซอสมะขามเปียกสูตรโบราณ รสมะขามเปรี้ยวหวานนำ คลุกกับปูแป้นหรือเนื้อปูม้าอร่อยกลมกล่อม',
      en: 'Famed chewy Chanthaburi rice noodles stir-fried in sweet-tangy tamarind family glaze, tossed with farm-fresh soft shell or local blue swimmer crab.'
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoAuthor: 'JellyTravels'
  },
  {
    id: 'somtam-chiangkhan',
    name: { th: 'ตำหลวงพระบางบีกเกอร์ป้ามา', en: 'Yai Ma Luang Prabang Somtam (River Style)' },
    shopName: { th: 'ส้มตำยอดดอยริมโขง', en: 'Yai Ma Som Tam Shop' },
    region: 'isan',
    price: '฿40 - ฿90',
    bannerUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', // Food/Papaya salad
    description: {
      th: 'ส้มตำแบบแผ่นบางมะละกอสับใบมีดใหญ่แบบลาวดั่งเดิม ปรุงรสด้วยน้ำปลาร้าต้มสุกสูตรนัวพิเศษกะปิแท้และพริกชุมชนแห้งครกต่อครก สะใจมากๆ',
      en: 'Authentic thin-ribbon shaved green papaya salad dressed in warm fermented mudfish paste, local shrimp paste, and bird’s eye mountain chili.'
    },
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    videoAuthor: 'IsanExplorer'
  }
];
