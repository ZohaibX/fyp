import * as React from 'react';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import { keys } from '../../../config/keys';
import FoodsLayout from '../../components/home/foods-layout';

const ViewItems = (props) => {
    const bird = props.match.params.bird;
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        const getItems = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/ads/display-specific-ads/${bird}`
            );

            setItems(data);
        };
        getItems();
    }, []);

    //! This function is for SEO
    const head = () => (
        // Replace --- title must be user's title
        <Helmet>
            <title>{`${bird}s`}</title>
        </Helmet>
    );

    return (
        <div className="container" style={{ minHeight: '75vh' }}>
            {head()}
            <h1 className="text-center my-5 font-weight-bolder">
                Searched Results For "{bird}s"
            </h1>

            <div className="dividex">
                {items.map((item) => (
                    <div className="dividex-1">
                        <FoodsLayout
                            items={items}
                            item={item}
                            itemId={item && item.id}
                            currentUser={props.currentUser}
                            page="searched"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default {
    component: ViewItems
};

const classifiedSpecies = [
    { Babbler: ['ABBOTTS BABBLER'] },
    { Booby: ['MASKED BOOBY', 'ABBOTTS BOOBY'] },
    {
        Hornbill: ['HORNBILL', 'MALABAR HORNBILL', 'ABYSSINIAN GROUND HORNBILL']
    },
    { Crane: ['AFRICAN CROWNED CRANE', 'DEMOISELLE CRANE', 'SANDHILL CRANE'] },
    { Martin: ['COMMON HOUSE MARTIN', 'PURPLE MARTIN', 'SAND MARTIN'] },
    { Tragopan: ['SATYR TRAGOPAN'] },
    {
        Thrush: [
            'SAMATRAN THRUSH',
            'VARIED THRUSH',
            'ASHY THRUSHBIRD',
            'CAPE ROCK THRUSH',
            'RED TAILED THRUSH'
        ]
    },
    { Hawk: ['CRANE HAWK', 'RED TAILED HAWK', 'NORTHERN GOSHAWK'] },
    { Jacana: ['NORTHERN JACANA'] },
    { Gannet: ['NORTHERN GANNET'] },
    { Fulmar: ['NORTHERN FULMAR'] },
    { Flicker: ['NORTHERN FLICKER', 'GILDED FLICKER'] },
    {
        Woodpecker: [
            'GILA WOODPECKER',
            'RED HEADED WOODPECKER',
            'BLONDE CRESTED WOODPECKER',
            'CREAM COLORED WOODPECKER',
            'DOWNY WOODPECKER'
        ]
    },
    { Junco: ['DARK EYED JUNCO'] },
    {
        Finch: [
            'DOUBLE BARRED FINCH',
            'EUROPEAN GOLDFINCH',
            'GOULDIAN FINCH',
            'HAWFINCH',
            'HOUSE FINCH',
            'PATAGONIAN SIERRA FINCH',
            'PURPLE FINCH',
            'RED BROWED FINCH',
            'STRAWBERRY FINCH',
            'AFRICAN FIREFINCH',
            'AMERICAN GOLDFINCH'
        ]
    },
    { Catcher: ['OYSTER CATCHER', 'AFRICAN OYSTER CATCHER'] },
    {
        Flycatcher: [
            'VERMILION FLYCATCHER',
            'ROYAL FLYCATCHER',
            'CINNAMON FLYCATCHER'
        ]
    },
    { Albatross: ['ALBATROSS'] },
    { Towhee: ['ALBERTS TOWHEE'] },
    { Parakeet: ['JANDAYA PARAKEET', 'ALEXANDRINE PARAKEET'] },
    { Chough: ['ALPINE CHOUGH'] },
    { Yellowthroat: ['ALTAMIRA YELLOWTHROAT'] },
    { Avocet: ['AMERICAN AVOCET'] },
    { Cuckoo: ['MANGROVE CUCKOO', 'AFRICAN EMERALD CUCKOO'] },
    { Bittern: ['AMERICAN BITTERN'] },
    { Coot: ['AMERICAN COOT'] },
    { Kestrel: ['AMERICAN KESTREL'] },
    { Pipit: ['GOLDEN PIPIT', 'AMERICAN PIPIT'] },
    { Redstart: ['AMERICAN REDSTART'] },
    { Woodstart: ['AMETHYST WOODSTAR'] },
    { Goose: ['HAWAIIAN GOOSE', 'MAGPIE GOOSE', 'ANDEAN GOOSE'] },
    { Lapwing: ['MASKED LAPWING', 'WATTLED LAPWING', 'ANDEAN LAPWING'] },
    { Siskin: ['ANDEAN SISKIN'] },
    { Anhinga: ['ANHINGA'] },
    { Anianiau: ['ANIANIAU'] },
    { Hummingbird: ['RUBY THROATED HUMMINGBIRD', 'ANNAS HUMMINGBIRD'] },
    { Antbird: ['ANTBIRD'] },
    { Euphonia: ['CHESTNET BELLIED EUPHONIA', 'ANTILLEAN EUPHONIA'] },
    { Apapane: ['APAPANE'] },
    { Apostlebird: ['APOSTLEBIRD'] },
    { Manakin: ['STRIPPED MANAKIN', 'ARARIPE MANAKIN'] },
    {
        Ibis: ['ASIAN CRESTED IBIS', 'BALD IBIS', 'GLOSSY IBIS', 'SCARLET IBIS']
    },
    {
        Sparrow: [
            'HOUSE SPARROW',
            'JAVA SPARROW',
            'BLACK-THROATED SPARROW',
            'CHIPPING SPARROW'
        ]
    },
    { Attila: ['CINNAMON ATTILA'] },
    {
        Patridge: [
            'GRAY PARTRIDGE',
            'CHINESE BAMBOO PARTRIDGE',
            'CHUKAR PARTRIDGE'
        ]
    },
    { Tapaculo: ['CHUCAO TAPACULO'] },
    { Heron: ['BLUE HERON', 'CAPPED HERON', 'CHINESE POND HERON'] },
    { Avadat: ['AVADAVAT'] },
    { Jay: ['AZURE JAY', 'GREEN JAY'] },
    { Catbird: ['GRAY CATBIRD', 'SPOTTED CATBIRD'] },
    {
        Magpie: [
            'SRI LANKA BLUE MAGPIE',
            'TAIWAN MAGPIE',
            'EURASIAN MAGPIE',
            'GREEN MAGPIE',
            'IBERIAN MAGPIE'
        ]
    },
    {
        Duck: [
            'MALLARD DUCK',
            'MANDRIN DUCK',
            'RED HEADED DUCK',
            'STEAMER DUCK',
            'TEAL DUCK',
            'WOOD DUCK',
            'HARLEQUIN DUCK'
        ]
    },
    {
        Kingfisher: [
            'MALACHITE KINGFISHER',
            'PYGMY KINGFISHER',
            'RUDY KINGFISHER',
            'RUFOUS KINGFISHER',
            'STORK BILLED KINGFISHER',
            'BELTED KINGFISHER',
            'CRESTED KINGFISHER'
        ]
    },
    {
        Owl: [
            'GREAT GRAY OWL',
            'LONG-EARED OWL',
            'ORIENTAL BAY OWL',
            'SNOWY OWL',
            'STRIPED OWL',
            'BARN OWL'
        ]
    },
    {
        Swallow: [
            'BARN SWALLOW',
            'STRIPPED SWALLOW',
            'TREE SWALLOW',
            'VIOLET GREEN SWALLOW'
        ]
    },
    { Crake: ['BLACK TAIL CRAKE', 'WHITE BROWED CRAKE'] },
    { Troupial: ['VENEZUELIAN TROUPIAL'] },
    { Pigeon: ['VICTORIA CROWNED PIGEON', 'CROWNED PIGEON', 'NICOBAR PIGEON'] },
    { GuineaFowl: ['VULTURINE GUINEAFOWL', 'GUINEAFOWL'] },
    { Creeper: ['RED HONEY CREEPER', 'WALL CREEPER', 'BROWN CREEPER'] },
    { Curassow: ['WATTLED CURASSOW'] },
    { Turaco: ['WHITE CHEEKED TURACO', 'GUINEA TURACO', 'VIOLET TURACO'] },
    { Raven: ['WHITE NECKED RAVEN'] },
    { Tropic: ['WHITE TAILED TROPIC'] },
    { Turkey: ['BUSH TURKEY', 'OCELLATED TURKEY', 'WILD TURKEY'] },
    { FlowerPecker: ['YELLOW BELLIED FLOWERPECKER'] },
    { Cacique: ['YELLOW CACIQUE'] },
    { Backbird: ['YELLOW HEADED BLACKBIRD', 'RED WINGED BLACKBIRD'] },
    { Motmot: ['TURQUOISE MOTMOT', 'RUFUOS MOTMOT'] },
    { Vulture: ['TURKEY VULTURE', 'BLACK VULTURE', 'KING VULTURE'] },
    { Swan: ['TRUMPTER SWAN', 'BLACK SWAN'] },
    { Kingbird: ['TROPICAL KINGBIRD', 'GRAY KINGBIRD'] },
    { Hen: ['TASMANIAN HEN'] },
    {
        Starling: [
            'SUPERB STARLING',
            'BALI STARLING',
            'CAPE GLOSSY STARLING',
            'COMMON STARLING'
        ]
    },
    {
        Tanager: [
            'EMERALD TANAGER',
            'FLAME TANAGER',
            'HEPATIC TANAGER',
            'PARADISE TANAGER',
            'SCARLET TANAGER',
            'AZURE TANAGER'
        ]
    },
    { Tit: ['AZURE TIT', 'BLACK THROATED BUSHTIT', 'CRESTED SHRIKETIT'] },
    { Teal: ['BAIKAL TEAL', 'CINNAMON TEAL'] },
    {
        Eagle: ['GOLDEN EAGLE', 'HARPY EAGLE', 'PHILIPPINE EAGLE', 'BALD EAGLE']
    },
    { Oriole: ['BALTIMORE ORIOLE', 'EURASIAN GOLDEN ORIOLE'] },
    { Guan: ['HORNED GUAN', 'BAND TAILED GUAN'] },
    {
        Broadbill: [
            'BANDED BROADBILL',
            'BLACK & YELLOW BROADBILL',
            'GREEN BROADBILL'
        ]
    },
    { Pita: ['BANDED PITA', 'EARED PITA'] },
    { Stilt: ['BANDED STILT'] },
    { Godwit: ['BAR-TAILED GODWIT'] },
    { Puffbird: ['BARRED PUFFBIRD'] },
    { Goldeneye: ['BARROWS GOLDENEYE'] },
    {
        Warbler: [
            'BAY-BREASTED WARBLER',
            'BLACK THROATED WARBLER',
            'BLACKBURNIAM WARBLER',
            'CAPE MAY WARBLER',
            'CERULEAN WARBLER',
            'GOLD WING WARBLER',
            'GOLDEN CHEEKED WARBLER',
            'RED FACED WARBLER',
            'TOWNSENDS WARBLER'
        ]
    },
    { Barbet: ['BEARDED BARBET', 'D-ARNAUDS BARBET'] },
    { Bellbird: ['BEARDED BELLBIRD'] },
    { Reedling: ['BEARDED REEDLING'] },
    { Baza: ['BLACK BAZA'] },
    { Cockatoo: ['BLACK COCKATOO', 'COCKATOO', 'GANG GANG COCKATOO'] },
    { Francolin: ['BLACK FRANCOLIN'] },
    { Skimmer: ['BLACK SKIMMER'] },
    { Chickadee: ['BLACK-CAPPED CHICKADEE', 'CAPUCHINBIRD'] },
    { Grebe: ['BLACK-NECKED GREBE'] },
    { Coau: ['BLUE COAU'] },
    { Grouse: ['BLUE GROUSE', 'GREATOR SAGE GROUSE'] },
    { Toucanet: ['BLUE THROATED TOUCANET'] },
    { Leafbird: ['BORNEAN LEAFBIRD'] },
    {
        Pheasant: [
            'ELLIOTS  PHEASANT',
            'MIKADO  PHEASANT',
            'RING-NECKED PHEASANT',
            'SWINHOES PHEASANT',
            'BORNEAN PHEASANT',
            'BULWERS PHEASANT',
            'GOLDEN PHEASANT'
        ]
    },
    { Cormarant: ['BRANDT CORMARANT', 'DOUBLE BRESTED CORMARANT'] },
    { Noddy: ['BROWN NODDY'] },
    { Bristlehead: ['BORNEAN BRISTLEHEAD'] },
    { Thrasher: ['BROWN THRASHER'] },
    { Wren: ['CACTUS WREN', 'SPLENDID WREN'] },
    { Condor: ['CALIFORNIA CONDOR'] },
    { Gull: ['CALIFORNIA GULL', 'IVORY GULL'] },
    { Quail: ['CALIFORNIA QUAIL', 'GAMBELS QUAIL', 'HARLEQUIN QUAIL'] },
    {
        BeeEater: [
            'RED BEARDED BEE EATER',
            'WHITE THROATED BEE EATER',
            'CARMINE BEE-EATER'
        ]
    },
    { Tern: ['CASPIAN TERN', 'FAIRY TERN', 'INCA TERN'] },
    { Waxwing: ['CEDAR WAXWING'] },
    { Lory: ['DUSKY LORY', 'CHATTERING LORY'] },
    { Nutcracker: ['CLARKS NUTCRACKER'] },
    { Aracari: ['COLLARED ARACARI', 'CURL CRESTED ARACARI'] },
    { Firecrest: ['COMMON FIRECREST'] },
    { Grackle: ['COMMON GRACKLE'] },
    { Iora: ['COMMON IORA'] },
    { Loon: ['COMMON LOON'] },
    { Poorwill: ['COMMON POORWILL'] },
    { Coucal: ['COPPERY TAILED COUCAL'] },
    { Plover: ['CRAB PLOVER', 'GREY PLOVER'] },
    { Caracara: ['CRESTED CARACARA'] },
    { Nuthatch: ['CRESTED NUTHATCH'] },
    { Oropendola: ['CRESTED OROPENDOLA'] },
    { Sunbird: ['CRIMSON SUNBIRD'] },
    { Tody: ['CUBAN TODY'] },
    { Cock: ['COCK OF THE  ROCK'] },
    { Auklet: ['CRESTED AUKLET', 'PARAKETT AUKLET'] },
    { Longclaw: ['CAPE LONGCLAW'] },
    { Coua: ['CRESTED COUA'] },
    { Fireback: ['CRESTED FIREBACK'] },
    { Chat: ['CRIMSON CHAT'] },
    { Crow: ['CROW'] },
    { Trogon: ['CUBAN TROGON', 'ELEGANT TROGON', 'RED NAPED TROGON'] },
    { Parrot: ['DOUBLE EYED FIG PARROT'] },
    { Bluebird: ['EASTERN BLUEBIRD', 'FAIRY BLUEBIRD'] },
    { Weaver: ['EASTERN GOLDEN WEAVER'] },
    { Rosella: ['EASTERN ROSELLA'] },
    { Towee: ['EASTERN TOWEE'] },
    { Penguin: ['EMPEROR PENGUIN', 'FIORDLAND PENGUIN'] },
    { Myna: ['MYNA', 'ENGGANO MYNA'] },
    {
        Dove: [
            'EUROPEAN TURTLE DOVE',
            'MOURNING DOVE',
            'ROCK DOVE',
            'SCARLET CROWNED FRUIT DOVE'
        ]
    },
    { Grosbeak: ['EVENING GROSBEAK'] },
    { Myzornis: ['FIRE TAILLED MYZORNIS'] },
    { Bowerbird: ['FLAME BOWERBIRD', 'REGENT BOWERBIRD'] },
    { Chlorophonia: ['GOLDEN CHLOROPHONIA'] },
    { Ani: ['GROVED BILLED ANI'] },
    { Pitta: ['GURNEYS PITTA', 'INDIAN PITTA', 'RED BELLIED PITTA'] },
    { Bluetail: ['HIMALAYAN BLUETAIL'] },
    { Monal: ['HIMALAYAN MONAL'] },
    { Lark: ['HORNED LARK'] },
    { Macaw: ['HYACINTH MACAW', 'SCARLET MACAW'] },
    { Shaq: ['IMPERIAL SHAQ'] },
    { Canary: ['CANARY'] },
    { Casswary: ['CASSOWARY'] },
    { Emu: ['EMU'] },
    { Flamingo: ['FLAMINGO'] },
    { Frigate: ['FRIGATE'] },
    { GoAwayBird: ['GO AWAY BIRD'] },
    { Falcon: ['GYRFALCON', 'PEREGRINE FALCON'] },
    { Hammerkop: ['HAMMERKOP'] },
    { Vanga: ['HELMET VANGA'] },
    { Merganser: ['HOODED MERGANSER'] },
    { Sungem: ['HORNED SUNGEM'] },
    { Bustard: ['INDIAN BUSTARD'] },
    { Roller: ['INDIAN ROLLER', 'LILAC ROLLER'] },
    {
        Bunting: [
            'LAZULI BUNTING',
            'LARK BUNTING',
            'ORANGE BRESTED BUNTING',
            'PAINTED BUNTING',
            'INDIGO BUNTING'
        ]
    },
    { Dotterel: ['INLAND DOTTEREL'] },
    { Snipe: ['JACK SNIPE'] },
    { Robin: ['JAPANESE ROBIN', 'PINK ROBIN', 'ROBIN'] },
    { Auk: ['LITTLE AUK'] },
    { Stork: ['MARABOU STORK'] },
    { Friarbird: ['NOISY FRIARBIRD'] },
    { Cardinal: ['NORTHERN CARDINAL'] },
    { Mockingbird: ['NORTHERN MOCKINGBIRD'] },
    { Parula: ['NORTHERN PARULA'] },
    { Bishop: ['NORTHERN RED BISHOP'] },
    { Shoveler: ['NORTHERN SHOVELER'] },
    { Rail: ['OKINAWA RAIL'] },
    { TitMouse: ['TIT MOUSE'] },
    { Sandpiper: ['SPOON BILED SANDPIPER'] },
    { Cotinga: ['SPANGLED COTINGA'] },
    { Egret: ['SNOWY EGRET'] },
    { Longspur: ['SMITHS LONGSPUR'] },
    { Dowitcher: ['SHORT BILLED DOWITCHER'] },
    { Buzzard: ['ROUGH LEG BUZZARD'] },
    { Lovebird: ['ROSY FACED LOVEBIRD'] },
    { Bulbul: ['RED WISKERED BULBUL'] },
    { Cormorant: ['RED FACED CORMORANT'] },
    { Lorikeet: ['RAINBOW LORIKEET'] },
    { Swamphen: ['PURPLE SWAMPHEN'] },
    { Gallinule: ['PURPLE GALLINULE'] },
    { Jaeger: ['POMARINE JAEGER'] },
    { Adjutant: ['LESSER ADJUTANT'] },
    { Potoo: ['GREAT POTOO'] },
    { Kiskadee: ['GREAT KISKADEE'] },
    { Jacamar: ['GREAT JACAMAR'] },
    { Bananaquit: ['BANANAQUIT'] },
    { BirdOfParadise: ['BIRD OF PARADISE'] },
    { Bobolink: ['BOBOLINK'] },
    { CharaDeCollar: ['CHARA DE COLLAR'] },
    { Meadowlark: ['EASTERN MEADOWLARK'] },
    { Hoatzin: ['HOATZIN'] },
    { Hoopoes: ['HOOPOES'] },
    { Ibisbill: ['IBISBILL'] },
    { Iwi: ['IWI'] },
    { Jabiru: ['JABIRU'] },
    { Kagu: ['KAGU'] },
    { Kakapo: ['KAKAPO'] },
    { Killdear: ['KILLDEAR'] },
    { Kiwi: ['KIWI'] },
    { Kookaburra: ['KOOKABURRA'] },
    { Malagasy: ['MALAGASY WHITE EYE'] },
    { Maleo: ['MALEO'] },
    { Osprey: ['OSPREY'] },
    { Ostritch: ['OSTRICH'] },
    { Ovenbird: ['OVENBIRD'] },
    { Palila: ['PALILA'] },
    { Peacock: ['PEACOCK'] },
    { Pelican: ['PELICAN'] },
    { Puffin: ['PUFFIN'] },
    { Quetzal: ['QUETZAL'] },
    { Razorbill: ['RAZORBILL'] },
    { Parus: ['PARUS MAJOR'] },
    { Fody: ['RED FODY'] },
    { RoadRunner: ['ROADRUNNER'] },
    { ShoeBill: ['SHOEBILL'] },
    { Sora: ['SORA'] },
    { Spoonbill: ['SPOONBILL'] },
    { Tailorbird: ['TAILORBIRD'] },
    { Takahe: ['TAKAHE'] },
    { Umbrellabird: ['UMBRELLA BIRD'] },
    { Whimbrel: ['WHIMBREL'] },
    { Wilsons: ['WILSONS BIRD OF PARADISE'] },
    { Touchan: ['TOUCHAN'] }
];
