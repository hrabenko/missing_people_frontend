import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { fetchPostsByTag } from '../redux/slices/posts';

export const PostsByTag  = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts } = useSelector(state => state.posts);
  const { id } = useParams();
  
  const isPostsLoading = posts.status === 'loading';

  React.useEffect(() => { 
    dispatch(fetchPostsByTag(id));
  }, []);


  return (
    <>
      <Grid container direction="row"  justifyContent="center">
        <Grid xs={8} item >
          {(isPostsLoading ? [...Array(2)] : posts.items).map((obj, index) => 
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                id={obj._id}
                fullName={obj.fullName}
                photoUrl={obj.photoUrl ? `http://localhost:4444${obj.photoUrl}` : ''}
                user={obj.user}
                createdAt={obj.createdAt}
                cities={obj.cities}
                isEditable={userData?._id===obj.user._id}
              />
            ),
          )}
        </Grid>
      </Grid>
    </>
  );
};
