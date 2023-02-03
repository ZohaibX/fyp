const express = require('express');
const jwt = require('jsonwebtoken');
const {
    BadRequestException,
    NotAuthorizedError
} = require('@zbtickets/common');
const currentUser = require('../middlewares/current-user');
const { User } = require('./auth/model/model');
const Ad = require('./ads/model/ad');
const Food = require('./foods/model');
const { Orders } = require('./auth/model/order');
const { OrdersPaid } = require('./auth/model/orders-payed');
const Comment = require('./comments/model');
const router = express.Router();
require('dotenv').config(); //? to use dotenv file

// ! Postman must be used in https version
let commentDesc =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
let commentSpecie = 'ABBOTTS BOOBY';
let commentTitle = "Bird's facing a weird issue";

// all test data is related to zohaibbutt283 and sp19-bcs-003 account
router.get('/api/ads/create-test-ads', async (req, res) => {
    const user = await User.findOne({ email: 'zohaibbutt283@gmail.com' });
    const user2 = await User.findOne({
        email: 'sp19-bcs-003@cuilahore.edu.pk'
    });

    if (!user || !user2) throw new BadRequestException('USER NOT FOUND');

    for (let i = 0; i < 7; i++) {
        const ad = Ad.build({
            userId: user.id,
            user,
            type: 'A',
            favouriteFood: 'FOOD TEST',
            title: testData[i].adTitle,
            description: testData[i].adDescription,
            price: testData[i].adPrice,
            birdName: testData[i].birdName,
            specieName: testData[i].specieName,
            images: testData[i].images,
            contactNumber: testData[i].contact,
            city: testData[i].city,
            age: testData[i].age,
            gender: testData[i].gender,
            locationDetails: testData[i].locationDetails,
            favouriteFood: testData[i].favouriteFood
        });
        const Item = Food.build({
            type: testData[i].type,
            title: testData[i].foodTitle,
            description: testData[i].adDescription,
            price: testData[i].adPrice,
            images: testData[i].itemImage,
            birdName: testData[i].birdName,
            birdAge: testData[i].birdAge,
            specie: testData[i].specieName,
            quantity: 10
        });
        const comment = Comment.build({
            userId: user.id,
            userTitle: user.firstName,
            userEmail: user.email,
            title: commentsTitles[i],
            specie: commentSpecie,
            description: commentDesc
        });
        await ad.save();
        await Item.save();
        await comment.save();
    }

    res.send('Test Data is Ready');
});

router.get('/api/delete-test-data', async (req, res) => {
    const user = await User.findOne({ email: 'zohaibbutt283@gmail.com' });
    user.ordersPaid = [];
    user.orders = [];
    user.orderedItems = [];
    await user.save();
    await Ad.deleteMany();
    await Food.deleteMany();

    await Orders.deleteMany();
    await OrdersPaid.deleteMany();
    await Comment.deleteMany();
    console.log(user);
    res.send('Done');
});

module.exports = router;

const testData = [
    // Five
    {
        type: 'A',
        favouriteFood: 'Berries',
        adTitle: 'Babbler for sale',
        foodTitle: 'Food for Babblers',
        specieName: 'ABBOTTS BABBLER',
        birdName: 'Babbler',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/187387391/1800',
            'https://www.oiseaux.net/photos/lars.petersson/images/akalat.d.abbott.lape.3g.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '1-8 Months',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Berries',
        adTitle: 'Boobies for sale',
        foodTitle: 'Food for Boobies',
        specieName: 'MASKED BOOBY',
        birdName: 'Booby',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 50000,

        images: [
            'https://nzbirdsonline.org.nz/sites/all/files/Masked%20Booby_Kermadec%20Is_Mar21_LR_DSC_3217.jpg',
            'https://www.allaboutbirds.org/guide/assets/photo/49129141-480px.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '10-15 Months',
        gender: 'female',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://avianreport.com/wp-content/uploads/2020/07/mosaic_optimized2.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'Berries',
        adTitle: 'Boobies for sale',
        foodTitle: 'Food for Bobbies',
        specieName: 'ABBOTTS BOOBY',
        birdName: 'Booby',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 500000,

        images: [
            'https://www.edgeofexistence.org/wp-content/uploads/2017/06/Papasula_abbotti_xlarge3.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Abbott%27s_booby_fledgling_in_bird_nursery.jpg/640px-Abbott%27s_booby_fledgling_in_bird_nursery.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '10-20 Months',
        gender: 'female',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://zupreem.com/wp-content/uploads/2020/08/pastablend-healthy-bird-diets-1024x795.png'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Berries',
        adTitle: 'Hornbill for sale',
        foodTitle: 'Food for Hornbills',
        specieName: 'HORNBILL',
        birdName: 'Hornbill',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 1000000,

        images: [
            'https://www.thethirdpole.net/content/uploads/2016/12/great-hornbill-1-scaled.jpg',
            'https://www.rekoforest.org/wp-content/uploads/2022/04/rer-kangkareng-perut-putih.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '20-25 Months',
        gender: 'female',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://www.wbu.com/wp-content/uploads/2016/06/700x400-bird-food-straight-seeds-while-millet.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'Berries',
        adTitle: 'Hornbill for sale',
        foodTitle: 'Food for Hornbills',
        specieName: 'MALABAR HORNBILL',
        birdName: 'Hornbill',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 1000000,

        images: [
            'https://blog.nationalgeographic.org/wp-content/uploads/2020/02/Malabar-Grey-Hornbill-Ocyceros-griseus-Kerala-India-Photograph-by-Pradnya-Paralkar-.jpg',
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/146273901/1800'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '26-30 Months',
        gender: 'female',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://nt.global.ssl.fastly.net/binaries/content/gallery/website/national/library/discover-and-learn/crafts/homemade-bird-feeders-wicken-fen-national-nature-reserve-cambridgeshire-1540582.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'Berries',
        adTitle: 'Hornbill for sale',
        foodTitle: 'Food for Hornbills',
        specieName: 'ABYSSINIAN GROUND HORNBILL',
        birdName: 'Hornbill',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 800000,

        images: [
            'https://nationalzoo.si.edu/sites/default/files/animals/abyssiniangroundhornbill-003.jpg',
            'https://www.marylandzoo.org/wp-content/uploads/2017/11/hornbill_web_1.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '26-30 Months',
        gender: 'female',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://parrotsforsale.pk/wp-content/uploads/2022/03/Budgies-Food.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'Berries',
        adTitle: 'Crane for sale',
        foodTitle: 'Food for Cranes',
        specieName: 'AFRICAN CROWNED CRANE',
        birdName: 'Crane',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 800000,

        images: [
            'https://www.honoluluzoo.org/wp-content/uploads/African-crowned-crane-feature-image-1276x718.jpg',
            'https://www.sfzoo.org/wp-content/uploads/2021/03/img_crowncrane_mh_large.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '26-30 Months',
        gender: 'female',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://www.thespruce.com/thmb/kLr_YayRowqj-mFs3fHTuUJYR2c=/3865x2174/smart/filters:no_upscale()/bird-seed-161794612-581754e35f9b581c0b15efcb.jpg'
        ]
    }
];

commentsTitles = [
    'How to treat avian diseases?',
    'My bird is sick',
    'How do I create a comfortable habitat for my bird',
    'how to treat parasitic infestations in my bird',
    'How to respond to bird Emergencies',
    'How to treat Avian Disease',
    'My bird got fever, help me treat him',
    'My Parrot got health issues'
];
