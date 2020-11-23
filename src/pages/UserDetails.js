import React, { useCallback, useEffect, useState } from 'react';
import Badge from '../components/Badge';
import PageLoading from '../components/PageLoading';
import api from '../utils/api';

function UserDetails(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(undefined);
  
  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const response = await api.users.findById(props.match.params.userId);
      console.log(response);
      setData(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  if (loading) {
    return <PageLoading />;
  } else
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            {/* <Badge
            firstName={data.firstName || ''}
            lastName={data.lastName || ''}
            email={data.email || ''}
            twitter={data.twitter || ''}
            jobTitle={data.jobTitle || ''}
          /> */}
          </div>
          <div className='col d-flex flex-column align-items-center justify-content-center'>
            <h2 className='mb-4'>Acciones:</h2>
            <div>
              {/* <div
              className='btn btn-primary mb-4'
              to={`/badges/${data.id}/edit`}
            >
              Edit
            </div> */}
            </div>
            <div>
              <button
                /* onClick={props.onOpenModal} */ className='btn btn-danger'
              >
                Delete
              </button>
              {/* <DeleteBadgeModal
                isOpen={props.modalIsOpen}
                onClose={props.onCloseModal}
                onDeleteBadge={props.onDeleteBadge}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
}

export default UserDetails;
