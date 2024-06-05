import '../../../styles/components/page-components/user/user-photo.scss';

import Picture from '../../picture/Picture';
import SVGButton from '../../action/SVGButton';
import Button from '../../form/Button';

import { useUser } from '../../../context/UserProvider';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import ReactCrop, { makeAspectCrop, Crop, centerCrop, convertToPixelCrop } from 'react-image-crop';
import { setCanvasPreview } from '../../picture/CanvasPreview';
import 'react-image-crop/src/ReactCrop.scss';

import axios from 'axios';

const ChangePhoto = () => {

    const user = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        user?.username === "Demo" && (navigate('/'))
    }, [user])


    const [uploaded, setUploaded] = useState<boolean>(false);

    useEffect(() => {
        const handler = (event: MouseEvent | KeyboardEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setUploaded(false);
            }
        }
        document.addEventListener('mousedown', handler);
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                handler(event);
            }
        });
        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('keydown', (event) => {
                if (event.key === "Escape") {
                    handler(event);
                }
            });
        }
    }, [])

    const modalRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const previewCanvasRef = useRef<HTMLCanvasElement>(null);

    const ASPECT_RATIO = 1;
    const MIN_DIMENSION = 150;

    const [imgSrc, setImgSrc] = useState<string>("");
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        y: 75,
        x: 75,
        width: 75,
        height: 75
    })
    const [cropError, setCropError] = useState<string>("");

    const loadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > 1 * 1024 * 1024) {
            setUploaded(false);
            setCropError("O tamanho do arquivo não deve exceder 1 MB");
            return setImgSrc("");
        }

        const reader = new FileReader();
        reader.addEventListener("load", () => {

            const imgElement = new Image();
            const imgUrl = reader.result?.toString() || "";
            imgElement.src = imgUrl;

            imgElement.addEventListener("load", (e: Event) => {
                if (cropError) setCropError("");

                const target = e.target as HTMLImageElement;
                const { naturalWidth, naturalHeight } = target;
                if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                    setUploaded(false);
                    setCropError("O arquivo deve medir >= 256x256 pixels.");
                    return setImgSrc("");
                }
            });

            setUploaded(true);
            setImgSrc(imgUrl);
        })
        reader.readAsDataURL(file);

        event.target.value = '';
    }

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const { width, height } = e.currentTarget;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: 75,
            },
            ASPECT_RATIO,
            width,
            height
        );

        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    }

    const [requesting, setRequesting] = useState<boolean>(false);

    const submit = (event: React.FormEvent) => {
        event.preventDefault();
        if (imgRef.current && previewCanvasRef.current) {
            const newPhoto = setCanvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(
                    crop,
                    imgRef.current.naturalWidth,
                    imgRef.current.naturalHeight
                )
            );

            const API = import.meta.env.VITE_API;
            const token = localStorage.getItem('token')

            setRequesting(true);

            axios.patch(`${API}/users/edit/${user?.id}`, { photo: newPhoto }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(() => {
                    setRequesting(false);
                    navigate(`/user/${user?.username}`)
                    window.location.reload()
                })
                .catch(() => {
                    setRequesting(false);
                })
        }
    }

    const closeModal = () => {
        setUploaded(false);
    }

    return (
        <div className="container-change-photo">
            <div className="container-settings">
                <Picture src={user?.photo} username={user?.username} width="45%" />
                {cropError && <p>{cropError}</p>}
                <div className="input">
                    <input id="photo" type="file" accept="image/*" onChange={loadImage} />
                    <label htmlFor="photo" tabIndex={0}>Escolher</label>
                </div>
                <div className={`form-wrapper ${uploaded ? "wrapper" : ""}`}>
                    <div className="form-container" ref={modalRef}>
                        <div className="title">
                            <h2>Ajuste sua foto</h2>
                            <SVGButton path='/svgs/back.svg' handleOnClick={closeModal} />
                        </div>
                        <form onSubmit={submit}>
                            <div className="container-file">
                                {imgSrc &&
                                    <ReactCrop
                                        crop={crop}
                                        circularCrop
                                        keepSelection
                                        aspect={ASPECT_RATIO}
                                        minWidth={MIN_DIMENSION}
                                        onChange={(percentCrop) => setCrop(percentCrop)}
                                        style={{ maxHeight: '70vh' }}
                                    >
                                        <img src={imgSrc} alt="Picture" ref={imgRef} onLoad={onImageLoad} />
                                    </ReactCrop>
                                }
                            </div>
                            {requesting ? (
                                <Button text={"Salvando..."} />
                            ) : (
                                <Button text={"Salvar"} transparent />
                            )}
                        </form>
                        {crop && (
                            <canvas ref={previewCanvasRef} className="display-none"></canvas>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePhoto