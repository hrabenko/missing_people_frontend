import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import { selectIsAuth } from '../../redux/slices/auth';
import axios from '../../axios.js';
import styles from './AddPost.module.scss';



export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [fullName, setFullName] = React.useState('');
  const [cities, setCities] = React.useState('');
  const [birthDate, setBirthDate] = React.useState('');
  const [appearanceDescription, setAppearanceDescription] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [photoUrl, setPhotoUrl] = React.useState('');
  
  const inputFileRef = React.useRef(null);

  const isEditing = Boolean(id);

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setPhotoUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Помилка при завантажені файлу');
    }
  };

  const onClickRemoveImage = () => {
    setPhotoUrl('');
  };

  


  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        fullName,
        cities,
        birthDate,
        appearanceDescription,
        phoneNumber,
        photoUrl,
      }

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);

      const _id = isEditing ? id : data._id;

      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Помилка при створенні');
    }
  }



  React.useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then(({ data }) => {
        setFullName(data.fullName);
        setCities(data.cities.join(", "));
        setBirthDate(data.birthDate);
        setAppearanceDescription(data.appearanceDescription);
        setPhoneNumber(data.phoneNumber);
        setPhotoUrl(data.photoUrl);
        }).catch(err => {
          console.warn(err);
          alert("Помилка при отриманні публікації");
      })
    }
  })


  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />;
  }



  return (
    <Paper style={{ padding: 30 }}>
      <div className={styles.photoBlock}>
        <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
          Завантажити фото
        </Button>
        <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
        {photoUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Видалити
            </Button>
            <img className={styles.image} src={`http://localhost:4444${photoUrl}`} alt="Uploaded" />
          </>
      )}
      </div>
      <br />
      <div>
        <TextField
          classes={{ root: styles.fields }}
          variant="outlined"
          placeholder="ПІБ"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          fullWidth
        />
        <TextField
          classes={{ root: styles.fields }}
          variant="outlined"
          placeholder="Місто"
          value={cities}
          onChange={(e) => setCities(e.target.value)}
          fullWidth
        />
        <TextField
          classes={{ root: styles.fields }}
          variant="outlined"
          placeholder="Дата народження(YYYY-MM-DD)"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          fullWidth
        />
        <TextField
          classes={{ root: styles.fields }}
          variant="outlined"
          placeholder="Загальні відомості"
          value={appearanceDescription}
          onChange={(e) => setAppearanceDescription(e.target.value)}
          fullWidth
        />
        <TextField
          classes={{ root: styles.fields }}
          variant="outlined"
          placeholder="Номер телефону для інформації"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          fullWidth
        />
      </div>
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Зберегти' : 'Опублікувати'}
        </Button>
        <a href="/">
          <Button size="large">Скасувати</Button>
        </a>
      </div>
    </Paper>
  );
};
