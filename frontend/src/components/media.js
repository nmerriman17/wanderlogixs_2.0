import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { FacebookShareButton, TwitterShareButton, FacebookIcon, TwitterIcon } from 'react-share';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import './media.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHeader from '../components/header.js'; 

const apiUrl = process.env.REACT_APP_API_URL || '/api';

const schema = yup.object().shape({
    tripName: yup.string().required('Trip name is required'),
    tags: yup.string(),
    notes: yup.string(),
    media: yup.mixed(), // This can be refined based on your requirements
});

const MediaCard = ({ media, index }) => {
    const shareUrl = window.location.origin + '/media/' + index;

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{media.tripName}</Card.Title>
                <p>Tags: {media.tags}</p>
                <p>Notes: {media.notes}</p>
                <div>
                    <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TwitterShareButton url={shareUrl}>
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                </div>
            </Card.Body>
        </Card>
    );
};

const AppMedia = () => {
    const [mediaEntries, setMediaEntries] = useState([]);
    const formikRef = useRef();

    useEffect(() => {
        axios.get(`${apiUrl}/media`)
            .then(response => {
                setMediaEntries(response.data);
            })
            .catch(error => {
                console.error('Error fetching media:', error);
            });
    }, []);

    const handleSubmit = async (values, { resetForm }) => {
        const formData = new FormData();
        if (values.media) {
            for (let i = 0; i < values.media.length; i++) {
                formData.append('media', values.media[i]);
            }
        }
        formData.append('tripName', values.tripName);
        formData.append('tags', values.tags);
        formData.append('notes', values.notes);

        try {
            const response = await axios.post(`${apiUrl}/media`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMediaEntries([response.data, ...mediaEntries]);
            resetForm();
        } catch (error) {
            console.error('Error submitting media:', error);
        }
    };

    return (
        <>
            <AppHeader />
            <div className="media-form-container">
              <div className="media-header">
                <div className="media-text">Upload Your Media</div>
                <div className="underline"></div>
              </div>
              <Formik
                initialValues={{ tripName: '', tags: '', notes: '', media: null }}
                validationSchema={schema}
                onSubmit={handleSubmit}
                innerRef={formikRef}
              >
                {({ setFieldValue }) => (
                  <Form id="media-form">
                    <div className="inputs">
                      {/* Input fields */}
                      <div className="input">
                        <Field name="tripName" type="text" placeholder="Enter Trip Name" className="form-control" />
                      </div>
                      <div className="input">
                        <Field name="tags" type="text" placeholder="Enter tags separated by commas" className="form-control" />
                      </div>
                      <div className="input">
                        <Field name="notes" type="text" placeholder="Notes" className="form-control" />
                      </div>
                      <div className="input">
                        <input id="file" name="media" type="file" multiple onChange={(event) => {
                            setFieldValue('media', event.currentTarget.files);
                        }} className="form-control" />
                      </div>
                    </div>
                    <div className="media-submit-container">
                      <button type="submit" className="btn media-btn-primary submit">Submit</button>
                      <button type="button" className="btn media-btn-secondary submit" onClick={() => formikRef.current?.resetForm()}>
                        Cancel
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="media-display">
              {mediaEntries.map((entry, index) => (
                  <MediaCard key={index} media={entry} index={index} />
              ))}
            </div>
        </>
    );
};

export default AppMedia;
