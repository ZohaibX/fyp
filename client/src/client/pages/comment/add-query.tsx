import * as React from 'react';
import Text from '../../components/form/text-field';
import Select from '../../components/form/Auto-Complete';
import NormalSelect from '../../components/form/Auto-Complete-Normal';
import BirdNameSelect from '../../components/form/bird-name-autocomplete';
import { Helmet } from 'react-helmet';
import Axios from 'axios';
import requireAuth from '../../components/hocs/require-auth';
import SearchSpecies from '../../components/home/search-species';

const AddQuery = (props) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [specie, setSpecie] = React.useState('');

  //? This function is for SEO
  const head = () => (
    <Helmet>
      <title>{`Submit Your Query`}</title>
    </Helmet>
  );

  const submit = async (e) => {
    e.preventDefault();

    if (!title || !specie || !description)
      return alert('Please Fill All The Fields');

    if (description.length < 200)
      return alert(
        'Please Enter brief details -- containing at least 200 characters'
      );

    if (!description.includes(' ')) {
      return alert('Please Give Spacing in the description');
    }

    try {
      await Axios.post('/api/comments/create-comment', {
        title,
        specie,
        description,
      });
      window.location = '/query-hub';
    } catch (error) {
      alert('Something Went Wrong');
    }
  };
  return (
    <div className="container">
      {head()}
      <h1 className="text-center my-5" style={{ fontFamily: 'Alfa Slab One' }}>
        Add Query
      </h1>

      <form action="" onSubmit={submit}>
        <div className="mb-2" style={{ width: '60%', margin: '0 auto' }}>
          <Text label="Query Title ... " value={title} setValue={setTitle} />
        </div>

        <div
          className=""
          id="search-box-post species-select"
          style={{ width: '50%', margin: '0 auto' }}
        >
          <SearchSpecies value={specie} setValue={setSpecie} />
        </div>

        {/* must be 250 characters long */}
        <div
          className="mb-2 text-center"
          style={{ width: '60%', margin: '0 auto' }}
        >
          <Text
            label="Details ... "
            value={description}
            setValue={setDescription}
          />
        </div>

        <div
          className="button"
          style={{ margin: '0 auto', width: '100%', textAlign: 'center' }}
        >
          <button
            className="my-5 "
            style={{
              fontFamily: 'Alfa Slab One',
              color: '#1e90ff',
              border: 'none',
              fontSize: '20px',
              borderBottom: '1px solid black',
              paddingBottom: '2px',
              backgroundColor: 'transparent',
            }}
            type="submit"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default {
  // component: AddQuery,
  component: requireAuth(AddQuery),
};
