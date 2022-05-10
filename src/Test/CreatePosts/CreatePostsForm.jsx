import React, {useState}from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import FormRange from 'react-bootstrap/esm/FormRange'
import { useAuth } from '../../hooks/useAuth';
import postApi from '../api/postApi';

export default function CreatePostsForm({category}) {

    // const {user} = useAuth();

    const [contentPost, setContentPost] = useState();

    const [categoryId, setCategoryId] = useState();

    const [titlePost, setTitlePost] = useState();

    async function createPost(post){
        const responce = await postApi.createPost(post);
    }

    const handlePost = async (e) => {
        e.preventDefault();
        
        await createPost({title: titlePost, categoryId: categoryId, content: contentPost, applicationUserId: null, description: contentPost});
    }

  return (
    <Container className='App'>
        <Form>
            <Form.Control 
               placeholder='Введите название'
               onChange={e => setTitlePost(e.target.value)}/>
        </Form>
        <Form>
            <Form.Select onChange={e => setCategoryId(e.target.value)}>{
                category.map((e) =>
                    <option key={e.id} value={e.id}>{e.name}</option>
                )
                }</Form.Select>
        </Form>
        <Form>
            <Form.Control 
               placeholder = 'Введите описание'
               onChange = {e => setContentPost(e.target.value)} />
        </Form>
        <Button onClick={handlePost}>Создать</Button>
    </Container>
  )
}
