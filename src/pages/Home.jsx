import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { fetchPosts, fetchCities } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts, cities } = useSelector(state => state.posts);
  
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = cities.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchCities());
  }, [])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Всі" />
      </Tabs>
      <Grid container direction="row" xs={12} spacing={8}>
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
        <Grid xs={4} item>
          <TagsBlock items={cities.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  );
};
