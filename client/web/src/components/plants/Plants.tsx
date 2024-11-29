const Plants: {
    id: number,
    name: string
    location: string
    image:string
    point: string
}[] = [
    { id: 1, name: "Akat", location: "Tropical and subtropical regions", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn3Tylro_ZWaDMDmvc3M64fH7AW_XdcoJi_A&s", point: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d163930.61388355918!2d14.30081425138442!3d50.05977340496742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b939c0970798b%3A0x400af0f66164090!2sPraha!5e0!3m2!1scs!2scz!4v1732837400358!5m2!1scs!2scz"},
    { id: 2, name: "Agáve americká", location: "Central and South America", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhqG3-P7atfxfoItbyoDIaWaOvNlH80-i4A&s", point: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d164749.00421281948!2d18.072584780614388!3d49.819846135103646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711586a3124e79d%3A0x891973fb9f9e9144!2sOstrava!5e0!3m2!1scs!2scz!4v1732837532939!5m2!1scs!2scz"},
    { id: 3, name: "Agát bílý", location: "Europe, Asia, North America", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeD_-q70lDBOaO-D-y5T4hZ5vKtC127V3DDQ&s", point: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82978.51156117932!2d17.027910293083753!3d49.464131654105294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712574453d393c7%3A0xf2ad99127b41fba2!2sProst%C4%9Bjov!5e0!3m2!1scs!2scz!4v1732837611716!5m2!1scs!2scz"},
    { id: 4, name: "Agáve modrá", location: "Mexico", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeD_-q70lDBOaO-D-y5T4hZ5vKtC127V3DDQ&s", point: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d85189.57181225167!2d17.12336545711835!3d48.14544830608287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c842d156d1fb3%3A0x400f7d1c6970100!2s900%2046%20Most%20pri%20Bratislave%2C%20Slovensko!5e0!3m2!1scs!2scz!4v1732837685828!5m2!1scs!2scz"},
    { id: 5, name: "Albizie hedvábná", location: "Tropical and subtropical regions", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEiIgNzjNBgSDtPt8WI2Tp1sFWSvEVzr3J4g&s", point: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82756.27547937607!2d17.197134152496346!3d49.595229826630806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47124e8311181853%3A0x400af0f66159470!2sOlomouc!5e0!3m2!1scs!2scz!4v1732837746296!5m2!1scs!2scz"},
    { id: 6, name: "Aloe vera", location: "Arabian Peninsula, North Africa", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa6TjH8YpY_VQSi8KJnbPuEUxODaJ2DOOShA&s", point: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d164749.00421281948!2d18.072584780614388!3d49.819846135103646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711586a3124e79d%3A0x891973fb9f9e9144!2sOstrava!5e0!3m2!1scs!2scz!4v1732837532939!5m2!1scs!2scz"},
    { id: 7, name: "Ambrozie peřenokvětá", location: "North America", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnjMptobB1X5hg8yLutJDmu-Fipm-W0H7RGw&s", point: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d163930.61388355918!2d14.30081425138442!3d50.05977340496742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b939c0970798b%3A0x400af0f66164090!2sPraha!5e0!3m2!1scs!2scz!4v1732837400358!5m2!1scs!2scz"},
    { id: 8, name: "Ananas obecný", location: "South America", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpQ2viMhVXIsRdDY0vC-w5kQTgNXsuMomJ8A&s", point: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82978.51156117932!2d17.027910293083753!3d49.464131654105294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712574453d393c7%3A0xf2ad99127b41fba2!2sProst%C4%9Bjov!5e0!3m2!1scs!2scz!4v1732837611716!5m2!1scs!2scz"},
    { id: 9, name: "Aralie japonská", location: "East Asia", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpmdnb6J6WEmOMH8-5K-jOTBakMkOd51JMJQ&s", point: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82978.51156117932!2d17.027910293083753!3d49.464131654105294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712574453d393c7%3A0xf2ad99127b41fba2!2sProst%C4%9Bjov!5e0!3m2!1scs!2scz!4v1732837611716!5m2!1scs!2scz"},
    { id: 10, name: "Arnika horská", location: "Europe, Asia", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnkPFga6oo508nKtkXDCuoTKnYP_V4-DpLBg&s", point: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d82978.51156117932!2d17.027910293083753!3d49.464131654105294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4712574453d393c7%3A0xf2ad99127b41fba2!2sProst%C4%9Bjov!5e0!3m2!1scs!2scz!4v1732837611716!5m2!1scs!2scz"}
    /*{ id: 11, name: "Bříza bělokorá", location: "Europe, Asia, North America" },
    { id: 12, name: "Buk lesní", location: "Europe" },
    { id: 13, name: "Borůvka obecná", location: "Europe, Asia, North America" },
    { id: 14, name: "Chmel otáčivý", location: "Europe, Asia" },
    { id: 15, name: "Cibule kuchyňská", location: "Central Asia" },
    { id: 16, name: "Dub letní", location: "Europe" },
    { id: 17, name: "Ficus benjamina", location: "Southeast Asia, Australia" },
    { id: 18, name: "Hloh obecný", location: "Europe, Asia, North Africa" },
    { id: 19, name: "Jabloň domácí", location: "Central Asia" },
    { id: 20, name: "Jasan ztepilý", location: "Europe, Asia" },
    { id: 21, name: "Jetel luční", location: "Europe, Asia" },
    { id: 22, name: "Jitrocel větší", location: "Europe, Asia, North Africa" },
    { id: 23, name: "Kaktus", location: "Americas" },
    { id: 24, name: "Kapradina", location: "Worldwide" },
    { id: 25, name: "Kopřiva dvoudomá", location: "Worldwide" },
    { id: 26, name: "Kosatec žlutý", location: "Europe, Asia" },
    { id: 27, name: "Lípa srdčitá", location: "Europe, Asia" },
    { id: 28, name: "Modřín opadavý", location: "Europe, Asia" },
    { id: 29, name: "Narcis", location: "Europe, North Africa" },
    { id: 30, name: "Ořešák vlašský", location: "Balkans, Asia Minor" },
    { id: 31, name: "Pampeliška lékařská", location: "Europe, Asia, North Africa" },
    { id: 32, name: "Pivoňka lékařská", location: "Europe, Asia" },
    { id: 33, name: "Růže šípková", location: "Europe, Asia, North Africa" },
    { id: 34, name: "Smrk ztepilý", location: "Europe"},
    { id: 35, name: "Sněženka", location: "Europe" },
    { id: 36, name: "Třešeň", location: "Europe, Asia" },
    { id: 37, name: "Tulipán", location: "Central Asia" },
    { id: 38, name: "Vrba bílá", location: "Europe, Asia" },
    { id: 39, name: "Vytrvalá čočka", location: "Europe, Asia" },
    { id: 40, name: "Zlatobýl obecný", location: "Europe, Asia, North America" },
    { id: 41, name: "Zlatý déšť", location: "Europe, Asia" },
    { id: 42, name: "Zimostráz vždyzelený", location: "Europe, Asia, North Africa" },
    { id: 43, name: "Borák lékařský", location: "Mediterranean region" },
    { id: 44, name: "Chmel otáčivý", location: "Europe, Asia" },
    { id: 45, name: "Fialka vonná", location: "Europe" },
    { id: 46, name: "Heřmánek pravý", location: "Europe, Asia" },
    { id: 47, name: "Levandule lékařská", location: "Mediterranean region" },
    { id: 48, name: "Máta peprná", location: "Europe, Asia" },
    { id: 49, name: "Rozmarýn lékařský", location: "Mediterranean region" },
    { id: 50, name: "Řebříček obecný", location: "Europe, Asia, North America" }*/
]


export default Plants