// const { faker } = require("@faker-js/faker");x/x
const mongoose = require("mongoose");
const { t7 } = require("./t7");

async function seedData() {
  // Connection URL
  const uri = `mongodb://localhost:27017/music_production`;
  mongoose.set("strictQuery", false);
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connected to db");
    })
    .catch(err => {
      console.log("error", err);
    });

  const users = [
    {
      c1: "Zaw Phyo",
      c2: "zawphyoaung@gmail.com",
      c3: "$2b$10$xYZn3iRp8O/rnO7IxZbpZeN/3kKwq9RFJyah8OqLvxkpO0PLYGITi",
      c4: "649956c816a91274210ad1c9"
    }
  ];
  // {
  //   c1: "Zarni",
  //   c2: "zarni@gmail.com",
  //   c3: "$2b$10$xYZn3iRp8O/rnO7IxZbpZeN/3kKwq9RFJyah8OqLvxkpO0PLYGITi",
  //   c4: "64991f1dd4b89a6616813c8a"
  // },
  // {
  //   c1: "HT",
  //   c2: "ht@gmail.com",
  //   c3: "$2b$10$xYZn3iRp8O/rnO7IxZbpZeN/3kKwq9RFJyah8OqLvxkpO0PLYGITi",
  //   c4: "64991f1dd4b89a6616813c89"
  // }
  const admins = [
    {
      c1: "Zaw Phyo Aung"
    }
  ];

  const pages = [
    {
      c1: "dashboard",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "upload_music",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "art_work",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "upload_art_work",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "mastering_list",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "mastering",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "mastering_preview",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "songrecording_collection",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "artwork_collection",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "project_collection",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "project_management",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "music_data1",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "music_data2",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "music_data3",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "music_data_preview",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "team_request_list",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    },
    {
      c1: "team_member_list",
      cb: "64990983b432702ce15b4f3f",
      ud: "64990983b432702ce15b4f3f"
    }
  ];

  const permissions = [
    {
      c1: "Cloud",
      c2: [
        "64995304b001ba98b049c8f0",
        "64995304b001ba98b049c8f1",
        "64995304b001ba98b049c8f2"
      ],
      c3: "1"
    },
    {
      c1: "Cloud",
      c2: [
        "64995304b001ba98b049c8f0",
        "64995304b001ba98b049c8f1",
        "64995304b001ba98b049c8f2"
      ],
      c3: "0"
    },
    {
      c1: "Work",
      c2: [
        "64995304b001ba98b049c8e9",
        "64995304b001ba98b049c8ea",
        "64995304b001ba98b049c8eb",
        "64995304b001ba98b049c8ec",
        "64995304b001ba98b049c8ed",
        "64995304b001ba98b049c8ee",
        "64995304b001ba98b049c8ef"
      ],
      c3: "1"
    },
    {
      c1: "Work",
      c2: [
        "64995304b001ba98b049c8e9",
        "64995304b001ba98b049c8ea",
        "64995304b001ba98b049c8eb",
        "64995304b001ba98b049c8ec",
        "64995304b001ba98b049c8ed",
        "64995304b001ba98b049c8ee",
        "64995304b001ba98b049c8ef"
      ],
      c3: "0"
    },
    {
      c1: "Filing",
      c2: [
        "64995304b001ba98b049c8f3",
        "64995304b001ba98b049c8f4",
        "64995304b001ba98b049c8f5",
        "64995304b001ba98b049c8f6",
        "64995304b001ba98b049c8f7"
      ],
      c3: "1"
    },
    {
      c1: "Filing",
      c2: [
        "64995304b001ba98b049c8f3",
        "64995304b001ba98b049c8f4",
        "64995304b001ba98b049c8f5",
        "64995304b001ba98b049c8f6",
        "64995304b001ba98b049c8f7"
      ],
      c3: "0"
    },
    {
      c1: "Team",
      c2: ["64995304b001ba98b049c8f8", "64995304b001ba98b049c8f9"],
      c3: "1"
    },
    {
      c1: "Team",
      c2: ["64995304b001ba98b049c8f8", "64995304b001ba98b049c8f9"],
      c3: "0"
    }
  ];

  const roles = [
    // {
    //   c1: "Owner",
    //   c4: [
    //     "649956724029029a8d950703",
    //     "649956724029029a8d950705",
    //     "649956724029029a8d950707",
    //     "649956724029029a8d950709"
    //   ]
    // }
    {
      c1: "Singer",
      c2: "649956c816a91274210ad1c9",
      c3: "6499575c76836aeef0c24878",
      c4: [
        "64991be5ce1cdcb394e49882",
        "64991be5ce1cdcb394e49884",
        "64991be5ce1cdcb394e49887",
        "64991be5ce1cdcb394e49889"
      ]
    },
    {
      c1: "Writer",
      c2: "649956c816a91274210ad1c9",
      c3: "6499575c76836aeef0c24878",
      c4: [
        "64991be5ce1cdcb394e49883",
        "64991be5ce1cdcb394e49887",
        "64991be5ce1cdcb394e49889"
      ]
    }
  ];

  const catalogs = [
    {
      c1: "Ex;bbrain",
      c2: "photo path",
      c6: 0
    }
  ];

  const owner_cata = [
    { c1: "64995838c16af654dcb1120b", c2: "64995838c16af654dcb1120b" },
    { c1: "64a590aa3dc7224b269c00d4", c2: "64995838c16af654dcb1120b" },
    { c1: "64a5932a3dc7224b269c00e4", c2: "64995838c16af654dcb1120b" }
  ];
  //  const users = Array.from({
  //    length: 10
  //  }).map(() => ({
  //    a_name: faker.person.fullName(),
  //    a_email: faker.internet.email(),
  //    a_password: faker.internet.password(),
  //    a_verify: 1,
  //    a_secret_code: faker.string.alpha({ count: 22, casing: "lower" }),
  //    a_gender: 1,
  //    a_phone: faker.phone.number()
  //  }));

  async function main() {
    await t7.insertMany(owner_cata);
  }

  main().then(() => {
    mongoose.connection.close();
    console.log("seed success");
  });
}

seedData();
