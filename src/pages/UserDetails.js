import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../components/Badge';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageUpload';
import api from '../utils/api';

function Actions({ userId }) {
  return (
    <div className='col d-flex flex-column align-items-center justify-content-center'>
      <h2 className='mb-4'>Acciones:</h2>
      <div>
        <Link className='btn btn-primary mb-4' to={`/users/${userId}/edit`}>
          Editar
        </Link>
      </div>
      <div>
        <button /* onClick={props.onOpenModal} */ className='btn btn-danger'>
          Eliminar
        </button>
        {/* <DeleteBadgeModal
      isOpen={props.modalIsOpen}
      onClose={props.onCloseModal}
      onDeleteBadge={props.onDeleteBadge}
    /> */}
      </div>
    </div>
  );
}

function UserDetails(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(undefined);
  const [profile, setProfile] = useState(false);

  const userId = props.match.params.userId;
  const isMounted = useRef(true);

  const fetchData = useCallback(async () => {
    isMounted.current && setLoading(true);
    isMounted.current && setError(null);
    try {
      const response = await api.users.findById(userId);
      const data = await response.json();
      isMounted.current && setData(data);
    } catch (error) {
      isMounted.current && setError(error);
    } finally {
      isMounted.current && setLoading(false);
    }
  }, [userId]);

  const isMyProfile = useCallback(async () => {
    isMounted.current && setError(null);
    try {
      const response = await api.users.myProfile(userId);
      const data = await response.json();
      isMounted.current && setProfile(data.myProfile);
    } catch (error) {
      isMounted.current && setError(null);
    }
  }, [userId]);

  useEffect(() => {
    isMyProfile();
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, [fetchData, isMyProfile]);

  if (loading) {
    return <PageLoading />;
  } else if (error) {
    return <PageError />;
  } else
    return (
      <div className='container'>
        <div className='row'>
          <div className='col mt-4 ml-2 mr-2 row justify-content-center'>
            <Badge
              firstname={data.firstname}
              lastname={data.lastname}
              email={data.email}
              instagram={data.instagram}
              birthdate={data.birthdate}
              jobtitle={data.jobtitle}
            />
          </div>
          {profile && <Actions userId={userId} />}
        </div>
      </div>
    );
}

export default UserDetails;
