// data.js
const games = [
  {
        id: 1,
        title: 'Counter-Strike 2',
        description: 'Более двух десятилетий Counter-Strike служит примером первоклассной соревновательной игры, путь развития которой определяют миллионы игроков со всего мира. Теперь пришло время нового этапа — Counter-Strike 2.',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: 'img/previews/cs.png',
        genre: "action",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "Шутер от первого лица",
            screenshots: [
                'img/screenshots/cs/cs1.png',
                'img/screenshots/cs/cs2.png',
                'img/screenshots/cs/cs3.png'
            ],
            video: "https://www.youtube.com/embed/nSE38xjMLqE?si=INaZ3Gzt8QL97xAh",
            developer: "Valve",
            publisher: "Valve",
            releaseDate: "21 авг. 2012 г.",
            requirements: {
                os: "Windows® 10",
                processor: "4-потоковый процессор — Intel® Core™ i5 750 или лучше",
                memory: "8 GB ОЗУ",
                graphics: "с 1 ГБ памяти или больше, совместимая с DirectX 11 и поддерживающая Shader Model 5.0",
                storage: "85 GB",
                directX: "версии 11"
            }
        }
    },
    {
        id: 2,
        title: 'ARC Raiders',
        description: 'ARC Raiders — многопользовательская игра жанра extraction adventure, действие которой разворачивается в суровом будущем на Земле, атакованной загадочными механическими захватчиками ARC.',
        price: 2415,
        discount: 25,
        oldPrice: 3220,
        image: 'img/previews/ARC Raiders.png',
        genre: "action",
        isFree: false,
        isPopular: true,
        detailedInfo: {
            genre: "Шутер против ИИ",
            screenshots: [
                'img/screenshots/ARC Raiders/ARC Raiders1.png',
                'img/screenshots/ARC Raiders/ARC Raiders2.png',
                'img/screenshots/ARC Raiders/ARC Raiders3.png'
            ],
            video: "https://www.youtube.com/embed/dTRRb7ODhjA?si=JhF7XbeQyQUW2Qjf",
            developer: "Embark Studios",
            publisher: "Embark Studios",
            releaseDate: "30 окт. 2025 г.",
            requirements: {
                os: "Windows 10 or later 64-bit (latest update)",
                processor: "Intel Core i5-9600K or AMD Ryzen 5 3600 processor",
                memory: "16 GB ОЗУ",
                graphics: "NVIDIA GeForce RTX 2070 or AMD Radeon RX 5700 XT or Intel Arc B570",
                storage: "35 GB",
                directX: "версии 12"
            }
        }
    },
    {
        id: 3,
        title: 'Dota 2',
        description: 'Ежедневно миллионы игроков по всему миру сражаются от лица одного из более сотни героев Dota 2, и даже после тысячи часов в ней есть чему научиться. Благодаря регулярным обновлениям игра живёт своей жизнью: геймплей, возможности и герои постоянно преображаются.',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: 'img/previews/dota.png',
        genre: "strategy",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "MOBA",
            screenshots: [
                'img/screenshots/dota2/dota1.png',
                'img/screenshots/dota2/dota2.png',
                'img/screenshots/dota2/dota3.png'
            ],
            video: "https://www.youtube.com/embed/-cSFPIwMEq4",
            developer: "Valve",
            publisher: "Valve",
            releaseDate: "9 июл. 2013 г.",
            requirements: {
                os: "Windows 7 или новее",
                processor: "Двухъядерный процессор с тактовой частотой 2,80 ГГц от Intel или AMD",
                memory: "4 GB ОЗУ",
                graphics: "NVIDIA GeForce 8600/9600GT, ATI/AMD Radeon HD2600/3600",
                storage: "60 GB",
                directX: "версии 11"
            }
        }
    },
    {
        id: 4,
        title: 'Rust',
        description: 'Единственная цель в Rust — выживание. Дикая природа острова, его обитатели, окружение, другие выжившие — всё вокруг хочет твоей смерти. Делай всё, что в твоих силах, чтобы пережить ещё одну ночь.',
        price: 699,
        discount: 50,
        oldPrice: 1399,
        image: 'img/previews/rust.png',
        genre: "action",
        isFree: false,
        isPopular: true,
        detailedInfo: {
            genre: "Экшен выживание",
            screenshots: [
                'img/screenshots/rust/rust1.png',
                'img/screenshots/rust/rust2.png',
                'img/screenshots/rust/rust3.png'
            ],
            video: "https://www.youtube.com/embed/LGcECozNXEw?si=1n0mGXMNWRaUwcln",
            developer: "Facepunch Studios",
            publisher: "Facepunch Studios",
            releaseDate: "8 фев. 2018 г.",
            requirements: {
                os: "Windows 11 64bit",
                processor: "AMD Ryzen 7 3700X or Intel® Core i7-6700K",
                memory: "16 GB ОЗУ",
                graphics: "MD Radeon RX 6600XT, NVIDIA GeForce RTX 3060, Intel Arc B580",
                storage: "45 GB",
                directX: "версии 12"
            }
        }
    },
    {
        id: 5,
        title: 'DayZ',
        description: 'Как долго вы сможете выжить в пост-апокалипсисе? Мир пал под натиском зараженных. Боритесь против других выживших за ограниченные ресурсы. Сможете ли вы работать сообща с незнакомцами? Или станете волком-одиночкой? Это ваша история, это DayZ.',
        price: 1645,
        discount: 50,
        oldPrice: 3290,
        image: 'img/previews/dayz.png',
        genre: "adventure",
        isFree: false,
        isPopular: true,
        detailedInfo: {
            genre: "Открытый мир, Шутер, Зомби",
            screenshots: [
                'img/screenshots/dayz/dayz1.png',
                'img/screenshots/dayz/dayz2.png',
                'img/screenshots/dayz/dayz3.png'
            ],
            video: "https://www.youtube.com/embed/fJmMbl3bqE0?si=h1flARvuDtPcLxFA",
            developer: "Bohemia Interactive",
            publisher: "Bohemia Interactive",
            releaseDate: "13 дек. 2018 г.",
            requirements: {
                os: "Windows 10 / 11 64-bit",
                processor: "Intel Core i5-6600K or AMD R5 1600X",
                memory: "12 GB ОЗУ",
                graphics: "NVIDIA GeForce GTX 1060 or AMD RX 580",
                storage: "30 GB",
                directX: "версии 11"
            }
        }
    },
    {
        id: 6,
        title: 'Russian Fishing 4',
        description: 'Russian Fishing 4 - это рыболовный симулятор с элементами RPG, игровой процесс которого основан на концепции открытого мира и полной свободе действий игрока.',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: 'img/previews/rus fishing.png',
        genre: "simulation",
        isFree: true,
        isPopular: false,
        detailedInfo: {
            genre: "Симулятор рыбалки",
            screenshots: [
                'img/screenshots/rus fishing/rus fishing1.png',
                'img/screenshots/rus fishing/rus fishing2.png',
                'img/screenshots/rus fishing/rus fishing3.png'
            ],
            video: "https://www.youtube.com/embed/xL4NKR3VxjU?si=d78BdkLOZYIYY-y2",
            developer: "FishSoft LLC",
            publisher: "FishSoft LLC",
            releaseDate: "11 ноя. 2021 г.",
            requirements: {
                os: "Windows 7/8/10 64-bit",
                processor: "Intel® i5 3.5Ghz",
                memory: "8 GB ОЗУ",
                graphics: "GTX 1060",
                storage: "40 GB",
                directX: "версии 11"
            }
        }
    },
    {
        id: 8,
        title: 'None',
        description: 'None',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: '',
        genre: "",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "None",
            screenshots: [
                '',
                '',
                ''
            ],
            video: "",
            developer: "None",
            publisher: "None",
            releaseDate: "None",
            requirements: {
                os: "None",
                processor: "None",
                memory: "None",
                graphics: "None",
                storage: "None",
                directX: "None"
            }
        }
    },
    {
        id: 8,
        title: 'None',
        description: 'None',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: '',
        genre: "",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "None",
            screenshots: [
                '',
                '',
                ''
            ],
            video: "",
            developer: "None",
            publisher: "None",
            releaseDate: "None",
            requirements: {
                os: "None",
                processor: "None",
                memory: "None",
                graphics: "None",
                storage: "None",
                directX: "None"
            }
        }
    },
    {
        id: 9,
        title: 'None',
        description: 'None',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: '',
        genre: "",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "None",
            screenshots: [
                '',
                '',
                ''
            ],
            video: "",
            developer: "None",
            publisher: "None",
            releaseDate: "None",
            requirements: {
                os: "None",
                processor: "None",
                memory: "None",
                graphics: "None",
                storage: "None",
                directX: "None"
            }
        }
    },
    {
        id: 10,
        title: 'None',
        description: 'None',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: '',
        genre: "",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "None",
            screenshots: [
                '',
                '',
                ''
            ],
            video: "",
            developer: "None",
            publisher: "None",
            releaseDate: "None",
            requirements: {
                os: "None",
                processor: "None",
                memory: "None",
                graphics: "None",
                storage: "None",
                directX: "None"
            }
        }
    },
    {
        id: 11,
        title: 'None',
        description: 'None',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: '',
        genre: "",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "None",
            screenshots: [
                '',
                '',
                ''
            ],
            video: "",
            developer: "None",
            publisher: "None",
            releaseDate: "None",
            requirements: {
                os: "None",
                processor: "None",
                memory: "None",
                graphics: "None",
                storage: "None",
                directX: "None"
            }
        }
    },
    {
        id: 12,
        title: 'None',
        description: 'None',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: '',
        genre: "",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "None",
            screenshots: [
                '',
                '',
                ''
            ],
            video: "",
            developer: "None",
            publisher: "None",
            releaseDate: "None",
            requirements: {
                os: "None",
                processor: "None",
                memory: "None",
                graphics: "None",
                storage: "None",
                directX: "None"
            }
        }
    },
    {
        id: 13,
        title: 'None',
        description: 'None',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: '',
        genre: "",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "None",
            screenshots: [
                '',
                '',
                ''
            ],
            video: "",
            developer: "None",
            publisher: "None",
            releaseDate: "None",
            requirements: {
                os: "None",
                processor: "None",
                memory: "None",
                graphics: "None",
                storage: "None",
                directX: "None"
            }
        }
    },
    {
        id: 14,
        title: 'None',
        description: 'None',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: '',
        genre: "",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "None",
            screenshots: [
                '',
                '',
                ''
            ],
            video: "",
            developer: "None",
            publisher: "None",
            releaseDate: "None",
            requirements: {
                os: "None",
                processor: "None",
                memory: "None",
                graphics: "None",
                storage: "None",
                directX: "None"
            }
        }
    },
    {
        id: 15,
        title: 'None',
        description: 'None',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: '',
        genre: "",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "None",
            screenshots: [
                '',
                '',
                ''
            ],
            video: "",
            developer: "None",
            publisher: "None",
            releaseDate: "None",
            requirements: {
                os: "None",
                processor: "None",
                memory: "None",
                graphics: "None",
                storage: "None",
                directX: "None"
            }
        }
    },
    {
        id: 16,
        title: 'None',
        description: 'None',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: '',
        genre: "",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "None",
            screenshots: [
                '',
                '',
                ''
            ],
            video: "",
            developer: "None",
            publisher: "None",
            releaseDate: "None",
            requirements: {
                os: "None",
                processor: "None",
                memory: "None",
                graphics: "None",
                storage: "None",
                directX: "None"
            }
        }
    },
    {
        id: 17,
        title: 'None',
        description: 'None',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: '',
        genre: "",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "None",
            screenshots: [
                '',
                '',
                ''
            ],
            video: "",
            developer: "None",
            publisher: "None",
            releaseDate: "None",
            requirements: {
                os: "None",
                processor: "None",
                memory: "None",
                graphics: "None",
                storage: "None",
                directX: "None"
            }
        }
    },
    {
        id: 18,
        title: 'None',
        description: 'None',
        price: 0,
        discount: 0,
        oldPrice: 0,
        image: '',
        genre: "",
        isFree: true,
        isPopular: true,
        detailedInfo: {
            genre: "None",
            screenshots: [
                '',
                '',
                ''
            ],
            video: "",
            developer: "None",
            publisher: "None",
            releaseDate: "None",
            requirements: {
                os: "None",
                processor: "None",
                memory: "None",
                graphics: "None",
                storage: "None",
                directX: "None"
            }
        }
    },
]