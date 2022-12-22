import axios from "../axios";
import React from "react";
import { useParams } from 'react-router-dom';

import { Post } from "../components/Post";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const { id } = useParams();
  

  React.useEffect(() => { 
    axios.get(`/posts/${id}`).then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(err => {
      console.warn(err);
      alert('Помилка при отримані публікації');
    });
  }, []);
  

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost/>;
  }


  return (
    <>
      <Post
        id={data._id}
        fullName={data.fullName}
        birthDate={data.birthDate}
        cities={data.cities}
        appearanceDescription={data.appearanceDescription}
        phoneNumber={data.phoneNumber}
        photoUrl={data.photoUrl ? `${process.env.REACT_APP_API_URL}${data.photoUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        isFullPost
      >
        <p>
          <b> Дата народження:</b> {data.birthDate}
        </p>
        <p>
          <b> Загальні відомості:</b> {data.appearanceDescription}
        </p>
        <p>
          <b> Номер телефону для інформації: </b>{data.phoneNumber}
        </p>
      </Post>
    </>
  );
};
