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

    for (let i = 0; i < 100; i++) {
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
            title: testData[i].adTitle,
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
            title: commentTitle + ' ' + i,
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
        favouriteFood: 'FOOD TEST',
        adTitle: 'Double Eyed Parrot for sale',
        specieName: 'DOUBLE EYED FIG PARROT',
        birdName: 'Parrot',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/3/3f/Double-eyed_Fig_Parrot_0A2A9574.jpg',
            'https://www.australiangeographic.com.au/wp-content/uploads/2020/02/Australian-fig-parrot-2.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Love Birds for sale',
        specieName: 'ROSY FACED LOVEBIRD',
        birdName: 'Lovebird',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/4/4f/Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29.jpg',
            'https://static.wikia.nocookie.net/animals/images/e/e0/800px-Agapornis_roseicollis_-Peach-faced_Lovebird_pet_on_perch.jpg/revision/latest?cb=20160924035717'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'AFRICAN CUCKOO for sale',
        specieName: 'AFRICAN EMERALD CUCKOO',
        birdName: 'Cuckoo',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/d/da/Emerald_cuckoo_%28Chrysococcyx_cupreus_insularum%29_male_Sao_Tome.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk98o81mrHHEWWtZ10pvWiWHt3bVivaFq0NvCLAyxCJpoQp_sngZas_rsWeZGYkNYbaDo&usqp=CAU'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Beautiful Bird for sale',
        specieName: 'ANDEAN GOOSE',
        birdName: 'Goose',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/115691761/1800',
            'https://upload.wikimedia.org/wikipedia/commons/6/6f/Chloephaga_melanoptera1.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Crowned Bird for sale',
        specieName: 'AFRICAN CROWNED CRANE',
        birdName: 'Crane',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://www.honoluluzoo.org/wp-content/uploads/African-crowned-crane-feature-image-1276x718.jpg',
            'https://www.sfzoo.org/wp-content/uploads/2021/03/img_crowncrane_mh_large.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'ABBOTTS BOOBY for sale',
        specieName: 'ABBOTTS BOOBY',
        birdName: 'Booby',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://www.edgeofexistence.org/wp-content/uploads/2017/06/Papasula_abbotti_xlarge3.jpg',
            'https://www.edgeofexistence.org/wp-content/uploads/2017/06/Papasula_abbotti_xlarge.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Hornbill for sale',
        specieName: 'ABYSSINIAN GROUND HORNBILL',
        birdName: 'Hornbill',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/245260421/1800',
            'https://nationalzoo.si.edu/sites/default/files/animals/abyssiniangroundhornbill-005_0.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Oyster Catcher for sale',
        specieName: 'AFRICAN OYSTER CATCHER',
        birdName: 'Catcher',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/215836881/1800',
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/215836871/1800'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'ALBATROSS for sale',
        specieName: 'ANDEAN GOOSE',
        birdName: 'Goose',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://static.dw.com/image/42582568_303.jpg',
            'https://i.natgeofe.com/n/630c7275-608b-461c-b82c-7737ba5622e1/6152449_4x3.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'KingFisher for sale',
        specieName: 'BELTED KINGFISHER',
        birdName: 'Kingfisher',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://images.squarespace-cdn.com/content/v1/5a6390338a02c77bf05da4ab/1565803155513-4AT64A6OL3AF7BJJGAQU/33864574122_32b2772fa3_o.jpg?format=1500w',
            'https://abcbirds.org/wp-content/uploads/2019/06/BOTW-Facebook_Belted-Kingfisher_Collins93_Shutterstock.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'KingBird for sale',
        specieName: 'GRAY KINGBIRD',
        birdName: 'Kingbird',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/194035791/1800'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Rosella for sale',
        specieName: 'EASTERN ROSELLA',
        birdName: 'Rosella',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/3/33/Platycercus_eximius_diemenensis_male.jpg',
            'https://cdn-fastly.petguide.com/media/2022/02/16/8237743/eastern-rosella.jpg?size=1200x628'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Great Potoo for sale',
        specieName: 'GREAT POTOO',
        birdName: 'Potoo',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/245391811/1800',
            'https://www.animalspot.net/wp-content/uploads/2021/10/Great-Potoo-Picture.jpg'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Spoonbill for sale',
        specieName: 'SPOONBILL',
        birdName: 'Spoonbill',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://www.allaboutbirds.org/guide/assets/photo/311367261-480px.jpg',
            'https://abcbirds.org/wp-content/uploads/2021/08/Photo-2_Roseate-Spoonbill-at-nest_Gareth-Rasberry-1024x663.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Hawk for sale',
        specieName: 'RED TAILED HAWK',
        birdName: 'Hawk',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://www1.nyc.gov/assets/wildlifenyc/images/content/pages/Red_Tailed_Hawk_Perched_iStock-800px.jpg',
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/60384881/1800'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Wild Turkey for sale',
        specieName: 'WILD TURKEY',
        birdName: 'Turkey',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://www.thespruce.com/thmb/Ynt9rZc4Ir_vtbHB4BUgeWgwkWk=/3600x2025/smart/filters:no_upscale()/wild-turkey-560606673-57d81e6e5f9b589b0a98254f.jpg',
            'https://nas-national-prod.s3.amazonaws.com/styles/api_hero_bird_with_crop_1920_1200/public/birds/hero_image/h_a1_4285_1_wild-turkey_october_greenfield_kk_adult-males.jpg?tok=1626941160'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Sand Martin for sale',
        specieName: 'SAND MARTIN',
        birdName: 'Martin',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://www.birdspot.co.uk/wp-content/uploads/2017/09/sand-martin-2.jpg',
            'https://scottishwildlifetrust.org.uk/wp-content/uploads/blogs.dir/3/files/2016/05/Sand_martin_2_c_Margaret_Holland1.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Indian Bustard for sale',
        specieName: 'INDIAN BUSTARD',
        birdName: 'Bustard',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201610/great-indian-bustard_147550635057_647x404_100316083045_0.jpg',
            'https://images.hindustantimes.com/img/2022/01/28/1600x900/0f3bd792-7f6a-11ec-86cd-1836b37e53ee_1643379605719.jpg'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'GoldFinch for sale',
        specieName: 'EUROPEAN GOLDFINCH',
        birdName: 'Goldfinch',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/256706671/1800',
            'https://wpr-public.s3.amazonaws.com/wprorg/styles/resp_orig_custom_user_wide_1x/s3/51852766425_a6f4813c62_c.jpg?itok=ZZJbyt2f'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Turtle Dove for sale',
        specieName: 'EUROPEAN TURTLE DOVE',
        birdName: 'Dove',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/242183711/1800',
            'https://cdn-acgla.nitrocdn.com/bvIhcJyiWKFqlMsfAAXRLitDZjWdRlLX/assets/static/optimized/rev-5131b73/wp-content/uploads/2020/08/european-turtle-dove-1.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    ////// ----------------------------------------   2ND 20
    // Five
    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Double Eyed Parrot for sale (2)',
        specieName: 'DOUBLE EYED FIG PARROT',
        birdName: 'Parrot',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/3/3f/Double-eyed_Fig_Parrot_0A2A9574.jpg',
            'https://www.australiangeographic.com.au/wp-content/uploads/2020/02/Australian-fig-parrot-2.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Love Birds for sale (2)',
        specieName: 'ROSY FACED LOVEBIRD',
        birdName: 'Lovebird',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/4/4f/Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29.jpg',
            'https://static.wikia.nocookie.net/animals/images/e/e0/800px-Agapornis_roseicollis_-Peach-faced_Lovebird_pet_on_perch.jpg/revision/latest?cb=20160924035717'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'AFRICAN CUCKOO for sale (2)',
        specieName: 'AFRICAN EMERALD CUCKOO',
        birdName: 'Cuckoo',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/d/da/Emerald_cuckoo_%28Chrysococcyx_cupreus_insularum%29_male_Sao_Tome.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk98o81mrHHEWWtZ10pvWiWHt3bVivaFq0NvCLAyxCJpoQp_sngZas_rsWeZGYkNYbaDo&usqp=CAU'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Beautiful Bird for sale (2)',
        specieName: 'ANDEAN GOOSE',
        birdName: 'Goose',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/115691761/1800',
            'https://upload.wikimedia.org/wikipedia/commons/6/6f/Chloephaga_melanoptera1.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Crowned Bird for sale (2)',
        specieName: 'AFRICAN CROWNED CRANE',
        birdName: 'Crane',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://www.honoluluzoo.org/wp-content/uploads/African-crowned-crane-feature-image-1276x718.jpg',
            'https://www.sfzoo.org/wp-content/uploads/2021/03/img_crowncrane_mh_large.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'ABBOTTS BOOBY for sale (2)',
        specieName: 'ABBOTTS BOOBY',
        birdName: 'Booby',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://www.edgeofexistence.org/wp-content/uploads/2017/06/Papasula_abbotti_xlarge3.jpg',
            'https://www.edgeofexistence.org/wp-content/uploads/2017/06/Papasula_abbotti_xlarge.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Hornbill for sale (2)',
        specieName: 'ABYSSINIAN GROUND HORNBILL',
        birdName: 'Hornbill',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/245260421/1800',
            'https://nationalzoo.si.edu/sites/default/files/animals/abyssiniangroundhornbill-005_0.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Oyster Catcher for sale (2)',
        specieName: 'AFRICAN OYSTER CATCHER',
        birdName: 'Catcher',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/215836881/1800',
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/215836871/1800'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'ALBATROSS for sale (2)',
        specieName: 'ANDEAN GOOSE',
        birdName: 'Goose',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://static.dw.com/image/42582568_303.jpg',
            'https://i.natgeofe.com/n/630c7275-608b-461c-b82c-7737ba5622e1/6152449_4x3.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'KingFisher for sale (2)',
        specieName: 'BELTED KINGFISHER',
        birdName: 'Kingfisher',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://images.squarespace-cdn.com/content/v1/5a6390338a02c77bf05da4ab/1565803155513-4AT64A6OL3AF7BJJGAQU/33864574122_32b2772fa3_o.jpg?format=1500w',
            'https://abcbirds.org/wp-content/uploads/2019/06/BOTW-Facebook_Belted-Kingfisher_Collins93_Shutterstock.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'KingBird for sale (2)',
        specieName: 'GRAY KINGBIRD',
        birdName: 'Kingbird',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/194035791/1800'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Rosella for sale (2)',
        specieName: 'EASTERN ROSELLA',
        birdName: 'Rosella',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/3/33/Platycercus_eximius_diemenensis_male.jpg',
            'https://cdn-fastly.petguide.com/media/2022/02/16/8237743/eastern-rosella.jpg?size=1200x628'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Great Potoo for sale (2)',
        specieName: 'GREAT POTOO',
        birdName: 'Potoo',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/245391811/1800',
            'https://www.animalspot.net/wp-content/uploads/2021/10/Great-Potoo-Picture.jpg'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Spoonbill for sale (2)',
        specieName: 'SPOONBILL',
        birdName: 'Spoonbill',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://www.allaboutbirds.org/guide/assets/photo/311367261-480px.jpg',
            'https://abcbirds.org/wp-content/uploads/2021/08/Photo-2_Roseate-Spoonbill-at-nest_Gareth-Rasberry-1024x663.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Hawk for sale (2)',
        specieName: 'RED TAILED HAWK',
        birdName: 'Hawk',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://www1.nyc.gov/assets/wildlifenyc/images/content/pages/Red_Tailed_Hawk_Perched_iStock-800px.jpg',
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/60384881/1800'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Wild Turkey for sale (2)',
        specieName: 'WILD TURKEY',
        birdName: 'Turkey',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://www.thespruce.com/thmb/Ynt9rZc4Ir_vtbHB4BUgeWgwkWk=/3600x2025/smart/filters:no_upscale()/wild-turkey-560606673-57d81e6e5f9b589b0a98254f.jpg',
            'https://nas-national-prod.s3.amazonaws.com/styles/api_hero_bird_with_crop_1920_1200/public/birds/hero_image/h_a1_4285_1_wild-turkey_october_greenfield_kk_adult-males.jpg?tok=1626941160'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Sand Martin for sale (2)',
        specieName: 'SAND MARTIN',
        birdName: 'Martin',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://www.birdspot.co.uk/wp-content/uploads/2017/09/sand-martin-2.jpg',
            'https://scottishwildlifetrust.org.uk/wp-content/uploads/blogs.dir/3/files/2016/05/Sand_martin_2_c_Margaret_Holland1.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Indian Bustard for sale (2)',
        specieName: 'INDIAN BUSTARD',
        birdName: 'Bustard',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201610/great-indian-bustard_147550635057_647x404_100316083045_0.jpg',
            'https://images.hindustantimes.com/img/2022/01/28/1600x900/0f3bd792-7f6a-11ec-86cd-1836b37e53ee_1643379605719.jpg'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'GoldFinch for sale (2)',
        specieName: 'EUROPEAN GOLDFINCH',
        birdName: 'Goldfinch',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/256706671/1800',
            'https://wpr-public.s3.amazonaws.com/wprorg/styles/resp_orig_custom_user_wide_1x/s3/51852766425_a6f4813c62_c.jpg?itok=ZZJbyt2f'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Turtle Dove for sale (2)',
        specieName: 'EUROPEAN TURTLE DOVE',
        birdName: 'Dove',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/242183711/1800',
            'https://cdn-acgla.nitrocdn.com/bvIhcJyiWKFqlMsfAAXRLitDZjWdRlLX/assets/static/optimized/rev-5131b73/wp-content/uploads/2020/08/european-turtle-dove-1.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    /////////////// ---------------------3RD 20
    // Five
    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Double Eyed Parrot for sale (3)',
        specieName: 'DOUBLE EYED FIG PARROT',
        birdName: 'Parrot',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/3/3f/Double-eyed_Fig_Parrot_0A2A9574.jpg',
            'https://www.australiangeographic.com.au/wp-content/uploads/2020/02/Australian-fig-parrot-2.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Love Birds for sale (3)',
        specieName: 'ROSY FACED LOVEBIRD',
        birdName: 'Lovebird',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/4/4f/Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29.jpg',
            'https://static.wikia.nocookie.net/animals/images/e/e0/800px-Agapornis_roseicollis_-Peach-faced_Lovebird_pet_on_perch.jpg/revision/latest?cb=20160924035717'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'AFRICAN CUCKOO for sale (3)',
        specieName: 'AFRICAN EMERALD CUCKOO',
        birdName: 'Cuckoo',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/d/da/Emerald_cuckoo_%28Chrysococcyx_cupreus_insularum%29_male_Sao_Tome.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk98o81mrHHEWWtZ10pvWiWHt3bVivaFq0NvCLAyxCJpoQp_sngZas_rsWeZGYkNYbaDo&usqp=CAU'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Beautiful Bird for sale (3)',
        specieName: 'ANDEAN GOOSE',
        birdName: 'Goose',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/115691761/1800',
            'https://upload.wikimedia.org/wikipedia/commons/6/6f/Chloephaga_melanoptera1.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Crowned Bird for sale (3)',
        specieName: 'AFRICAN CROWNED CRANE',
        birdName: 'Crane',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://www.honoluluzoo.org/wp-content/uploads/African-crowned-crane-feature-image-1276x718.jpg',
            'https://www.sfzoo.org/wp-content/uploads/2021/03/img_crowncrane_mh_large.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'ABBOTTS BOOBY for sale (3)',
        specieName: 'ABBOTTS BOOBY',
        birdName: 'Booby',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://www.edgeofexistence.org/wp-content/uploads/2017/06/Papasula_abbotti_xlarge3.jpg',
            'https://www.edgeofexistence.org/wp-content/uploads/2017/06/Papasula_abbotti_xlarge.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Hornbill for sale (3)',
        specieName: 'ABYSSINIAN GROUND HORNBILL',
        birdName: 'Hornbill',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/245260421/1800',
            'https://nationalzoo.si.edu/sites/default/files/animals/abyssiniangroundhornbill-005_0.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Oyster Catcher for sale (3)',
        specieName: 'AFRICAN OYSTER CATCHER',
        birdName: 'Catcher',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/215836881/1800',
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/215836871/1800'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'ALBATROSS for sale (3)',
        specieName: 'ANDEAN GOOSE',
        birdName: 'Goose',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://static.dw.com/image/42582568_303.jpg',
            'https://i.natgeofe.com/n/630c7275-608b-461c-b82c-7737ba5622e1/6152449_4x3.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'KingFisher for sale (3)',
        specieName: 'BELTED KINGFISHER',
        birdName: 'Kingfisher',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://images.squarespace-cdn.com/content/v1/5a6390338a02c77bf05da4ab/1565803155513-4AT64A6OL3AF7BJJGAQU/33864574122_32b2772fa3_o.jpg?format=1500w',
            'https://abcbirds.org/wp-content/uploads/2019/06/BOTW-Facebook_Belted-Kingfisher_Collins93_Shutterstock.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'KingBird for sale (3)',
        specieName: 'GRAY KINGBIRD',
        birdName: 'Kingbird',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/194035791/1800'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Rosella for sale (3)',
        specieName: 'EASTERN ROSELLA',
        birdName: 'Rosella',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/3/33/Platycercus_eximius_diemenensis_male.jpg',
            'https://cdn-fastly.petguide.com/media/2022/02/16/8237743/eastern-rosella.jpg?size=1200x628'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Great Potoo for sale (3)',
        specieName: 'GREAT POTOO',
        birdName: 'Potoo',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/245391811/1800',
            'https://www.animalspot.net/wp-content/uploads/2021/10/Great-Potoo-Picture.jpg'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Spoonbill for sale (3)',
        specieName: 'SPOONBILL',
        birdName: 'Spoonbill',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://www.allaboutbirds.org/guide/assets/photo/311367261-480px.jpg',
            'https://abcbirds.org/wp-content/uploads/2021/08/Photo-2_Roseate-Spoonbill-at-nest_Gareth-Rasberry-1024x663.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Hawk for sale (3)',
        specieName: 'RED TAILED HAWK',
        birdName: 'Hawk',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://www1.nyc.gov/assets/wildlifenyc/images/content/pages/Red_Tailed_Hawk_Perched_iStock-800px.jpg',
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/60384881/1800'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Wild Turkey for sale (3)',
        specieName: 'WILD TURKEY',
        birdName: 'Turkey',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://www.thespruce.com/thmb/Ynt9rZc4Ir_vtbHB4BUgeWgwkWk=/3600x2025/smart/filters:no_upscale()/wild-turkey-560606673-57d81e6e5f9b589b0a98254f.jpg',
            'https://nas-national-prod.s3.amazonaws.com/styles/api_hero_bird_with_crop_1920_1200/public/birds/hero_image/h_a1_4285_1_wild-turkey_october_greenfield_kk_adult-males.jpg?tok=1626941160'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Sand Martin for sale (3)',
        specieName: 'SAND MARTIN',
        birdName: 'Martin',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://www.birdspot.co.uk/wp-content/uploads/2017/09/sand-martin-2.jpg',
            'https://scottishwildlifetrust.org.uk/wp-content/uploads/blogs.dir/3/files/2016/05/Sand_martin_2_c_Margaret_Holland1.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Indian Bustard for sale (3)',
        specieName: 'INDIAN BUSTARD',
        birdName: 'Bustard',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201610/great-indian-bustard_147550635057_647x404_100316083045_0.jpg',
            'https://images.hindustantimes.com/img/2022/01/28/1600x900/0f3bd792-7f6a-11ec-86cd-1836b37e53ee_1643379605719.jpg'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'GoldFinch for sale (3)',
        specieName: 'EUROPEAN GOLDFINCH',
        birdName: 'Goldfinch',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/256706671/1800',
            'https://wpr-public.s3.amazonaws.com/wprorg/styles/resp_orig_custom_user_wide_1x/s3/51852766425_a6f4813c62_c.jpg?itok=ZZJbyt2f'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Turtle Dove for sale (3)',
        specieName: 'EUROPEAN TURTLE DOVE',
        birdName: 'Dove',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/242183711/1800',
            'https://cdn-acgla.nitrocdn.com/bvIhcJyiWKFqlMsfAAXRLitDZjWdRlLX/assets/static/optimized/rev-5131b73/wp-content/uploads/2020/08/european-turtle-dove-1.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // ------------------------------ 4rth 20
    // Five
    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Double Eyed Parrot for sale (4)',
        specieName: 'DOUBLE EYED FIG PARROT',
        birdName: 'Parrot',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/3/3f/Double-eyed_Fig_Parrot_0A2A9574.jpg',
            'https://www.australiangeographic.com.au/wp-content/uploads/2020/02/Australian-fig-parrot-2.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Love Birds for sale (4)',
        specieName: 'ROSY FACED LOVEBIRD',
        birdName: 'Lovebird',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/4/4f/Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29.jpg',
            'https://static.wikia.nocookie.net/animals/images/e/e0/800px-Agapornis_roseicollis_-Peach-faced_Lovebird_pet_on_perch.jpg/revision/latest?cb=20160924035717'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'AFRICAN CUCKOO for sale (4)',
        specieName: 'AFRICAN EMERALD CUCKOO',
        birdName: 'Cuckoo',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/d/da/Emerald_cuckoo_%28Chrysococcyx_cupreus_insularum%29_male_Sao_Tome.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk98o81mrHHEWWtZ10pvWiWHt3bVivaFq0NvCLAyxCJpoQp_sngZas_rsWeZGYkNYbaDo&usqp=CAU'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Beautiful Bird for sale (4)',
        specieName: 'ANDEAN GOOSE',
        birdName: 'Goose',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/115691761/1800',
            'https://upload.wikimedia.org/wikipedia/commons/6/6f/Chloephaga_melanoptera1.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Crowned Bird for sale (4)',
        specieName: 'AFRICAN CROWNED CRANE',
        birdName: 'Crane',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://www.honoluluzoo.org/wp-content/uploads/African-crowned-crane-feature-image-1276x718.jpg',
            'https://www.sfzoo.org/wp-content/uploads/2021/03/img_crowncrane_mh_large.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'ABBOTTS BOOBY for sale (4)',
        specieName: 'ABBOTTS BOOBY',
        birdName: 'Booby',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://www.edgeofexistence.org/wp-content/uploads/2017/06/Papasula_abbotti_xlarge3.jpg',
            'https://www.edgeofexistence.org/wp-content/uploads/2017/06/Papasula_abbotti_xlarge.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Hornbill for sale (4)',
        specieName: 'ABYSSINIAN GROUND HORNBILL',
        birdName: 'Hornbill',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/245260421/1800',
            'https://nationalzoo.si.edu/sites/default/files/animals/abyssiniangroundhornbill-005_0.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'F',
        favouriteFood: 'Test Food X',
        adTitle: 'Oyster Catcher for sale (4)',
        specieName: 'AFRICAN OYSTER CATCHER',
        birdName: 'Catcher',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/215836881/1800',
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/215836871/1800'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'ALBATROSS for sale (4)',
        specieName: 'ANDEAN GOOSE',
        birdName: 'Goose',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://static.dw.com/image/42582568_303.jpg',
            'https://i.natgeofe.com/n/630c7275-608b-461c-b82c-7737ba5622e1/6152449_4x3.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'KingFisher for sale (4)',
        specieName: 'BELTED KINGFISHER',
        birdName: 'Kingfisher',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://images.squarespace-cdn.com/content/v1/5a6390338a02c77bf05da4ab/1565803155513-4AT64A6OL3AF7BJJGAQU/33864574122_32b2772fa3_o.jpg?format=1500w',
            'https://abcbirds.org/wp-content/uploads/2019/06/BOTW-Facebook_Belted-Kingfisher_Collins93_Shutterstock.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'KingBird for sale (4)',
        specieName: 'GRAY KINGBIRD',
        birdName: 'Kingbird',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/194035791/1800'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Rosella for sale (4)',
        specieName: 'EASTERN ROSELLA',
        birdName: 'Rosella',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/3/33/Platycercus_eximius_diemenensis_male.jpg',
            'https://cdn-fastly.petguide.com/media/2022/02/16/8237743/eastern-rosella.jpg?size=1200x628'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Great Potoo for sale (4)',
        specieName: 'GREAT POTOO',
        birdName: 'Potoo',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/245391811/1800',
            'https://www.animalspot.net/wp-content/uploads/2021/10/Great-Potoo-Picture.jpg'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Spoonbill for sale (4)',
        specieName: 'SPOONBILL',
        birdName: 'Spoonbill',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://www.allaboutbirds.org/guide/assets/photo/311367261-480px.jpg',
            'https://abcbirds.org/wp-content/uploads/2021/08/Photo-2_Roseate-Spoonbill-at-nest_Gareth-Rasberry-1024x663.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Hawk for sale (4)',
        specieName: 'RED TAILED HAWK',
        birdName: 'Hawk',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://www1.nyc.gov/assets/wildlifenyc/images/content/pages/Red_Tailed_Hawk_Perched_iStock-800px.jpg',
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/60384881/1800'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Wild Turkey for sale (4)',
        specieName: 'WILD TURKEY',
        birdName: 'Turkey',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://www.thespruce.com/thmb/Ynt9rZc4Ir_vtbHB4BUgeWgwkWk=/3600x2025/smart/filters:no_upscale()/wild-turkey-560606673-57d81e6e5f9b589b0a98254f.jpg',
            'https://nas-national-prod.s3.amazonaws.com/styles/api_hero_bird_with_crop_1920_1200/public/birds/hero_image/h_a1_4285_1_wild-turkey_october_greenfield_kk_adult-males.jpg?tok=1626941160'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Sand Martin for sale (4)',
        specieName: 'SAND MARTIN',
        birdName: 'Martin',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://www.birdspot.co.uk/wp-content/uploads/2017/09/sand-martin-2.jpg',
            'https://scottishwildlifetrust.org.uk/wp-content/uploads/blogs.dir/3/files/2016/05/Sand_martin_2_c_Margaret_Holland1.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Indian Bustard for sale (4)',
        specieName: 'INDIAN BUSTARD',
        birdName: 'Bustard',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201610/great-indian-bustard_147550635057_647x404_100316083045_0.jpg',
            'https://images.hindustantimes.com/img/2022/01/28/1600x900/0f3bd792-7f6a-11ec-86cd-1836b37e53ee_1643379605719.jpg'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'GoldFinch for sale (4)',
        specieName: 'EUROPEAN GOLDFINCH',
        birdName: 'Goldfinch',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/256706671/1800',
            'https://wpr-public.s3.amazonaws.com/wprorg/styles/resp_orig_custom_user_wide_1x/s3/51852766425_a6f4813c62_c.jpg?itok=ZZJbyt2f'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Turtle Dove for sale (4)',
        specieName: 'EUROPEAN TURTLE DOVE',
        birdName: 'Dove',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/242183711/1800',
            'https://cdn-acgla.nitrocdn.com/bvIhcJyiWKFqlMsfAAXRLitDZjWdRlLX/assets/static/optimized/rev-5131b73/wp-content/uploads/2020/08/european-turtle-dove-1.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    //// ---------------------------------------5th 20
    // Five
    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Double Eyed Parrot for sale (5)',
        specieName: 'DOUBLE EYED FIG PARROT',
        birdName: 'Parrot',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/3/3f/Double-eyed_Fig_Parrot_0A2A9574.jpg',
            'https://www.australiangeographic.com.au/wp-content/uploads/2020/02/Australian-fig-parrot-2.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Love Birds for sale (5)',
        specieName: 'ROSY FACED LOVEBIRD',
        birdName: 'Lovebird',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/4/4f/Rosy-faced_lovebird_%28Agapornis_roseicollis_roseicollis%29.jpg',
            'https://static.wikia.nocookie.net/animals/images/e/e0/800px-Agapornis_roseicollis_-Peach-faced_Lovebird_pet_on_perch.jpg/revision/latest?cb=20160924035717'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'AFRICAN CUCKOO for sale (5)',
        specieName: 'AFRICAN EMERALD CUCKOO',
        birdName: 'Cuckoo',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/d/da/Emerald_cuckoo_%28Chrysococcyx_cupreus_insularum%29_male_Sao_Tome.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk98o81mrHHEWWtZ10pvWiWHt3bVivaFq0NvCLAyxCJpoQp_sngZas_rsWeZGYkNYbaDo&usqp=CAU'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Beautiful Bird for sale (5)',
        specieName: 'ANDEAN GOOSE',
        birdName: 'Goose',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/115691761/1800',
            'https://upload.wikimedia.org/wikipedia/commons/6/6f/Chloephaga_melanoptera1.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Crowned Bird for sale (5)',
        specieName: 'AFRICAN CROWNED CRANE',
        birdName: 'Crane',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://www.honoluluzoo.org/wp-content/uploads/African-crowned-crane-feature-image-1276x718.jpg',
            'https://www.sfzoo.org/wp-content/uploads/2021/03/img_crowncrane_mh_large.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'ABBOTTS BOOBY for sale (5)',
        specieName: 'ABBOTTS BOOBY',
        birdName: 'Booby',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://www.edgeofexistence.org/wp-content/uploads/2017/06/Papasula_abbotti_xlarge3.jpg',
            'https://www.edgeofexistence.org/wp-content/uploads/2017/06/Papasula_abbotti_xlarge.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Hornbill for sale (5)',
        specieName: 'ABYSSINIAN GROUND HORNBILL',
        birdName: 'Hornbill',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/245260421/1800',
            'https://nationalzoo.si.edu/sites/default/files/animals/abyssiniangroundhornbill-005_0.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Oyster Catcher for sale (5)',
        specieName: 'AFRICAN OYSTER CATCHER',
        birdName: 'Catcher',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/215836881/1800',
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/215836871/1800'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'ALBATROSS for sale (5)',
        specieName: 'ANDEAN GOOSE',
        birdName: 'Goose',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://static.dw.com/image/42582568_303.jpg',
            'https://i.natgeofe.com/n/630c7275-608b-461c-b82c-7737ba5622e1/6152449_4x3.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'KingFisher for sale (5)',
        specieName: 'BELTED KINGFISHER',
        birdName: 'Kingfisher',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://images.squarespace-cdn.com/content/v1/5a6390338a02c77bf05da4ab/1565803155513-4AT64A6OL3AF7BJJGAQU/33864574122_32b2772fa3_o.jpg?format=1500w',
            'https://abcbirds.org/wp-content/uploads/2019/06/BOTW-Facebook_Belted-Kingfisher_Collins93_Shutterstock.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'KingBird for sale (5)',
        specieName: 'GRAY KINGBIRD',
        birdName: 'Kingbird',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/194035791/1800'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Rosella for sale (5)',
        specieName: 'EASTERN ROSELLA',
        birdName: 'Rosella',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://upload.wikimedia.org/wikipedia/commons/3/33/Platycercus_eximius_diemenensis_male.jpg',
            'https://cdn-fastly.petguide.com/media/2022/02/16/8237743/eastern-rosella.jpg?size=1200x628'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Great Potoo for sale (5)',
        specieName: 'GREAT POTOO',
        birdName: 'Potoo',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/245391811/1800',
            'https://www.animalspot.net/wp-content/uploads/2021/10/Great-Potoo-Picture.jpg'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Spoonbill for sale (5)',
        specieName: 'SPOONBILL',
        birdName: 'Spoonbill',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://www.allaboutbirds.org/guide/assets/photo/311367261-480px.jpg',
            'https://abcbirds.org/wp-content/uploads/2021/08/Photo-2_Roseate-Spoonbill-at-nest_Gareth-Rasberry-1024x663.jpg'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Hawk for sale (5)',
        specieName: 'RED TAILED HAWK',
        birdName: 'Hawk',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://www1.nyc.gov/assets/wildlifenyc/images/content/pages/Red_Tailed_Hawk_Perched_iStock-800px.jpg',
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/60384881/1800'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    },

    // Five
    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Wild Turkey for sale (5)',
        specieName: 'WILD TURKEY',
        birdName: 'Turkey',
        adDescription:
            'DNA certified male female -- 6 months healthy active hand tamed full flying',
        adPrice: 100000,

        images: [
            'https://www.thespruce.com/thmb/Ynt9rZc4Ir_vtbHB4BUgeWgwkWk=/3600x2025/smart/filters:no_upscale()/wild-turkey-560606673-57d81e6e5f9b589b0a98254f.jpg',
            'https://nas-national-prod.s3.amazonaws.com/styles/api_hero_bird_with_crop_1920_1200/public/birds/hero_image/h_a1_4285_1_wild-turkey_october_greenfield_kk_adult-males.jpg?tok=1626941160'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '6',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Defense Phase II',
        itemImage: [
            'https://static-01.daraz.pk/p/740127b4e5c4030d62d57ba8df6b3b98.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Sand Martin for sale (5)',
        specieName: 'SAND MARTIN',
        birdName: 'Martin',
        adDescription:
            'DNA certified male female -- 15 months healthy active hand tamed full flying -- orignal breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://www.birdspot.co.uk/wp-content/uploads/2017/09/sand-martin-2.jpg',
            'https://scottishwildlifetrust.org.uk/wp-content/uploads/blogs.dir/3/files/2016/05/Sand_martin_2_c_Margaret_Holland1.jpg'
        ],
        contact: '03122345678',
        city: 'Lahore',
        age: '15',
        gender: 'female',
        birdAge: 'Adult',
        locationDetails: 'Bahria Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/81d9pdVBdES.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Indian Bustard for sale (5)',
        specieName: 'INDIAN BUSTARD',
        birdName: 'Bustard',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201610/great-indian-bustard_147550635057_647x404_100316083045_0.jpg',
            'https://images.hindustantimes.com/img/2022/01/28/1600x900/0f3bd792-7f6a-11ec-86cd-1836b37e53ee_1643379605719.jpg'
        ],
        contact: '03122345678',
        city: 'Karachi',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Model Town Lahore',
        itemImage: ['https://m.media-amazon.com/images/I/514AC4dMmfL.jpg']
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'GoldFinch for sale (5)',
        specieName: 'EUROPEAN GOLDFINCH',
        birdName: 'Goldfinch',
        adDescription:
            'DNA certified male female -- 10 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 10000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/256706671/1800',
            'https://wpr-public.s3.amazonaws.com/wprorg/styles/resp_orig_custom_user_wide_1x/s3/51852766425_a6f4813c62_c.jpg?itok=ZZJbyt2f'
        ],
        contact: '03122345678',
        city: 'Manchester',
        age: '10',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Times Square, London',
        itemImage: [
            'https://www.rolli-pet.com/upload/cms/user/Erbo_rolli-pet_IndoorvogelII_klein.jpg'
        ]
    },

    {
        type: 'A',
        favouriteFood: 'FOOD TEST',
        adTitle: 'Turtle Dove for sale (5)',
        specieName: 'EUROPEAN TURTLE DOVE',
        birdName: 'Dove',
        adDescription:
            'DNA certified male female -- 20 months healthy active hand tamed full flying -- original breeder pics are attached -- more info plz call.',
        adPrice: 500000,

        images: [
            'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/242183711/1800',
            'https://cdn-acgla.nitrocdn.com/bvIhcJyiWKFqlMsfAAXRLitDZjWdRlLX/assets/static/optimized/rev-5131b73/wp-content/uploads/2020/08/european-turtle-dove-1.jpg'
        ],
        contact: '03122345678',
        city: 'Islamabad',
        age: '20',
        gender: 'male',
        birdAge: 'Baby',
        locationDetails: 'Defense Phase I',
        itemImage: [
            'https://www.thespruce.com/thmb/1O8ArMnHmRRTrn4wQVaS-dr-Pe8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-birdseed-4122052-hero-bf6892140cef442492e93a2a391582df.jpg'
        ]
    }
];
