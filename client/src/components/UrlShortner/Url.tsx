import React from 'react';
import "./Url.css";
import ToggleBtn from '../Togglebtn/Toggle';
import { useCheckUserQuery } from '../../redux/AuthSlice/AuthSlice';
import toast from 'react-hot-toast';
import { useDeleteUrlMutation } from '../../redux/UrlSlice/UrlSlice';
import { useLazyToggleUrlQuery } from '../../redux/UrlSlice/UrlSlice';

const Url: React.FC = () => {
    const { data, isLoading, refetch } = useCheckUserQuery();
    const [deleteUrl, { isLoading: deleteLoading }] = useDeleteUrlMutation();
    const [toggleUrl] = useLazyToggleUrlQuery();

    if (isLoading) {
        return <div className='loaderParent'>
            <div className='loader'></div>
        </div>
    }
    if (!data?.success || !data?.data?.urls.length) {
        return (
            <div className="noUrlWrapper">
                <div className='loader'></div>
                <p className='noUrl'>No URL Found</p>
            </div>
        );
    }
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success("URL copied")
            })
            .catch((err) => {
                console.error('Failed to copy: ', err);
            });
    };

    const handleDelete = async (urlId: string): Promise<void> => {
        try {
            await deleteUrl({ urlId }).unwrap();
            refetch();
            toast.success("URL deleted successfully");
        } catch (err) {
            toast.error("Failed to delete");
        }
    };

    const handleToggle = async (urlId: string): Promise<void> => {
        try {
            await toggleUrl(urlId);
            refetch();
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            {data.data.urls.map((url: { _id: string; shortUrl: string, active: boolean }) => (
                <div key={url._id} className="urlWrapper">
                    <span className={`material-icons active ${!url.active ? "deactive" : ""}`}>
                        fiber_manual_record
                    </span>
                    <p className='listed-url'>{url.shortUrl}</p>
                    <span className="material-icons copy" onClick={() => handleCopy(url.shortUrl)}>content_copy</span>
                    <span className="material-icons delete" onClick={() => handleDelete(url._id)}>delete_forever</span>
                    <ToggleBtn active={url.active} onToggle={() => handleToggle(url._id)} />
                    {deleteLoading &&
                        <div className='loaderParent'>
                            <div className='loader'></div>
                        </div>}
                </div>
            ))}
        </>
    );
};

export default Url;
