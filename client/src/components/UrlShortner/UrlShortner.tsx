import React, { useState } from 'react';
import "./UrlShortner.css";
import Input from '../Input/Input';
import Url from './Url';
import { useCreateUrlMutation } from '../../redux/UrlSlice/UrlSlice';
import toast from 'react-hot-toast';
import { useCheckUserQuery } from '../../redux/AuthSlice/AuthSlice';

const UrlShortner: React.FC = () => {
    const { refetch } = useCheckUserQuery();
    const [url, setUrl] = useState<string>("");
    const [createUrl, { isLoading, isError, error }] = useCreateUrlMutation();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim();
        if (!value.startsWith("http://") && !value.startsWith("https://") && value.length > 0) {
            value = `https://${value}`;
        }
        setUrl(value);
    };

    const handleSubmit = async (): Promise<void> => {
        try {
            await createUrl({ originalUrl: url }).unwrap();
            refetch();
            setUrl("")
            toast.success("URL shortened successfully!");
        } catch (err) {
            toast.error("Failed to shorten URL");
        }
    };

    return (
        <div>
            <div className="page-title">
                <h3 className='heading'>✂️ Shorten Your Links, Instantly!</h3>
                <h6 className='tagline'>Make long URLs short & shareable in seconds</h6>
            </div>
            <div className="shortener-wrapper">
                <Input
                    placeholder="Enter URL"
                    name="originalUrl"
                    inputType="url"
                    onChange={handleChange}
                    value={url}
                />
                <button className="shorten-button" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? "Shortening..." : "Shorten URL"}
                </button>
            </div>
            {isError && <p className="error-msg">Error: {JSON.stringify(error)}</p>}
            {isLoading &&
                <div className='loaderParent'>
                    <div className='loader'></div>
                </div>}
            <Url />
        </div>
    );
};

export default UrlShortner;
