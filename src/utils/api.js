import axios from 'axios';

export const data = async()=>{
    try {
        const response = await axios.get('https://data.sec.gov/api/xbrl/companyfacts/CIK{number}.json')
        return console.log(response.data);
    }
    catch(error) {
        throw new Error(error);
    };
}

data();