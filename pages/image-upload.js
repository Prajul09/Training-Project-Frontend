import React, { useState, useEffect } from 'react';
import { imgDB } from '@/config/trainingConfig';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes, listAll } from 'firebase/storage';
import { useRouter } from 'next/router';


const ImageUpload = () => {
    const [img, setImg] = useState(null);
    const [imgUrl, setImgUrl] = useState([]);
    const router = useRouter();

    const handleUpload = async () => {
        if (img != null) {
            const imgRef = ref(imgDB, `imgs/${v4()}`);
            try {
                const uploadImages = await uploadBytes(imgRef, img);
                const url = await getDownloadURL(uploadImages.ref);
                setImgUrl((prevUrls) => [...prevUrls, url]);
                setImg(null);
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleNextClick = () => {
        if (imgUrl.length >= 5) {
            router.push("/all-users");
        } else {
            alert("Please upload atleast five images before proceeding.");
        }
    }

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const imgs = await listAll(ref(imgDB, "imgs"));
                const urls = await Promise.all(
                    imgs.items.map(async (val) => await getDownloadURL(val))
                );
                setImgUrl(urls);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();
    }, []);

    console.log(imgUrl, "imgUrl");

    return (
        <div className="max-w-screen-lg mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Upload Your Images Here</h1>
            <div className="mb-4">
                <input type="file" onChange={(e) => setImg(e.target.files[0])} />
                <button
                    onClick={handleUpload}
                    disabled={!img}
                    className="flex flex-col mt-5 bg-yellow-600 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                    Upload
                </button>
            </div>
            <br /><br />
            <div className="flex flex-wrap -mx-2 mb-4">
                {imgUrl.map((image, index) => (
                    <div key={index} className="w-auto px-2 mb-4">
                        <img src={image} height="200px" width="200px" alt={`Uploaded Image ${index + 1}`} />
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <button onClick={() => router.back()} className="bg-yellow-300 text-gray-700 px-4 py-2 rounded">
                    Previous
                </button>
                <button onClick={handleNextClick} className="bg-yellow-500 text-white px-4 py-2 rounded">
                    Next
                </button>
            </div>
        </div>
    );
};

export default ImageUpload;

